// Three.js Background Animation
let scene, camera, renderer, particles;

function initBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#DAA520',
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 2;
}

function animateBackground() {
    requestAnimationFrame(animateBackground);

    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

// 3D Model Animation
let mosque;

function init3DModel() {
    const loader = new THREE.GLTFLoader();
    loader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/mosque/scene.gltf',
        function(gltf) {
            mosque = gltf.scene;
            mosque.scale.set(0.5, 0.5, 0.5);
            mosque.position.set(0, -1, 0);
            scene.add(mosque);
        }
    );
}

// Floating elements animation
function createFloatingElement(element) {
    let start = null;
    const duration = 3000; // 3 seconds for one cycle
    
    function animate(currentTime) {
        if (!start) start = currentTime;
        const progress = (currentTime - start) / duration;
        
        // Create a floating effect using sin wave
        const y = Math.sin(progress * 2 * Math.PI) * 20;
        element.style.transform = `translateY(${y}px)`;
        
        if (progress >= 1) start = currentTime;
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

// Initialize all animations
function initAnimations() {
    // Initialize background
    initBackground();
    animateBackground();
    
    // Initialize 3D model
    init3DModel();
    
    // Initialize floating elements
    document.querySelectorAll('.float-element').forEach(createFloatingElement);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Scroll-triggered 3D rotation for service cards
function initCardRotation() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Particle system for hero section
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.querySelector('.hero-section').appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particleContainer.appendChild(particle);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initCardRotation();
    createParticleSystem();
});
