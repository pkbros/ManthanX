
# MANTHANX: Smart AgriAssist

An AI-powered, farmer-friendly web application designed for farmers in Kerala with low tech literacy. The platform provides localized, accessible agricultural guidance.

## 🌾 Current Feature: Simple Gemini Chatbot

A basic chat interface that allows farmers to ask agricultural questions and receive AI-powered responses using Google's Gemini API.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16+)
- Google Gemini API key

### Setup Instructions

1. **Get Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Setup Backend**:

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your Gemini API key to .env
   npm run dev
   ```

3. **Setup Frontend**:

   ```bash
   cd frontend
   npm install
   npm start
   ```

📖 **Detailed setup instructions**: See [docs/SETUP.md](docs/SETUP.md)

## 🏗️ Project Structure

```
KRISHI/
├── frontend/          # React + Tailwind CSS
├── backend/           # Node.js + Express
├── docs/              # Documentation
└── .github/           # GitHub configuration
```

## 🎯 Planned Features

1. ✅ **Simple Gemini Chatbot** *(Current)*
2. ⏳ AI-Powered Local Assistance (voice commands, image queries)
3. ⏳ User-Friendly Interface (voice navigation, real-time alerts)
4. ⏳ Government Scheme Integration
5. ⏳ Supply Chain Connection ("Farm to Table")
6. ⏳ Financial Inclusion ("Farm Score")

## 🛠️ Technology Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Socket.IO
- **AI/ML**: LangChain, TensorFlow/PyTorch, Gemini API
- **Database**: PostgreSQL, MongoDB
- **Deployment**: Netlify (Frontend), AWS EC2 (Backend)

## 🌐 Development

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📝 License

MIT

---

*Building technology for Kerala farmers, one feature at a time.* 🌱