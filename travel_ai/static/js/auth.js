document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initAuthForms();
});

function initAuthForms() {
    // 标签切换功能
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('login');
        });
        
        registerTab.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('register');
        });
    }
    
    // 表单提交
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        loginUser();
    });
    
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        registerUser();
    });
}

function switchAuthForm(formType) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (formType === 'register') {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    } else {
        registerTab.classList.remove('active');
        loginTab.classList.add('active');
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    }
    
    // 清除错误消息
    document.getElementById('loginMessage').style.display = 'none';
    document.getElementById('registerMessage').style.display = 'none';
    document.getElementById('passwordMatchError').style.display = 'none';
}

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('loginMessage');
    
    if (!username || !password) {
        showMessage(messageElement, '请输入用户名和密码', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('travelUsers')) || [];
    const user = users.find(u => u.username === username);
    
    if (!user) {
        showMessage(messageElement, '用户名不存在', 'error');
        return;
    }
    
    if (user.password !== password) {
        showMessage(messageElement, '密码不正确', 'error');
        return;
    }
    
    localStorage.setItem('travelLoggedInUser', username);
    
    showMessage(messageElement, '登录成功，即将跳转...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function registerUser() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirmPassword').value;
    const messageElement = document.getElementById('registerMessage');
    const passwordError = document.getElementById('passwordMatchError');
    
    if (!username || !password || !confirmPassword) {
        showMessage(messageElement, '请填写所有字段', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        passwordError.textContent = '两次输入的密码不一致';
        passwordError.style.display = 'block';
        return;
    } else {
        passwordError.style.display = 'none';
    }
    
    const users = JSON.parse(localStorage.getItem('travelUsers')) || [];
    if (users.some(u => u.username === username)) {
        showMessage(messageElement, '用户名已存在', 'error');
        return;
    }
    
    const newUser = {
        username,
        password,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('travelUsers', JSON.stringify(users));
    
    // 创建用户数据
    const userData = {
        profile: {
            nickname: username,
            bio: '',
            avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(username) + '&background=1e88e5&color=fff'
        },
        preferences: {
            travelTypes: [],
            favoriteSeasons: [],
            budget: '',
            foodPreferences: [],
            accommodationPreferences: [],
            activityPreferences: []
        },
        visitedDestinations: [],
        wishlist: []
    };
    localStorage.setItem(`travelUserData_${username}`, JSON.stringify(userData));
    
    showMessage(messageElement, '注册成功！请登录', 'success');
    
    // 自动切换到登录表单
    setTimeout(() => {
        switchAuthForm('login');
        document.getElementById('username').value = username;
        document.getElementById('password').focus();
    }, 1000);
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}-message`;
    element.style.display = 'block';
}