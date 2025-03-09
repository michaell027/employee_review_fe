"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import type { Message } from "@/libs/interfaces/message";
import { changeReview } from "@/libs/api/review-service";
import ErrorComponent from "@/components/error";
import { Transition } from "@headlessui/react";
import {
  PaperAirplaneIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

enum State {
  WaitingForManagerInput = 0,
  GeneratingNewReview = 1,
  WaitingForApproval = 2,
  ErrorGeneratingReview = 3,
}

interface ChatProps {
  review: string;
  onSaveReview: (updatedReview: string) => void;
}

export default function Chat({ review, onSaveReview }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { content: review, role: "user" },
  ]);
  const [state, setState] = useState<State>(State.WaitingForManagerInput);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // TODO: if there will be an error, manager can decide if he wants to send the review or not
  const handleDecline = () => {
    setState(State.WaitingForManagerInput);
    setNewMessage("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSendMessage = () => {
    setState(State.GeneratingNewReview);
    if (newMessage.trim()) {
      const updatedMessages: Message[] = [
        ...messages,
        { content: newMessage, role: "user" },
      ];

      setMessages(updatedMessages);
      setNewMessage("");

      changeReview(updatedMessages).then((data) => {
        if (data === null) {
          setState(State.ErrorGeneratingReview);
          return;
        }
        setMessages([...updatedMessages, { content: data, role: "assistant" }]);
        setState(State.WaitingForApproval);
      });
    } else {
      if (messages.at(-1)?.content === "Please enter a message.") {
        setState(State.WaitingForManagerInput);
        return;
      }
      setMessages([
        ...messages,
        { content: "Please enter a message.", role: "system" },
      ]);
      setState(State.WaitingForManagerInput);
    }
  };

  const handleSaveReview = () => {
    const latestAssistantMessage = messages
      .filter((msg) => msg.role === "assistant")
      .pop();

    if (latestAssistantMessage) {
      onSaveReview(latestAssistantMessage.content);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col my-6 pb-10 rounded-lg p-5">
      <div className="">
        <div className="flex flex-col space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <Transition
              key={index}
              as={Fragment}
              show={true}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start space-x-2">
                  {message.role !== "user" && (
                    <div className="flex-shrink-0 mt-1">
                      <ChatBubbleLeftIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`text-white px-4 py-3 rounded-lg shadow-md ${
                      message.role === "user"
                        ? "bg-[#1a2035] rounded-tr-none"
                        : message.role === "system"
                          ? "bg-[#ff4694]/50 border border-[#ff4694]/30"
                          : "bg-[#121828]/70 rounded-tl-none"
                    } max-w-2xl`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 mt-1">
                      <UserCircleIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </Transition>
          ))}

          {state === State.GeneratingNewReview && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 mt-1">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-white" />
                </div>
                <div className="bg-[#121828]/70 text-white px-4 py-3 rounded-lg rounded-tl-none shadow-md">
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-2 h-2 bg-[#776fff] rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#776fff] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#776fff] rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {state === State.WaitingForApproval && (
        <div className="mt-6 gap-4 flex justify-end">
          <button
            onClick={handleDecline}
            className="inline-flex items-center bg-[#312343] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#3e2c56] focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5 mr-2" />
            Decline
          </button>
          <button
            onClick={handleSaveReview}
            className="inline-flex items-center bg-[#776fff] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#6258d3] focus:outline-none focus:ring-2 focus:ring-[#776fff] focus:ring-offset-2 focus:ring-offset-[#1a2035] transition-colors duration-200"
          >
            <CheckIcon className="h-5 w-5 mr-2" />
            Accept & Send
          </button>
        </div>
      )}

      {state === State.ErrorGeneratingReview ? (
        <div className="flex w-full flex-col my-5 space-y-4 items-center justify-center">
          <ErrorComponent message="Failed to generate new review." />
        </div>
      ) : (
        <div className="mt-6">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="What would you like to change?"
              className="bg-[#121828] text-white rounded-xl px-5 py-4 pr-14 block w-full shadow-inner border-0 focus:ring-2 focus:ring-[#776fff] focus:outline-none transition-all duration-200"
              disabled={
                state === State.WaitingForApproval ||
                state === State.GeneratingNewReview
              }
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 bg-[#776fff] hover:bg-[#6258d3] text-white rounded-lg p-2.5 shadow-md focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200 disabled:opacity-50"
              disabled={
                state === State.WaitingForApproval ||
                state === State.GeneratingNewReview
              }
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
