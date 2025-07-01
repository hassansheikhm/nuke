// HTML setup (add this to your HTML file):
// <button id="sparkBtn">Generate Infinite Sparks</button>
// <div id="sparkContainer" style="position:relative;width:100vw;height:100vh;overflow:hidden;"></div>
// <audio id="nukeAudio" src="nukeblah.mp3" preload="auto"></audio>

document.getElementById('sparkBtn').addEventListener('click', () => {
    // Play nuke sound
    const nukeAudio = document.getElementById('nukeAudio');
    if (nukeAudio) {
        nukeAudio.currentTime = 0;
        nukeAudio.play();
    }

    // Hide all content except the blast
    document.body.style.overflow = 'hidden';
    const mainContent = Array.from(document.body.children).filter(el => el.id !== 'nukeBlast');
    mainContent.forEach(el => {
        if (el.id !== 'nukeBlast') el.style.opacity = 0;
    });

    // Create blast overlay
    let blast = document.createElement('div');
    blast.id = 'nukeBlast';
    blast.style.position = 'fixed';
    blast.style.left = 0;
    blast.style.top = 0;
    blast.style.width = '100vw';
    blast.style.height = '100vh';
    blast.style.background = 'radial-gradient(circle, #fff200 0%, #ff9900 40%, #ff3300 70%, #000 100%)';
    blast.style.zIndex = 9999;
    blast.style.opacity = 0;
    blast.style.transition = 'opacity 0.5s';
    document.body.appendChild(blast);

    // Animate rocks, poles, and roads
    function animateDebris(className, count, sizeRange) {
        for (let i = 0; i < count; i++) {
            const debris = document.createElement('div');
            debris.className = className;
            // Randomize size
            if (sizeRange) {
                debris.style.width = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]) + 'px';
                debris.style.height = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]) + 'px';
            }
            debris.style.left = '50vw';
            debris.style.top = '50vh';
            debris.style.opacity = 1;
            debris.style.transition = 'opacity 1s';
            debris.style.zIndex = 10001;
            document.body.appendChild(debris);
            // Animate outward
            const angle = Math.random() * 2 * Math.PI;
            const distance = 300 + Math.random() * 300;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            setTimeout(() => {
                debris.style.transform = `translate(${dx}px, ${dy}px)`;
                debris.style.opacity = 0;
            }, 100);
            setTimeout(() => {
                debris.remove();
            }, 2000);
        }
    }
    animateDebris('rock', 6, [30, 50]);
    animateDebris('pole', 4, [40, 70]);
    animateDebris('road', 3, [60, 120]);

    // Flash effect
    setTimeout(() => {
        blast.style.opacity = 1;
        // Screen shake
        document.body.style.transition = 'transform 0.1s';
        let shake = 0;
        let shakeInterval = setInterval(() => {
            document.body.style.transform = `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px)`;
            shake++;
            if (shake > 10) {
                clearInterval(shakeInterval);
                document.body.style.transform = '';
            }
        }, 50);
        // Fade to white/yellow
        setTimeout(() => {
            blast.style.background = '#fff200';
            blast.style.transition = 'background 1s, opacity 2s';
            blast.style.opacity = 1;
            setTimeout(() => {
                blast.style.opacity = 0;
                setTimeout(() => {
                    blast.remove();
                    mainContent.forEach(el => el.style.opacity = 1);
                    document.body.style.overflow = '';
                }, 2000);
            }, 2000);
        }, 1200);
    }, 100);
    function createSpark() {
        const spark = document.createElement('div');
        spark.className = 'weld-spark';
        // Set initial position near the center of the container (simulate welding point)
        const container = document.getElementById('sparkContainer');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        spark.style.left = centerX + 'px';
        spark.style.top = centerY + 'px';
        // Random angle and distance for shooting effect
        const angle = Math.random() * 2 * Math.PI;
        const distance = 80 + Math.random() * 120;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        // Animate spark
        let progress = 0;
        const anim = setInterval(() => {
            progress += 0.03;
            spark.style.transform = `translate(${dx * progress}px, ${dy * progress}px)`;
            spark.style.opacity = 1 - progress;
            if (progress >= 1) {
                clearInterval(anim);
                spark.remove();
            }
        }, 16);
        container.appendChild(spark);
    }
    // Burst of sparks for welding effect
    for (let i = 0; i < 15; i++) {
        setTimeout(createSpark, i * 30);
    }

    // Animate house roof explosion
    const house = document.getElementById('houseContainer');
    const roof = document.getElementById('roof');
    if (roof) {
        // Create roof pieces
        const pieces = 8;
        const rect = roof.getBoundingClientRect();
        for (let i = 0; i < pieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'bg-gradient-to-b from-gray-400 to-gray-700 rounded-t-full shadow-lg';
            piece.style.position = 'absolute';
            piece.style.width = rect.width / 2 + 'px';
            piece.style.height = rect.height + 'px';
            piece.style.left = (rect.left + rect.width/4) + 'px';
            piece.style.top = rect.top + 'px';
            piece.style.zIndex = 10002;
            piece.style.transform = `rotate(${(360/pieces)*i}deg)`;
            document.body.appendChild(piece);
            // Animate outward
            setTimeout(() => {
                const angle = (2 * Math.PI / pieces) * i;
                const dx = Math.cos(angle) * 300;
                const dy = Math.sin(angle) * 200;
                piece.style.transition = 'transform 1.2s cubic-bezier(0.4,2,0.2,1), opacity 1.2s';
                piece.style.transform = `translate(${dx}px, ${dy}px) rotate(${(360/pieces)*i+180}deg)`;
                piece.style.opacity = 0;
            }, 200);
            setTimeout(() => piece.remove(), 1800);
        }
        roof.style.opacity = 0;
    }

    // Galaxy-like particles
    function createGalaxyParticle() {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full pointer-events-none';
        const size = 4 + Math.random() * 8;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `radial-gradient(circle, #fff, #ff0, #0ff, #f0f 80%)`;
        particle.style.left = '50vw';
        particle.style.top = '50vh';
        particle.style.opacity = 0.8;
        particle.style.zIndex = 10003;
        document.body.appendChild(particle);
        // Animate outward in spiral
        const angle = Math.random() * 2 * Math.PI;
        const spiral = 0.5 + Math.random() * 1.5;
        const distance = 200 + Math.random() * 400;
        setTimeout(() => {
            particle.style.transition = 'transform 1.5s cubic-bezier(0.4,2,0.2,1), opacity 1.5s, width 1.5s, height 1.5s';
            particle.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) scale(${1.5+Math.random()*2}) rotate(${spiral*720}deg)`;
            particle.style.opacity = 0;
            particle.style.width = (size*2) + 'px';
            particle.style.height = (size*2) + 'px';
        }, 100);
        setTimeout(() => particle.remove(), 1800);
    }
    for (let i = 0; i < 40; i++) {
        setTimeout(createGalaxyParticle, i * 20);
    }
});