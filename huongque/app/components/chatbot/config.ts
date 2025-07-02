export const chatbotConfig = {
  // API endpoint for the chatbot service
  apiEndpoint: '/api/chatbot',
  
  // Chatbot service URL (used by the API route)
  chatbotServiceUrl: process.env.CHATBOT_SERVICE_URL || 'http://localhost:8000',
  
  // UI Configuration
  ui: {
    welcomeMessage: 'Xin chào! Tôi là trợ lý ảo của Hương Quê. Tôi có thể giúp bạn tìm hiểu về các sản phẩm của chúng tôi. Bạn cần hỗ trợ gì?',
    botName: 'Trợ lý Hương Quê',
    botSubtitle: 'Luôn sẵn sàng hỗ trợ',
    placeholder: 'Nhập câu hỏi của bạn...',
    errorMessage: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
    loadingMessage: 'Đang trả lời...',
    fallbackMessage: 'Xin lỗi, tôi đang gặp một chút vấn đề kỹ thuật. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi để được hỗ trợ tốt nhất.',
  },
  
  // Behavior Configuration
  behavior: {
    autoFocus: true,
    showTimestamp: true,
    maxMessageLength: 500,
    typingDelay: 1000, // ms
  }
};

export type ChatbotConfig = typeof chatbotConfig;
