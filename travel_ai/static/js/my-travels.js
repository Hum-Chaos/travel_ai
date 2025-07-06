document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadCurrentTravelPlan();
});

function loadCurrentTravelPlan() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const currentPlan = userData.currentTravelPlan;
    
    const container = document.getElementById('currentTravelPlan');
    if (!container) return;
    
    if (!currentPlan) {
        container.innerHTML = `
            <div class="no-plan">
                <h2>您还没有出行计划</h2>
                <p>前往首页创建您的出行计划</p>
                <a href="index.html" class="btn">去首页</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="current-plan">
            <h2>我的出行计划</h2>
            <div class="plan-details">
                <div class="detail-item">
                    <span class="detail-label">目的地:</span>
                    <span class="detail-value">${currentPlan.destination}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">出行日期:</span>
                    <span class="detail-value">${currentPlan.dates}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">预算:</span>
                    <span class="detail-value">${currentPlan.budget}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">人数:</span>
                    <span class="detail-value">${currentPlan.people}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">兴趣:</span>
                    <span class="detail-value">${currentPlan.interests}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">出行方式:</span>
                    <span class="detail-value">${currentPlan.transport}</span>
                </div>
            </div>
        </div>
    `;
    
    // 加载天气信息（模拟数据，实际应调用高德API）
    loadWeatherInfo(currentPlan.destination, currentPlan.dates);
    
    // 加载安全信息
    loadSafetyInfo(currentPlan.destination);
    
    // 加载文化提示
    loadCultureTips(currentPlan.destination);
}

function loadWeatherInfo(destination, dates) {
    const container = document.getElementById('weatherInfo');
    if (!container) return;
    
    // 模拟天气数据
    const weatherData = [
        { day: '第一天', date: '2023-12-01', icon: 'sun', temp: '15°C/8°C', condition: '晴', advice: '适合户外活动，注意防晒' },
        { day: '第二天', date: '2023-12-02', icon: 'cloud-rain', temp: '12°C/6°C', condition: '小雨', advice: '建议携带雨伞' },
        { day: '第三天', date: '2023-12-03', icon: 'cloud', temp: '14°C/7°C', condition: '多云', advice: '适合观光' }
    ];
    
    container.innerHTML = `
        <h2><i class="fas fa-cloud-sun"></i> 出行天气</h2>
        <p>${destination} ${dates.split(' ')[0]} 天气情况</p>
        ${weatherData.map(day => `
            <div class="weather-day">
                <div class="weather-icon">
                    <i class="fas fa-${day.icon}"></i>
                </div>
                <div class="weather-details">
                    <h3>${day.day} (${day.date})</h3>
                    <p>${day.condition} | ${day.temp}</p>
                    <p class="weather-advice">${day.advice}</p>
                </div>
            </div>
        `).join('')}
    `;
}

function loadSafetyInfo(destination) {
    const container = document.getElementById('safetyInfo');
    if (!container) return;
    
    // 模拟安全信息
    container.innerHTML = `
        <h2><i class="fas fa-shield-alt"></i> 安全信息</h2>
        <ul>
            <li><strong>紧急电话:</strong> 报警 112</li>
            <li><strong>附近派出所:</strong> 巴黎第一区警察局, 电话: +33 1 40 20 50 50</li>
            <li><strong>医院:</strong> 巴黎公立医院集团, 电话: +33 1 40 25 80 80</li>
            <li><strong>中国大使馆:</strong> 地址: 20 Rue Monsieur, 75007 Paris, 电话: +33 1 53 75 88 05</li>
            <li><strong>安全提示:</strong> 注意保管个人财物，避免夜间单独出行</li>
        </ul>
    `;
}

function loadCultureTips(destination) {
    const container = document.getElementById('cultureTips');
    if (!container) return;
    
    // 模拟文化提示
    container.innerHTML = `
        <h2><i class="fas fa-landmark"></i> 文化提示</h2>
        <p>巴黎文化习俗:</p>
        <ul>
            <li>在餐厅用餐时，通常需要支付小费，约为账单的10-15%</li>
            <li>进入教堂等宗教场所时，请穿着得体</li>
            <li>法国人习惯用"Bonjour"问候，离开时说"Au revoir"</li>
            <li>在商店购物时，排队是必须遵守的礼仪</li>
            <li>巴黎地铁票需要保留到出站，可能会被检查</li>
        </ul>
    `;
}