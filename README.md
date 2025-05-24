# Insight - Your Personalized LLM Interface 🚀

![Insight](https://github.com/user-attachments/assets/b7161c4b-adb2-424a-a710-1b36b0f155d7)


**Insight** is a sleek, modern LLM interface where users can select AI models tailored to their needs, with premium models unlocked via a secure payment system. Built for practice and future scalability.

---

## ✨ Features

- **Model Selection**: Choose from a variety of AI models to suit your needs, with a dropdown selector.
- **Paywall for Premium Models**: Access advanced models (e.g., Gemini 2.0) with a premium subscription, featuring a lock icon and "Buy Premium" section.
- **Secure Payment System**: Integrated with Payment Gateway for seamless payments to unlock premium features.
- **Responsive Design**: Works beautifully on desktop and mobile with Tailwind CSS.
- **Chat Interface**: Clean and intuitive chat UI to interact with your chosen AI model.

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=flat&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-1.0-green?style=flat&logo=supabase)
![PhonePe](https://img.shields.io/badge/PhonePe-Sandbox-5F259F?style=flat&logo=phonepe)

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Supabase (for model storage)
- **Payment Gateway**: PhonePe (sandbox environment)
- **Libraries**: Axios, Heroicons

---

## 🎥 Demo

Head to https://insight-beta-flax.vercel.app/ to Interact with AI models, select premium ones, and upgrade via the payment page—all in one seamless experience.

---

## 📸 Screenshots

### Chat Interface
![image](https://github.com/user-attachments/assets/fea967c5-3800-406c-a652-724945a636fc)
The main chat interface where users interact with their chosen AI model.

### Payment Page
![image](https://github.com/user-attachments/assets/7e96407f-dbc8-4be6-9e53-439025192341)
A sleek payment page to upgrade to premium, featuring the Insight logo and a dynamic form.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Supabase account (for model storage)
- PhonePe sandbox credentials (for payment testing)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/anshvert/insight.git
   cd insight
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Set up environment variables in .env.local:
   ```dotenv
   NEXT_PUBLIC_OPEN_ROUTER_API_KEY=
   
   AUTH_SECRET=
   
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   
   SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_KEY=
   ```    
4. Run the development server:
   ```bash
   next dev
   ```
5. Open http://localhost:3000 in your browser to start using Insight.

## 🌟 Future Plans

Insight is just getting started! Here’s what’s on the horizon:

- **More AI Models**: Expand the model library with cutting-edge LLMs and enhance the chat experience with richer interactions.
- **Analytics Dashboard**: Add usage analytics for users to track their interactions and model performance.

Got ideas? Let me know in the [issues](https://github.com/anshvert/insight/issues) section!

## 📜 License

- This project is licensed under the MIT License - see the LICENSE file for details.

## ⭐ If you find Insight useful, give it a star on GitHub!
