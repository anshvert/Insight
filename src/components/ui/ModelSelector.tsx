'use client'
import React, { useState } from 'react';
import { Model } from "@/app/page";

interface ModelSelectorProps {
    currentModel: Model | null
    onModelChange: (model: Model) => void
    models: Model[]
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ currentModel, onModelChange, models }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (model: Model) => {
        onModelChange(model);
        setIsOpen(false)
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-4 py-2 bg-textBackground text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select AI model"
            >
                {currentModel?.display_name || 'Select a model'}
                <span className="text-sm">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <ul className="absolute bottom-full left-0 w-full bg-black border border-gray-300 rounded-md shadow-lg mb-1 z-10">
                    {models.map((model: Model) => (
                        <li
                            key={model.name}
                            onClick={() => handleSelect(model)}
                            className={`px-4 py-2 cursor-pointer hover:bg-black-100 ${
                                model.display_name === currentModel?.display_name ? 'bg-black-200 font-semibold' : ''
                            }`}
                        >
                            {model.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ModelSelector;