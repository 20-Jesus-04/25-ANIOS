const razones = [
    "Tu resiliencia", "Tu risa contagiosa", "Tu mirada única", "Tu fuerza interior", "Tu dulzura",
    "Tu inteligencia", "Tu estilo", "Cómo me cuidas", "Tus consejos", "Tu apoyo total",
    "Tu ambición", "Tu paz", "Tu fuego", "Tu aroma", "Tu valentía",
    "Tus abrazos", "Tu honestidad", "Tu luz propia", "Tu magia", "Tu bondad",
    "Tu autenticidad", "Tus sueños", "Tu paciencia", "Tu gran corazón", "Simplemente ERES TÚ"
];

function startExperience() {
    const intro = document.getElementById('intro');
    intro.style.opacity = '0';
    intro.style.pointerEvents = 'none';
    document.body.classList.remove('locked');
    
    setTimeout(() => {
        intro.style.display = 'none';
        initStars();
        llenarRazones();
    }, 1000);

    const music = document.getElementById('bg-music');
    music.play().catch(() => console.log("Audio en espera de interacción del usuario"));
}

const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        accordionItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

function pedirDeseo() {
    const flame = document.querySelector('.flame');
    const msg = document.getElementById('wish-msg');
    flame.style.opacity = '0';
    flame.style.transition = '0.5s';
    msg.innerText = "¡Deseo enviado a las estrellas! ✨🎂";
    msg.style.color = "var(--gold)";
}

function llenarRazones() {
    const container = document.getElementById('reasons-container');
    if(container.innerHTML !== "") return;
    razones.forEach((text, i) => {
        const tile = document.createElement('div');
        tile.className = 'reason-tile reveal';
        tile.innerHTML = `<strong>#${i+1}</strong> <br> ${text}`;
        container.appendChild(tile);
    });
    document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
}

function initStars() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    
    function setSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', setSize);
    setSize();

    const stars = [];
    const count = window.innerWidth < 768 ? 80 : 150; 

    for(let i=0; i<count; i++) {
        stars.push({ 
            x: Math.random()*canvas.width, 
            y: Math.random()*canvas.height, 
            z: Math.random()*canvas.width, 
            size: Math.random()*1.5 
        });
    }

    function animate() {
        ctx.fillStyle = '#050208'; 
        ctx.fillRect(0,0,canvas.width,canvas.height);
        stars.forEach(s => {
            s.z -= 1; 
            if(s.z <= 0) s.z = canvas.width;
            const x = (s.x - canvas.width/2)*(canvas.width/s.z)+canvas.width/2;
            const y = (s.y - canvas.height/2)*(canvas.width/s.z)+canvas.height/2;
            const sz = s.size * (canvas.width/s.z) * 0.1;
            ctx.fillStyle = "white"; 
            ctx.beginPath(); 
            ctx.arc(x, y, sz > 0 ? sz : 0.1, 0, Math.PI*2); 
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor-follower');
    if(cursor && window.innerWidth > 768) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
});

function megaCelebracion(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const emojis = ['💖', '✨', '🎂', '🌸', '🎈', '🎊'];
    const count = window.innerWidth < 768 ? 60 : 120; 

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
        p.style.position = 'fixed'; 
        p.style.left = (clientX || window.innerWidth/2) + 'px'; 
        p.style.top = (clientY || window.innerHeight/2) + 'px';
        p.style.fontSize = window.innerWidth < 768 ? '18px' : '24px'; 
        p.style.zIndex = '10001';
        p.style.pointerEvents = 'none';
        document.body.appendChild(p);

        const angle = Math.random()*Math.PI*2; 
        const velocity = Math.random()*(window.innerWidth < 768 ? 600 : 1000) + 300;
        const destX = Math.cos(angle)*velocity; 
        const destY = Math.sin(angle)*velocity;

        p.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 }, 
            { transform: `translate(${destX}px, ${destY}px) scale(1.5) rotate(720deg)`, opacity: 0 }
        ], { duration: 2500, easing: 'cubic-bezier(0.1, 1, 0.3, 1)', fill: 'forwards' });
        
        setTimeout(() => p.remove(), 2500);
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });

function toggleMusic() {
    const music = document.getElementById('bg-music');
    if(music.paused) music.play(); else music.pause();
}