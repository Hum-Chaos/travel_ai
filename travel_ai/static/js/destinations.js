document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initDestinationsPage();
});

function initDestinationsPage() {
    loadDestinations();
    
    document.getElementById('applyDestinationsFilter').addEventListener('click', function() {
        const continent = document.getElementById('continentFilter').value;
        const season = document.getElementById('seasonFilter').value;
        
        document.querySelectorAll('.destination-card').forEach(card => {
            const cardContinent = card.getAttribute('data-continent');
            const showCard = (!continent || cardContinent === continent);
            card.style.display = showCard ? 'block' : 'none';
        });
    });
}

// 模拟数据
const destinationsData = [
    {
        id: 1,
        name: '巴黎',
        description: '浪漫之都，艺术与时尚的中心',
        image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114',
        continent: 'europe',
        season: 'summer',
        priceRange: '3000-8000'
    },
    {
        id: 2,
        name: '东京',
        description: '现代与传统完美融合的都市',
        image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3',
        continent: 'asia',
        season: 'spring',
        priceRange: '3000-8000'
    },
    {
        id: 3,
        name: '纽约',
        description: '世界之都，充满活力的城市',
        image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee',
        continent: 'north-america',
        season: 'autumn',
        priceRange: '8000+'
    },
    {
        id: 4,
        name: '悉尼',
        description: '澳大利亚的标志性城市',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
        continent: 'oceania',
        season: 'summer',
        priceRange: '3000-8000'
    },
    {
        id: 5,
        name: '开普敦',
        description: '南非的美丽城市，桌山和好望角',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a60d0',
        continent: 'africa',
        season: 'spring',
        priceRange: '3000-8000'
    },
    {
        id: 6,
        name: '里约热内卢',
        description: '巴西的活力城市，基督像和科帕卡巴纳海滩',
        image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
        continent: 'south-america',
        season: 'winter',
        priceRange: '3000-8000'
    }
];

function loadDestinations() {
    const destinationsContainer = document.getElementById('destinationsGrid');
    if (!destinationsContainer) return;
    
    destinationsContainer.innerHTML = destinationsData.map(dest => `
        <div class="destination-card" data-id="${dest.id}" data-continent="${dest.continent}" data-season="${dest.season}" data-price="${dest.priceRange}">
            <div class="destination-img">
                
                <button class="mark-visited-btn" data-id="${dest.id}">
                    <i class="fas fa-check"></i> 标记为去过
                </button>
            </div>
            <div class="destination-info">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <div class="destination-meta">
                    <span><i class="fas fa-globe"></i> ${getContinentName(dest.continent)}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${getSeasonName(dest.season)}</span>
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
            const destinationId = destinationsData[index].id;
            window.location.href = `destination-detail.html?id=${destinationId}`;
        });
    });
}

function getContinentName(continentCode) {
    const continents = {
        'asia': '亚洲',
        'europe': '欧洲',
        'africa': '非洲',
        'north-america': '北美洲',
        'south-america': '南美洲',
        'oceania': '大洋洲'
    };
    return continents[continentCode] || continentCode;
}

function getSeasonName(seasonCode) {
    const seasons = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
    };
    return seasons[seasonCode] || seasonCode;
}

function markAsVisited(destinationId) {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) {
        alert('请先登录');
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const destination = destinationsData.find(d => d.id === parseInt(destinationId));
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