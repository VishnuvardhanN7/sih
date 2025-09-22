import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Create a chat model instance
export const getGeminiChat = async () => {
  const model = genAI.getGenerativeModel({ 
    model: import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-pro",
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    }
  });
  return model.startChat({
    history: [],
  });
};

// Helper function to send message and get response
export const sendMessage = async (chat, message) => {
  try {
    // Basic retry for transient quota/rate-limit errors
    const maxAttempts = 3;
    let attempt = 0;
    let lastError = null;

    while (attempt < maxAttempts) {
      try {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
      } catch (err) {
        lastError = err;
        const msg = String(err?.message || "");
        const isRateLimited = msg.includes("429") || msg.toLowerCase().includes("quota");
        if (isRateLimited && attempt < maxAttempts - 1) {
          const backoffMs = 1000 * Math.pow(2, attempt); // 1s, 2s
          await new Promise(r => setTimeout(r, backoffMs));
          attempt += 1;
          continue;
        }
        throw err;
      }
    }
    throw lastError;
  } catch (error) {
    console.error('Error sending message:', error);
    if ((error.message || '').includes('API key')) {
      throw new Error('Invalid API key. Please check your API key configuration.');
    } else if ((error.message || '').includes('models')) {
      throw new Error('Error accessing Gemini model. Please check your model configuration.');
    } else if ((error.message || '').includes('429') || (error.message || '').toLowerCase().includes('quota')) {
      throw new Error('Rate limit or quota exceeded. Try again in a moment, switch to a lighter model by setting VITE_GEMINI_MODEL=gemini-1.5-flash, or enable billing to increase quota.');
    } else {
      throw new Error('An error occurred while communicating with the Gemini API: ' + error.message);
    }
  }
};