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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
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
    const animateElements = document.querySelectorAll('.section-header, .about-content, .cert-card, .timeline-item, .blog-card, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Restart typing animation when scrolling to top
let isTyping = false;
let typingTimeout;

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('#home');
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroSection && heroTitle) {
        const heroRect = heroSection.getBoundingClientRect();
        const isAtTop = heroRect.top >= -100 && heroRect.top <= 100;
        
        if (isAtTop && !isTyping) {
            // Clear any existing timeout
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            
            isTyping = true;
            const originalText = heroTitle.textContent;
            
            // Start typing animation after a short delay
            typingTimeout = setTimeout(() => {
                typeWriter(heroTitle, originalText, 80);
                
                // Reset typing flag after animation completes
                setTimeout(() => {
                    isTyping = false;
                }, originalText.length * 80 + 500);
            }, 300);
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
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

// Binary code animation
document.addEventListener('DOMContentLoaded', () => {
    const binaryElements = document.querySelectorAll('.binary-code span');
    binaryElements.forEach((element, index) => {
        setInterval(() => {
            const randomBinary = Math.random().toString(2).substring(2, 10);
            element.textContent = randomBinary;
        }, 2000 + (index * 500));
    });
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

// Certificate card flip animation
function flipCard(card) {
    const cardInner = card.querySelector('.cert-card-inner');
    cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

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
                to_email: 'asasferfer4566@gmail.com' // Your email address
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
