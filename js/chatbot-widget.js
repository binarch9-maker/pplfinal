// Floating Chatbot Widget
(function() {
  // Cegah loading script lebih dari sekali
  if (window.chatbotWidgetLoaded) {
    return;
  }
  window.chatbotWidgetLoaded = true;

  function initChatbot() {
    // Jika widget sudah ada, jangan buat baru
    if (document.getElementById('chatbot-widget')) {
      return;
    }

    // Create floating chatbot widget HTML
    const chatbotHTML = `
    <div id="chatbot-widget" class="chatbot-widget">
      <div class="chatbot-header" id="chatbotToggle">
        <span class="chatbot-title">💬 Hubungi Kami</span>
        <span class="chatbot-close" id="chatbotClose">✕</span>
      </div>
      <div class="chatbot-body" id="chatbotBody" style="display: none;">
        <div class="chat-messages" id="chatMessages">
          <div class="message bot">
            <strong>HealthBot</strong>
            <p>Selamat datang! 👋 Ada yang bisa kami bantu?</p>
          </div>
        </div>
        <div class="chat-input-container">
          <input type="text" id="chatInput" placeholder="Ketik pertanyaan..." class="chat-input">
          <button id="sendBtn" class="chat-send-btn">📤</button>
        </div>
      </div>
      <div class="chatbot-collapsed" id="chatbotCollapsed">
        <div class="pulse-dot"></div>
        💬 Hubungi Kami
      </div>
    </div>
    `;

    // Create and insert the widget
    const widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = chatbotHTML;
    document.body.appendChild(widgetContainer.firstElementChild);

    // Add CSS styles
    const style = document.createElement('style');
  style.textContent = `
    .chatbot-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 9999;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      background: white;
      overflow: hidden;
    }

    .chatbot-collapsed {
      background: linear-gradient(135deg, #1a8bd3 0%, #2c4964 100%);
      color: white;
      padding: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      transition: all 0.3s ease;
      user-select: none;
    }

    .chatbot-collapsed:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 24px rgba(26, 139, 211, 0.3);
    }

    .pulse-dot {
      width: 10px;
      height: 10px;
      background: #4caf50;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.2);
      }
    }

    .chatbot-header {
      background: linear-gradient(135deg, #1a8bd3 0%, #2c4964 100%);
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .chatbot-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .chatbot-close {
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0 0.5rem;
      transition: transform 0.3s;
    }

    .chatbot-close:hover {
      transform: rotate(90deg);
    }

    .chatbot-body {
      display: flex;
      flex-direction: column;
      height: 400px;
      background: white;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      flex-direction: column;
      padding: 0.75rem;
      border-radius: 8px;
      max-width: 85%;
      word-wrap: break-word;
    }

    .message.bot {
      background: #f0f7ff;
      border-left: 3px solid #1a8bd3;
      align-self: flex-start;
    }

    .message.user {
      background: #e8f5e9;
      border-left: 3px solid #4caf50;
      align-self: flex-end;
    }

    .message strong {
      font-size: 0.85rem;
      color: #2c4964;
      margin-bottom: 0.25rem;
    }

    .message.user strong {
      color: #2e7d32;
    }

    .message p {
      margin: 0;
      font-size: 0.9rem;
      color: #333;
      line-height: 1.4;
    }

    .chat-input-container {
      border-top: 1px solid #e0e0e0;
      padding: 1rem;
      display: flex;
      gap: 0.5rem;
      background: #fafafa;
    }

    .chat-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      font-family: inherit;
      transition: border-color 0.3s;
    }

    .chat-input:focus {
      outline: none;
      border-color: #1a8bd3;
      box-shadow: 0 0 0 2px rgba(26, 139, 211, 0.1);
    }

    .chat-send-btn {
      padding: 0.75rem 1rem;
      background: #1a8bd3;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;
    }

    .chat-send-btn:hover {
      background: #0f5fa0;
    }

    .chat-send-btn:active {
      transform: scale(0.95);
    }

    @media (max-width: 480px) {
      .chatbot-widget {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0;
        max-height: 100vh;
      }
    }
    `;
    document.head.appendChild(style);

    // Get elements
    const widget = document.getElementById('chatbot-widget');
    const collapsed = document.getElementById('chatbotCollapsed');
    const header = document.getElementById('chatbotToggle');
    const body = document.getElementById('chatbotBody');
    const closeBtn = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat
    collapsed.addEventListener('click', function() {
      collapsed.style.display = 'none';
      body.style.display = 'flex';
      chatInput.focus();
    });

    header.addEventListener('click', function() {
      body.style.display = body.style.display === 'none' ? 'flex' : 'none';
      if (body.style.display === 'flex') {
        chatInput.focus();
      }
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      body.style.display = 'none';
      collapsed.style.display = 'flex';
    });

    // Send message
    function sendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'message user';
      userMsg.innerHTML = `<p>${message}</p>`;
      chatMessages.appendChild(userMsg);
      chatInput.value = '';

      // Auto scroll
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate bot response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        
        const messageLower = message.toLowerCase();
        let response = '';

        // Check knowledge base first
        if (typeof chatbotKnowledgeBase !== 'undefined') {
          for (const [key, value] of Object.entries(chatbotKnowledgeBase)) {
            if (messageLower.includes(key)) {
              response = value.response;
              break;
            }
          }
        }

        // If no knowledge base match, use fallback responses
        if (!response) {
          const fallbackResponses = [
            'Terima kasih atas pertanyaannya! Untuk informasi lebih detail, silakan hubungi kami di (021) 1234-5678 atau email info@smarthealthcenter.id. 📞',
            'Pertanyaan yang bagus! Tim support kami siap membantu Anda. Gunakan quick questions atau hubungi kami. 🤝',
            'Informasi Anda dicatat. Untuk bantuan lebih lanjut, hubungi admin kami. ✅'
          ];
          response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        }
        
        botMsg.innerHTML = `<strong>HealthBot</strong><p>${response.replace(/\n/g, '<br>')}</p>`;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 500);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Tunggu DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
});
