// ========== MOBILE NAVIGATION ==========
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
let isMenuOpen = false;

mobileToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');

    if (isMenuOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.navbar')) {
        isMenuOpen = false;
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        document.body.style.overflow = '';
    }
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll (mobile)
    if (window.innerWidth <= 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }

    lastScroll = currentScroll;
});

// Reset navbar position on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.style.transform = '';
    }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight + 20;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== TESTIMONIALS SLIDER ==========
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDotsContainer = document.getElementById('testimonialDots');
let currentTestimonial = 0;
let testimonialInterval;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        showTestimonial(index);
        resetTestimonialInterval();
    });
    testimonialDotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Auto-rotate testimonials
testimonialInterval = setInterval(nextTestimonial, 5000);

// Touch swipe for testimonials (mobile)
let touchStartX = 0;
let touchEndX = 0;

const testimonialsSlider = document.getElementById('testimonialsSlider');

testimonialsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

testimonialsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        } else {
            // Swipe right - previous
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        }
        showTestimonial(currentTestimonial);
        resetTestimonialInterval();
    }
}

// ========== EVENTS DATA ==========
const events = [
    {
        title: 'Grand Wedding Expo 2024',
        date: '2024-07-15',
        description: 'Join us for the biggest wedding expo showcasing top vendors and planners.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
        time: '10:00 AM - 8:00 PM',
        guests: '500+ Expected'
    },
    {
        title: 'Corporate Leadership Summit',
        date: '2024-08-20',
        description: 'Annual leadership summit featuring industry experts and networking sessions.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
        time: '9:00 AM - 6:00 PM',
        guests: '300+ Attendees'
    },
    {
        title: 'Diwali Celebration Night',
        date: '2024-11-01',
        description: 'Experience the magic of Diwali with cultural performances and grand feast.',
        image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600',
        time: '6:00 PM - 12:00 AM',
        guests: '1000+ Guests'
    }
];

// Render events
const eventsGrid = document.getElementById('eventsGrid');
events.forEach(event => {
    const eventDate = new Date(event.date);
    const month = eventDate.toLocaleString('default', { month: 'short' });
    const day = eventDate.getDate();

    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.title}" loading="lazy">
        </div>
        <div class="event-content">
            <span class="event-date">${month} ${day}, ${eventDate.getFullYear()}</span>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-meta">
                <span><i class="fas fa-clock"></i> ${event.time}</span>
                <span><i class="fas fa-users"></i> ${event.guests}</span>
            </div>
        </div>
    `;
    eventsGrid.appendChild(card);
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    const icon = toast.querySelector('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    icon.style.color = type === 'success' ? '#28a745' : '#dc3545';
    toast.classList.add('show');

    // Auto hide after 3 seconds
    setTimeout(() => toast.classList.remove('show'), 3000);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        eventType: document.getElementById('eventType').value,
        eventDate: document.getElementById('eventDate').value,
        message: document.getElementById('message').value
    };

    try {
        // Send to backend API
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showToast('Enquiry sent successfully! We will contact you soon.');
            contactForm.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        // Fallback: store in localStorage for demo
        const enquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
        enquiries.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
        localStorage.setItem('enquiries', JSON.stringify(enquiries));
        showToast('Enquiry saved! (Backend not connected - saved locally)');
        contactForm.reset();
    }

    submitBtn.innerHTML = originalContent;
    submitBtn.disabled = false;
});

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
        showToast('Thank you for subscribing!');
        newsletterForm.reset();
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .event-card, .gallery-item, .about-image, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========== GALLERY LIGHTBOX ==========
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay ? overlay.querySelector('h4').textContent : '';

        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
            padding: 20px;
        `;
        lightbox.innerHTML = `
            <div style="text-align: center; max-width: 100%; max-height: 100%;">
                <img src="${img.src}" style="max-width: 100%; max-height: 80vh; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                <p style="color: white; margin-top: 15px; font-size: 1.2rem; font-family: 'Playfair Display', serif;">${title}</p>
            </div>
        `;

        // Close on click
        lightbox.addEventListener('click', () => lightbox.remove());

        // Close on escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Restore scroll on close
        lightbox.addEventListener('click', () => {
            document.body.style.overflow = '';
        });
    });
});

// ========== PARALLAX EFFECT ON HERO ==========
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            if (hero && scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== FORM VALIDATION ==========
const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.checkValidity()) {
            input.style.borderColor = '#28a745';
        } else if (input.value) {
            input.style.borderColor = '#dc3545';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '';
    });
});

// ========== PERFORMANCE: Debounce scroll events ==========
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

// ========== CONSOLE MESSAGE ==========
console.log('%c🎉 Shrutham Convention', 'font-size: 24px; font-weight: bold; color: #e94560;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #c9a227;');
