document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadDestinationDetails();
});

function loadDestinationDetails() {
    // 从URL获取目的地ID
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = urlParams.get('id');
    
    if (!destinationId) {
        window.location.href = 'destinations.html';
        return;
    }
    
    // 模拟API调用获取目的地详情
    fetchDestinationDetails(destinationId)
        .then(destination => {
            renderDestinationDetails(destination);
        })
        .catch(error => {
            console.error('加载目的地详情失败:', error);
            window.location.href = 'destinations.html';
        });
}

// 模拟API调用
function fetchDestinationDetails(destinationId) {
    // 这里应该是实际的API调用，以下是模拟数据
    const destinations = [
        {
            id: 1,
            name: '巴黎',
            image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114',
            description: '巴黎是法国的首都和最大城市，也是世界上最受欢迎的旅游目的地之一。这座城市以其浪漫的氛围、丰富的历史和文化遗产、精美的建筑和美食而闻名。埃菲尔铁塔、卢浮宫和巴黎圣母院等地标建筑吸引着来自世界各地的游客。',
            location: '法国',
            rating: 4.8,
            bestTime: '4月至6月和9月至10月是访问巴黎的最佳时间，天气宜人，游客相对较少。',
            highlights: [
                {
                    name: '埃菲尔铁塔',
                    image: 'https://images.unsplash.com/photo-1502602897457-07dd9e42a5b2',
                    description: '巴黎的标志性建筑，高324米，提供城市全景。'
                },
                {
                    name: '卢浮宫',
                    image: 'https://images.unsplash.com/photo-1555626900-dfea0a10d1b3',
                    description: '世界最大的艺术博物馆之一，收藏有《蒙娜丽莎》等名作。'
                },
                {
                    name: '巴黎圣母院',
                    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b',
                    description: '哥特式建筑的代表作，位于塞纳河畔的西岱岛上。'
                }
            ],
            tips: [
                '购买巴黎博物馆通票可以节省排队时间和门票费用',
                '学习几句基础法语会让你的旅行体验更好',
                '使用地铁是最便捷的交通方式',
                '尝试当地咖啡馆的法式早餐'
            ],
            packages: [
                {
                    id: 101,
                    name: '巴黎经典3日游',
                    description: '包含埃菲尔铁塔、卢浮宫和塞纳河游船',
                    price: '¥5,999起'
                },
                {
                    id: 102,
                    name: '巴黎浪漫5日游',
                    description: '特别适合情侣，包含蒙马特高地和烛光晚餐',
                    price: '¥8,999起'
                }
            ]
        },
        // 其他目的地数据...
    ];
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const destination = destinations.find(d => d.id === parseInt(destinationId));
            if (destination) {
                resolve(destination);
            } else {
                reject(new Error('目的地未找到'));
            }
        }, 500);
    });
}

function renderDestinationDetails(destination) {
    // 设置页面标题
    document.title = `${destination.name} - 旅游网`;
    
    // 渲染主图
    const hero = document.getElementById('destinationHero');
    hero.style.backgroundImage = `url(${destination.image})`;
    
    // 渲染基本信息
    document.getElementById('destinationName').textContent = destination.name;
    document.getElementById('destinationLocation').textContent = destination.location;
    document.getElementById('destinationRating').textContent = destination.rating;
    document.getElementById('destinationDescription').textContent = destination.description;
    document.getElementById('bestTimeToVisit').textContent = destination.bestTime;
    
    // 渲染景点
    const highlightsGrid = document.getElementById('highlightsGrid');
    highlightsGrid.innerHTML = destination.highlights.map(highlight => `
        <div class="highlight-card">
            <div class="highlight-img">
                
            </div>
            <div class="highlight-info">
                <h3>${highlight.name}</h3>
                <p>${highlight.description}</p>
            </div>
        </div>
    `).join('');
    
    // 渲染小贴士
    const travelTips = document.getElementById('travelTips');
    travelTips.innerHTML = destination.tips.map(tip => `
        <li>${tip}</li>
    `).join('');
    
    // 渲染相关套餐
    const relatedPackages = document.getElementById('relatedPackages');
    relatedPackages.innerHTML = destination.packages.map(pkg => `
        <div class="package-item">
            <h4>${pkg.name}</h4>
            <p>${pkg.description}</p>
            <p class="price">${pkg.price}</p>
        </div>
    `).join('');
    
    // 添加套餐点击事件
    document.querySelectorAll('.package-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            // 实际项目中这里会跳转到套餐详情页
            alert(`即将查看 ${destination.packages[index].name} 套餐详情`);
        });
    });
}