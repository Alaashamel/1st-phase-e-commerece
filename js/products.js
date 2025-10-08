// Products page functionality
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 24.99,
        category: "men",
        rating: 4,
        image: "product-1.jpg"
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 49.99,
        category: "men",
        rating: 4.5,
        image: "product-2.jpg"
    },
    {
        id: 3,
        name: "Summer Dress",
        price: 39.99,
        category: "women",
        rating: 5,
        image: "product-3.jpg"
    },
    {
        id: 4,
        name: "Leather Jacket",
        price: 89.99,
        category: "men",
        rating: 4,
        image: "product-4.jpg"
    },
    {
        id: 5,
        name: "Sports Shoes",
        price: 79.99,
        category: "shoes",
        rating: 4.5,
        image: "product-5.jpg"
    },
    {
        id: 6,
        name: "Winter Jacket",
        price: 129.99,
        category: "women",
        rating: 4,
        image: "product-6.jpg"
    },
    {
        id: 7,
        name: "Designer Handbag",
        price: 199.99,
        category: "accessories",
        rating: 5,
        image: "product-7.jpg"
    },
    {
        id: 8,
        name: "Smart Watch",
        price: 249.99,
        category: "electronics",
        rating: 4.5,
        image: "product-8.jpg"
    },
    {
        id: 9,
        name: "Casual Blouse",
        price: 34.99,
        category: "women",
        rating: 4,
        image: "product-1.jpg"
    },
    {
        id: 10,
        name: "Formal Shirt",
        price: 44.99,
        category: "men",
        rating: 4.5,
        image: "product-2.jpg"
    },
    {
        id: 11,
        name: "Running Shorts",
        price: 29.99,
        category: "men",
        rating: 4,
        image: "product-3.jpg"
    },
    {
        id: 12,
        name: "Evening Gown",
        price: 149.99,
        category: "women",
        rating: 5,
        image: "product-4.jpg"
    }
];

function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    productsToRender.forEach(product => {
        const ratingStars = generateRatingStars(product.rating);
        
        const productHTML = `
            <div class="col-4">
                <div class="product-card">
                    <img src="images/${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <div class="rating">
                            ${ratingStars}
                        </div>
                        <p class="price">$${product.price}</p>
                        <button class="add-to-cart" 
                                data-id="${product.id}" 
                                data-name="${product.name}" 
                                data-price="${product.price}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += productHTML;
    });

    // Re-attach event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });
}

function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function filterProducts() {
    const priceRange = document.getElementById('price-range').value;
    const selectedCategories = Array.from(document.querySelectorAll('.categories-list a.active'))
        .map(a => a.textContent.toLowerCase());
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter input:checked'))
        .map(input => input.parentElement.textContent.trim());
    const sortBy = document.querySelector('.sort-select').value;

    let filteredProducts = products.filter(product => {
        // Price filter
        if (product.price > priceRange) return false;
        
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes('all products')) {
            if (!selectedCategories.includes(product.category)) return false;
        }
        
        return true;
    });

    // Sort products
    switch(sortBy) {
        case 'Sort by Price: Low to High':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'Sort by Price: High to Low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'Sort by Rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'Sort by Popularity':
            // For demo, we'll sort by ID (simulating popularity)
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
    }

    renderProducts(filteredProducts);
}

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    
    // Category filter
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.categories-list a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            filterProducts();
        });
    });
    
    // Price filter
    document.getElementById('price-range').addEventListener('input', function() {
        document.querySelector('.price-values span:last-child').textContent = `$${this.value}`;
        filterProducts();
    });
    
    // Brand filter
    document.querySelectorAll('.brand-filter input').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Sort select
    document.querySelector('.sort-select').addEventListener('change', filterProducts);
    
    // Apply filters button
    document.querySelector('.filter-btn').addEventListener('click', filterProducts);
});