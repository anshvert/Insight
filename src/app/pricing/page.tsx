import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans for Insight</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>
                        <p className="text-3xl font-bold mb-4">₹0</p>
                        <p className="text-gray-400 mb-6">Get started with basic AI models.</p>
                        <ul className="text-left mb-6 space-y-2">
                            <li>✔ Access to Deep Seek model</li>
                            <li>✔ 10 chats per day</li>
                            <li>✔ Basic chat history storage</li>
                        </ul>
                        <Link href="/chat">
                            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Basic Plan */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center relative">
                        <h2 className="text-2xl font-semibold mb-4">Basic Plan</h2>
                        <p className="text-3xl font-bold mb-4">₹1,499 <span className="text-lg font-normal">one-time</span></p>
                        <p className="text-gray-400 mb-6">Unlock more AI models for better insights.</p>
                        <ul className="text-left mb-6 space-y-2">
                            <li>✔ Access to Gemini 2.0 Flash</li>
                            <li>✔ 50 chats per day</li>
                            <li>✔ Extended chat history storage</li>
                            <li>✔ Email support</li>
                        </ul>
                        <Link href="/payment">
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700">
                                Upgrade Now
                            </button>
                        </Link>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>
                        <p className="text-3xl font-bold mb-4">₹2,999 <span className="text-lg font-normal">one-time</span></p>
                        <p className="text-gray-400 mb-6">Full access to all AI models with priority support.</p>
                        <ul className="text-left mb-6 space-y-2">
                            <li>✔ Access to all models (e.g., Mistral AI, Olympic Coder)</li>
                            <li>✔ Unlimited chats</li>
                            <li>✔ Unlimited chat history storage</li>
                            <li>✔ Priority email support</li>
                        </ul>
                        <Link href="/payment">
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700">
                                Upgrade Now
                            </button>
                        </Link>
                    </div>
                </div>

                <p className="text-center text-gray-400 mt-12">
                    Need a custom plan? Contact us at <a href="mailto:anshtyagi2222@gmail.com" className="text-blue-400 hover:underline">ansh@insightai.com</a>.
                </p>
            </div>
        </div>
    );
}