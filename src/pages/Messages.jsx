import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { generateChatId } from "../context/chat";
import { Bot, Send } from "lucide-react";

export default function Messages({ user }) {
  const { userId = "" } = useParams();
  const navigate = useNavigate();

  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isAIMode, setIsAIMode] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);

  const chatId = generateChatId(user.uid, userId);
  const aiChatId = generateChatId(user.uid, "ai-assistant");

  // AI Assistant Configuration
  const aiAssistant = {
    id: "ai-assistant",
    name: "AI Assistant",
    avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face",
    status: "Always Online",
    description: "Your intelligent AI companion"
  };

  // Mock Users for Fallback
  const mockChatUsers = [
    { id: "101", name: "Sophia", avatar: "https://randomuser.me/api/portraits/women/63.jpg", status: "Online" },
    { id: "102", name: "Rohan", avatar: "https://randomuser.me/api/portraits/men/32.jpg", status: "Last seen 5m ago" },
    { id: "103", name: "Zara", avatar: "https://randomuser.me/api/portraits/women/44.jpg", status: "Online" },
    { id: "104", name: "Vikram", avatar: "https://randomuser.me/api/portraits/men/45.jpg", status: "Offline" },
  ];

  // Fetch all users with robust fallback
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");

        // Timeout Promise
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 2000)
        );

        // Race
        const querySnapshot = await Promise.race([
          getDocs(usersRef),
          timeoutPromise
        ]);

        const users = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((u) => u.id !== user.uid);

        if (users.length === 0) {
          console.warn("No users found in DB, using mock chat users");
          setAllUsers([aiAssistant, ...mockChatUsers]);
        } else {
          setAllUsers([aiAssistant, ...users]);
        }
      } catch (error) {
        console.warn("Network slow or data missing in Messages, using offline mode:", error.message);
        setAllUsers([aiAssistant, ...mockChatUsers]);
      }
    };

    fetchUsers();
  }, [user.uid]);

  // Fetch chat user details
  useEffect(() => {
    const fetchChatUser = async () => {
      if (userId === "ai-assistant") {
        setChatUser(aiAssistant);
        setIsAIMode(true);
        return;
      }

      setIsAIMode(false);
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChatUser({
          id: userId,
          name: data.name || "No Name",
          avatar: data.avatar || "https://randomuser.me/api/portraits/men/34.jpg",
        });
      } else {
        setChatUser({
          id: userId,
          name: "Deleted User",
          avatar: "https://randomuser.me/api/portraits/men/34.jpg"
        });
      }
    };

    if (userId) fetchChatUser();
  }, [userId]);

  // Real-time messages
  useEffect(() => {
    if (!userId) return;

    const currentChatId = userId === "ai-assistant" ? aiChatId : chatId;
    const messagesRef = collection(db, "chats", currentChatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          fromMe: data.from === user.uid,
        };
      });
      setMessages(msgs);

      // Update conversation context for AI
      if (userId === "ai-assistant") {
        const context = msgs.map(msg => ({
          role: msg.fromMe ? "user" : "assistant",
          content: msg.message
        }));
        setConversationContext(context);
      }
    });

    return () => unsubscribe();
  }, [chatId, aiChatId, user.uid, userId]);

  // Advanced AI Reply Generator
  const generateAdvancedAIReply = async (userMessage, context = []) => {
    try {
      // Simulate AI thinking time
      setAiTyping(true);

      // Enhanced AI responses based on context and patterns
      const responses = await getContextualAIResponse(userMessage, context);

      setTimeout(() => {
        setAiTyping(false);
      }, 1500);

      return responses;
    } catch (error) {
      console.error("AI Reply Error:", error);
      setAiTyping(false);
      return "I'm having trouble processing that right now. Can you try again?";
    }
  };

  const getContextualAIResponse = async (message, context) => {
    const lowerMsg = message.toLowerCase();

    // Greeting responses
    if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
      const greetings = [
        "Hello! 😊 How can I assist you today?",
        "Hi there! I'm your AI assistant. What would you like to know?",
        "Hey! Great to chat with you. How can I help?",
        "Hello! I'm here to help you with anything you need. What's on your mind?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // How are you responses
    if (lowerMsg.includes("how are you")) {
      const statusResponses = [
        "I'm doing great! Thanks for asking. How are you doing?",
        "I'm functioning perfectly and ready to help! What about you?",
        "Excellent! I'm here and ready to assist. How's your day going?",
        "I'm wonderful! Always excited to chat and help out. How are you feeling?"
      ];
      return statusResponses[Math.floor(Math.random() * statusResponses.length)];
    }

    // Question responses
    if (lowerMsg.includes("?")) {
      const questionResponses = [
        "That's a great question! Let me think about that for you...",
        "Interesting question! Based on what I know, I'd say...",
        "I'd be happy to help with that! Here's what I think...",
        "Good question! Let me provide you with some insights on that..."
      ];
      return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }

    // Help requests
    if (lowerMsg.includes("help") || lowerMsg.includes("assist") || lowerMsg.includes("support")) {
      return "I'm here to help! I can assist you with various topics, answer questions, provide advice, or just have a friendly conversation. What specifically would you like help with? 🤝";
    }

    // Technology related
    if (lowerMsg.includes("code") || lowerMsg.includes("programming") || lowerMsg.includes("tech")) {
      return "I love talking about technology! 💻 Whether it's coding, software development, or the latest tech trends, I'm here to help. What specific tech topic interests you?";
    }

    // Farewell responses
    if (lowerMsg.includes("bye") || lowerMsg.includes("goodbye") || lowerMsg.includes("see you")) {
      const farewells = [
        "Goodbye! It was great chatting with you. Feel free to come back anytime! 👋",
        "See you later! I'm always here when you need me. Take care! 😊",
        "Bye for now! Thanks for the lovely conversation. Have a wonderful day! ✨",
        "Until next time! I enjoyed our chat. Don't hesitate to reach out again! 🌟"
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }

    // Default contextual responses
    const contextualResponses = [
      `That's really interesting! "${message}" makes me think about how interconnected everything is. Tell me more about your perspective on this.`,
      `I find "${message}" quite thought-provoking. Could you elaborate on what led you to share that?`,
      `Thanks for sharing that with me! "${message}" opens up many possibilities for discussion. What aspect interests you most?`,
      `That's a fascinating point about "${message}". I'd love to explore this topic further with you. What's your experience with this?`,
      `Your message about "${message}" really resonates with me. I think there are multiple angles to consider here. What's your take?`
    ];

    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const currentChatId = userId === "ai-assistant" ? aiChatId : chatId;
    const messagesRef = collection(db, "chats", currentChatId, "messages");

    const message = {
      from: user.uid,
      to: userId,
      message: newMessage.trim(),
      timestamp: serverTimestamp(),
    };

    await addDoc(messagesRef, message);
    const sentMessage = newMessage.trim();
    setNewMessage("");

    // AI Auto-reply for AI Assistant
    if (userId === "ai-assistant") {
      const aiReply = await generateAdvancedAIReply(sentMessage, conversationContext);

      setTimeout(async () => {
        const aiMessage = {
          from: "ai-assistant",
          to: user.uid,
          message: aiReply,
          timestamp: serverTimestamp(),
        };
        await addDoc(messagesRef, aiMessage);
      }, 2000);
    } else {
      // Regular user auto-reply (simulated)
      setTimeout(async () => {
        const aiReply = {
          from: userId,
          to: user.uid,
          message: generateSimpleAIReply(sentMessage),
          timestamp: serverTimestamp(),
        };
        await addDoc(messagesRef, aiReply);
      }, 1000);
    }
  };

  const generateSimpleAIReply = (msg) => {
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
      return "Hey there! 😊";
    } else if (lowerMsg.includes("how are you")) {
      return "I'm doing great! What about you?";
    } else if (lowerMsg.includes("bye")) {
      return "Talk to you later! 👋";
    } else {
      const replies = [
        "That's interesting! Tell me more...",
        "I see what you mean! 🤔",
        "Really? That's cool!",
        "Thanks for sharing that with me!",
        "I totally understand! 😊"
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
  };

  const switchToAIChat = () => {
    navigate(`/messages/ai-assistant`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-blue-500/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 text-center relative z-10">
        <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl mx-auto border border-white/20 animate-fade-in transform-gpu">

          {/* Sidebar with 3D Effects */}
          <div className="w-full md:w-1/3 border-r border-white/10 p-4 space-y-4 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-600/5 to-pink-500/5 animate-gradient-shift"></div>

            <div className="flex items-center justify-between relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text animate-pulse">Messages</h2>
              <button
                onClick={switchToAIChat}
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110 transform-gpu animate-bounce-subtle group"
                title="Chat with AI Assistant"
              >
                <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full p-2 rounded-xl bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/20 focus:border-white/40 focus:outline-none transition-all duration-300 hover:bg-white/15 focus:scale-105 transform-gpu"
            />

            {/* Current user info with 3D hover */}
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-lg group">
              <div className="relative">
                <img src={user.avatar} className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-300" alt="Your avatar" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white/50"></div>
              </div>
              <div>
                <p className="font-semibold text-sm group-hover:text-blue-300 transition-colors duration-300">{user.name}</p>
                <p className="text-xs text-white/60">You (Online)</p>
              </div>
            </div>

            {/* Users list with staggered animations */}
            <div className="space-y-3 relative z-10">
              {allUsers.map((u, index) => (
                <div
                  key={u.id}
                  onClick={() => navigate(`/messages/${u.id}`)}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-white/15 transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-lg group animate-slide-in-left ${userId === u.id ? "bg-white/10 border border-white/20 shadow-lg scale-105" : ""
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={u.avatar || "https://randomuser.me/api/portraits/women/79.jpg"}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    />
                    {u.id === "ai-assistant" && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 animate-spin-slow">
                        <Bot className="w-3 h-3" />
                      </div>
                    )}
                    {u.id !== "ai-assistant" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/messages/ai-assistant`);
                        }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-125 transform-gpu animate-pulse"
                        title="Chat with AI about this person"
                      >
                        <Bot className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm group-hover:text-blue-300 transition-colors duration-300">{u.name}</p>
                    <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
                      {u.id === "ai-assistant" ? u.status : "Tap to chat"}
                    </p>
                  </div>
                  {u.id === "ai-assistant" && (
                    <div className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 rounded-full animate-pulse shadow-lg">
                      AI
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Box with Enhanced 3D Effects */}
          <div className="w-full md:w-2/3 p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-gradient-shift-reverse"></div>

            {/* Header with floating effect */}
            <div className="flex items-center justify-between mb-4 relative z-10 animate-slide-down">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src={chatUser?.avatar || "https://randomuser.me/api/portraits/men/34.jpg"}
                    className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    alt="Chat user avatar"
                  />
                  {isAIMode && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 animate-spin-slow">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold group-hover:text-blue-300 transition-colors duration-300">{chatUser?.name || "Select a user"}</p>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {chatUser ?
                      (isAIMode ? "AI Assistant - Always here to help!" : `Chatting with ${chatUser.name}`) :
                      "No conversation selected"
                    }
                  </p>
                </div>
              </div>
              {isAIMode && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-3 py-1 rounded-full backdrop-blur-sm border border-blue-400/30 animate-pulse">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-xs">AI Online</span>
                </div>
              )}
            </div>

            {/* Messages with advanced animations */}
            <div className="space-y-4 h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 relative z-10">
              {messages.length === 0 && isAIMode && (
                <div className="text-center text-white/60 py-8 animate-fade-in">
                  <div className="relative inline-block">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-blue-400 animate-bounce" />
                    <div className="absolute inset-0 w-12 h-12 mx-auto mb-4 bg-blue-400/20 rounded-full animate-ping"></div>
                  </div>
                  <p className="text-lg font-semibold mb-2 animate-slide-up">Welcome to AI Assistant!</p>
                  <p className="text-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>I'm here to help you with anything. Just start a conversation!</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={msg.id || i}
                  className={`max-w-[75%] p-3 rounded-2xl transition-all duration-500 transform-gpu animate-slide-in-up hover:scale-105 ${msg.fromMe
                    ? "ml-auto bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg hover:shadow-2xl hover:from-pink-500 hover:to-purple-600"
                    : isAIMode
                      ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 shadow-lg hover:shadow-2xl hover:from-blue-500/30 hover:to-purple-600/30 backdrop-blur-sm"
                      : "bg-white/10 hover:bg-white/15 backdrop-blur-sm"
                    }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="leading-relaxed">{msg.message}</p>
                  {!msg.fromMe && isAIMode && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                      <Bot className="w-3 h-3 animate-pulse" />
                      <span>AI Assistant</span>
                    </div>
                  )}
                </div>
              ))}

              {aiTyping && (
                <div className="max-w-[75%] p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 backdrop-blur-sm animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-400 animate-bounce" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-white/60">AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input with 3D effects */}
            {userId && (
              <div className="flex mt-4 gap-2 items-center relative z-10 animate-slide-up">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isAIMode ? "Ask AI anything..." : "Type your message..."}
                  className="flex-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15 focus:scale-105 transform-gpu focus:shadow-lg"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform-gpu hover:scale-110 active:scale-95 group ${isAIMode
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    : "bg-pink-500 hover:bg-pink-600"
                    }`}
                  disabled={aiTyping}
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-shift-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-100px) opacity(0); }
          100% { transform: translateX(0) opacity(1); }
        }
        @keyframes slide-in-up {
          0% { transform: translateY(20px) opacity(0); }
          100% { transform: translateY(0) opacity(1); }
        }
        @keyframes slide-down {
          0% { transform: translateY(-20px) opacity(0); }
          100% { transform: translateY(0) opacity(1); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px) opacity(0); }
          100% { transform: translateY(0) opacity(1); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
        .animate-gradient-shift-reverse { animation: gradient-shift-reverse 10s ease infinite; background-size: 200% 200%; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.5s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}
