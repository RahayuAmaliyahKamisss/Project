import { useState } from "react";
import axios from "axios";

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    // simpan pesan user
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    // kosongkan input
    setMessage("");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/chatbot/ask",
        {
          message: userMessage,
        }
      );

      const fullText = response.data.answer;
      const score = response.data.score;

      // buat bubble bot kosong dulu
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "",
          score: score,
        },
      ]);

      let index = 0;

      const interval = setInterval(() => {
        index++;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            sender: "bot",
            text: fullText.slice(0, index),
            score: score,
          };

          return updated;
        });

        if (index >= fullText.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 5);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Terjadi kesalahan saat menghubungi chatbot.",
        },
      ]);

      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 w-[calc(100%-2rem)] max-w-md">

      {/* Chat Box */}
      {isOpen && (
        <div className="w-full rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

          {/* Header */}
          <div className="p-4 sm:p-5 flex items-start gap-4 border-b border-slate-100">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-md">
              💬
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-slate-800 font-bold text-base sm:text-lg">
                Chatbot Wisata
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Tanya seputar wisata di Kecamatan Ciemas Sukabumi
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Result */}
          <div className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-sm text-slate-500 bg-slate-50 rounded-2xl p-4">
                Halo 👋
                Silakan tanyakan informasi wisata seperti:
                <br />
                <span className="font-medium">
                  "Berapa harga tiket Curug Cimarinjung?"
                </span>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index}>
                  <div
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {msg.text}

                      {loading &&
                        index === messages.length - 1 &&
                        msg.sender === "bot" && (
                          <span className="animate-pulse">|</span>
                        )}
                    </div>
                  </div>

                  {/* nilai cosine similarity */}
                  {/* {msg.sender === "bot" &&
                    msg.score !== undefined && (
                      <div className="text-xs text-slate-400 mt-1 px-2">
                        Similarity Score: {msg.score.toFixed(2)}
                      </div>
                    )} */}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100">
            <div className="rounded-full bg-white border border-slate-200 overflow-hidden flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Ketik pertanyaan..."
                className="flex-1 px-4 sm:px-5 py-3 text-sm sm:text-base outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
              />

              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="h-full px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium flex items-center justify-center hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
                aria-label="Kirim pesan"
              >
                {loading ? "..." : <span className="text-lg">➤</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
          aria-label="Buka chat"
        >
          💬
        </button>
      )}
    </div>
  );
}