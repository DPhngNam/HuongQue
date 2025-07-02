import { NextRequest, NextResponse } from 'next/server';
import { chatbotConfig } from '@/app/components/chatbot/config';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Call the chatbot service
    const chatbotResponse = await fetch(`${chatbotConfig.chatbotServiceUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!chatbotResponse.ok) {
      throw new Error(`Chatbot service error: ${chatbotResponse.status}`);
    }

    const data = await chatbotResponse.json();
    
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Chatbot API error:', error);
    
    // Return a fallback response
    return NextResponse.json({
      response: chatbotConfig.ui.fallbackMessage,
    });
  }
}
