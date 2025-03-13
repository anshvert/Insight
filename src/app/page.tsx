"use client"
import { useState, useRef, useEffect } from "react";
import { openai } from "@/lib/openRouter";
import { Textarea } from "@/components/ui/textarea"
import { getSession, SignOut } from "@/app/actions";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { createBulkChats, getChats } from "@/app/db/chats";

type Message = {
    id: number;
    text: string;
    sender: "user" | "assistant";
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const getSessionInfo = async () => {
            const session = await getSession()
            if (session && session.user) {
                setUserInfo(session.user)
                setIsLoggedIn(true)
                if (session.user.email) {
                    await getUserChats(session.user.email)
                }
            }
        }
        const getUserChats = async (email: string) => {
            const chats = await getChats(email)
            let messageChats: Message[] = []
            for (let chat of chats) {
                messageChats.push({
                    id: chat.id,
                    text: chat.message,
                    sender: chat.is_bot ? 'assistant' : 'user'
                })
            }
            setMessages(messageChats)
        }
        getSessionInfo()
    }, []);

    const handleSignIn = () => {
        redirect("/login")
    }

    const handleSignOut = () => {
        setUserInfo(null);
        setIsLoggedIn(false);
        setMessages([]);
        SignOut()
    }

    const handleSendMessage = async () => {
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
        const botMessage: Message = {
            id: Date.now() + 1,
            text: completion.choices[0].message.content || "Server is busy !!",
            sender: "assistant",
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
        await createBulkChats([
            {
                user_email: userInfo?.email as string,
                isBot: false,
                message: userMessage.text,
            },
            {
                user_email: userInfo?.email as string,
                isBot: true,
                message: botMessage.text,
            }
        ])
    };

    return (
        <div className="flex flex-col h-screen bg-background text-white">
            <header className="p-4 border-b border-gray-700 relative flex items-center">
                <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    Insight
                </h1>
                <div className="ml-auto">
                    {isLoggedIn ? (
                        <img
                            src={userInfo?.image || undefined}
                            alt={`${userInfo?.name}`}
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={handleSignOut}
                        />
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Sign In
                        </button>
                    )}
                </div>
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
                    <div ref={messagesEndRef}/>
                </div>
            </div>

            <div className="p-4 bg-background">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <Textarea onSend={handleSendMessage} inputText={inputText} setInputText={setInputText} />
                    </div>
                </div>
            </div>
        </div>
    );
}