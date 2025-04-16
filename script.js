// Cart Data Structure
let cart = [];

// DOM Elements
const cartIcon = document.querySelector('.fa-shopping-bag');
const cartModal = document.getElementById('cartModal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');

// Sample Products Data
const products = [
    {
        id: 1,
        name: "Men's Black T-Shirt",
        price: 399,
        image: "https://images.bewakoof.com/t540/men-s-black-slim-fit-typography-t-shirt-597709-1704453198-1.jpg"
    },
    {
        id: 2,
        name: "Women's Pink Hoodie",
        price: 799,
        image: "https://images.bewakoof.com/t540/women-s-pink-oversized-hoodie-597711-1704453200-1.jpg"
    }
];

// Event Listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);

// Initialize product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(products[index]);
    });
    card.appendChild(addToCartBtn);
});

// Cart Functions
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    // Update cart items display
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price} x ${item.quantity}</div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">Remove</div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart total
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = totalAmount;
    
    // Update cart icon in header
    document.querySelector('.fa-shopping-bag').parentElement.setAttribute('data-count', totalItems);
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function openCart() {
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

// Product Image Thumbnail Click Handler
if (document.querySelector('.thumbnail-container')) {
    document.querySelectorAll('.thumbnail-container img').forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.getElementById('mainImage').src = this.src;
        });
    });
}

// Size Selection
if (document.querySelector('.sizes')) {
    document.querySelectorAll('.sizes button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sizes button').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Global function for removeFromCart
window.removeFromCart = removeFromCart;