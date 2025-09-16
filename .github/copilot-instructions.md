# Copilot Instructions for MANTHANX (KRISHI Project)

## Project Overview
**MANTHANX: Smart AgriAssist** - An AI-powered, farmer-friendly web application targeting farmers in Kerala with low tech literacy. The platform provides localized, accessible agricultural guidance with voice commands, image-based queries, and multilingual support.

## Core Features (Build Order)
1. **Simple Gemini Chatbot** *(Current Feature)*
2. AI-Powered Local Assistance (voice commands, image queries)
3. User-Friendly Interface (voice navigation, real-time alerts)
4. Government Scheme Integration
5. Supply Chain Connection ("Farm to Table")
6. Financial Inclusion ("Farm Score")

## Architecture Guidelines
### Technology Stack
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Socket.IO
- **AI/ML**: LangChain + TensorFlow/PyTorch + Gemini API
- **Database**: PostgreSQL (structured) + MongoDB (unstructured)
- **APIs**: IMD Weather API, data.gov.in, Translation APIs

### Project Structure
```
/frontend         - React application (Netlify deployment)
/backend          - Node.js/Express server (AWS EC2 deployment)
/ml-models        - TensorFlow/PyTorch models
/docs             - Documentation and API guides
/config           - Configuration files
```

## Development Workflow
### Setup Commands
```bash
# Frontend setup
cd frontend
npm install
npm start

# Backend setup
cd backend
npm install
npm run dev
```

## Key Design Principles
- **Simplicity First**: UI designed for low digital literacy users
- **Voice-Centric**: Web Speech API integration for navigation
- **Offline-Friendly**: Functionality during poor connectivity
- **Localization**: Malayalam language support for Kerala farmers
- **Incremental Development**: Build one feature at a time

## Current Feature: Simple Gemini Chatbot
- Basic chat interface with text input/output
- Backend endpoint for Gemini API integration
- No complex features - focus on core chat functionality

## Coding Conventions
### File Naming
- React components: PascalCase (e.g., `ChatBot.jsx`)
- Utility files: camelCase (e.g., `apiHelpers.js`)
- API routes: kebab-case (e.g., `/api/chat-message`)

### Component Structure
- Use functional components with hooks
- Keep components small and focused
- Separate business logic into custom hooks

## Important Notes for AI Agents
- **Feature-by-Feature Development**: Only implement requested features
- **No Automatic API Integration**: Ask for manual API setup instructions
- **Farmer-Centric Design**: Consider low tech literacy in all UI decisions
- **Malayalam Readiness**: Prepare for future localization
- **Ask Before Adding**: Always confirm before implementing additional features

---
*Last updated: September 16, 2025*
*Current Feature: Simple Gemini Chatbot*