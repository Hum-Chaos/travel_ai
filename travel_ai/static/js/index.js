document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initIndexPage();
});

// 初始化主页
function initIndexPage() {
    loadRecommendedDestinations();
    loadAllDestinations();
    initFilters();
    bindEvents();
}

// 模拟数据
const destinations = [
    {
        id: 1,
        name: '巴黎',
        description: '浪漫之都，埃菲尔铁塔、卢浮宫等世界著名景点',
        image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114',
        tags: ['城市观光', '文化体验', '美食之旅'],
        continent: 'europe',
        priceRange: '3000-8000'
    },
    {
        id: 2,
        name: '东京',
        description: '现代与传统完美融合的都市，体验独特的日本文化',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
        tags: ['城市观光', '购物之旅', '美食之旅'],
        continent: 'asia',
        priceRange: '3000-8000'
    },
    {
        id: 3,
        name: '马尔代夫',
        description: '天堂般的海岛度假胜地，拥有清澈的海水和白色沙滩',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5',
        tags: ['海岛度假', '蜜月旅行', '水上活动'],
        continent: 'asia',
        priceRange: '8000+'
    },
    {
        id: 4,
        name: '纽约',
        description: '世界之都，自由女神像、时代广场等标志性景点',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        tags: ['城市观光', '购物之旅', '文化体验'],
        continent: 'north-america',
        priceRange: '8000+'
    },
    {
        id: 5,
        name: '罗马',
        description: '永恒之城，古罗马斗兽场、许愿池等历史遗迹',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        tags: ['文化体验', '历史遗迹', '美食之旅'],
        continent: 'europe',
        priceRange: '3000-8000'
    },
    {
        id: 6,
        name: '巴厘岛',
        description: '印度尼西亚的度假天堂，拥有美丽的海滩和独特的文化',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        tags: ['海岛度假', '蜜月旅行', '文化体验'],
        continent: 'asia',
        priceRange: '3000-8000'
    }
];

// 加载推荐目的地
function loadRecommendedDestinations() {
    const recommendedContainer = document.getElementById('recommendedDestinations');
    if (!recommendedContainer) return;
    
    // 模拟推荐逻辑 - 实际项目中应根据用户偏好推荐
    const recommended = [destinations[0], destinations[2], destinations[5]];
    
    recommendedContainer.innerHTML = recommended.map(dest => `
        <div class="destination-card" data-id="${dest.id}" data-continent="${dest.continent}" data-price="${dest.priceRange}">
            <div class="destination-img">
                
                <button class="mark-visited-btn" data-id="${dest.id}">
                    <i class="fas fa-check"></i> 标记为去过
                </button>
            </div>
            <div class="destination-info">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <div class="destination-meta">
                    <span>${dest.priceRange === '0-3000' ? '¥3,000以下' : 
                          dest.priceRange === '3000-8000' ? '¥3,000-8,000' : '¥8,000以上'}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // 添加标记为去过的事件
    document.querySelectorAll('.mark-visited-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            markAsVisited(this.dataset.id);
        });
    });
    
    // 添加卡片点击事件
    document.querySelectorAll('.destination-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const destinationId = recommended[index].id;
            window.location.href = `destination-detail.html?id=${destinationId}`;
        });
    });
}

// 加载所有目的地
function loadAllDestinations() {
    const allDestinationsContainer = document.getElementById('allDestinations');
    if (!allDestinationsContainer) return;
    
    allDestinationsContainer.innerHTML = destinations.map(dest => `
        <div class="destination-card" data-id="${dest.id}" data-continent="${dest.continent}" data-price="${dest.priceRange}">
            <div class="destination-img">
                
                <button class="mark-visited-btn" data-id="${dest.id}">
                    <i class="fas fa-check"></i> 标记为去过
                </button>
            </div>
            <div class="destination-info">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <div class="destination-meta">
                    <span>${dest.priceRange === '0-3000' ? '¥3,000以下' : 
                          dest.priceRange === '3000-8000' ? '¥3,000-8,000' : '¥8,000以上'}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // 添加标记为去过的事件
    document.querySelectorAll('.mark-visited-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            markAsVisited(this.dataset.id);
        });
    });
    
    // 添加卡片点击事件
    document.querySelectorAll('.destination-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const destinationId = destinations[index].id;
            window.location.href = `destination-detail.html?id=${destinationId}`;
        });
    });
}

// 初始化筛选功能
function initFilters() {
    const priceRangeSelect = document.getElementById('priceRange');
    if (priceRangeSelect) {
        priceRangeSelect.addEventListener('change', function() {
            const customPriceGroup = document.getElementById('customPriceGroup');
            customPriceGroup.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            const priceRange = document.getElementById('priceRange').value;
            let customPrice = '';
            
            if (priceRange === 'custom') {
                customPrice = document.getElementById('customPrice').value;
            }
            
            document.querySelectorAll('.destination-card').forEach(card => {
                const cardPrice = card.getAttribute('data-price');
                let showCard = true;
                
                if (priceRange && priceRange !== 'custom') {
                    showCard = cardPrice === priceRange;
                } else if (priceRange === 'custom' && customPrice) {
                    const [min, max] = customPrice.split('-').map(Number);
                    if (!isNaN(min) && !isNaN(max)) {
                        showCard = cardPrice === 'custom';
                    }
                }
                
                card.style.display = showCard ? 'block' : 'none';
            });
        });
    }
}

// 绑定所有事件
function bindEvents() {
    // 搜索按钮
    document.getElementById('searchBtn')?.addEventListener('click', searchDestinations);
    
    // AI助手按钮
    document.getElementById('aiAssistantBtn')?.addEventListener('click', function() {
        window.location.href = 'ai-assistant.html';
    });
    
    // 筛选按钮 - 确保正确绑定
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        // 解决事件绑定问题
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFilterOptions();
        });
    }
    
    // 点击页面其他区域关闭筛选选项
    document.addEventListener('click', function(e) {
        const filterOptions = document.getElementById('filterOptions');
        const filterBtn = document.getElementById('filterBtn');
        
        if (filterOptions && filterOptions.style.display === 'block' && 
            !filterOptions.contains(e.target) && 
            !filterBtn.contains(e.target)) {
            filterOptions.style.display = 'none';
        }
    });
}

// 切换筛选选项显示/隐藏
function toggleFilterOptions() {
    const options = document.getElementById('filterOptions');
    if (options) {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    }
}

// 搜索目的地
function searchDestinations() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) return;
    
    const results = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.description.toLowerCase().includes(query) ||
        dest.tags.some(tag => tag.includes(query))
    );
    
    displaySearchResults(results);
}

// 显示搜索结果
function displaySearchResults(results) {
    const container = document.getElementById('allDestinations');
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">没有找到匹配的目的地</p>';
        return;
    }
    
    container.innerHTML = results.map(dest => `
        <div class="destination-card" data-id="${dest.id}">
            <div class="destination-img">
                
                <button class="mark-visited-btn" data-id="${dest.id}">
                    <i class="fas fa-check"></i> 标记为去过
                </button>
            </div>
            <div class="destination-info">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <div class="destination-meta">
                    <span>${dest.priceRange === '0-3000' ? '¥3,000以下' : 
                          dest.priceRange === '3000-8000' ? '¥3,000-8,000' : '¥8,000以上'}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // 添加标记为去过的事件
    document.querySelectorAll('.mark-visited-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            markAsVisited(this.dataset.id);
        });
    });
    
    // 添加卡片点击事件
    document.querySelectorAll('.destination-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const destinationId = results[index].id;
            window.location.href = `destination-detail.html?id=${destinationId}`;
        });
    });
}

// 标记为去过
function markAsVisited(destinationId) {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) {
        alert('请先登录');
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const destination = destinations.find(d => d.id === parseInt(destinationId));
    if (!destination) return;
    
    if (!userData.visitedDestinations) {
        userData.visitedDestinations = [];
    }
    
    if (!userData.visitedDestinations.some(d => d.id === destination.id)) {
        userData.visitedDestinations.push({
            id: destination.id,
            name: destination.name,
            image: destination.image,
            visitedDate: new Date().toISOString()
        });
        localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
        alert(`已标记 ${destination.name} 为去过`);
    } else {
        alert(`您已经标记过去过 ${destination.name}`);
    }
}

// 检查登录状态
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

// 加载用户数据
function loadUserData() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    
    const userIcon = document.getElementById('userIcon');
    if (userIcon && userData.profile?.avatar) {
        userIcon.innerHTML = ``;
    }
}

// 切换用户下拉菜单
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    } else {
        createUserDropdown();
    }
}

// 创建用户下拉菜单
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

// 退出登录
function logout() {
    localStorage.removeItem('travelLoggedInUser');
    window.location.href = 'index.html';
}