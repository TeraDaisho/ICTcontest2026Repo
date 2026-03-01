document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- Parallax Orbs ---
    const orbs = document.querySelectorAll('.glow-orb');
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // --- Artistic Paint Splatter Canvas Effect ---
    const canvas = document.getElementById('splatterCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Resize canvas to cover the whole document
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // initial sizing

    // Vibrant paint colors (Cyan, Magenta, Yellow, Purple, Orange, Green, Bright Pink)
    const paintColors = [
        'rgba(255, 0, 128,',     // Magenta/Pink
        'rgba(0, 212, 255,',     // Cyan
        'rgba(255, 230, 0,',     // Bright Yellow
        'rgba(140, 0, 255,',     // Purple
        'rgba(255, 102, 0,',     // Orange
        'rgba(0, 255, 136,',     // Mint Green
        'rgba(255, 20, 147,'     // Deep Pink
    ];

    // Create a single splatter burst
    const drawSplatter = (x, y, mainIntensity = 1) => {
        const baseColorStr = paintColors[Math.floor(Math.random() * paintColors.length)];
        const numDrops = Math.floor(Math.random() * 15 + 10) * mainIntensity; // 10 to 25 drops default

        for (let i = 0; i < numDrops; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * (70 * mainIntensity);
            const dropX = x + Math.cos(angle) * (radius + Math.random() * 20);
            const dropY = y + Math.sin(angle) * (radius + Math.random() * 20);

            // Randomize drop size
            const dropSize = Math.max(0.5, Math.random() * (12 * mainIntensity) - (radius * 0.05));

            // Randomize opacity
            const opacity = Math.random() * 0.6 + 0.3;

            ctx.beginPath();
            ctx.arc(dropX, dropY, dropSize, 0, Math.PI * 2);
            ctx.fillStyle = `${baseColorStr} ${opacity})`;
            ctx.fill();
        }

        // Add one central larger blob sometimes
        if (Math.random() > 0.3) {
            ctx.beginPath();
            // Random blob shape using multiple overlapping circles
            const blobSize = Math.random() * (25 * mainIntensity) + 5;
            const bX = x + (Math.random() - 0.5) * 10;
            const bY = y + (Math.random() - 0.5) * 10;
            ctx.arc(bX, bY, blobSize, 0, Math.PI * 2);
            ctx.fillStyle = `${baseColorStr} ${Math.random() * 0.4 + 0.6})`;
            ctx.fill();
        }
    };

    // Initial abstract random splatters all over the document
    const initSplatters = () => {
        const area = canvas.width * canvas.height;
        const totalSplatters = Math.floor(area / 150000); // adjust density

        for (let i = 0; i < totalSplatters; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            // Larger main splatters occasionally
            drawSplatter(x, y, Math.random() * 2 + 0.5);
        }
    };

    // Draw initial background
    initSplatters();

    // Add interactive splatter on click
    document.addEventListener('click', (e) => {
        // Find click position relative to document
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        drawSplatter(e.clientX + scrollX, e.clientY + scrollY, 1.5);
    });
});
