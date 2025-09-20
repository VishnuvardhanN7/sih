import Card from "../components/Card";
import {
  FileText,
  Users,
  Bot,
  Map,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      icon: <FileText />,
      title: "Document Manager",
      description: "Securely store and organize all your documents in one place.",
      features: ["PDF Scanner", "Cloud Storage"],
      badge: "100% Secure",
      footer: "8/8 Complete",
      onClick: () => window.open("/document-manager", "_self"),
    },
    {
      icon: <Users />,
      title: "Expert Advisors",
      description: "Get instant help from certified experts.",
      features: ["Real Subject Experts", "24/7 Availability"],
      badge: "Verified Experts",
      footer: "3 Experts",
    },
    {
      icon: <Bot />,
      title: "AI Study Assistant",
      description: "Get help with your studies anytime, anywhere.",
      features: ["Instant Answers", "24/7 Availability"],
      badge: "Smart Learning",
      footer: "Always Online",
    },
    {
      icon: <Map />,
      title: "Mind Map Generator",
      description: "Visualize your ideas and concepts with ease.",
      features: ["Smart Suggestions", "Customizable"],
      badge: "AI Powered",
      footer: "5 Generated",
    },
    {
      icon: <BookOpen />,
      title: "College Reviews",
      description: "Research colleges and book personalized tours.",
      features: ["Real Students", "Verified Reviews"],
      badge: "Trusted Insights",
      footer: "Updated Weekly",
      onClick: () => window.open("/college-reviews", "_self"),
    },
    {
      icon: <MessageSquare />,
      title: "Messages",
      description: "Connect with your peers and mentors.",
      features: ["Private & Safe", "Real-time"],
      badge: "Secure Messaging",
      footer: "2 Unread",
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-900 p-6">
      <div className="dashboard-header">
        <h1 className="text-white text-4xl font-bold mb-2">Everything You Need to Succeed</h1>
        <p className="text-gray-300 mb-6">Comprehensive tools designed to boost your exam preparation</p>
      </div>

      <div className="tools-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.slice(0, 3).map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>

      <div className="tools-grid grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        {cards.slice(3).map((card, i) => (
          <Card key={i + 3} {...card} />
        ))}
      </div>
    </div>
  );
}