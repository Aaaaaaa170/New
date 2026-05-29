"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });

    const data = await res.json();

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
      {
        role: "assistant",
        content: data.message,
      },
    ]);

    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl mb-4">
        My AI
      </h1>

      <div className="space-y-4">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}</b>
            <div>{m.content}</div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          onClick={sendMessage}
          className="mt-2 bg-white text-black p-3 rounded w-full"
        >
          Send
        </button>
      </div>
    </main>
  );
}