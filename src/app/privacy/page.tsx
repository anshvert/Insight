export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
                <p className="mb-4 text-gray-300">
                    Last Updated: March 17, 2025
                </p>
                <p className="mb-4">
                    At Insight, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our services, including our LLM chat interface and premium subscription features.
                </p>

                <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                <p className="mb-4">
                    We collect the following types of information when you use Insight:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li><strong>Personal Information:</strong> When you upgrade to a premium plan, we collect your name and mobile number via the payment form. This is required to process your payment through PhonePe.</li>
                    <li><strong>Chat Data:</strong> We store your chat history with AI models to improve your experience and provide continuity in conversations. This data is stored in Supabase, our database provider.</li>
                    <li><strong>Usage Data:</strong> We collect anonymized usage data, such as the models you select and session duration, to improve our services.</li>
                    <li><strong>Technical Data:</strong> We may collect your IP address, browser type, and device information to ensure the security and functionality of our platform.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use your information for the following purposes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li><strong>Service Delivery:</strong> To provide access to AI models, process payments, and store your chat history for a seamless experience.</li>
                    <li><strong>Payment Processing:</strong> Your name and mobile number are shared with PhonePe to facilitate secure payment transactions.</li>
                    <li><strong>Improvement:</strong> To analyze usage patterns and improve our platform’s functionality and model offerings.</li>
                    <li><strong>Security:</strong> To detect and prevent fraudulent activities or unauthorized access to your account.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">3. How We Share Your Information</h2>
                <p className="mb-4">
                    We do not sell or share your personal information with third parties, except in the following cases:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li><strong>Payment Processing:</strong> We share your name and mobile number with PhonePe to process payments. PhonePe has its own privacy policy for handling this data.</li>
                    <li><strong>Service Providers:</strong> We use Supabase to store chat history and user data. Supabase complies with data protection standards.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or to protect our rights and safety.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">4. Data Storage and Security</h2>
                <p className="mb-4">
                    We use secure protocols (HTTPS) and encryption to protect your data during transmission. Your chat history is stored in Supabase, which adheres to industry-standard security practices. However, no system is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
                <p className="mb-4">
                    Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li><strong>Access:</strong> Request a copy of the data we have about you.</li>
                    <li><strong>Deletion:</strong> Request deletion of your chat history or personal information.</li>
                    <li><strong>Opt-Out:</strong> Stop receiving marketing emails (if applicable).</li>
                </ul>
                <p className="mb-4">
                    To exercise these rights, contact us at anshtyagi2222@gmail.com.
                </p>

                <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
                <p className="mb-4">
                    We do not currently use cookies, but we may in the future to enhance your experience (e.g., remembering your model preferences). We will update this policy if cookies are implemented.
                </p>

                <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
                </p>

                <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                <p className="mb-4">
                    If you have questions about this Privacy Policy, contact us at anshtyagi2222@gmail.com or make a call at +916397444722.
                </p>
            </div>
        </div>
    );
}