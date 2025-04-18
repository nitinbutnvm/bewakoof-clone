// Cart Data Structure

let cart = [];

// Fake auth demo
function login() {
    localStorage.setItem('user', 'Nitin');
    alert("Welcome Nitin!");
  }

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

// Initialize - Hide cart modal by default
cartModal.style.display = 'none';

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
    
    // Auto-close cart after 2 seconds
    setTimeout(() => {
        closeCartModal();
    }, 2000);
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

function openCart(e) {
    e.preventDefault();
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

// Login System
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
  }
  
  function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
  }
  
  function login() {
    const email = document.getElementById('loginEmail').value;
    localStorage.setItem('user', email.split('@')[0]);
    alert(`Welcome ${email.split('@')[0]}!`);
    closeLogin();
  }
  
  // Attach Events
  document.querySelector('.fa-user').addEventListener('click', showLogin);
  document.querySelector('.close-login').addEventListener('click', closeLogin);



// Login System
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');

// Open modal when user icon clicked
document.querySelector('.fa-user').addEventListener('click', () => {
  loginModal.style.display = 'block';
});

// Close modal
document.querySelector('.close-login').addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Login function
loginBtn.addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if(email && password) {
    localStorage.setItem('loggedInUser', email);
    alert(`Welcome back! ${email}`);
    loginModal.style.display = 'none';
    
    // Update UI
    document.querySelector('.fa-user').classList.add('logged-in');
  } else {
    alert('Please enter both email and password!');
  }
});

// Check if user is already logged in
if(localStorage.getItem('loggedInUser')) {
  document.querySelector('.fa-user').classList.add('logged-in');
}
// Checkout Functions
function renderCheckoutItems() {
    if (!document.getElementById('checkoutItems')) return;
    
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
        `;
        checkoutItems.appendChild(itemElement);
    });
    
    document.getElementById('checkoutTotal').textContent = `₹${calculateTotal()}`;
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Place Order Button
if (document.getElementById('placeOrderBtn')) {
    document.getElementById('placeOrderBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert(`Order placed successfully!\nTotal: ₹${calculateTotal()}`);
        cart = [];
        updateCart();
        window.location.href = 'index.html';
    });
}

// When checkout page loads
if (window.location.pathname.includes('checkout.html')) {
    renderCheckoutItems();
}

// Global function for removeFromCart
window.removeFromCart = removeFromCart;

