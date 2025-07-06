document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initCommonElements();
});

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    const userGreeting = document.getElementById('userGreeting');
    const userIcon = document.getElementById('userIcon');
    
    if (loggedInUser) {
        // 获取用户数据
        const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
        
        // 显示问候语（优先显示昵称）
        const displayName = userData.profile?.nickname || loggedInUser;
        if (userGreeting) {
            userGreeting.innerHTML = `你好@${displayName} <span class="logout-btn">退出</span>`;
            userGreeting.querySelector('.logout-btn').addEventListener('click', logout);
        }
        
        // 显示搜索栏
        const searchContainer = document.getElementById('searchContainer');
        if (searchContainer) {
            searchContainer.style.display = 'block';
        }
        
        // 加载用户头像
        loadUserData();
    } else {
        if (userGreeting) userGreeting.textContent = '';
        const searchContainer = document.getElementById('searchContainer');
        if (searchContainer) {
            searchContainer.style.display = 'none';
        }
    }
    
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            if (loggedInUser) {
                toggleUserDropdown();
            } else {
                window.location.href = 'login.html';
            }
        });
    }
}

// 其他函数保持不变...

function initCommonElements() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput').value;
            if (searchInput.trim()) {
                alert(`搜索: ${searchInput}`);
            }
        });
    }
    
    const aiAssistantBtn = document.getElementById('aiAssistantBtn');
    if (aiAssistantBtn) {
        aiAssistantBtn.addEventListener('click', function() {
            window.location.href = 'ai-assistant.html';
        });
    }
    
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const filterOptions = document.getElementById('filterOptions');
            filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
        });
    }
    const myTravelsBtn = document.getElementById('myTravelsBtn');
    if (myTravelsBtn) {
        myTravelsBtn.addEventListener('click', function() {
            const loggedInUser = localStorage.getItem('travelLoggedInUser');
            if (loggedInUser) {
                window.location.href = 'my-travels.html';
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    initTravelPlanTags();
}

function logout() {
    localStorage.removeItem('travelLoggedInUser');
    window.location.href = 'index.html';
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    } else {
        createUserDropdown();
    }
}

function createUserDropdown() {
    const userIcon = document.getElementById('userIcon');
    const dropdown = document.createElement('div');
    dropdown.id = 'userDropdown';
    dropdown.className = 'user-dropdown';
    dropdown.innerHTML = `
        <a href="profile.html"><i class="fas fa-user"></i> 个人资料</a>
        <a href="edit-profile.html"><i class="fas fa-edit"></i> 编辑资料</a>
        <a href="#" id="logoutLink"><i class="fas fa-sign-out-alt"></i> 退出登录</a>
    `;
    userIcon.parentNode.appendChild(dropdown);
    
    document.getElementById('logoutLink').addEventListener('click', logout);
    
    document.addEventListener('click', function(e) {
        if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function loadUserData() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    
    const userIcon = document.getElementById('userIcon');
    if (userIcon && userData.profile?.avatar) {
        userIcon.innerHTML = ``;
    }
}

function showMessage(elementId, text, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
        element.className = `message ${type}-message`;
        element.style.display = 'block';
    }
}
function initTravelPlanTags() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const travelPlan = userData.travelPlan || {};
    
    const container = document.getElementById('travelPlanTags');
    if (!container) return;
    
    container.innerHTML = '';
    
    const tags = [
        { key: 'interests', label: '兴趣', icon: 'heart' },
        { key: 'budget', label: '预算', icon: 'wallet' },
        { key: 'transport', label: '出行方式', icon: 'car' },
        { key: 'people', label: '人数', icon: 'users' },
        { key: 'departure', label: '出发时间', icon: 'calendar' },
        { key: 'duration', label: '旅行时长', icon: 'clock' }
    ];
    
    tags.forEach(tag => {
        if (travelPlan[tag.key]) {
            const tagElement = document.createElement('div');
            tagElement.className = 'travel-plan-tag';
            tagElement.innerHTML = `
                <i class="fas fa-${tag.icon}"></i>
                ${tag.label}: ${travelPlan[tag.key]}
                <i class="fas fa-times remove-tag" data-key="${tag.key}"></i>
            `;
            container.appendChild(tagElement);
        }
    });
    
    // 添加删除标签事件
    document.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeTravelPlanTag(this.dataset.key);
        });
    });
}

// 新增函数：删除旅行计划标签
function removeTravelPlanTag(key) {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    userData.travelPlan = userData.travelPlan || {};
    
    delete userData.travelPlan[key];
    localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
    
    initTravelPlanTags();
    loadRecommendations();
}

// 新增函数：加载推荐方案
function loadRecommendations() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const travelPlan = userData.travelPlan || {};
    
    const container = document.getElementById('recommendationsContainer');
    if (!container) return;
    
    if (Object.keys(travelPlan).length === 0) {
        container.innerHTML = '<p>请添加旅行偏好以获取个性化推荐</p>';
        return;
    }
    
    // 这里应该是调用后端API获取推荐方案
    // 以下是模拟数据
    container.innerHTML = `
        <h3>根据您的偏好推荐以下方案</h3>
        <div class="recommendation-item">
            <h4>${travelPlan.interests || '文化'}之旅 - ${travelPlan.duration || '7天'}</h4>
            <p>预算: ${travelPlan.budget || '中等'} | 人数: ${travelPlan.people || '2人'}</p>
            <p>出发时间: ${travelPlan.departure || '2023-12-01'}</p>
            <button class="btn save-plan-btn">保存为我的出行计划</button>
        </div>
    `;
    
    // 添加保存计划事件
    document.querySelector('.save-plan-btn')?.addEventListener('click', function() {
        saveTravelPlan();
    });
}

// 新增函数：保存旅行计划
function saveTravelPlan() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const travelPlan = userData.travelPlan || {};
    
    // 这里应该是从推荐方案中获取详细信息
    // 以下是模拟数据
    userData.currentTravelPlan = {
        destination: '巴黎',
        dates: '2023-12-01 至 2023-12-07',
        budget: travelPlan.budget || '中等',
        people: travelPlan.people || '2人',
        interests: travelPlan.interests || '文化',
        transport: travelPlan.transport || '飞机'
    };
    
    localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
    
    alert('出行计划已保存！');
    window.location.href = 'my-travels.html';
}