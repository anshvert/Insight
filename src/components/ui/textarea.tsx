import * as React from "react";
import { cn } from "@/lib/utils";
import {ChangeEvent} from "react";

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<"textarea"> & { onSend?: () => void, setInputText?: React.Dispatch<React.SetStateAction<string>>, inputText?: string }
>(({ className, onSend, setInputText, inputText, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [height, setHeight] = React.useState<number>(60); // Initial height
    const maxHeight = 200; // Maximum height before scrolling
    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    // Auto-resize function
    const handleInput = React.useCallback(() => {
        console.log("in Handle input")
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = "auto";

        // Calculate new height (with a small buffer for better UX)
        const newHeight = Math.min(textarea.scrollHeight + 2, maxHeight);

        // Apply new height
        textarea.style.height = `${newHeight}px`;
        setHeight(newHeight);

        // Add scroll if content exceeds maxHeight
        textarea.style.overflowY = newHeight >= maxHeight ? "auto" : "hidden";
    }, [maxHeight]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && onSend) {
            e.preventDefault();
            onSend();
        }
    };

    React.useEffect(() => {
        // Initialize height on mount
        handleInput();

        // Add resize observer for container changes
        const textarea = textareaRef.current;
        if (textarea) {
            const resizeObserver = new ResizeObserver(handleInput);
            resizeObserver.observe(textarea);
            return () => resizeObserver.disconnect();
        }
    }, [handleInput]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (onSend) onSend()
        }
    };

    return (
        <div className="relative w-full">
            <textarea
                className={cn(
                    "flex w-full rounded-lg border border-gray-300 bg-textBackground px-4 py-3 text-base shadow-sm transition-colors", // Base styles
                    "placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 " +
                    "focus-visible:ring-blue-500 focus-visible:ring-offset-2", // Focus and placeholder
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none", // Disabled and no resize
                    className
                )}
                ref={textareaRef}
                placeholder="Ask me anything..."
                rows={1}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText!(e.target.value)}
                style={{
                    minHeight: '60px',
                    height: `${height}px`,
                    overflowY: height >= maxHeight ? 'auto' : 'hidden'
                }}
                {...props}
            />

            <button
                onClick={onSend}
                className="absolute right-3 bottom-3 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                aria-label="Send message"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                </svg>
            </button>
        </div>
    );
});
Textarea.displayName = "Textarea";

export { Textarea };