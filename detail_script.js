let product = JSON.parse(localStorage.getItem("productDetail"));

// Helper: render dynamic stars (fontawesome)
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1) >= 0.5;
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fa-solid fa-star"></i>';
    if (halfStar) starsHtml += '<i class="fa-solid fa-star-half-alt"></i>';
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="fa-regular fa-star"></i>';
    return starsHtml;
}

// populate UI with product details
function populateProductDetails() {
    if (!product) return; // Safeguard if page is opened directly without state
    
    document.getElementById('productName').innerText = product.name;
    document.getElementById('productPrice').innerText = product.price;
    document.getElementById('oldPrice').innerHTML = `₹${product.oldPrice || ''}`;
    
    // Fixed: mapping incoming field 'desc' to HTML container
    document.getElementById('productDesc').innerText = product.desc || product.description; 
    document.getElementById('productImg').src = product.image;
    document.getElementById('productImg').alt = product.name;
    
    // Calculating discount percentage dynamically if missing in object
    const discountPercent = product.discountPercent || Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    document.getElementById('discountBadge').innerText = `SAVE ${discountPercent}%`;
    
    const reviewsCount = product.reviewsCount || product.reviews || 0;
    document.getElementById('reviewCount').innerHTML = `${product.rating} · ${reviewsCount.toLocaleString()} reviews`;
    
    const starsContainer = document.getElementById('starRating');
    if (starsContainer) starsContainer.innerHTML = renderStars(product.rating);
}

// Quantity logic
let currentQuantity = 1;
const qtySpan = document.getElementById('qtyValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');

function updateQuantityDisplay() {
    qtySpan.innerText = currentQuantity;
}

function incrementQty() {
    currentQuantity++;
    updateQuantityDisplay();
    animateButton(incrementBtn);
}

function decrementQty() {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
        animateButton(decrementBtn);
    } else {
        showSnackbar("Minimum quantity is 1", false);
    }
}

// simple micro animation on buttons
function animateButton(btn) {
    if (!btn) return;
    btn.classList.add('btn-clicked');
    setTimeout(() => btn.classList.remove('btn-clicked'), 120);
}

// Snackbar service (improved)
let snackbarTimeout;
function showSnackbar(message, isSuccess = true) {
    const snackbar = document.getElementById('snackbar');
    const msgSpan = document.getElementById('snackbarMsg');
    const iconElem = snackbar.querySelector('i');

    if (snackbarTimeout) clearTimeout(snackbarTimeout);

    msgSpan.innerText = message;
    if (isSuccess) {
        iconElem.className = "fa-regular fa-circle-check";
        snackbar.style.background = "#1e293be6";
    } else {
        iconElem.className = "fa-solid fa-triangle-exclamation";
        snackbar.style.background = "#b91c1ce6";
    }

    snackbar.classList.add('show');
    snackbarTimeout = setTimeout(() => {
        snackbar.classList.remove('show');
    }, 2400);
}

// Add to cart handler (with quantity + product)
function handleAddToCart() {
    if (!product) return;
    const totalPrice = product.price * currentQuantity;
    const message = `${currentQuantity} × ${product.name} added · ₹${totalPrice.toLocaleString()}`;
    showSnackbar(message, true);
    animateButton(document.getElementById('addToCartBtn'));
    console.log(`[CART] Added ${currentQuantity} of ${product.name}`);
}

// Buy now handler => order placed snackbar
function handleBuyNow() {
    if (!product) return;
    const totalAmount = product.price * currentQuantity;
    showSnackbar(`🎉 Order placed! Total ₹${totalAmount.toLocaleString()}`, true);
    animateButton(document.getElementById('buyNowBtn'));
}

// Attach event listeners
function attachEvents() {
    if (incrementBtn) incrementBtn.addEventListener('click', incrementQty);
    if (decrementBtn) decrementBtn.addEventListener('click', decrementQty);
    
    const cartBtn = document.getElementById('addToCartBtn');
    if (cartBtn) cartBtn.addEventListener('click', handleAddToCart);
    
    const buyBtn = document.getElementById('buyNowBtn');
    if (buyBtn) buyBtn.addEventListener('click', handleBuyNow);
}

// Safeguard for image error
setImageFallback = () => {
    const imgElement = document.getElementById('productImg');
    if (imgElement) {
        imgElement.onerror = function () {
            this.src = 'https://placehold.co/600x500/eef2ff/0d6efd?text=UrbanCart+Product';
        };
    }
}

// Initialize page
function initDetailPage() {
    populateProductDetails();
    attachEvents();
    setImageFallback();
    currentQuantity = 1;
    updateQuantityDisplay();
}

// run after DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDetailPage);
} else {
    initDetailPage();
}