window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if(loadingScreen){
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    const overlay = document.getElementById('page-transition');
    if(overlay) overlay.classList.remove('active');
});

function goToPage(url) {
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = '#FFA500';
    overlay.style.zIndex = 99999;
    overlay.style.opacity = 0;
    overlay.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = 1;
    }, 10);

    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');
    if(url.startsWith('#')) return;
    link.addEventListener('click', e => {
        e.preventDefault();
        goToPage(url);
    });
});

document.addEventListener('click', e => {
    const circle = document.createElement('div');
    circle.className = 'click-effect';
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 600);

    for(let i=0; i<8; i++){
        const particle = document.createElement('div');
        particle.className = 'orange-particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = 50 + Math.random()*50;
        particle.style.setProperty('--dx', Math.cos(angle)*distance + 'px');
        particle.style.setProperty('--dy', Math.sin(angle)*distance + 'px');
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
});

function showToast(message){
    let toast = document.getElementById('toast');
    if(!toast){
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

const copyBtn = document.getElementById('copy-email');
if(copyBtn){
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.dataset.email).then(() => {
            showToast('Email copied!');
        });
    });
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

if(searchInput && searchBtn && searchResults){
    const items = [
        { name: "About Me", link: "#about", desc: "ฉันชอบสร้างเว็บไซต์สวยๆ มีลูกเล่น และออกแบบ UI/UX" },
        { name: "Skills", link: "#skills", desc: "HTML, CSS, JavaScript, React, Animation, Responsive Design" },
        { name: "Projects", link: "#projects", desc: "เว็บไซต์โปรไฟล์, ร้านค้าออนไลน์, เกมง่ายๆ, เว็บแอปพลิเคชัน" },
        { name: "Contact", link: "#contact", desc: "Email: example@mail.com, Line/WhatsApp: 012-345-6789" }
    ];

    function search(){
        const query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        if(!query) return;
        const results = items.filter(item =>
            item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
        );
        if(results.length === 0){
            searchResults.innerHTML = `<p>ไม่พบผลลัพธ์สำหรับ "<strong>${query}</strong>"</p>`;
            return;
        }
        results.forEach(r => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h2>${r.name}</h2><p>${r.desc}</p>`;
            card.onclick = () => goToPage(r.link);
            searchResults.appendChild(card);
        });
    }

    searchBtn.addEventListener('click', search);
    searchInput.addEventListener('keypress', e => { if(e.key==='Enter') search(); });
}

const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Message sent successfully!');
        contactForm.reset();
    });
}