// Products Page Filtering and Sorting

// Get all filter buttons and product cards
const filterButtons = document.querySelectorAll('.filter-btn[data-category]');
const priceFilters = document.querySelectorAll('.filter-btn[data-price]');
const woodCheckboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
const productCards = document.querySelectorAll('.product-card');
const sortSelect = document.getElementById('sort');
const resetButton = document.querySelector('.reset-filters');
const resultsCount = document.querySelector('.results-count');

let activeCategory = 'all';
let activePriceRange = null;
let activeWoodTypes = [];

// Category Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get selected category
        activeCategory = button.getAttribute('data-category');

        // Apply filters
        applyFilters();
    });
});

// Price Range Filtering
priceFilters.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle active state
        if (button.classList.contains('active')) {
            button.classList.remove('active');
            activePriceRange = null;
        } else {
            priceFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activePriceRange = button.getAttribute('data-price');
        }

        // Apply filters
        applyFilters();
    });
});

// Wood Type Filtering
woodCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateWoodTypes();
        applyFilters();
    });
});

function updateWoodTypes() {
    activeWoodTypes = Array.from(woodCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
}

// Apply all active filters
function applyFilters() {
    let visibleCount = 0;

    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardPrice = parseInt(card.getAttribute('data-price'));

        // Category filter
        let categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;

        // Price filter
        let priceMatch = true;
        if (activePriceRange) {
            if (activePriceRange === '0-200') {
                priceMatch = cardPrice < 200;
            } else if (activePriceRange === '200-400') {
                priceMatch = cardPrice >= 200 && cardPrice < 400;
            } else if (activePriceRange === '400-600') {
                priceMatch = cardPrice >= 400 && cardPrice < 600;
            } else if (activePriceRange === '600+') {
                priceMatch = cardPrice >= 600;
            }
        }

        // Wood type filter (placeholder - would need actual data)
        let woodMatch = activeWoodTypes.length === 0; // Show all if no wood type selected

        // Show/hide card
        if (categoryMatch && priceMatch && woodMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update results count
    updateResultsCount(visibleCount);
}

// Sorting
sortSelect.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    sortProducts(sortValue);
});

function sortProducts(sortValue) {
    const grid = document.getElementById('productsGrid');
    const cardsArray = Array.from(productCards);

    cardsArray.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));

        switch(sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'featured':
            case 'newest':
            case 'popular':
            default:
                return 0; // Keep original order
        }
    });

    // Clear grid and re-append sorted cards
    grid.innerHTML = '';
    cardsArray.forEach(card => grid.appendChild(card));
}

// Reset Filters
resetButton.addEventListener('click', () => {
    // Reset category filter
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active'); // Activate "All Products"
    activeCategory = 'all';

    // Reset price filter
    priceFilters.forEach(btn => btn.classList.remove('active'));
    activePriceRange = null;

    // Reset wood type filter
    woodCheckboxes.forEach(cb => cb.checked = false);
    activeWoodTypes = [];

    // Reset sort
    sortSelect.value = 'featured';

    // Apply filters
    applyFilters();

    // Show toast
    showToast('Filters reset');
});

// Update results count
function updateResultsCount(count) {
    resultsCount.textContent = `Showing ${count} products`;
}

// Check URL parameters for initial category
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        const categoryButton = document.querySelector(`.filter-btn[data-category="${categoryParam}"]`);
        if (categoryButton) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            categoryButton.classList.add('active');
            activeCategory = categoryParam;
            applyFilters();
        }
    }
});

// Show toast notification (using the main toast function from script.js if available)
function showToast(message) {
    if (typeof window.showToast === 'function') {
        window.showToast(message);
    } else {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }
}
