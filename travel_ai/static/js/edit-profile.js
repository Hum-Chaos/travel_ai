document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initEditProfilePage();
});

function initEditProfilePage() {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
    
    // 初始化表单数据
    document.getElementById('nickname').value = userData.profile?.nickname || loggedInUser;
    document.getElementById('bio').value = userData.profile?.bio || '';
    
    const avatarImage = document.getElementById('avatarImage');
    const avatarPreview = document.getElementById('avatarPreview');
    if (userData.profile?.avatar) {
        avatarImage.src = userData.profile.avatar;
        avatarImage.style.display = 'block';
        avatarPreview.querySelector('.avatar-placeholder').style.display = 'none';
    }
    
    // 头像上传处理
    document.getElementById('avatarInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // 创建images目录（如果不存在）
            if (!window.showDirectoryPicker) {
                // 浏览器不支持Directory API，使用默认方法
                saveImageToDefaultLocation(file);
                return;
            }
            
            // 请求用户选择目录
            window.showDirectoryPicker().then(dirHandle => {
                return dirHandle.getDirectoryHandle('travel-web-images', { create: true });
            }).then(imagesDirHandle => {
                // 保存图片到本地目录
                const fileName = `avatar_${Date.now()}_${file.name}`;
                return imagesDirHandle.getFileHandle(fileName, { create: true });
            }).then(fileHandle => {
                return fileHandle.createWritable();
            }).then(writable => {
                return file.arrayBuffer().then(buffer => {
                    return writable.write(buffer);
                }).then(() => {
                    return writable.close();
                });
            }).then(() => {
                // 创建对象URL用于预览
                const objectUrl = URL.createObjectURL(file);
                avatarImage.src = objectUrl;
                avatarImage.style.display = 'block';
                avatarPreview.querySelector('.avatar-placeholder').style.display = 'none';
                
                // 保存对象URL到用户数据
                const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
                userData.profile = userData.profile || {};
                userData.profile.avatar = objectUrl;
                localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
                
                // 更新页面右上角显示
                checkLoginStatus();
            }).catch(error => {
                console.error('保存图片失败:', error);
                // 回退到默认方法
                saveImageToDefaultLocation(file);
            });
        }
    });
    
    // 表单提交
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nickname = document.getElementById('nickname').value.trim();
        const bio = document.getElementById('bio').value.trim();
        const avatar = document.getElementById('avatarImage').src;
        
        const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
        userData.profile = userData.profile || {};
        userData.profile.nickname = nickname || loggedInUser;
        userData.profile.bio = bio;
        if (avatar && !avatar.includes('ui-avatars.com')) {
            userData.profile.avatar = avatar;
        }
        
        localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
        
        // 更新页面右上角显示
        checkLoginStatus();
        
        const message = document.getElementById('profileMessage');
        message.textContent = '资料保存成功！';
        message.className = 'message success-message';
        message.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1500);
    });
}

// 默认图片保存方法（当Directory API不可用时）
function saveImageToDefaultLocation(file) {
    const loggedInUser = localStorage.getItem('travelLoggedInUser');
    const avatarImage = document.getElementById('avatarImage');
    const avatarPreview = document.getElementById('avatarPreview');
    
    const reader = new FileReader();
    reader.onload = function(event) {
        avatarImage.src = event.target.result;
        avatarImage.style.display = 'block';
        avatarPreview.querySelector('.avatar-placeholder').style.display = 'none';
        
        // 保存到用户数据
        const userData = JSON.parse(localStorage.getItem(`travelUserData_${loggedInUser}`)) || {};
        userData.profile = userData.profile || {};
        userData.profile.avatar = event.target.result;
        localStorage.setItem(`travelUserData_${loggedInUser}`, JSON.stringify(userData));
        
        // 更新页面右上角显示
        checkLoginStatus();
    };
    reader.readAsDataURL(file);
}