"use client"
import { useState, useRef, useEffect } from "react";

type Message = {
    id: number;
    text: string;
    sender: "user" | "bot";
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        // Add user message to the chat
        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: "user",
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        // Simulate bot response (replace this with your API call)
        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text: "This is a response from the bot.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Chat Header */}
            <header className="p-4 border-b border-gray-700 text-center">
                <h1 className="text-2xl font-bold">Whale.AI</h1>
            </header>

            {/* Chat Messages (Centered horizontally, aligned to top vertically) */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="w-full max-w-2xl mx-auto space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${
                                    message.sender === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-700 text-white"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[70%] p-3 rounded-lg bg-gray-700 text-white">
                                Typing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Chat Input (Fixed at the bottom) */}
            <div className="p-4 border-t border-gray-700 bg-gray-900">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="flex items-center space-x-2">
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
            />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}