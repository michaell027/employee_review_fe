"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "@/libs/interfaces/message";

enum State {
  WaitingForManagerInput = 0,
  GeneratingNewReview = 1,
  WaitingForApproval = 2,
}

interface ChatProps {
  review: string;
}

export default function Chat({ review }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: review, sender: "llama" },
  ]);
  const [state, setState] = useState<State>(State.WaitingForManagerInput);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleDecline = () => {
    setState(State.WaitingForManagerInput);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I'm just a llama. I can't change that.",
          sender: "llama",
        },
      ]);
      setState(State.WaitingForApproval);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      const lastMessage = messagesEndRef.current
        .previousElementSibling as HTMLElement;
      if (lastMessage) {
        window.scrollBy({
          top: lastMessage.offsetHeight + 16,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col mt-6 pb-10">
      <div className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`text-white text-lg shadow-2xl ${
                  message.sender === "user" ? "bg-[#312343]" : "bg-[#121828]"
                } text-black px-4 py-3 rounded-md max-w-2xl`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {state === State.WaitingForApproval && (
        <div className="mt-4 gap-3 flex justify-end">
          <button
            onClick={handleDecline}
            className="bg-[#ff4694] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#d93a7c] transition-colors"
          >
            Decline
          </button>
          <button className="bg-[#776fff] mb-8 text-white px-4 py-2 rounded-md hover:bg-[#5a54cc] transition-colors">
            Accept & Send
          </button>
        </div>
      )}

      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="What do you want to change?"
          className="text-black rounded-md px-4 py-3 block w-full focus:outline-none"
          disabled={
            state === State.WaitingForApproval ||
            state === State.GeneratingNewReview
          }
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#121828] hover:bg-[#312343] shadow-2xl text-white rounded-full p-3 ml-2 focus:outline-none"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <path
              d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
