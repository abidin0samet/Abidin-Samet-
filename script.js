// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll - Enhanced
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-header, .about-content, .cert-card, .timeline-item, .blog-card, .contact-content, .sebs-promo-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Interactive feature cards animation
    const interactiveCards = document.querySelectorAll('.sebs-feature-item.interactive-card');
    interactiveCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
        
        // Add click interaction
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Interactive skill items with rotation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05) rotate(2deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
        
        // Click interaction
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Interactive stat cards with bounce
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.08)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click to animate number
        item.addEventListener('click', function() {
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    number.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // Interactive contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item) => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Interactive SEBS feature cards
    const sebsCards = document.querySelectorAll('.sebs-feature-item.interactive-card');
    sebsCards.forEach((card) => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
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

// Hero title is now static - no typing animation
// Removed typing effect for "Merhaba, Ben Samet"

// Enhanced Interactive Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero pattern parallax
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Profile card parallax
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        const rect = profileCard.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top - window.innerHeight / 2) * 0.1;
            profileCard.style.transform = `translateY(${offset}px)`;
        }
    }
    
    // SEBS logo parallax
    const sebsLogo = document.querySelector('.sebs-logo');
    if (sebsLogo) {
        const rect = sebsLogo.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top - window.innerHeight / 2) * 0.15;
            sebsLogo.style.transform = `translateY(${offset}px)`;
        }
    }
});

// Interactive Mouse Move Effects
document.addEventListener('mousemove', (e) => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const profileCard = document.querySelector('.profile-card');
            if (profileCard) {
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                profileCard.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
            
            const heroText = document.querySelector('.hero-text');
            if (heroText) {
                const moveX = (x - 0.5) * 10;
                const moveY = (y - 0.5) * 10;
                heroText.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        }
    }
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Lütfen tüm alanları doldurun.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Geçerli bir e-posta adresi girin.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mesajınız başarıyla gönderildi!', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(notificationStyles);

// Blog card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Certificate card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0)';
        });
    });
});

// Skill items animation on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 10px 25px rgba(220, 38, 38, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        });
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
    .nav-link.active {
        color: var(--red-accent) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyles);

// Enhanced Loading Screen Control
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const loadingMessage = document.querySelector('.loading-message');
    const loadingDots = document.querySelector('.loading-dots');
    const logoIcon = document.querySelector('.logo-icon');
    const shieldGlow = document.querySelector('.shield-glow');
    const floatingElements = document.querySelectorAll('.floating-icon');
    const binaryStream = document.querySelector('.binary-stream');
    
    // Animate logo on load
    setTimeout(() => {
        logoIcon.style.transform = 'scale(1.1)';
        shieldGlow.style.opacity = '1';
    }, 500);
    
    // Animate floating elements
    floatingElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
    
    // Animate binary stream
    setTimeout(() => {
        binaryStream.style.opacity = '1';
    }, 1000);
    
    // Simulate loading progress with smooth animation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Update final loading text
            loadingMessage.textContent = 'Güvenlik protokolleri aktif!';
            loadingDots.style.display = 'none';
            
            // Animate completion
            setTimeout(() => {
                logoIcon.style.transform = 'scale(1.2)';
                shieldGlow.style.transform = 'scale(1.5)';
                
                // Hide loading screen after completion animation
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    document.body.classList.add('loaded');
                    
                    // Remove loading screen from DOM after animation
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 1000);
                }, 800);
            }, 500);
        }
        
        // Update progress bar with smooth animation
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress) + '%';
        
        // Update loading messages based on progress
        if (progress < 20) {
            loadingMessage.textContent = 'Siber güvenlik dünyasına bağlanıyor...';
        } else if (progress < 40) {
            loadingMessage.textContent = 'Güvenlik protokolleri yükleniyor...';
        } else if (progress < 60) {
            loadingMessage.textContent = 'Bulut altyapısı hazırlanıyor...';
        } else if (progress < 80) {
            loadingMessage.textContent = 'Kimlik doğrulama sistemleri aktif...';
        } else if (progress < 95) {
            loadingMessage.textContent = 'Son kontroller yapılıyor...';
        }
        
        // Animate progress shine effect
        const progressShine = document.querySelector('.progress-shine');
        if (progressShine) {
            progressShine.style.left = progress + '%';
        }
    }, 150);
    
    // Animate loading dots
    const dots = loadingDots.querySelectorAll('span');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyles);

// Interactive Binary code animation
document.addEventListener('DOMContentLoaded', () => {
    const binaryElements = document.querySelectorAll('.binary-code span');
    binaryElements.forEach((element, index) => {
        // Random binary generation
        setInterval(() => {
            const randomBinary = Math.random().toString(2).substring(2, 10);
            element.style.opacity = '0';
            setTimeout(() => {
                element.textContent = randomBinary;
                element.style.opacity = '0.6';
            }, 200);
        }, 2000 + (index * 500));
        
        // Click interaction
        element.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            this.style.color = 'var(--red-accent)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.color = '';
            }, 500);
        });
    });
    
    // Add typing effect to hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.innerHTML;
        heroDescription.style.opacity = '0';
        setTimeout(() => {
            let index = 0;
            const words = originalText.split(' ');
            heroDescription.innerHTML = '';
            
            function typeWord() {
                if (index < words.length) {
                    heroDescription.innerHTML += words[index] + ' ';
                    index++;
                    setTimeout(typeWord, 50);
                } else {
                    heroDescription.style.opacity = '1';
                }
            }
            typeWord();
        }, 500);
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--red-accent);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.background = 'var(--blue-accent)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.background = 'var(--red-accent)';
});

// Enhanced Certificate card flip animation
function flipCard(card) {
    const cardInner = card.querySelector('.cert-card-inner');
    const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
    
    if (isFlipped) {
        cardInner.style.transform = 'rotateY(0deg)';
        card.style.transform = 'translateY(0) scale(1)';
    } else {
        cardInner.style.transform = 'rotateY(180deg)';
        card.style.transform = 'translateY(-15px) scale(1.05)';
    }
}

// Enhanced Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
    // Certificate cards with enhanced interaction
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotateY(5deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.cert-icon');
            if (icon) {
                icon.style.animation = 'iconSpin 0.5s ease';
            }
        });
    });
    
    // Blog cards with ripple effect
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: rippleExpand 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add custom cursor for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .cert-card, .blog-card, .skill-item, .sebs-feature-item, .contact-item, .stat-item, .timeline-item');
    interactiveElements.forEach(element => {
        element.style.cursor = 'pointer';
        
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
    
    // Interactive section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            const title = this.querySelector('.section-title');
            if (title) {
                title.style.transform = 'scale(1.02)';
            }
        });
        
        header.addEventListener('mouseleave', function() {
            const title = this.querySelector('.section-title');
            if (title) {
                title.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleExpand {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// EmailJS Configuration and Form Handling
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("_ALjXMhKQtg_pv6zt"); // Your EmailJS public key
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            formMessage.style.display = 'none';
            
            // Get form data
            const formData = {
                user_name: document.getElementById('userName').value,
                user_email: document.getElementById('userEmail').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                    to_email: 'abidinsametcay@sebsglobal.com' // Your email address
            };
            
            // Debug: Log form data
            console.log('Sending email with data:', formData);
            
            // Send email using EmailJS
            emailjs.send('service_2h1skb6', 'template_ego5s5c', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    console.log('Email sent successfully to:', formData.to_email);
                    
                    // Show success message
                    formMessage.className = 'form-message success';
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.<br><small>E-posta: ' + formData.to_email + '</small>';
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    console.error('EmailJS Error Details:', error);
                    
                    // Show detailed error message
                    formMessage.className = 'form-message error';
                    formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Mesaj gönderilirken bir hata oluştu.<br><small>Hata: ' + error.text + '</small><br><small>Lütfen tekrar deneyin veya doğrudan e-posta gönderin.</small>';
                    formMessage.style.display = 'block';
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                });
        });
    }
})();

// Medium RSS Feed Integration
(function() {
    const MEDIUM_USERNAME = 'abidinsamet0cay';
    const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
    
    // Try multiple RSS to JSON APIs as fallback
    const RSS_APIS = [
        {
            url: 'https://api.rss2json.com/v1/api.json',
            params: (rssUrl) => `rss_url=${encodeURIComponent(rssUrl)}`
        },
        {
            url: 'https://rss-to-json-serverless.vercel.app/api',
            params: (rssUrl) => `rssUrl=${encodeURIComponent(rssUrl)}`
        },
        {
            url: 'https://api.allorigins.win/get',
            params: (rssUrl) => `url=${encodeURIComponent(rssUrl)}&format=xml`
        }
    ];
    
    // Icon mapping based on keywords in title
    const getIconForPost = (title) => {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('aws') || titleLower.includes('amazon')) {
            return 'fab fa-aws';
        } else if (titleLower.includes('azure') || titleLower.includes('microsoft')) {
            return 'fab fa-microsoft';
        } else if (titleLower.includes('cloud') || titleLower.includes('bulut')) {
            return 'fas fa-cloud';
        } else if (titleLower.includes('network') || titleLower.includes('ağ') || titleLower.includes('osi') || titleLower.includes('tcp')) {
            return 'fas fa-network-wired';
        } else if (titleLower.includes('security') || titleLower.includes('güvenlik') || titleLower.includes('iam')) {
            return 'fas fa-shield-alt';
        } else if (titleLower.includes('database') || titleLower.includes('veri') || titleLower.includes('data')) {
            return 'fas fa-database';
        } else if (titleLower.includes('wifi') || titleLower.includes('iletişim') || titleLower.includes('communication')) {
            return 'fas fa-wifi';
        } else if (titleLower.includes('topology') || titleLower.includes('topoloji')) {
            return 'fas fa-project-diagram';
        } else if (titleLower.includes('server') || titleLower.includes('sunucu')) {
            return 'fas fa-server';
        } else if (titleLower.includes('breach') || titleLower.includes('ihlal') || titleLower.includes('hack')) {
            return 'fas fa-exclamation-triangle';
        } else {
            return 'fas fa-blog';
        }
    };
    
    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                       'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };
    
    // Strip HTML tags and get excerpt
    const getExcerpt = (content, maxLength = 150) => {
        if (!content) return '';
        const div = document.createElement('div');
        div.innerHTML = content;
        const text = div.textContent || div.innerText || '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
    
    // Parse RSS XML
    const parseRSS = (xmlString) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'text/xml');
        const items = xml.querySelectorAll('item');
        const posts = [];
        
        items.forEach(item => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            
            posts.push({
                title: title,
                link: link,
                description: description,
                pubDate: pubDate
            });
        });
        
        return posts;
    };
    
    // Try to fetch from different APIs
    const fetchMediumPosts = async () => {
        // Try RSS2JSON first
        try {
            const response = await fetch(`${RSS_APIS[0].url}?${RSS_APIS[0].params(MEDIUM_RSS_URL)}`);
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    return data.items.map(item => ({
                        title: item.title,
                        link: item.link,
                        description: item.content || item.description || '',
                        pubDate: item.pubDate
                    }));
                }
            }
        } catch (e) {
            console.log('RSS2JSON failed, trying alternative...');
        }
        
        // Try AllOrigins as fallback (gets raw RSS)
        try {
            const response = await fetch(`${RSS_APIS[2].url}?${RSS_APIS[2].params(MEDIUM_RSS_URL)}`);
            if (response.ok) {
                const data = await response.json();
                if (data.contents) {
                    const posts = parseRSS(data.contents);
                    if (posts.length > 0) {
                        return posts;
                    }
                }
            }
        } catch (e) {
            console.log('AllOrigins failed, trying direct fetch...');
        }
        
        // Try direct fetch (might fail due to CORS)
        try {
            const response = await fetch(MEDIUM_RSS_URL, { mode: 'no-cors' });
            // This won't work due to CORS, but we try anyway
        } catch (e) {
            console.log('Direct fetch failed');
        }
        
        throw new Error('Tüm RSS API\'leri başarısız oldu');
    };
    
    // Load Medium posts
    const loadMediumPosts = async () => {
        const blogGrid = document.getElementById('blogGrid');
        const blogLoading = document.getElementById('blogLoading');
        
        if (!blogGrid) return;
        
        try {
            // Show loading
            if (blogLoading) {
                blogLoading.style.display = 'flex';
            }
            
            // Fetch posts
            const posts = await fetchMediumPosts();
            
            if (posts && posts.length > 0) {
                // Hide loading
                if (blogLoading) {
                    blogLoading.style.display = 'none';
                }
                
                // Clear existing content
                blogGrid.innerHTML = '';
                
                // Create blog cards
                posts.slice(0, 12).forEach((item, index) => {
                    const blogCard = document.createElement('article');
                    blogCard.className = 'blog-card';
                    blogCard.style.opacity = '0';
                    blogCard.style.transform = 'translateY(30px)';
                    
                    const icon = getIconForPost(item.title);
                    const excerpt = getExcerpt(item.description);
                    const date = formatDate(item.pubDate);
                    
                    blogCard.innerHTML = `
                        <div class="blog-image">
                            <i class="${icon}"></i>
                        </div>
                        <div class="blog-content">
                            <h3>${item.title}</h3>
                            <p>${excerpt}</p>
                            <div class="blog-meta">
                                <span class="blog-date">${date}</span>
                                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="blog-read-more">Medium'da Oku</a>
                            </div>
                        </div>
                    `;
                    
                    blogGrid.appendChild(blogCard);
                    
                    // Animate in
                    setTimeout(() => {
                        blogCard.style.transition = 'all 0.6s ease';
                        blogCard.style.opacity = '1';
                        blogCard.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    // Add scroll animation observer
                    if (typeof observer !== 'undefined') {
                        observer.observe(blogCard);
                    }
                });
            } else {
                throw new Error('Blog yazıları bulunamadı');
            }
        } catch (error) {
            console.error('Medium RSS hatası:', error);
            if (blogLoading) {
                blogLoading.innerHTML = `
                    <div class="blog-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Blog yazıları yüklenirken bir hata oluştu.</p>
                        <p><small>${error.message}</small></p>
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--gray-medium);">
                            Medium RSS feed'i şu anda erişilebilir değil. Lütfen daha sonra tekrar deneyin.
                        </p>
                        <a href="https://medium.com/@${MEDIUM_USERNAME}" target="_blank" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">
                            <i class="fab fa-medium"></i> Medium Profilimi Ziyaret Et
                        </a>
                    </div>
                `;
            }
        }
    };
    
    // Load posts when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMediumPosts);
    } else {
        loadMediumPosts();
    }
})();

// GitHub Projects Integration
(function() {
    const GITHUB_USERNAME = 'abidin0samet';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`;

    // Get icon for language
    const getLanguageIcon = (language) => {
        const iconMap = {
            'JavaScript': 'fab fa-js',
            'TypeScript': 'fab fa-js-square',
            'Python': 'fab fa-python',
            'Java': 'fab fa-java',
            'HTML': 'fab fa-html5',
            'CSS': 'fab fa-css3-alt',
            'PHP': 'fab fa-php',
            'Ruby': 'fab fa-ruby',
            'Go': 'fas fa-code',
            'Rust': 'fas fa-code',
            'C++': 'fas fa-code',
            'C': 'fas fa-code',
            'C#': 'fab fa-microsoft',
            'Swift': 'fab fa-swift',
            'Kotlin': 'fab fa-android',
            'Dart': 'fas fa-code',
            'Shell': 'fas fa-terminal',
            'Vue': 'fab fa-vuejs',
            'React': 'fab fa-react',
            'Angular': 'fab fa-angular',
            'Svelte': 'fab fa-svelte',
            'Node.js': 'fab fa-node-js',
            'Docker': 'fab fa-docker',
            'Terraform': 'fas fa-code',
            'YAML': 'fas fa-file-code',
            'JSON': 'fas fa-file-code',
            'Markdown': 'fab fa-markdown',
            'R': 'fab fa-r-project',
            'MATLAB': 'fas fa-chart-line',
            'Scala': 'fas fa-code',
            'Haskell': 'fas fa-code',
            'Elixir': 'fas fa-code',
            'Lua': 'fas fa-code',
            'Perl': 'fas fa-code',
            'Objective-C': 'fab fa-apple',
            'Assembly': 'fas fa-microchip',
            'Sass': 'fab fa-sass',
            'SCSS': 'fab fa-sass',
            'Bootstrap': 'fab fa-bootstrap',
            'Flutter': 'fab fa-flutter',
            'React Native': 'fab fa-react',
            'Ionic': 'fab fa-ionic',
            'Unity': 'fab fa-unity',
            'Three.js': 'fas fa-cube',
            'D3.js': 'fas fa-chart-bar',
        };
        return iconMap[language] || 'fas fa-code';
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('tr-TR', options);
    };

    // Truncate description
    const truncateText = (text, maxLength = 120) => {
        if (!text) return 'Açıklama yok.';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Load GitHub projects
    const loadGitHubProjects = async () => {
        const projectsGrid = document.getElementById('projectsGrid');
        const projectsLoading = document.getElementById('projectsLoading');
        const projectsError = document.getElementById('projectsError');

        if (!projectsGrid) return;

        try {
            projectsLoading.style.display = 'flex';
            projectsError.style.display = 'none';
            projectsGrid.innerHTML = '';

            const response = await fetch(GITHUB_API_URL);
            if (!response.ok) {
                throw new Error(`GitHub API hatası: ${response.statusText}`);
            }

            const repos = await response.json();
            
            if (!repos || repos.length === 0) {
                throw new Error('Hiç proje bulunamadı.');
            }

            projectsLoading.style.display = 'none';

            repos.forEach((repo, index) => {
                const projectCard = document.createElement('article');
                projectCard.className = 'project-card animate-on-scroll';
                projectCard.style.animationDelay = `${index * 0.1}s`;
                projectCard.onclick = () => window.open(repo.html_url, '_blank', 'noopener,noreferrer');

                const language = repo.language || 'Diğer';
                const languageIcon = getLanguageIcon(language);
                const description = truncateText(repo.description || 'Açıklama yok.');

                projectCard.innerHTML = `
                    <div class="project-header">
                        <div class="project-icon">
                            <i class="${languageIcon}"></i>
                        </div>
                        <h3 class="project-title">${repo.name}</h3>
                    </div>
                    <p class="project-description">${description}</p>
                    <div class="project-meta">
                        <div class="project-stats">
                            <div class="project-stat">
                                <i class="fas fa-star"></i>
                                <span>${repo.stargazers_count || 0}</span>
                            </div>
                            <div class="project-stat">
                                <i class="fas fa-code-branch"></i>
                                <span>${repo.forks_count || 0}</span>
                            </div>
                            ${language !== 'Diğer' ? `<span class="project-language">${language}</span>` : ''}
                        </div>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation();">
                            GitHub'da Gör <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;

                projectsGrid.appendChild(projectCard);
                observer.observe(projectCard);
            });
        } catch (error) {
            console.error('GitHub projeleri yüklenirken hata oluştu:', error);
            projectsLoading.style.display = 'none';
            projectsError.style.display = 'flex';
            projectsError.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>Projeler yüklenemedi. Lütfen daha sonra tekrar deneyin veya <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">GitHub profilimi ziyaret edin</a>.</p>
                <small>Hata: ${error.message}</small>
            `;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGitHubProjects);
    } else {
        loadGitHubProjects();
    }
})();
