// Expanded Floating Chatbot Widget for Chatbot Page
(function() {
  // Cegah loading script lebih dari sekali
  if (window.chatbotExpandedWidgetLoaded) {
    return;
  }
  window.chatbotExpandedWidgetLoaded = true;

  function initExpandedChatbot() {
    // Jika widget sudah ada, jangan buat baru
    if (document.getElementById('chatbot-expanded-widget')) {
      return;
    }

    // Create floating chatbot widget HTML
    const chatbotHTML = `
      <div id="chatbot-expanded-widget" class="chatbot-expanded-widget">
        <div class="chatbot-expanded-header" id="chatbotExpandedToggle">
          <span class="chatbot-expanded-title">💬 Hubungi Kami - Smart Health</span>
          <span class="chatbot-expanded-close" id="chatbotExpandedClose">✕</span>
        </div>
        <div class="chatbot-expanded-body" id="chatbotExpandedBody">
          <div class="chat-expanded-messages" id="chatExpandedMessages">
            <div class="message bot">
              <strong>HealthBot</strong>
              <p>Selamat datang! 👋 Ada yang bisa saya bantu?</p>
            </div>
          </div>
          <div class="quick-questions-widget">
            <button class="quick-btn" onclick="quickQuestionWidget('Jam operasional puskesmas')">⏰ Jam Operasional</button>
            <button class="quick-btn" onclick="quickQuestionWidget('Jadwal dokter hari ini')">👨‍⚕️ Jadwal Dokter</button>
            <button class="quick-btn" onclick="quickQuestionWidget('Cara daftar antrean')">📋 Antrean</button>
            <button class="quick-btn" onclick="quickQuestionWidget('Layanan yang tersedia')">🏥 Layanan</button>
            <button class="quick-btn" onclick="quickQuestionWidget('Cara membuat surat sehat')">📄 Surat Sehat</button>
            <button class="quick-btn" onclick="quickQuestionWidget('Lokasi dan kontak')">📍 Kontak</button>
          </div>
          <div class="chat-expanded-input-container">
            <input type="text" id="chatExpandedInput" placeholder="Ketik pertanyaan..." class="chat-expanded-input">
            <button id="sendExpandedBtn" class="chat-expanded-send-btn">📤</button>
          </div>
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
      .chatbot-expanded-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 420px;
        max-height: 600px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        z-index: 9999;
        border-radius: 12px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
        background: white;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .chatbot-expanded-header {
        background: linear-gradient(135deg, #1a8bd3 0%, #2c4964 100%);
        color: white;
        padding: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        flex-shrink: 0;
      }

      .chatbot-expanded-title {
        font-weight: 700;
        font-size: 1.1rem;
        letter-spacing: 0.3px;
      }

      .chatbot-expanded-close {
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 0.5rem;
        transition: transform 0.3s;
        opacity: 0.8;
      }

      .chatbot-expanded-close:hover {
        transform: rotate(90deg);
        opacity: 1;
      }

      .chatbot-expanded-body {
        display: flex;
        flex-direction: column;
        height: 500px;
        background: white;
        overflow: hidden;
      }

      .chat-expanded-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }

      .message {
        display: flex;
        flex-direction: column;
        padding: 0.8rem;
        border-radius: 8px;
        max-width: 85%;
        word-wrap: break-word;
      }

      .message.bot {
        background: linear-gradient(135deg, #f0f7ff 0%, #e3f2fd 100%);
        border-left: 3px solid #1a8bd3;
        align-self: flex-start;
      }

      .message.user {
        background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
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
        font-size: 0.95rem;
        color: #333;
        line-height: 1.5;
      }

      .quick-questions-widget {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        padding: 0.8rem;
        background: #fafafa;
        border-top: 1px solid #e0e0e0;
      }

      .quick-btn {
        padding: 0.6rem 0.8rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s;
        color: #2c4964;
        font-weight: 500;
      }

      .quick-btn:hover {
        background: #e3f2fd;
        border-color: #1a8bd3;
        color: #1a8bd3;
        transform: translateY(-2px);
      }

      .chat-expanded-input-container {
        border-top: 1px solid #e0e0e0;
        padding: 0.8rem;
        display: flex;
        gap: 0.5rem;
        background: #fafafa;
        flex-shrink: 0;
      }

      .chat-expanded-input {
        flex: 1;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
        font-family: inherit;
        transition: all 0.3s;
      }

      .chat-expanded-input:focus {
        outline: none;
        border-color: #1a8bd3;
        box-shadow: 0 0 0 2px rgba(26, 139, 211, 0.1);
      }

      .chat-expanded-send-btn {
        padding: 0.8rem 1rem;
        background: linear-gradient(135deg, #1a8bd3 0%, #0f5fa0 100%);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .chat-expanded-send-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(26, 139, 211, 0.3);
      }

      .chat-expanded-send-btn:active {
        transform: scale(0.95);
      }

      @media (max-width: 480px) {
        .chatbot-expanded-widget {
          width: 100%;
          height: 100%;
          bottom: 0;
          right: 0;
          border-radius: 0;
          max-height: 100vh;
        }
      }

      /* Scrollbar styling */
      .chat-expanded-messages::-webkit-scrollbar {
        width: 6px;
      }

      .chat-expanded-messages::-webkit-scrollbar-track {
        background: transparent;
      }

      .chat-expanded-messages::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
      }

      .chat-expanded-messages::-webkit-scrollbar-thumb:hover {
        background: #999;
      }
    `;
    document.head.appendChild(style);

    // Get elements
    const widget = document.getElementById('chatbot-expanded-widget');
    const header = document.getElementById('chatbotExpandedToggle');
    const closeBtn = document.getElementById('chatbotExpandedClose');
    const chatInput = document.getElementById('chatExpandedInput');
    const sendBtn = document.getElementById('sendExpandedBtn');
    const chatMessages = document.getElementById('chatExpandedMessages');

    // Toggle chat
    header.addEventListener('click', function() {
      const body = document.getElementById('chatbotExpandedBody');
      body.style.display = body.style.display === 'none' ? 'flex' : 'none';
      if (body.style.display === 'flex') {
        chatInput.focus();
      }
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      widget.style.display = 'none';
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
            'Pertanyaan yang bagus! Tim support kami siap membantu Anda. Gunakan pertanyaan cepat atau hubungi kami. 🤝',
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
    document.addEventListener('DOMContentLoaded', initExpandedChatbot);
  } else {
    initExpandedChatbot();
  }
})();

// Global function untuk quick questions dari widget
function quickQuestionWidget(question) {
  const input = document.getElementById('chatExpandedInput');
  const sendBtn = document.getElementById('sendExpandedBtn');
  if (input) {
    input.value = question;
    sendBtn.click();
  }
}
