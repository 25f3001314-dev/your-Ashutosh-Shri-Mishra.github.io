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

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!name || !email || !message) {
        alert('Please fill all fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email!');
        return;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:your.email@example.com?subject=Message from ${name}&body=From: ${email}%0A%0AMessage:%0A${message}`;
    
    // Show success message
    alert('Thank you for your message! Your email client will open to send the message.');
    window.location.href = mailtoLink;
    
    // Reset form
    this.reset();
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Observe research items
document.querySelectorAll('.research-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Active nav link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    });
}

// Dark mode toggle (optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Lazy load images
document.querySelectorAll('img[data-src]').forEach(img => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    imageObserver.observe(img);
});

console.log('Portfolio website loaded successfully!');

// View CV sidebar toggle
const cvSidebar = document.getElementById('cvSidebar');
const cvSidebarToggle = document.getElementById('openCVModal'); // The VIEW CV tab button
const cvSidebarPanel = document.getElementById('cvSidebarPanel');

// CV Modal functionality
const cvModalOverlay = document.getElementById('cvModalOverlay');
const cvModal = document.getElementById('cvModal');
const openCVModalBtn = document.getElementById('openCVModal');
const openCVModalPanelBtn = document.getElementById('openCVModalPanel');
const closeCVModalBtn = document.getElementById('closeCVModal');

let panelOpen = false;

if (cvModal) {
    cvModal.setAttribute('tabindex', '-1');
}

// Sidebar panel toggle logic
if (cvSidebarToggle && cvSidebarPanel && cvSidebar) {
    cvSidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        panelOpen = !panelOpen;
        if (panelOpen) {
            cvSidebar.classList.add('modal-open');
            cvSidebarPanel.setAttribute('aria-hidden', 'false');
        } else {
            cvSidebar.classList.remove('modal-open');
            cvSidebarPanel.setAttribute('aria-hidden', 'true');
        }
    });
    // Optional: close panel if user clicks outside panel (desktop only)
    document.addEventListener('click', (e) => {
        if (panelOpen && !cvSidebar.contains(e.target)) {
            panelOpen = false;
            cvSidebar.classList.remove('modal-open');
            cvSidebarPanel.setAttribute('aria-hidden', 'true');
        }
    });
}

// Open CV button inside panel opens modal
if (openCVModalPanelBtn) {
    openCVModalPanelBtn.addEventListener('click', () => {
        panelOpen = false;
        cvSidebar.classList.remove('modal-open');
        cvSidebarPanel.setAttribute('aria-hidden', 'true');
        openCVModal();
    });
}

if (closeCVModalBtn) {
    closeCVModalBtn.addEventListener('click', () => {
        closeCVModal();
    });
}

if (cvModalOverlay) {
    // Close modal when clicking on overlay background
    cvModalOverlay.addEventListener('click', (event) => {
        if (event.target === cvModalOverlay) {
            closeCVModal();
        }
    });
}

// Keyboard escape key to close modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && cvModalOverlay && cvModalOverlay.classList.contains('open')) {
        closeCVModal();
    }
});

function openCVModal() {
    if (cvModalOverlay) {
        cvModalOverlay.classList.add('open');
        document.body.classList.add('modal-open');
        cvModal.focus();
    }
}

function closeCVModal() {
    if (cvModalOverlay) {
        cvModalOverlay.classList.remove('open');
        document.body.classList.remove('modal-open');
        if (openCVModalBtn) {
            openCVModalBtn.focus();
        }
    }
}
