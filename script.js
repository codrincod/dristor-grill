function switchLanguage(lang) {
    // Update active button
    document.querySelectorAll('.language-switch button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === lang) {
            button.classList.add('active');
        }
    });

    // Update content
    document.querySelectorAll('[data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    gsap.from(`#${sectionId}`, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// Add event listeners to navigation buttons
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const section = button.getAttribute('data-section');
        switchSection(section);
    });
});

// Initialize with home section
document.addEventListener('DOMContentLoaded', () => {
    switchSection('home');
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize Swiper
    const menuSlider = new Swiper('.menu-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Initialize SimpleBar
    document.querySelectorAll('.section').forEach(section => {
        new SimpleBar(section, {
            autoHide: true
        });
    });
});

// Custom cursor for touch devices only
const cursor = document.querySelector('.cursor');
let touchTimeout;

document.addEventListener('touchstart', (e) => {
    if (!cursor) return;
    const touch = e.touches[0];
    cursor.style.transform = `translate(${touch.clientX - 10}px, ${touch.clientY - 10}px)`;
    cursor.classList.add('active');
    clearTimeout(touchTimeout);
});

document.addEventListener('touchmove', (e) => {
    if (!cursor) return;
    const touch = e.touches[0];
    cursor.style.transform = `translate(${touch.clientX - 10}px, ${touch.clientY - 10}px)`;
});

document.addEventListener('touchend', () => {
    if (!cursor) return;
    cursor.classList.remove('active');
    touchTimeout = setTimeout(() => {
        cursor.style.opacity = '0';
    }, 300);
});

// Magnetic effect on buttons
document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const bounds = btn.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        btn.style.transform = `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        }
    });
});

// Enhanced button click effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Add animated particles
const particlesGeometry = new THREE.BufferGeometry();
let particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#8B4513'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        onComplete: () => loader.style.display = 'none'
    });
});

// Parallax effect
const scene2 = document.querySelectorAll('.menu-item');
scene2.forEach(item => {
    new Parallax(item, {
        relativeInput: true,
        hoverOnly: true,
        scalar: 15
    });
});

// Enhanced parallax effect
const parallaxItems = document.querySelectorAll('.parallax');
window.addEventListener('mousemove', (e) => {
    parallaxItems.forEach(item => {
        const speed = item.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        item.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// GSAP animations for menu items
gsap.from('.menu-item', {
    scrollTrigger: {
        trigger: '.menu-item',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navButtons = document.querySelector('.nav-buttons');
    navButtons.classList.toggle('show');
    
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    menuBtn.classList.toggle('fa-bars');
    menuBtn.classList.toggle('fa-times');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navButtons = document.querySelector('.nav-buttons');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navButtons.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navButtons.classList.remove('show');
        const menuBtn = document.querySelector('.mobile-menu-btn i');
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    }
});

// Fix 100vh issue on mobile browsers
function setMobileHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setMobileHeight);
setMobileHeight();

// Check if images are loaded
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => {
                img.src = 'images/fallback.jpg'; // Add a fallback image
                img.classList.add('error');
            });
        }
    });
}

// Mobile performance optimizations
function mobileOptimizations() {
    if (window.innerWidth <= 768) {
        // Disable heavy animations on mobile
        AOS.init({ disable: true });
        
        // Reduce particle count for Three.js
        particleCount = 500;
        
        // Disable parallax on mobile
        document.querySelectorAll('.parallax').forEach(el => {
            el.style.transform = 'none';
        });
        
        // Optimize Swiper for mobile
        if (typeof menuSlider !== 'undefined') {
            menuSlider.params.slidesPerView = 1;
            menuSlider.update();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    mobileOptimizations();
    setMobileHeight();
    
    // Check if Three.js canvas is supported
    const canvas = document.querySelector('#bg-canvas');
    if (canvas && !canvas.getContext('webgl')) {
        canvas.style.display = 'none';
    }
});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        setMobileHeight();
        mobileOptimizations();
    }, 200);
});
