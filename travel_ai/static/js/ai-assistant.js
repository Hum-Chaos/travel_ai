document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initChat();
});

function initChat() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        addUserMessage(message);
        userInput.value = '';
        
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const aiResponse = getAIResponse(message);
            addAIMessage(aiResponse);
            scrollToBottom();
        }, 1000 + Math.random() * 2000);
    }
    
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function addAIMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai-message';
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'message ai-message typing';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingElement);
        scrollToBottom();
    }
    
    function removeTypingIndicator() {
        const typingElement = document.querySelector('.typing');
        if (typingElement) {
            typingElement.remove();
        }
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getAIResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('巴黎') || message.includes('paris')) {
            return `巴黎是浪漫之都，必去的景点包括：
            <ul>
                <li><strong>埃菲尔铁塔</strong> - 巴黎的标志性建筑</li>
                <li><strong>卢浮宫</strong> - 世界著名博物馆，收藏有《蒙娜丽莎》等艺术珍品</li>
                <li><strong>巴黎圣母院</strong> - 哥特式建筑的代表作</li>
                <li><strong>香榭丽舍大街</strong> - 著名的购物街</li>
                <li><strong>蒙马特高地</strong> - 艺术家的聚集地，可以俯瞰巴黎全景</li>
            </ul>
            建议安排3-5天游览巴黎，体验这座城市的浪漫与文化。`;
        } 
        else if (message.includes('家庭') || message.includes('亲子') || message.includes('带孩子')) {
            return `适合家庭旅游的目的地推荐：
            <ul>
                <li><strong>日本东京迪士尼</strong> - 亚洲最受欢迎的主题公园之一</li>
                <li><strong>新加坡圣淘沙</strong> - 有环球影城、海洋馆等适合儿童的景点</li>
                <li><strong>澳大利亚黄金海岸</strong> - 阳光沙滩和主题公园</li>
                <li><strong>国内三亚</strong> - 气候宜人，适合亲子海滩度假</li>
                <li><strong>美国奥兰多</strong> - 迪士尼世界和环球影城的所在地</li>
            </ul>
            家庭旅游建议选择设施完善、安全的目的地，并预留充足的休息时间。`;
        }
        else if (message.includes('日本') || message.includes('japan')) {
            return `一周日本行程建议：
            <ul>
                <li><strong>第1-3天: 东京</strong> - 浅草寺、秋叶原、涩谷、新宿购物</li>
                <li><strong>第4天: 富士山/箱根</strong> - 温泉体验，欣赏富士山美景</li>
                <li><strong>第5-6天: 京都</strong> - 清水寺、伏见稻荷大社、岚山竹林</li>
                <li><strong>第7天: 大阪</strong> - 大阪城、道顿堀美食街</li>
            </ul>
            建议购买JR Pass铁路周游券，方便城市间交通。预算约8000-12000元/人(不含购物)。`;
        }
        else if (message.includes('预算') || message.includes('多少钱') || message.includes('花费')) {
            return `旅行预算因目的地和旅行方式而异，以下是一些参考：
            <ul>
                <li><strong>东南亚国家</strong> (泰国、越南等): 3000-6000元/人/周</li>
                <li><strong>日本/韩国</strong>: 8000-15000元/人/周</li>
                <li><strong>欧洲国家</strong>: 15000-30000元/人/周</li>
                <li><strong>澳大利亚/新西兰</strong>: 12000-25000元/人/周</li>
                <li><strong>美国/加拿大</strong>: 15000-30000元/人/周</li>
            </ul>
            预算包括机票、住宿、餐饮和景点门票，不含购物。淡季出行可节省30%-50%。`;
        }
        else if (message.includes('签证') || message.includes('visa')) {
            return `关于签证信息：
            <ul>
                <li><strong>申根签证</strong>: 适用于欧洲26个国家，需向主要停留国申请</li>
                <li><strong>美国签证</strong>: 需要面签，有效期通常为10年</li>
                <li><strong>日本签证</strong>: 单次/多次往返，需通过指定旅行社办理</li>
                <li><strong>东南亚国家</strong>: 通常可以落地签或电子签</li>
            </ul>
            建议提前1-3个月办理签证，具体材料请咨询相关使领馆。`;
        }
        else if (message.includes('天气') || message.includes('气候')) {
            return `旅行目的地气候建议：
            <ul>
                <li><strong>热带地区</strong>: 全年温暖，雨季(5-10月)多雨，旱季(11-4月)适合旅行</li>
                <li><strong>温带地区</strong>: 四季分明，春秋最适合旅行</li>
                <li><strong>寒带地区</strong>: 冬季寒冷，夏季短暂，极光季节为9月-3月</li>
                <li><strong>高原地区</strong>: 昼夜温差大，需准备保暖衣物</li>
            </ul>
            建议根据目的地气候准备合适的衣物。`;
        }
        else {
            return `感谢您的提问！作为AI旅行助手，我可以为您提供以下方面的建议：
            <ul>
                <li>目的地推荐和景点介绍</li>
                <li>行程规划和路线建议</li>
                <li>预算估算和节省开支的技巧</li>
                <li>当地美食和文化体验</li>
                <li>签证和旅行证件信息</li>
            </ul>
            您可以更具体地描述您的需求，例如："我想去欧洲，预算2万，有什么推荐？"`;
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}