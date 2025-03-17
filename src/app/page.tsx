'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center h-screen text-center p-4">
                <Image src="/Insight.png" alt="Insight Logo" width={150} height={150} className="mb-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Unlock AI Insights with Insight
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
                    A personalized LLM interface to chat with AI models tailored to your needs. Upgrade to premium for advanced models.
                </p>
                {/* Buttons Section */}
                <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
                    <Link href="/chat">
                        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/pricing">
                        <button className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                            View Pricing
                        </button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Why Choose Insight?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h3 className="text-xl font-semibold mb-2">Model Selection</h3>
                        <p className="text-gray-300">Choose from a variety of AI models to suit your needs.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h3 className="text-xl font-semibold mb-2">Premium Access</h3>
                        <p className="text-gray-300">Unlock advanced models with a premium subscription.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                        <p className="text-gray-300">Pay securely with PhonePe to upgrade your plan.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-400">
                <p>© 2025 Insight. All rights reserved.</p>
                <div className="mt-2">
                    <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link> •
                    <Link href="/terms" className="text-blue-400 hover:underline ml-2">Terms of Service</Link> •
                    <Link href="/refund" className="text-blue-400 hover:underline ml-2">Refund Policy</Link> •
                    <Link href="/pricing" className="text-blue-400 hover:underline ml-2">Pricing</Link> •
                    <a href="https://github.com/anshvert/Insight" className="text-blue-400 hover:underline ml-2">GitHub</a>
                </div>
            </footer>
        </div>
    );
}