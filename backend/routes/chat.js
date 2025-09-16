const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI (will be configured after manual setup)
let genAI;
let model;

// Initialize Gemini AI if API key is provided
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// POST /api/chat/message
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Check if Gemini API is configured
    if (!model) {
      return res.status(503).json({ 
        error: 'Gemini API not configured',
        message: 'Please set up your Gemini API key in the environment variables'
      });
    }

    // Create a prompt optimized for agricultural assistance
    const prompt = `You are MANTHANX, an AI assistant helping farmers in Kerala, India. 
    Provide helpful, practical agricultural advice. Keep responses simple and easy to understand.
    
    User question: ${message}`;

    // Generate response using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return res.status(401).json({ 
        error: 'Invalid Gemini API key',
        message: 'Please check your API key configuration'
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate response',
      message: 'Please try again later'
    });
  }
});

// GET /api/chat/health
router.get('/health', (req, res) => {
  const isConfigured = !!process.env.GEMINI_API_KEY;
  
  res.json({
    status: 'OK',
    geminiConfigured: isConfigured,
    message: isConfigured ? 'Chat service ready' : 'Gemini API key not configured'
  });
});

module.exports = router;