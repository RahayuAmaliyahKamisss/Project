import { useState } from "react";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://localhost:5000/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white p-4 shadow rounded-xl w-64">
      <p className="font-bold">Chatbot</p>
      <input
        className="border w-full p-1 mt-2"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white mt-2 px-2 py-1"
      >
        Kirim
      </button>
      <p className="mt-2 text-sm">{reply}</p>
    </div>
  );
}