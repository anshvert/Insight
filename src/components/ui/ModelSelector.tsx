'use client';

import React, { useState } from 'react';
import { Model } from "@/app/page";
import { LockClosedIcon } from '@heroicons/react/24/solid'; // For the lock icon
import Link from 'next/link';

interface ModelSelectorProps {
    currentModel: Model | null;
    onModelChange: (model: Model) => void;
    models: Model[];
    isPremiumUser: boolean; // New prop to track user subscription status
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ currentModel, onModelChange, models, isPremiumUser }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (model: Model) => {
        // Only allow selection if user is premium or model is not premium
        if (!model.premium || isPremiumUser) {
            onModelChange(model);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative inline-block">
            {/* Trigger Button */}
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-4 py-2 bg-textBackground text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select AI model"
            >
                {currentModel?.display_name || 'Select a model'}
                <span className="text-sm">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <ul className="absolute bottom-full left-0 w-full bg-gray-900 border border-gray-600 rounded-md shadow-lg mb-1 z-10">
                    {/* Buy Premium Section */}
                    <li className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-md border-b border-gray-600">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Unlock Premium Models</span>
                            <Link href="/payment">
                                <button className="px-3 py-1 bg-white text-blue-600 text-sm font-semibold rounded-md hover:bg-gray-200 transition">
                                    Buy Premium 0.99$
                                </button>
                            </Link>
                        </div>
                        <p className="text-xs mt-1 opacity-80">
                            Access advanced AI models with a premium plan!
                        </p>
                    </li>

                    {models.map((model: Model) => (
                        <li
                            key={model.name}
                            onClick={() => handleSelect(model)}
                            className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-800 text-white ${
                                model.display_name === currentModel?.display_name ? 'bg-gray-700 font-semibold' : ''
                            } ${model.premium && !isPremiumUser ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            <span>{model.display_name}</span>
                            {model.premium && (
                                <LockClosedIcon
                                    className={`h-4 w-4 ${isPremiumUser ? 'text-green-400' : 'text-gray-400'}`}
                                    aria-label={isPremiumUser ? 'Unlocked' : 'Premium model - locked'}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ModelSelector;