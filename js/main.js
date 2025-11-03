// ================================
// KGOTSHE KHU WEBSITE JAVASCRIPT
// Interactive functionality & animations
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    initMobileNavigation();

    // Portfolio/Shop Filter System
    initFilterSystem();

    // Shopping Cart Functionality
    initShoppingCart();

    // Contact Form Handler
    initContactForm();

    // FAQ Accordion
    initFAQAccordion();

    // Newsletter Signup
    initNewsletterSignup();

    // Smooth Scrolling for Internal Links
    initSmoothScrolling();

    // Animation on Scroll
    initScrollAnimations();

});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Filter System for Portfolio, Shop, and Journal
function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const targetContainer = findTargetContainer();

            if (!targetContainer) return;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            filterItems(targetContainer, filter);
        });
    });
}

function findTargetContainer() {
    // Check for different page types
    if (document.querySelector('.portfolio-items')) {
        return document.querySelector('.portfolio-items');
    } else if (document.querySelector('.products')) {
        return document.querySelector('.products');
    } else if (document.querySelector('.blog-posts')) {
        return document.querySelector('.blog-posts');
    }
    return null;
}

function filterItems(container, filter) {
    const items = container.querySelectorAll('[data-category]');

    items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

// Shopping Cart Functionality
function initShoppingCart() {
    let cartItems = JSON.parse(localStorage.getItem('kgoTsheKhuCart')) || [];
    let cartTotal = 0;

    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    // Add to cart functionality
    addToCartBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('h4').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent;

            const product = {
                id: Date.now(), // Simple ID generation
                name: productName,
                price: productPrice,
                quantity: 1
            };

            addToCart(product);
            showCartNotification(productName);
        });
    });

    // Close cart
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    function addToCart(product) {
        // Check if item already exists
        const existingItem = cartItems.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(product);
        }

        localStorage.setItem('kgoTsheKhuCart', JSON.stringify(cartItems));
        updateCartDisplay();
    }

    function showCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${productName} added to cart!`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 1rem;
            border-radius: 4px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function closeCart() {
        if (cartSidebar) cartSidebar.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('open');
    }

    function updateCartDisplay() {
        // This would update the cart sidebar with current items
        // Implementation depends on your specific cart HTML structure
        console.log('Cart updated:', cartItems);
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);

            // Basic validation
            if (!formObject.name || !formObject.email || !formObject.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            submitContactForm(formObject);
        });
    }
}

function submitContactForm(formData) {
    // Show loading state
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        document.getElementById('contact-form').reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        console.log('Form submitted:', formData);
    }, 1500);
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
        ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
        ${type === 'error' ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
    `;

    const form = document.getElementById('contact-form');
    form.insertBefore(messageDiv, form.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains('open');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });

            // Toggle current item
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });
}

// Newsletter Signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate newsletter signup
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNewsletterMessage('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

function showNewsletterMessage(message, type) {
    const newsletterSection = document.querySelector('.newsletter-signup');
    if (!newsletterSection) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        ${type === 'success' ? 'color: #155724; background: rgba(212, 237, 218, 0.8);' : ''}
        ${type === 'error' ? 'color: #721c24; background: rgba(248, 215, 218, 0.8);' : ''}
    `;

    const existingMessage = newsletterSection.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    newsletterSection.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .work-item,
        .product-item,
        .blog-post,
        .portfolio-item,
        .value-item,
        .service-item,
        .feed-item
    `);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility Functions
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

// Load More Functionality (for Journal page)
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-section button');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more posts
            this.textContent = 'Loading...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = 'Load More Posts';
                this.disabled = false;
                // Here you would typically load more content via AJAX
                console.log('Loading more content...');
            }, 1000);
        });
    }
}

// Initialize additional features when needed
document.addEventListener('DOMContentLoaded', function() {
    initLoadMore();

    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .cart-notification {
            animation: slideIn 0.3s ease-out;
        }

        .fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
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
    document.head.appendChild(style);
});

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileNavigation,
        initFilterSystem,
        initShoppingCart,
        initContactForm,
        initFAQAccordion,
        initNewsletterSignup,
        initSmoothScrolling,
        initScrollAnimations
    };
}