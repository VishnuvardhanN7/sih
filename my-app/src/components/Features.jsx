import { FileText, Users, Bot, Map, BookOpen, MessageSquare } from "lucide-react";

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-white">Everything You Need to Succeed</h1>
      <p className="text-gray-400 mb-12 text-center">
        Comprehensive tools designed to boost your exam preparation
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Document Manager */}
        <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
          <FileText className="w-10 h-10 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-white">Document Manager</h2>
          <p className="text-gray-400 mt-2 mb-4">
            Securely store and organize all your exam documents
          </p>
          <p className="text-sm text-gray-500">8/10 Complete <a href="#" className="text-blue-400 hover:underline">Explore →</a></p>
          <p className="text-sm text-gray-500 mt-1">100% Secure</p>
        </div>

        {/* Expert Advisors */}
        <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
          <Users className="w-10 h-10 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-white">Expert Advisors</h2>
          <p className="text-gray-400 mt-2 mb-4">
            Connect with successful students from top colleges
          </p>
          <p className="text-sm text-gray-500">3 Active <a href="#" className="text-blue-400 hover:underline">Explore →</a></p>
          <p className="text-sm text-gray-500 mt-1">Verified Experts</p>
        </div>

        {/* AI Study Assistant */}
        <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
          <Bot className="w-10 h-10 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-white">AI Study Assistant</h2>
          <p className="text-gray-400 mt-2 mb-4">
            Get instant help with step-by-step problem solving
          </p>
          <p className="text-sm text-gray-500">24/7 Available <a href="#" className="text-blue-400 hover:underline">Explore →</a></p>
          <p className="text-sm text-gray-500 mt-1">Smart Learning</p>
        </div>

        {/* Mind Map Generator */}
        <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
          <Map className="w-10 h-10 text-orange-600 mb-4" />
          <h2 className="text-xl font-semibold text-white">Mind Map Generator</h2>
          <p className="text-gray-400 mt-2 mb-4">
            Transform your notes into visual learning maps
          </p>
          <p className="text-sm text-gray-500">5 Generated <a href="#" className="text-blue-400 hover:underline">Explore →</a></p>
          <p className="text-sm text-gray-500 mt-1">AI Powered</p>
        </div>

        {/* College Reviews */}
        <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
          <BookOpen className="w-10 h-10 text-teal-600 mb-4" />
          <h2 className="text-xl font-semibold text-white">College Reviews</h2>
          <p className="text-gray-400 mt-2 mb-4">
            Read honest reviews and book video consultations
          </p>
          <p className="text-sm text-gray-500">Real Students <a href="#" className="text-blue-400 hover:underline">Explore →</a></p>
          <p className="text-sm text-gray-500 mt-1">Verified Reviews</p>
        </div>

        {/* Messages */}
        <div className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition-transform">
          <MessageSquare className="w-10 h-10 text-pink-600 mb-4" />
          <h2 className="text-xl font-semibold text-white">Messages</h2>
          <p className="text-gray-400 mt-2 mb-4">
            Chat with advisors and get personalized guidance
          </p>
          <p className="text-sm text-gray-500">2 Unread <a href="#" className="text-blue-400 hover:underline">Explore →</a></p>
          <p className="text-sm text-gray-500 mt-1">Private & Safe</p>
        </div>
      </div>
    </div>
  );
}
