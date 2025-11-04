// ===============================================
// Image Gallery Functionality
// ===============================================

const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const imageZoomBtn = document.querySelector('.image-zoom-btn');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

// Thumbnail click handler
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const newImageSrc = thumbnail.getAttribute('data-image');
        mainImage.src = newImageSrc;

        // Update active state
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});

// Image zoom functionality
imageZoomBtn.addEventListener('click', () => {
    modalImage.src = mainImage.src;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
modalClose.addEventListener('click', closeModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeModal();
    }
});

function closeModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===============================================
// Wishlist Functionality
// ===============================================

const wishlistBtn = document.querySelector('.wishlist-btn');
let isWishlisted = false;

wishlistBtn.addEventListener('click', () => {
    isWishlisted = !isWishlisted;

    if (isWishlisted) {
        wishlistBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
        wishlistBtn.style.color = '#f44336';
        wishlistBtn.style.borderColor = '#f44336';
        showToast('Added to wishlist!');
    } else {
        wishlistBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
        wishlistBtn.style.color = '';
        wishlistBtn.style.borderColor = '';
        showToast('Removed from wishlist');
    }
});

// ===============================================
// Quantity Controls
// ===============================================

const qtyInput = document.querySelector('.qty-input');
const minusBtn = document.querySelector('.qty-btn.minus');
const plusBtn = document.querySelector('.qty-btn.plus');

minusBtn.addEventListener('click', () => {
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
});

plusBtn.addEventListener('click', () => {
    let currentValue = parseInt(qtyInput.value);
    if (currentValue < 10) {
        qtyInput.value = currentValue + 1;
    }
});

// Prevent invalid input
qtyInput.addEventListener('input', (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
        e.target.value = 1;
    } else if (value > 10) {
        e.target.value = 10;
    }
});

// ===============================================
// Wood Type Selection
// ===============================================

const woodOptions = document.querySelectorAll('.wood-option');

woodOptions.forEach(option => {
    option.addEventListener('click', () => {
        woodOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// ===============================================
// Custom Text Character Count
// ===============================================

const customTextarea = document.getElementById('custom-text');
const charCount = document.querySelector('.char-count');

customTextarea.addEventListener('input', (e) => {
    const currentLength = e.target.value.length;
    charCount.textContent = `${currentLength}/100`;

    if (currentLength > 90) {
        charCount.style.color = '#f44336';
    } else {
        charCount.style.color = '';
    }
});

// ===============================================
// Add to Cart Functionality
// ===============================================

const addToCartBtn = document.querySelector('.add-to-cart-btn');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value);
    const engravingStyle = document.getElementById('engraving-style').value;
    const woodType = document.querySelector('.wood-option.active').getAttribute('data-wood');
    const customText = customTextarea.value;

    // Create cart item object
    const cartItem = {
        product: 'Engraved Rustic Coasters',
        quantity: quantity,
        price: 200,
        engraving: engravingStyle,
        wood: woodType,
        customText: customText
    };

    console.log('Added to cart:', cartItem);

    // Update cart count
    cartItems += quantity;
    cartCount.textContent = cartItems;

    // Show success toast
    showToast(`Added ${quantity} item(s) to cart!`);

    // Add animation to cart icon
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.animation = 'none';
    setTimeout(() => {
        cartBtn.style.animation = 'bounce 0.5s ease';
    }, 10);
});

// Buy Now functionality
const buyNowBtn = document.querySelector('.buy-now-btn');
buyNowBtn.addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value);
    showToast(`Proceeding to checkout with ${quantity} item(s)...`);
    // In a real application, this would redirect to checkout
    setTimeout(() => {
        console.log('Redirecting to checkout...');
    }, 1500);
});

// ===============================================
// Product Tabs
// ===============================================

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');

        // Scroll to tabs section smoothly
        const tabsSection = document.querySelector('.product-tabs');
        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// ===============================================
// Share Functionality
// ===============================================

const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.getAttribute('data-platform');
        const url = window.location.href;
        const title = 'Engraved Rustic Coasters - KgoTsheKhu';

        let shareUrl;

        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
            case 'pinterest':
                const imageUrl = mainImage.src;
                shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`;
                window.open(shareUrl, '_blank', 'width=600,height=400');
                break;
        }
    });
});

// Copy link functionality
const copyLinkBtn = document.querySelector('.copy-link');
copyLinkBtn.addEventListener('click', () => {
    const url = window.location.href;

    // Try to use the Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyTextToClipboard(url);
        });
    } else {
        fallbackCopyTextToClipboard(url);
    }
});

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy link');
    }

    document.body.removeChild(textArea);
}

// ===============================================
// Write Review Functionality
// ===============================================

const writeReviewBtn = document.querySelector('.write-review-btn');

writeReviewBtn.addEventListener('click', () => {
    showToast('Review form coming soon!');
    // In a real application, this would open a review modal
    console.log('Opening review form...');
});

// ===============================================
// Quick View Functionality
// ===============================================

const quickViewBtns = document.querySelectorAll('.quick-view');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Quick view coming soon!');
        // In a real application, this would open a product quick view modal
    });
});

// ===============================================
// Newsletter Form
// ===============================================

const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;

    if (email) {
        showToast('Thank you for subscribing!');
        newsletterForm.querySelector('input').value = '';
        console.log('Newsletter subscription:', email);
    }
});

// ===============================================
// Mobile Menu Toggle
// ===============================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Toggle hamburger animation
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// ===============================================
// Toast Notification Helper
// ===============================================

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===============================================
// Scroll Effects
// ===============================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow to header on scroll
    if (currentScroll > 0) {
        header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ===============================================
// Smooth Scroll for Anchor Links
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===============================================
// Image Loading Animation
// ===============================================

const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease';
    });
});

// ===============================================
// Keyboard Accessibility
// ===============================================

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (imageModal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===============================================
// Price Calculation Based on Quantity
// ===============================================

qtyInput.addEventListener('change', updatePrice);

function updatePrice() {
    const quantity = parseInt(qtyInput.value);
    const basePrice = 200;
    const totalPrice = basePrice * quantity;

    console.log(`Total price for ${quantity} items: R ${totalPrice.toFixed(2)}`);
    // In a real application, you might want to display this total price
}

// ===============================================
// Form Validation
// ===============================================

const emailInputs = document.querySelectorAll('input[type="email"]');

emailInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#f44336';
        } else {
            e.target.style.borderColor = '';
        }
    });
});

// ===============================================
// Lazy Loading for Images
// ===============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===============================================
// Bounce Animation for Cart
// ===============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

// ===============================================
// Product Data (for future cart functionality)
// ===============================================

const productData = {
    id: 'coaster-001',
    name: 'Engraved Rustic Coasters',
    basePrice: 200,
    originalPrice: 280,
    discount: 29,
    inStock: true,
    sku: 'KGTS-COAST-001',
    images: [
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1604762524889-8b8d9e14c8d7?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1544948950-fa07a98b0225?w=800&h=800&fit=crop'
    ],
    options: {
        engravingStyles: ['mom', 'family', 'custom'],
        woodTypes: ['oak', 'walnut', 'maple']
    }
};

// ===============================================
// Initialize on Page Load
// ===============================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('KgoTsheKhu website loaded successfully!');
    console.log('Product:', productData.name);

    // Add any initialization code here
    updatePrice();
});

// ===============================================
// Search Functionality (Basic Implementation)
// ===============================================

const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        showToast('Search functionality coming soon!');
        // In a real application, this would open a search modal or redirect
    });
}

// ===============================================
// Local Storage for Cart (Optional Enhancement)
// ===============================================

function saveCartToLocalStorage() {
    const cart = {
        items: cartItems,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('kgotshekhu_cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('kgotshekhu_cart');
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        cartItems = cart.items || 0;
        cartCount.textContent = cartItems;
    }
}

// Load cart on page load
loadCartFromLocalStorage();

// Update localStorage when cart changes
addToCartBtn.addEventListener('click', () => {
    setTimeout(saveCartToLocalStorage, 100);
});
