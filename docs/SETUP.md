# MANTHANX Setup Guide

## Manual Setup Instructions for Simple Gemini Chatbot

Follow these steps to get your MANTHANX chatbot up and running:

### 1. Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- A Google AI Studio account for Gemini API

### 2. Get Gemini API Key

1. **Visit Google AI Studio**: Go to https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create API Key**: Click "Create API Key" button
4. **Copy the key**: Save this key securely - you'll need it for the backend

### 3. Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   copy .env.example .env
   ```
   (On Windows) or `cp .env.example .env` (On Mac/Linux)

4. **Configure environment variables**:
   Open `.env` file and replace `your_gemini_api_key_here` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   You should see: `🚀 MANTHANX Backend server running on port 5000`

6. **Test the backend**: Visit http://localhost:5000/health in your browser
   - You should see a JSON response indicating the server is running

### 4. Frontend Setup

1. **Open a new terminal** and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```
   
   Your browser should automatically open to http://localhost:3000

### 5. Testing the Chatbot

1. **Verify the interface**: You should see the MANTHANX header and chatbot interface
2. **Test a message**: Try typing "What crops grow well in Kerala?" and press Enter
3. **Check for responses**: You should receive AI-generated responses about Kerala agriculture

### 6. Common Issues and Solutions

#### Backend Issues:
- **Port 5000 already in use**: Change PORT in `.env` file to a different number (e.g., 5001)
- **API key errors**: Double-check that your Gemini API key is correctly set in `.env`
- **CORS errors**: Ensure frontend URL matches FRONTEND_URL in `.env`

#### Frontend Issues:
- **API connection errors**: Verify backend is running on http://localhost:5000
- **Styling issues**: Ensure Tailwind CSS is properly configured

#### API Issues:
- **Invalid API key**: Generate a new key from Google AI Studio
- **Rate limiting**: Gemini has usage limits; wait a moment between requests
- **Network errors**: Check your internet connection

### 7. Next Steps

Once the basic chatbot is working:
1. Test with various agricultural questions
2. Verify responses are appropriate for Kerala farmers
3. Ready to add the next feature!

### 8. Project Structure

```
KRISHI/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatBot.jsx
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/           # Node.js/Express server
│   ├── routes/
│   │   └── chat.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── docs/
    └── SETUP.md       # This file
```

### 9. Environment Variables Reference

**Backend (.env)**:
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 10. Troubleshooting Commands

**Check if backend is running**:
```bash
curl http://localhost:5000/health
```

**Check if frontend can reach backend**:
```bash
curl http://localhost:5000/api/chat/health
```

**View backend logs**:
Check the terminal where you ran `npm run dev` in the backend directory

---

**Need Help?** If you encounter any issues, check the terminal logs for error messages and ensure all steps above were followed correctly.