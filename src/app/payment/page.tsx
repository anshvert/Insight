'use client';

import React, { useState } from 'react';
import PaymentForm from '../../components/PaymentForm';
import Image from 'next/image';

export default function PaymentPage() {
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
            <div className="max-w-4xl w-full flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
                {/* Left Side: Logo/Image */}
                <div className="w-full md:w-1/2 bg-gray-800 p-6 flex items-center justify-center">
                    <div className="text-center w-full max-w-xs"> {/* Center and constrain width */}
                        <Image
                            src="/Insight.png"
                            alt="Insight Logo"
                            width={300}
                            height={400}
                            className="rounded-lg object-contain mx-auto" // Center the image
                        />
                        <h1 className="text-4xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Insight
                        </h1>
                        <p className="mt-2 text-gray-300">
                            Unlock the power of AI with Insight. Experience advanced models and insights tailored for you.
                        </p>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="w-full md:w-1/2 bg-gray-950 text-gray-900 p-6 relative">
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient-x opacity-20"
                        style={{ zIndex: 0 }}
                    />
                    <div className="relative z-10">
                        <PaymentForm
                            onPaymentSuccess={(transactionId) => {
                                console.log('Payment successful:', transactionId);
                                setPaymentSuccess(true);
                                setTimeout(() => setPaymentSuccess(false), 3000); // Hide after 3s
                            }}
                        />
                        {paymentSuccess && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full animate-bounce">
                                    <span>✓</span>
                                    <span>Payment Successful!</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}