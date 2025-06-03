document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let boat = document.getElementById("boat");

    // Move boat along Y axis as you scroll
    boat.style.top = (100 + scrollPosition * 0.5) + "px";
    
    // Highlight collapsible sections on scroll
    let sections = document.querySelectorAll('.education-item');

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            // Add highlight or interaction when the section is visible
            section.style.border = "2px solid #c08f57"; // Example highlight style
        } else {
            // Remove highlight when not visible
            section.style.border = "none";
        }
    });
});

document.addEventListener("scroll", function () {
    const path = document.getElementById("boatPath");
    const boat = document.getElementById("boat");
    const pathLength = path.getTotalLength();

    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(window.scrollY / scrollMax, 1);

    const point = path.getPointAtLength(scrollPercentage * pathLength);

    // Position the boat at the center of the path
    boat.style.transform = `translate(${point.x - boat.offsetWidth / 2}px, ${point.y - boat.offsetHeight / 2}px)`;

    // Adjust rotation based on path direction
    if (scrollPercentage < 1) {
        const nextPoint = path.getPointAtLength(Math.min((scrollPercentage + 0.01) * pathLength, pathLength));
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        boat.style.transform += ` rotate(${angle}deg)`;
    }
});

// Set initial boat position on load
window.addEventListener('load', function () {
    const path = document.getElementById("boatPath");
    const boat = document.getElementById("boat");
    const startPoint = path.getPointAtLength(0);
    boat.style.transform = `translate(${startPoint.x - boat.offsetWidth / 2}px, ${startPoint.y - boat.offsetHeight / 2}px)`;
});

// Modern Research Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDarkMode();
    initCardAnimations();
    initSmoothScrolling();
    updateProfileStatus();

    // Add event listeners
    setupDarkModeToggle();
    setupContactForm();
});

// Dark Mode Functionality
function initDarkMode() {
    // Check for saved user preference first, then system preference
    const savedTheme = localStorage.getItem('theme');
    let theme;
    
    if (savedTheme) {
        theme = savedTheme;
    } else {
        // Check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
        // Save the detected preference
        localStorage.setItem('theme', theme);
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    updateDarkModeToggle(theme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // Only auto-update if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateDarkModeToggle(newTheme);
            }
        });
    }
}

function setupDarkModeToggle() {
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeToggle(newTheme);
        });
    }
}

function updateDarkModeToggle(theme) {
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        toggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
}

// Card Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Profile Status Updates
function updateProfileStatus() {
    const statusText = document.querySelector('.profile-status span:last-child');
    if (statusText) {
        const statuses = [
            'Available for opportunities',
            'Actively researching',
            'Open to collaboration',
            'Currently studying'
        ];
        
        let currentIndex = 0;
        setInterval(() => {
            statusText.textContent = statuses[currentIndex];
            currentIndex = (currentIndex + 1) % statuses.length;
        }, 3000);
    }
}

// Contact Form Handling
function setupContactForm() {
    const form = document.querySelector('.contact-form-mini');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transition: 'all 0.3s ease',
        opacity: '0',
        translateY: '-20px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Skill Tag Interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('skill-tag')) {
        const skill = e.target.textContent;
        showNotification(`You clicked on: ${skill}`, 'info');
    }
});

// Project Card Interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-item')) {
        const projectTitle = e.target.closest('.project-item').querySelector('h5').textContent;
        console.log(`Interested in project: ${projectTitle}`);
    }
});

// Add typing effect to hero heading
function addTypingEffect() {
    const heading = document.querySelector('.hero-heading');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        heading.style.borderRight = '2px solid var(--accent-primary)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    heading.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// Initialize typing effect after a short delay
setTimeout(addTypingEffect, 500);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-dashboard');
    
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effects to timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingCSS = `
    .loaded .dashboard-card {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject loading CSS
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);
