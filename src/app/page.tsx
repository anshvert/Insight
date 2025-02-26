"use client"
import { useState, useRef, useEffect } from "react";
import { openai } from "@/lib/openRouter";
import { Textarea } from "@/components/ui/textarea"

type Message = {
    id: number;
    text: string;
    sender: "user" | "assistant";
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        console.log("IN handle send")
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: "user",
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        const completion = await openai.chat.completions.create({
            model: 'openai/gpt-3.5-turbo',
            messages: [
                {
                    role: userMessage.sender,
                    content: userMessage.text,
                },
            ],
        });
        // console.log(completion.choices[0].message);

        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text: completion.choices[0].message.content || "Server is busy !!",
                sender: "assistant",
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen bg-background text-white">
            <header className="p-4 text-center">
                <h1 className="text-2xl font-bold">Insight</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-background">
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
                                Processing...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="p-4 bg-background">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <Textarea onSend={handleSendMessage} setInputText={setInputText} />
                    </div>
                </div>
            </div>
        </div>
    );
}