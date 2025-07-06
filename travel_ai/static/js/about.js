document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        
        if (!name || !email || !message) {
            alert('请填写所有字段');
            return;
        }
        
        // 这里应该是发送表单数据的代码
        // 为了演示，我们只显示成功消息
        
        alert('感谢您的留言！我们会尽快回复您。');
        contactForm.reset();
    });
}