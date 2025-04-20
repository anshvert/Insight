"use client";
import React, { useState, useRef, useEffect } from "react";
import { openai } from "@/lib/openRouter";
import { ChatBox } from "@/components/ui/chatBox";
import { getSession, SignOut } from "@/app/actions";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { createBulkChats, getChats } from "@/app/db/chats";
import ModelSelector from "@/components/ui/ModelSelector";
import { getModels } from "@/app/db/models";
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";

type Message = {
    id: number;
    text: string;
    sender: "user" | "assistant";
};

export type Model = {
    name: string;
    display_name: string;
    isAvailable?: boolean;
    premium: boolean;
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [aiModels, setAiModels] = useState<Model[]>([]);
    const [currentModel, setCurrentModel] = useState<Model | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // const MemoizedMarkdown = React.memo(({ text }) => (
    //     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
    //         {text}
    //     </ReactMarkdown>
    // ), (prevProps, nextProps) => prevProps.text === nextProps.text);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const getSessionInfo = async () => {
            const session = await getSession();
            if (session && session.user) {
                setUserInfo(session.user);
                setIsLoggedIn(true);
                if (session.user.email) {
                    await getUserChats(session.user.email);
                }
            }
            await getAIModels();
        };
        const getUserChats = async (email: string) => {
            const chats = await getChats(email);
            let messageChats: Message[] = [];
            for (let chat of chats) {
                messageChats.push({
                    id: chat.id,
                    text: chat.message,
                    sender: chat.is_bot ? "assistant" : "user",
                });
            }
            setMessages(messageChats);
        };
        const getAIModels = async () => {
            const models = await getModels();
            setAiModels(models);
            setCurrentModel(models[0]);
        };
        getSessionInfo();
    }, []);

    const handleSignIn = () => {
        redirect("/login");
    };

    const handleSignOut = () => {
        setUserInfo(null);
        setIsLoggedIn(false);
        setMessages([]);
        SignOut();
    };

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

        // Add welcome message if this is the first message
        if (messages.length === 0) {
            const welcomeMessage: Message = {
                id: Date.now() - 1,
                text: "Welcome to Insight! I'm here to help you with your questions. Select a model and start chatting!",
                sender: "assistant",
            };
            setMessages((prev) => [welcomeMessage, ...prev]);
        }

        // Start streaming response
        const botMessage: Message = {
            id: Date.now() + 1,
            text: "",
            sender: "assistant",
        };
        setMessages((prev) => [...prev, botMessage]);

        let fullResponse = "";
        const stream = await openai.chat.completions.create({
            model: currentModel?.name as string,
            messages: [
                { role: "user", content: userMessage.text },
            ],
            stream: true, // Enable streaming
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullResponse += content;
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = fullResponse;
                return newMessages;
            });
        }

        setIsLoading(false);
        if (isLoggedIn) {
            await createBulkChats([
                {
                    user_email: userInfo?.email as string,
                    isBot: false,
                    message: userMessage.text,
                },
                {
                    user_email: userInfo?.email as string,
                    isBot: true,
                    message: fullResponse,
                },
            ]);
        }
    };

    const handleModelChange = (model: Model) => {
        setCurrentModel(model);
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

            {/* Conditional Rendering Based on Messages */}
            {messages.length === 0 ? (
                // Welcome Screen
                <div className="flex-1 flex items-center justify-center p-4 bg-background">
                    <div className="text-center max-w-xl">
                        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Welcome to Insight!
                        </h2>
                        <p className="mb-6 text-gray-300">
                            I'm here to help you with your questions. Select a model from the sidebar and start chatting!
                        </p>
                        <div className="flex justify-center">
                            <ModelSelector
                                currentModel={currentModel}
                                onModelChange={handleModelChange}
                                models={aiModels}
                                isPremiumUser={false}
                            />
                            <ChatBox
                                onSend={handleSendMessage}
                                inputText={inputText}
                                setInputText={setInputText}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Normal Chat Layout
                <div className="flex-1 overflow-y-auto p-4 bg-textBackground">
                    <div className="w-full max-w-3xl mx-auto space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`p-3 rounded-xl ${
                                        message.sender === "user"
                                            ? "max-w-[70%] bg-gray-700 text-white"
                                            : "w-full text-white mx-4 text-left"
                                    }`}
                                >
                                    {/*<MemoizedMarkdown>*/}
                                    {/*    {message.text}*/}
                                    {/*</MemoizedMarkdown>*/}
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-full p-3 rounded-xl text-white mx-4 text-left">
                                    Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}

            {/* Input Section (Always at Bottom for Non-Empty Messages) */}
            {messages.length > 0 && (
                <div className="p-4 bg-textBackground">
                    <div className="w-full max-w-3xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <ModelSelector
                                currentModel={currentModel}
                                onModelChange={handleModelChange}
                                models={aiModels}
                                isPremiumUser={false}
                            />
                            <ChatBox
                                onSend={handleSendMessage}
                                inputText={inputText}
                                setInputText={setInputText}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}