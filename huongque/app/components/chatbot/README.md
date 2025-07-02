# Chatbot Feature Documentation

## Overview
The chatbot feature provides customers with an intelligent assistant that can answer questions about products in the Hương Quê marketplace. It uses AI to understand customer queries and provide relevant product information.

## Features
- 🤖 **Intelligent Product Search**: Uses Vietnamese sentence transformers to find relevant products
- 💬 **Real-time Chat Interface**: Modern, responsive chat UI with typing indicators
- 📱 **Mobile Friendly**: Optimized for both desktop and mobile devices
- 🎨 **Customizable UI**: Easy to configure colors, messages, and behavior
- 🔧 **API Integration**: Connects to backend chatbot service

## Components

### 1. ChatBot Component (`/app/components/chatbot/ChatBot.tsx`)
The main chat interface component that appears as a floating button on all public pages.

**Features:**
- Floating chat button with hover tooltip
- Expandable chat window
- Message history with timestamps
- Loading states and error handling
- Keyboard shortcuts (Enter to send)

### 2. API Route (`/app/api/chatbot/route.ts`)
Next.js API route that handles communication between frontend and chatbot service.

**Endpoints:**
- `POST /api/chatbot` - Send message to chatbot

### 3. Configuration (`/app/components/chatbot/config.ts`)
Centralized configuration for chatbot behavior and UI customization.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file with the chatbot service URL:
```env
CHATBOT_SERVICE_URL=http://localhost:8000
```

### 2. Start Chatbot Service
Make sure the Python chatbot service is running:
```bash
cd be_huongque/chatbotservice
pip install -r requirements.txt
python main.py
```

### 3. Frontend Integration
The chatbot is automatically integrated into all pages except admin pages via `LayoutWrapper`.

## Customization

### UI Configuration
Edit `/app/components/chatbot/config.ts` to customize:
- Welcome message
- Bot name and subtitle
- Placeholder text
- Error messages
- Colors and behavior

### Example Customization:
```typescript
export const chatbotConfig = {
  ui: {
    welcomeMessage: 'Your custom welcome message',
    botName: 'Your Bot Name',
    placeholder: 'Type your question...',
  }
};
```

## Usage

### For Customers
1. Look for the blue chat button in the bottom-right corner
2. Click to open the chat window
3. Type questions about products
4. Receive AI-powered responses about product details, prices, and availability

### Example Questions Customers Can Ask:
- "Tôi muốn tìm áo thun nam"
- "Có giày nữ không?"
- "Giá sản phẩm này bao nhiêu?"
- "Size có sẵn không?"

## Backend Integration

The chatbot service (Python FastAPI) provides:
- **Product Search**: Uses sentence transformers for Vietnamese text
- **Question Answering**: AI-powered responses based on product data
- **Product Database**: JSON file with product information

### API Format:
```typescript
// Request
POST /chat
{
  "message": "customer question"
}

// Response
{
  "response": "bot answer"
}
```

## Troubleshooting

### Common Issues:

1. **Chatbot not responding**
   - Check if chatbot service is running on port 8000
   - Verify CHATBOT_SERVICE_URL environment variable
   - Check network connectivity

2. **UI not appearing**
   - Ensure you're not on admin pages (chatbot is hidden there)
   - Check browser console for errors

3. **Styling issues**
   - Verify Tailwind CSS classes are properly compiled
   - Check for CSS conflicts

### Development Tips:
- Use browser developer tools to debug API calls
- Check chatbot service logs for backend issues
- Test with different product-related queries

## Future Enhancements

Potential improvements:
- 🌐 Multi-language support
- 📊 Analytics and conversation tracking
- 🔄 Context-aware conversations
- 📷 Image-based product search
- 🎯 Personalized recommendations
- 📞 Escalation to human support
