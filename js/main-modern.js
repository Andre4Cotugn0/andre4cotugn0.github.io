/* Modern JavaScript - main-modern.js */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    initCustomCursor();
    initParticles();
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initSkillBars();
    initStats();
    initContactForm();
    initSmoothScrolling();
    initGitHubStats();
    initDynamicDates();
}

// Custom Cursor - Optimized for smooth performance
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let isMoving = false;
    
    // Use transform instead of left/top for better performance
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Immediate cursor update with transform
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
    
    // Smooth follower animation with higher responsiveness
    function animateFollower() {
        if (isMoving) {
            // Increased lerp factor for faster response (0.1 -> 0.15)
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            // Use transform3d for hardware acceleration
            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            
            // Stop animation when close enough to target
            if (Math.abs(mouseX - followerX) < 0.1 && Math.abs(mouseY - followerY) < 0.1) {
                isMoving = false;
            }
        }
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorFollower.style.transform += ' scale(0.8)';
            cursorFollower.style.opacity = '0.8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(0.8)', '');
            cursorFollower.style.opacity = '0.6';
        });
    });
}

// Particles Background
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.9)';
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElements = [
        { element: document.getElementById('typewriter-name'), text: 'Andrea Cotugno', speed: 100 },
        { element: document.getElementById('typewriter-role'), text: 'Full Stack Developer', speed: 80 },
        { element: document.getElementById('typewriter-status'), text: 'Open to opportunities', speed: 60 }
    ];
    
    const heroSubtitle = document.getElementById('hero-subtitle');
    const terminalOutput = document.getElementById('terminal-output');
    
    // Hero subtitle typewriter - Use current text or default
    if (heroSubtitle) {
        const currentText = heroSubtitle.textContent || 'Innovazione • Cybersecurity • Sviluppo Web';
        typewriterEffect(heroSubtitle, currentText, 50);
    }
    
    // Terminal commands - Updated with security focus
    if (terminalOutput) {
        const commands = [
            'cat about.txt',
            'nmap -sV localhost',
            'ls -la security/',
            'git status',
            'npm run build'
        ];
        
        setTimeout(() => {
            terminalTypewriter(terminalOutput, commands, 0);
        }, 2000);
    }
    
    // Code editor typewriters
    typewriterElements.forEach((item, index) => {
        if (item.element) {
            setTimeout(() => {
                typewriterEffect(item.element, item.text, item.speed);
            }, index * 800);
        }
    });
}

function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function terminalTypewriter(element, commands, index) {
    if (index >= commands.length) {
        index = 0; // Loop
    }
    
    typewriterEffect(element, commands[index], 50);
    
    setTimeout(() => {
        terminalTypewriter(element, commands, index + 1);
    }, 3000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .about-text, .about-image');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = (index * 0.1) + 's';
        observer.observe(el);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                progressBar.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Statistics Counter
function initStats() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
            submitBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        }, 2000);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Matrix Rain Effect (Optional)
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d9ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Initialize Matrix Rain (uncomment to enable)
// setTimeout(initMatrixRain, 2000);

// Additional Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16));
}

// GitHub API integration
async function initGitHubStats() {
    try {
        const username = 'andre4cotugn0';
        
        // Get user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Get repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();
        
        // Count public repos
        const publicRepos = reposData.filter(repo => !repo.private).length;
        
        // Get commits from last week
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        let weeklyCommits = 0;
        for (const repo of reposData.slice(0, 10)) { // Check only recent repos for performance
            try {
                const commitsResponse = await fetch(
                    `https://api.github.com/repos/${username}/${repo.name}/commits?since=${weekAgo.toISOString()}&author=${username}`
                );
                if (commitsResponse.ok) {
                    const commitsData = await commitsResponse.json();
                    weeklyCommits += commitsData.length;
                }
            } catch (e) {
                // Skip repos with no commits or access issues
            }
        }
        
        // Update stats
        const projectsStat = document.querySelector('[data-target="8"]');
        const commitsStat = document.querySelector('[data-target="50"]');
        
        if (projectsStat) {
            projectsStat.setAttribute('data-target', publicRepos);
            projectsStat.textContent = publicRepos;
        }
        
        if (commitsStat) {
            commitsStat.setAttribute('data-target', weeklyCommits);
            commitsStat.textContent = weeklyCommits;
        }
        
    } catch (error) {
        console.log('GitHub API not available, using fallback data');
        // Keep original fallback values
    }
}

// Dynamic dates
function initDynamicDates() {
    const currentYear = new Date().getFullYear();
    
    // Update copyright year
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', currentYear);
        }
    });
    
    // Update "Built with ❤️" year
    const builtElements = document.querySelectorAll('.stat-number');
    builtElements.forEach(el => {
        const parent = el.parentElement;
        const label = parent.querySelector('.stat-label');
        if (label && label.textContent.includes('Built with')) {
            el.textContent = currentYear;
        }
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}