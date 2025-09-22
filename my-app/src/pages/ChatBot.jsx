import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { getGeminiChat, sendMessage } from '../utils/geminiApi';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        const chat = await getGeminiChat();
        setChatInstance(chat);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    initChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !chatInstance) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessage(chatInstance, inputMessage);
      const botMessage = {
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: "I apologize, but I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>Student Support Chatbot</h2>
        <p>Ask your doubts about objective problems</p>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your question here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
