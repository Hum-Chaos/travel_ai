document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadPackages();
    bindEvents();
});

const packagesData = [
    {
        id: 1,
        name: '巴黎浪漫之旅',
        description: '5天4晚巴黎深度游，包含埃菲尔铁塔、卢浮宫等经典景点',
        image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '5天4晚',
        price: 8999,
        includes: ['机票', '4星级酒店', '每日早餐', '景点门票', '导游服务']
    },
    {
        id: 2,
        name: '东京都市探索',
        description: '4天3晚东京自由行，体验现代与传统融合的日本文化',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '4天3晚',
        price: 7599,
        includes: ['机票', '3星级酒店', '机场接送', '一日导游']
    },
    {
        id: 3,
        name: '马尔代夫海岛度假',
        description: '6天5晚马尔代夫豪华水上别墅，享受阳光沙滩',
        image: 'https://images.unsplash.com/photo-1589391248103-11ec8476f1b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '6天5晚',
        price: 15999,
        includes: ['机票', '水上别墅', '全餐', '水上活动']
    },
    {
        id: 4,
        name: '纽约城市之旅',
        description: '7天6晚纽约经典游，包含自由女神像、时代广场等景点',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '7天6晚',
        price: 12999,
        includes: ['机票', '4星级酒店', '每日早餐', '景点门票']
    },
    {
        id: 5,
        name: '开普敦自然探险',
        description: '8天7晚南非开普敦之旅，探索桌山和好望角',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a60d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '8天7晚',
        price: 10999,
        includes: ['机票', '酒店', '早餐', '导游服务', '部分景点门票']
    },
    {
        id: 6,
        name: '悉尼文化体验',
        description: '5天4晚悉尼深度游，参观歌剧院和海港大桥',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: '5天4晚',
        price: 9999,
        includes: ['机票', '4星级酒店', '每日早餐', '导游服务']
    }
];

function loadPackages(filter = {}) {
    const container = document.getElementById('packagesGrid');
    container.innerHTML = '';
    
    let filteredPackages = [...packagesData];
    
    // 应用筛选
    if (filter.duration) {
        const [min, max] = filter.duration.split('-');
        filteredPackages = filteredPackages.filter(pkg => {
            const days = parseInt(pkg.duration);
            if (filter.duration === '8+') {
                return days >= 8;
            }
            return days >= parseInt(min) && days <= parseInt(max);
        });
    }
    
    if (filter.price) {
        const [min, max] = filter.price.split('-');
        filteredPackages = filteredPackages.filter(pkg => {
            if (filter.price === '8000+') {
                return pkg.price >= 8000;
            }
            return pkg.price >= parseInt(min) && pkg.price <= parseInt(max);
        });
    }
    
    // 显示套餐
    filteredPackages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        
        const includesList = pkg.includes.map(item => `<li>${item}</li>`).join('');
        
        card.innerHTML = `
            <div class="package-img">
                <img src="${pkg.image}" alt="${pkg.name}">
            </div>
            <div class="package-info">
                <h3>${pkg.name}</h3>
                <p>${pkg.description}</p>
                <div class="package-meta">
                    <span>${pkg.duration}</span>
                    <span>${getPackageRating(pkg.price)}</span>
                </div>
                <div class="package-price">¥${pkg.price.toLocaleString()}</div>
                <ul class="package-includes">
                    ${includesList}
                </ul>
                <button class="book-btn">立即预订</button>
            </div>
        `;
        
        // 添加预订事件
        card.querySelector('.book-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            bookPackage(pkg.id);
        });
        
        // 点击卡片查看详情
        card.addEventListener('click', () => {
            // 实际项目中这里会跳转到详情页
            alert(`即将查看 ${pkg.name} 的详情`);
        });
        
        container.appendChild(card);
    });
}

function getPackageRating(price) {
    if (price < 5000) return '经济型';
    if (price < 10000) return '舒适型';
    return '豪华型';
}

function bookPackage(packageId) {
    const username = localStorage.getItem('travelLoggedInUser');
    if (!username) {
        alert('请先登录以预订套餐');
        window.location.href = 'login.html';
        return;
    }
    
    const pkg = packagesData.find(p => p.id === packageId);
    alert(`您已成功预订 ${pkg.name} 套餐，总价: ¥${pkg.price}`);
}

function bindEvents() {
    document.getElementById('applyPackagesFilter').addEventListener('click', function() {
        const duration = document.getElementById('durationFilter').value;
        const price = document.getElementById('priceFilter').value;
        
        loadPackages({
            duration,
            price
        });
    });
}