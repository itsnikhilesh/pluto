// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const dishCards = document.querySelectorAll('.dish-card');
const testimonialDots = document.querySelectorAll('.dot');
const testimonials = document.querySelectorAll('.testimonial');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

// Initialize cart count from localStorage or set to 0
let cart = JSON.parse(localStorage.getItem('plutoCart')) || [];
updateCartCount();

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    document.body.classList.toggle('menu-open');

    // Animate hamburger to X
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
        hamburger.innerHTML = `<span></span><span></span><span></span>`;
        hamburger.querySelectorAll('span').forEach((span, index) => {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        });
    } else {
        hamburger.innerHTML = `<span></span><span></span><span></span>`;
        hamburger.querySelectorAll('span').forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.innerHTML = `<span></span><span></span><span></span>`;
            hamburger.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Filter Dishes
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Show/hide dishes based on filter
        dishCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Testimonial Slider
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        testimonialDots.forEach(d => d.classList.remove('active'));

        // Add active class to clicked dot
        dot.classList.add('active');

        // Show corresponding testimonial
        showTestimonial(index);
    });
});

// Auto rotate testimonials
let currentTestimonial = 0;
const testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

function showTestimonial(index) {
    // Update active dot
    testimonialDots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Move testimonial slider
    document.querySelector('.testimonials-slider').style.transform = `translateX(-${index * 100}%)`;
}

// Add to Cart Functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Get product info
        const card = e.target.closest('.dish-card');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        const productImage = card.querySelector('img').src;

        // Create product object
        const product = {
            id: Date.now(), // Using timestamp as a unique ID
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        // Add to cart
        addToCart(product);

        // Show confirmation
        showAddedToCartMessage(productName);
    });
});

function addToCart(product) {
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        // Increase quantity if product already in cart
        cart[existingProductIndex].quantity++;
    } else {
        // Add new product to cart
        cart.push(product);
    }

    // Save cart to localStorage
    localStorage.setItem('plutoCart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;

    // Animate cart icon when count changes
    cartCount.classList.add('pulse');
    setTimeout(() => {
        cartCount.classList.remove('pulse');
    }, 300);
}

function showAddedToCartMessage(productName) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'toast-message';
    messageEl.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${productName} added to cart!</p>
    `;

    // Add to body
    document.body.appendChild(messageEl);

    // Add active class after a small delay (for animation)
    setTimeout(() => {
        messageEl.classList.add('active');
    }, 10);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.classList.remove('active');
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjusting for header height
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements when they enter viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.category-card, .dish-card, .step, .hero-content, .hero-image, .app-content, .app-image, .offers-content, .offers-image');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Add CSS animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Add animation class to initially visible elements
window.addEventListener('load', () => {
    // Add animation class to header elements
    document.querySelector('header').classList.add('loaded');

    // Add animation to hero section
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach(el => el.classList.add('animate'));
});

// Add toast message CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .toast-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #fff;
        color: var(--dark-color);
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .toast-message.active {
        transform: translateY(0);
        opacity: 1;
    }

    .toast-message i {
        color: var(--success-color);
        font-size: 1.5rem;
    }

    .pulse {
        animation: pulse 0.3s ease-in-out;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }

    .animate {
        animation: fadeInUp 0.8s ease-out forwards;
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

    body.loaded .hero-content,
    body.loaded .hero-image {
        animation: fadeInUp 0.8s ease-out forwards;
    }
`;

document.head.appendChild(style);
