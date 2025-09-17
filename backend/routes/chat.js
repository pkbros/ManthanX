const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI (will be configured after manual setup)
let genAI;
let model;

// Initialize Gemini AI if API key is provided
if (process.env.GEMINI_API_KEY) {
  console.log('[Gemini] GEMINI_API_KEY found, initializing Gemini AI...');
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('[Gemini] Gemini AI model initialized successfully.');
  } catch (err) {
    console.error('[Gemini] Error initializing Gemini AI:', err);
  }
} else {
  console.warn('[Gemini] No GEMINI_API_KEY found in environment. AI will not work.');
}

// POST /api/chat/message
router.post('/message', async (req, res) => {
  try {
    console.log('[Chat] Incoming message:', req.body);
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Check if Gemini API is configured
    if (!model) {
      console.error('[Chat] Gemini model is not configured.');
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
    let result, response, text;
    try {
      result = await model.generateContent(prompt);
      response = await result.response;
      text = response.text();
    } catch (aiErr) {
      console.error('[Gemini] Error during generateContent:', aiErr);
      throw aiErr;
    }

    res.json({
      success: true,
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Chat] Error in /api/chat/message:', error);

    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return res.status(401).json({ 
        error: 'Invalid Gemini API key',
        message: 'Please check your API key configuration'
      });
    }

    // Handle Gemini AI overload (503)
    if (error.message?.includes('503') || error.message?.toLowerCase().includes('service unavailable') || error.message?.toLowerCase().includes('overloaded')) {
      return res.status(503).json({
        error: 'AI service overloaded',
        message: 'The AI is currently overloaded. Please wait a moment and try again.'
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