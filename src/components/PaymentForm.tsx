'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface PaymentFormProps {
    onPaymentSuccess?: (transactionId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/order', {
                name,
                mobile,
                amount: parseFloat(amount),
                MUID: 'MUID' + Date.now(),
                transactionId: 'T' + Date.now(),
            });
            const { redirectUrl, transactionId } = response.data;
            if (redirectUrl) {
                window.location.href = redirectUrl;
                if (onPaymentSuccess) onPaymentSuccess(transactionId);
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Upgrade to Premium</h2>
            <p className="text-center text-white mb-6">
                Complete your payment to unlock premium AI models on Insight.
            </p>

            <div>
                <label className="block text-sm font-medium text-white">Full Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white">Mobile Number</label>
                <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter your mobile number"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white">Amount (₹)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-purple-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default PaymentForm;