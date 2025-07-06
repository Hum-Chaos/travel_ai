// document.addEventListener('DOMContentLoaded', function() {
//     checkLoginStatus();
//     loadProfileData();
//     initTabs();
//     initPreferences();
//     bindEvents();
// });

// function loadProfileData() {
//     const username = localStorage.getItem('travelLoggedInUser');
//     if (!username) {
//         window.location.href = 'login.html';
//         return;
//     }

//     const userData = JSON.parse(localStorage.getItem(`travelUserData_${username}`)) || {};
    
//     // 更新头像
//     const avatarImage = document.getElementById('avatarImage');
//     if (userData.profile?.avatar) {
//         avatarImage.src = userData.profile.avatar;
//         avatarImage.style.display = 'block';
//         document.querySelector('.avatar-placeholder').style.display = 'none';
//     } else {
//         avatarImage.style.display = 'none';
//         document.querySelector('.avatar-placeholder').style.display = 'flex';
//     }
    
//     // 更新用户名和简介
//     document.getElementById('profileUsername').textContent = 
//         userData.profile?.nickname || username;
//     document.getElementById('profileBio').textContent = 
//         userData.profile?.bio || '暂无个人简介';
    
//     // 更新统计数据
//     updateStats(userData);
// }

// function updateStats(userData) {
//     const visitedCount = userData.visitedDestinations?.length || 0;
//     const wishlistCount = userData.wishlist?.length || 0;
    
//     document.getElementById('visitedCount').textContent = visitedCount;
//     document.getElementById('wishlistCount').textContent = wishlistCount;
    
//     // 如果没有去过的地方，显示提示
//     const visitedContainer = document.getElementById('visitedDestinations');
//     if (visitedCount === 0) {
//         visitedContainer.innerHTML = '<p class="no-data">您还没有添加去过的地方</p>';
//     } else {
//         loadVisitedDestinations(userData.visitedDestinations);
//     }
    
//     // 如果没有心愿单，显示提示
//     const wishlistContainer = document.getElementById('wishlistDestinations');
//     if (wishlistCount === 0) {
//         wishlistContainer.innerHTML = '<p class="no-data">您的心愿单是空的</p>';
//     } else {
//         loadWishlist(userData.wishlist);
//     }
// }

// function initTabs() {
//     const tabs = document.querySelectorAll('.profile-tab');
//     tabs.forEach(tab => {
//         tab.addEventListener('click', function() {
//             // 更新标签状态
//             tabs.forEach(t => t.classList.remove('active'));
//             this.classList.add('active');
            
//             // 显示对应内容
//             const tabId = this.dataset.tab;
//             document.querySelectorAll('.tab-content').forEach(content => {
//                 content.classList.remove('active');
//             });
//             document.getElementById(`${tabId}Tab`).classList.add('active');
//         });
//     });
// }

// function initPreferences() {
//     const username = localStorage.getItem('travelLoggedInUser');
//     if (!username) return;
    
//     const userData = JSON.parse(localStorage.getItem(`travelUserData_${username}`)) || {};
//     const preferences = userData.preferences || {};
    
//     // 初始化旅游类型选项
//     const travelTypes = ['海岛度假', '城市观光', '自然探险', '文化体验', '美食之旅', '购物之旅', '历史遗迹', '冒险旅行'];
//     initPreferenceOptions('travelTypes', travelTypes, preferences.travelTypes);
    
//     // 初始化季节选项
//     const seasons = ['春季', '夏季', '秋季', '冬季'];
//     initPreferenceOptions('favoriteSeasons', seasons, preferences.favoriteSeasons);
    
//     // 初始化预算选项
//     const budgets = [
//         { label: "经济型 (0-3000元)", value: "0-3000" },
//         { label: "中等预算 (3000-8000元)", value: "3000-8000" },
//         { label: "豪华型 (8000元以上)", value: "8000+" },
//         { label: "自定义", value: "custom" }
//     ];
//     initBudgetOptions(budgets, preferences.budget);
    
//     // 初始化饮食偏好
//     const foodPrefs = ['当地美食', '国际餐饮', '素食', '快餐', '高档餐厅', '街头小吃'];
//     initPreferenceOptions('foodPreferences', foodPrefs, preferences.foodPreferences);
    
//     // 初始化住宿偏好
//     const accomPrefs = ['酒店', '民宿', '青旅', '度假村', '公寓', '露营'];
//     initPreferenceOptions('accommodationPreferences', accomPrefs, preferences.accommodationPreferences);
    
//     // 初始化活动偏好
//     const activityPrefs = ['徒步', '观光', '购物', '夜生活', '水上活动', '滑雪', '摄影', '博物馆'];
//     initPreferenceOptions('activityPreferences', activityPrefs, preferences.activityPreferences);
    
//     // 自定义预算保存
//     document.getElementById('saveCustomBudget').addEventListener('click', saveCustomBudget);
// }

// function initPreferenceOptions(containerId, options, selectedValues = []) {
//     const container = document.getElementById(containerId);
//     container.innerHTML = '';
    
//     options.forEach(option => {
//         const element = document.createElement('div');
//         element.className = 'preference-option';
//         element.textContent = option;
//         element.dataset.value = option;
        
//         if (selectedValues?.includes(option)) {
//             element.classList.add('selected');
//         }
        
//         element.addEventListener('click', togglePreferenceOption);
//         container.appendChild(element);
//     });
// }

// function initBudgetOptions(budgets, selectedBudget) {
//     const container = document.getElementById('budgetOptions');
//     container.innerHTML = '';
    
//     budgets.forEach(budget => {
//         const option = document.createElement('div');
//         option.className = 'preference-option';
//         option.textContent = budget.label;
//         option.dataset.value = budget.value;
        
//         if (selectedBudget === budget.value || 
//             (budget.value === 'custom' && selectedBudget && !budgets.some(b => b.value === selectedBudget))) {
//             option.classList.add('selected');
//             if (budget.value === 'custom') {
//                 document.getElementById('customBudgetInput').style.display = 'flex';
//                 document.getElementById('customBudget').value = selectedBudget || '';
//             }
//         }
        
//         option.addEventListener('click', () => selectBudgetOption(option, budget.value));
//         container.appendChild(option);
//     });
// }

// function togglePreferenceOption() {
//     this.classList.toggle('selected');
// }

// function selectBudgetOption(element, value) {
//     document.querySelectorAll('#budgetOptions .preference-option').forEach(el => {
//         el.classList.remove('selected');
//     });
    
//     element.classList.add('selected');
//     document.getElementById('customBudgetInput').style.display = 
//         value === 'custom' ? 'flex' : 'none';
// }

// function saveCustomBudget() {
//     const customValue = document.getElementById('customBudget').value;
//     if (!customValue) {
//         showMessage('preferencesMessage', '请输入有效的价格区间', 'error');
//         return;
//     }
    
//     // 验证格式
//     if (!/^\d+-\d+$/.test(customValue)) {
//         showMessage('preferencesMessage', '请输入正确的格式，如：1000-5000', 'error');
//         return;
//     }
    
//     const [min, max] = customValue.split('-').map(Number);
//     if (min >= max) {
//         showMessage('preferencesMessage', '最小值必须小于最大值', 'error');
//         return;
//     }
    
//     showMessage('preferencesMessage', '自定义预算已保存', 'success');
// }

// function loadVisitedDestinations(destinations) {
//     const container = document.getElementById('visitedDestinations');
//     container.innerHTML = '';
    
//     if (!destinations || destinations.length === 0) {
//         container.innerHTML = '<p class="no-data">您还没有添加去过的地方</p>';
//         return;
//     }
    
//     destinations.forEach(destination => {
//         const item = document.createElement('div');
//         item.className = 'destination-item';
//         item.innerHTML = `
//             <div class="destination-img">
//                 <img src="${destination.image}" alt="${destination.name}">
//             </div>
//             <div class="destination-info">
//                 <h3>${destination.name}</h3>
//                 <p>${formatDate(destination.visitedDate)}</p>
//             </div>
//             <button class="remove-btn" data-id="${destination.id}">
//                 <i class="fas fa-times"></i>
//             </button>
//         `;
        
//         // 添加删除事件
//         item.querySelector('.remove-btn').addEventListener('click', (e) => {
//             e.stopPropagation();
//             removeVisitedDestination(destination.id);
//             item.remove();
//             updateStatsAfterChange();
//         });
        
//         container.appendChild(item);
//     });
// }

// function loadWishlist(wishlist) {
//     const container = document.getElementById('wishlistDestinations');
//     container.innerHTML = '';
    
//     if (!wishlist || wishlist.length === 0) {
//         container.innerHTML = '<p class="no-data">您的心愿单是空的</p>';
//         return;
//     }
    
//     // 这里可以添加加载心愿单的逻辑
//     // 类似于loadVisitedDestinations的实现
// }

// function removeVisitedDestination(destinationId) {
//     const username = localStorage.getItem('travelLoggedInUser');
//     if (!username) return;
    
//     const userData = JSON.parse(localStorage.getItem(`travelUserData_${username}`)) || {};
//     userData.visitedDestinations = userData.visitedDestinations?.filter(
//         d => d.id !== destinationId
//     ) || [];
    
//     localStorage.setItem(`travelUserData_${username}`, JSON.stringify(userData));
//     showMessage('preferencesMessage', '已移除去过的地方', 'success');
// }

// function updateStatsAfterChange() {
//     const username = localStorage.getItem('travelLoggedInUser');
//     if (!username) return;
    
//     const userData = JSON.parse(localStorage.getItem(`travelUserData_${username}`)) || {};
//     updateStats(userData);
// }

// function bindEvents() {
//     // 保存偏好设置
//     document.getElementById('savePreferencesBtn').addEventListener('click', savePreferences);
    
//     // 添加去过的地方
//     document.getElementById('addVisitedBtn').addEventListener('click', showDestinationSelector);
    
//     // 关闭模态框
//     document.getElementById('closeModalBtn').addEventListener('click', () => {
//         document.getElementById('destinationModal').style.display = 'none';
//     });
// }

// function savePreferences() {
//     const username = localStorage.getItem('travelLoggedInUser');
//     if (!username) return;
    
//     const userData = JSON.parse(localStorage.getItem(`travelUserData_${username}`)) || {};
    
//     // 获取选中的旅游类型
//     const selectedTravelTypes = Array.from(
//         document.querySelectorAll('#travelTypes .selected')
//     ).map(el => el.dataset.value);
    
//     // 获取选中的季节
//     const selectedSeasons = Array.from(
//         document.querySelectorAll('#favoriteSeasons .selected')
//     ).map(el => el.dataset.value);
    
//     // 获取选中的预算
//     let selectedBudget = '';
//     const selectedBudgetOption = document.querySelector('#budgetOptions .selected');
//     if (selectedBudgetOption) {
//         if (selectedBudgetOption.dataset.value === 'custom') {
//             selectedBudget = document.getElementById('customBudget').value;
//         } else {
//             selectedBudget = selectedBudgetOption.dataset.value;
//         }
//     }
    
//     // 获取选中的饮食偏好
//     const selectedFoodPrefs = Array.from(
//         document.querySelectorAll('#foodPreferences .selected')
//     ).map(el => el.dataset.value);
    
//     // 获取选中的住宿偏好
//     const selectedAccomPrefs = Array.from(
//         document.querySelectorAll('#accommodationPreferences .selected')
//     ).map(el => el.dataset.value);
    
//     // 获取选中的活动偏好
//     const selectedActivityPrefs = Array.from(
//         document.querySelectorAll('#activityPreferences .selected')
//     ).map(el => el.dataset.value);
    
//     // 更新用户数据
//     userData.preferences = {
//         travelTypes: selectedTravelTypes,
//         favoriteSeasons: selectedSeasons,
//         budget: selectedBudget,
//         foodPreferences: selectedFoodPrefs,
//         accommodationPreferences: selectedAccomPrefs,
//         activityPreferences: selectedActivityPrefs
//     };
    
//     localStorage.setItem(`travelUserData_${username}`, JSON.stringify(userData));
//     showMessage('preferencesMessage', '偏好设置已保存', 'success');
// }

// function showDestinationSelector() {
//     const modal = document.getElementById('destinationModal');
//     const container = document.getElementById('destinationSelector');
    
//     // 清空容器
//     container.innerHTML = '';
    
//     // 加载所有目的地
//     const sampleDestinations = [
//         { id: 1, name: '巴黎', image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
//         { id: 2, name: '东京', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
//         { id: 3, name: '马尔代夫', image: 'https://images.unsplash.com/photo-1589391248103-11ec8476f1b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
//         { id: 4, name: '纽约', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
//         { id: 5, name: '开普敦', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a60d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
//         { id: 6, name: '悉尼', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
//     ];
    
//     sampleDestinations.forEach(destination => {
//         const item = document.createElement('div');
//         item.className = 'destination-selector-item';
//         item.innerHTML = `
//             <div class="destination-selector-img">
//                 <img src="${destination.image}" alt="${destination.name}">
//             </div>
//             <div class="destination-selector-name">${destination.name}</div>
//         `;
        
//         item.addEventListener('click', () => {
//             addVisitedDestination(destination);
//             modal.style.display = 'none';
//         });
        
//         container.appendChild(item);
//     });
    
//     modal.style.display = 'flex';
// }

// function addVisitedDestination(destination) {
//     const username = localStorage.getItem('travelLoggedInUser');
//     if (!username) return;
    
//     const userData = JSON.parse(localStorage.getItem(`travelUserData_${username}`)) || {};
//     userData.visitedDestinations = userData.visitedDestinations || [];
    
//     // 检查是否已经添加过
//     if (userData.visitedDestinations.some(d => d.id === destination.id)) {
//         showMessage('preferencesMessage', '这个地方已经添加过了', 'error');
//         return;
//     }
    
//     // 添加到去过列表
//     userData.visitedDestinations.push({
//         id: destination.id,
//         name: destination.name,
//         image: destination.image,
//         visitedDate: new Date().toISOString()
//     });
    
//     localStorage.setItem(`travelUserData_${username}`, JSON.stringify(userData));
//     loadVisitedDestinations(userData.visitedDestinations);
//     updateStats(userData);
//     showMessage('preferencesMessage', '已添加去过的地方', 'success');
// }

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initProfilePage();
});

function initProfilePage() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    
    document.getElementById('profileUsername').textContent = userData.profile?.nickname || loggedInUser;
    document.getElementById('profileBio').textContent = userData.profile?.bio || '暂无个人简介';
    
    const avatarImage = document.getElementById('avatarImage');
    const profileAvatar = document.getElementById('profileAvatar');
    if (userData.profile?.avatar) {
        avatarImage.src = userData.profile.avatar;
        avatarImage.style.display = 'block';
        profileAvatar.querySelector('.avatar-placeholder').style.display = 'none';
    }
    
    document.getElementById('visitedCount').textContent = userData.visitedDestinations?.length || 0;
    document.getElementById('wishlistCount').textContent = userData.wishlist?.length || 0;
    
    initTabs();
    initPreferences(userData.preferences);
    initDestinations('visitedDestinations', userData.visitedDestinations || []);
    initDestinations('wishlistDestinations', userData.wishlist || []);
}

function initTabs() {
    const tabs = document.querySelectorAll('.profile-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

function initPreferences(preferences) {
    const travelTypes = ['城市观光', '自然风光', '海滩度假', '历史文化', '美食之旅', '冒险旅行'];
    const seasons = ['春季', '夏季', '秋季', '冬季'];
    const budgets = ['经济型', '舒适型', '豪华型', '自定义'];
    const foods = ['中餐', '西餐', '日料', '韩餐', '素食', '无限制'];
    const accommodations = ['酒店', '民宿', '青旅', '度假村', '公寓'];
    const activities = ['徒步', '购物', '观光', '水上活动', '夜生活', '文化体验'];
    
    renderOptions('travelTypes', travelTypes, preferences.travelTypes);
    renderOptions('favoriteSeasons', seasons, preferences.favoriteSeasons);
    renderBudgetOptions('budgetOptions', budgets, preferences.budget);
    renderOptions('foodPreferences', foods, preferences.foodPreferences);
    renderOptions('accommodationPreferences', accommodations, preferences.accommodationPreferences);
    renderOptions('activityPreferences', activities, preferences.activityPreferences);
    
    document.getElementById('savePreferencesBtn').addEventListener('click', savePreferences);
}

function renderOptions(containerId, options, selectedOptions) {
    const container = document.getElementById(containerId);
    container.innerHTML = options.map(option => `
        <div class="preference-option ${selectedOptions?.includes(option) ? 'selected' : ''}" 
             data-value="${option}">${option}</div>
    `).join('');
    
    container.querySelectorAll('.preference-option').forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

function renderBudgetOptions(containerId, options, selectedBudget) {
    const container = document.getElementById(containerId);
    container.innerHTML = options.map(option => `
        <div class="preference-option ${selectedBudget === option ? 'selected' : ''}" 
             data-value="${option}">${option}</div>
    `).join('');
    
    container.querySelectorAll('.preference-option').forEach(option => {
        option.addEventListener('click', function() {
            container.querySelectorAll('.preference-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            if (this.dataset.value === '自定义') {
                document.getElementById('customBudgetInput').style.display = 'flex';
            } else {
                document.getElementById('customBudgetInput').style.display = 'none';
            }
        });
    });
    
    document.getElementById('saveCustomBudget').addEventListener('click', function() {
        const customBudget = document.getElementById('customBudget').value;
        if (customBudget) {
            showMessage('preferencesMessage', '自定义预算已保存', 'success');
        }
    });
}

function savePreferences() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    
    userData.preferences = {
        travelTypes: getSelectedOptions('travelTypes'),
        favoriteSeasons: getSelectedOptions('favoriteSeasons'),
        budget: document.querySelector('#budgetOptions .preference-option.selected')?.dataset.value || '',
        foodPreferences: getSelectedOptions('foodPreferences'),
        accommodationPreferences: getSelectedOptions('accommodationPreferences'),
        activityPreferences: getSelectedOptions('activityPreferences')
    };
    
    localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
    showMessage('preferencesMessage', '偏好设置已保存', 'success');
}

function getSelectedOptions(containerId) {
    const options = [];
    document.querySelectorAll(`#${containerId} .preference-option.selected`).forEach(option => {
        options.push(option.dataset.value);
    });
    return options;
}

function initDestinations(containerId, destinations) {
    const container = document.getElementById(containerId);
    
    if (destinations.length === 0) {
        container.innerHTML = `<p class="no-data">${containerId === 'visitedDestinations' ? '您还没有添加去过的地方' : '您的心愿单是空的'}</p>`;
        return;
    }
    
    container.innerHTML = destinations.map(dest => `
        <div class="destination-item" data-id="${dest.id}">
            <div class="destination-img">
                <img src="${dest.image}" alt="${dest.name}">
            </div>
            <div class="destination-info">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
            </div>
            <button class="remove-btn" data-id="${dest.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeDestination(containerId, this.dataset.id);
        });
    });
}

function removeDestination(type, id) {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) return;
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    const key = type === 'visitedDestinations' ? 'visitedDestinations' : 'wishlist';
    
    userData[key] = userData[key].filter(dest => dest.id !== parseInt(id));
    localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
    
    initProfilePage();
}