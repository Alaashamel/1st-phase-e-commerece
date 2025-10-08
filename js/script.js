// Enhanced JavaScript with Auth System, Toast, and Dynamic Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Initialize sample data if empty
function initializeSampleData() {
    if (products.length === 0) {
        products = [
            {
                id: 1,
                name: "Classic White T-Shirt",
                price: 24.99,
                category: "men",
                rating: 4,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Premium quality cotton t-shirt that offers exceptional comfort and durability.",
                details: ["100% Premium Cotton", "Machine Washable", "Regular Fit", "Crew Neck"],
                sizes: ["S", "M", "L", "XL"]
            },
            {
                id: 2,
                name: "Slim Fit Jeans",
                price: 49.99,
                category: "men",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Modern slim fit jeans with stretch for maximum comfort.",
                details: ["98% Cotton, 2% Elastane", "Machine Washable", "Slim Fit", "Stretch Denim"],
                sizes: ["28", "30", "32", "34"]
            },
            {
                id: 3,
                name: "Summer Dress",
                price: 39.99,
                category: "women",
                rating: 5,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Light and breezy summer dress perfect for warm weather.",
                details: ["100% Linen", "Hand Wash Recommended", "A-Line Fit", "Knee Length"],
                sizes: ["XS", "S", "M", "L"]
            },
            {
                id: 4,
                name: "Leather Jacket",
                price: 89.99,
                category: "men",
                rating: 4,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Genuine leather jacket with classic biker style.",
                details: ["100% Genuine Leather", "Dry Clean Only", "Regular Fit", "Zipper Closure"],
                sizes: ["S", "M", "L", "XL"]
            },
            {
                id: 5,
                name: "Sports Shoes",
                price: 79.99,
                category: "shoes",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "High-performance sports shoes for running and training.",
                details: ["Breathable Mesh", "Rubber Sole", "Cushioned Insole", "Lace-up Closure"],
                sizes: ["7", "8", "9", "10", "11"]
            },
            {
                id: 6,
                name: "Winter Jacket",
                price: 129.99,
                category: "women",
                rating: 4,
                image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Warm and stylish winter jacket with waterproof coating.",
                details: ["Waterproof Coating", "Faux Fur Hood", "Multiple Pockets", "Regular Fit"],
                sizes: ["XS", "S", "M", "L", "XL"]
            },
            {
                id: 7,
                name: "Designer Handbag",
                price: 199.99,
                category: "accessories",
                rating: 5,
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Luxurious designer handbag with premium craftsmanship.",
                details: ["Genuine Leather", "Gold-tone Hardware", "Adjustable Strap", "Multiple Compartments"],
                sizes: ["One Size"]
            },
            {
                id: 8,
                name: "Smart Watch",
                price: 249.99,
                category: "electronics",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "Advanced smartwatch with health monitoring features.",
                details: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"],
                sizes: ["Small", "Medium", "Large"]
            }
        ];
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Toast System
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Auth System
function showAuthModal() {
    document.getElementById('auth-modal').style.display = 'block';
}

function hideAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function switchAuthTab(tabName) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`${tabName}-form`).classList.add('active');
    document.querySelector(`[onclick="switchAuthTab('${tabName}')"]`).classList.add('active');
}

function register(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        joinDate: new Date().toISOString(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === user.email)) {
        showToast('Email already registered!', 'error');
        return;
    }
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    showToast('Registration successful! Please login.');
    switchAuthTab('login');
    event.target.reset();
}

function login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserInterface();
        hideAuthModal();
        showToast(`Welcome back, ${user.name}!`);
        event.target.reset();
        
        // Update user data in all elements
        updateUserDataInDOM();
    } else {
        showToast('Invalid email or password!', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showToast('Logged out successfully!');
    hideUserDropdown();
    window.location.href = 'index.html';
}

function updateUserInterface() {
    const userProfile = document.querySelector('.user-profile');
    const loginLink = document.querySelector('.login-link');
    
    if (currentUser) {
        if (userProfile) {
            userProfile.classList.add('active');
            updateUserDataInDOM();
        }
        if (loginLink) loginLink.style.display = 'none';
    } else {
        if (userProfile) userProfile.classList.remove('active');
        if (loginLink) loginLink.style.display = 'block';
    }
}

function updateUserDataInDOM() {
    if (!currentUser) return;
    
    // Update header user info
    const userAvatars = document.querySelectorAll('.user-avatar');
    const userNames = document.querySelectorAll('.user-name');
    const userEmails = document.querySelectorAll('.user-email');
    const profileAvatars = document.querySelectorAll('.profile-avatar');
    
    userAvatars.forEach(avatar => {
        avatar.src = currentUser.avatar;
        avatar.alt = currentUser.name;
    });
    
    userNames.forEach(name => {
        name.textContent = currentUser.name;
    });
    
    userEmails.forEach(email => {
        email.textContent = currentUser.email;
    });
    
    profileAvatars.forEach(avatar => {
        avatar.src = currentUser.avatar;
        avatar.alt = currentUser.name;
    });
    
    // Update profile page if exists
    const memberSince = document.querySelector('.member-since');
    if (memberSince) {
        const joinDate = new Date(currentUser.joinDate);
        memberSince.textContent = `Member since ${joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    }
}

function toggleUserDropdown() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.classList.toggle('show');
}

function hideUserDropdown() {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown) dropdown.classList.remove('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-profile')) {
        hideUserDropdown();
    }
});

// Cart functionality
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
}

function addToCart(productId, quantity = 1) {
    if (!currentUser) {
        showAuthModal();
        return false;
    }
    
    const product = products.find(p => p.id == productId);
    if (!product) return false;
    
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`);
    return true;
}

// Modal functionality
const cartIcon = document.querySelector('.cart-icon');
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');

if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        displayCartItems();
        modal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
    if (e.target.id === 'auth-modal') {
        hideAuthModal();
    }
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotalPrice.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalPrice.textContent = total.toFixed(2);
    
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            decreaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            increaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id == id);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id != id);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id == id);
    item.quantity += 1;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    showToast('Item removed from cart!');
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        
        if (!currentUser) {
            showAuthModal();
            return;
        }
        
        // Create order
        const order = {
            id: Date.now(),
            userId: currentUser.id,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            date: new Date().toISOString(),
            status: 'processing'
        };
        
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        showToast('Thank you for your purchase! Order placed successfully.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        modal.style.display = 'none';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleData();
    updateCartCount();
    updateUserInterface();
    
    // Add login link to navigation if it doesn't exist
    const nav = document.querySelector('nav ul');
    if (nav && !document.querySelector('.login-link')) {
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="#" class="login-link" onclick="showAuthModal()">Login</a>';
        nav.appendChild(loginLi);
    }
    
    // Add event listeners to all add-to-cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId, 1);
        }
    });
});

// Toggle menu function
function toggleMenu() {
    const menuItems = document.getElementById('menu-items');
    if (menuItems.style.maxHeight === '0px' || menuItems.style.maxHeight === '') {
        menuItems.style.maxHeight = '200px';
    } else {
        menuItems.style.maxHeight = '0px';
    }
}