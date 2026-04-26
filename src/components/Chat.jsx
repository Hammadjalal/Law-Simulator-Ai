import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import "./chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const bottomRef = useRef();

  const sendMessage = async () => {
    const text = inputRef.current.value;
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    inputRef.current.value = "";
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: text,
      });

      const reply = res.data.reply;

      setMessages([...newMessages, { role: "ai", text: reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "ai", text: "❌ AI connection failed" },
      ]);
    }

    setLoading(false);
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="police-bg">

      {/* POLICE LIGHTS */}
      <div className="lights"></div>

      <div className="chat-card">

        {/* HEADER */}
        <div className="header">
          🚓 Law & Police Action Simulator AI
        </div>

        {/* CHAT AREA */}
        <div className="chat-box">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Message msg={m} onSpeak={speak} />
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="typing">
              <span></span><span></span><span></span>
              <p>AI analyzing legal case...</p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="input-box">
          <input ref={inputRef} placeholder="Enter legal scenario..." />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}