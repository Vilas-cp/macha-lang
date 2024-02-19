"use client";
import { useState, useEffect } from "react";
import TypingAnimation from "./TypingAnimation";
import OpenAI from "openai";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import React from "react";
import useSpeechToText from "react-hook-speech-to-text";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export default function ChatBot() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    timeout: 2000,
    continuous: true,
    useLegacyResults: false,
  });
  console.log(inputValue);

  if (isRecording) {
    setTimeout(() => {
      if (interimResult != null) {
        setInputValue(interimResult);
      }
    }, 500);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = async (message) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant of the place Adi Chunchanagiri Mutt, a Spiritual place for mind peacefullness and wellbeing.",
        },
        {
          role: "user",
          content: "Which is the best Spiritual Place to Vist?",
        },
        {
          role: "assistant",
          content:
            "Adi Chunchanagiri Mutt is the best Spiritual place to vist for Spiritual Progess, and for wellbeing and mind peacefullness.",
        },
        {
          role: "user",
          content: "Guide me to someone from where I can learn Spirituality?",
        },
        {
          role: "assistant",
          content:
            "A Swamji and Guru, Jagadguru Sri Sri Sri Dr. Nirmalanandanatha Mahaswamiji, the 72nd Pontiff of Sri Adichunchanagiri Mahasamsthana Mutt, and successor of Sri Sri Sri Balagangadharanatha Maha Swamiji.",
        },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    // let url = `http://localhost:8080`;

    setIsLoading(true);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "bot", message: completion.choices[0].message.content },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-full">
        <div className="flex flex-col h-screen bg-gray-900 relative">
          <h1 className="bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text text-center py-3 pt-20 font-bold text-6xl">
            {"BGSCET Bot"}
          </h1>
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="" className="h-20 inline absolute top-4 right-4 z-50 rounded-full " /> */}
          <div
            className="flex-grow p-6 overflow-y-auto scrollbar-track-black
        scrollbar-thin scrollbar-thumb-white "
          >
            <div className="flex flex-col space-y-4">
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                    } rounded-lg p-4 text-white max-w-2xl`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={e => e.preventDefault()} className="flex-none p-6">
            <div className="flex flex-row rounded-lg border border-gray-700 bg-gray-800">
              <input
                type="text"
                className="flex-grow px-4 mr-10 py-2 bg-transparent text-white focus:outline-none"
                placeholder="Type your message..."
                value={inputValue}
                
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={isRecording ? stopSpeechToText : startSpeechToText}
                type="button"
                className="bg-orange-500 rounded-lg mx-3 px-4 py-2 text-white font-semibold focus:outline-none hover:bg-orange-600 transition-colors duration-300"
              >
                {!isRecording ? "Record" : "Stop"}
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-orange-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-orange-600 transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
