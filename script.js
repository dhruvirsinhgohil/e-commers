// ---------- PRODUCT DATABASE (improved variety) ----------
const products = [
   {
      id: 1,
      name: "Apex Drift Sneakers",
      price: 3499,
      oldPrice: 4999,
      desc: "Breathable knit + memory foam insole. Perfect for all-day comfort & street style.",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format",
      rating: 4.7,
      reviews: 213,
      badge: "Bestseller"
   },
   {
      id: 2,
      name: "Orion SmartWatch Ultra",
      price: 5999,
      oldPrice: 8999,
      desc: "1.78” AMOLED, heart rate + SPO2, 10-day battery life. Fitness redefined.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format",
      rating: 4.9,
      reviews: 847,
      badge: "Trending"
   },
   {
      id: 3,
      name: "NovaBuds Pro",
      price: 2499,
      oldPrice: 3999,
      desc: "Hybrid ANC, 30H playtime, spatial audio & low-latency gaming mode.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format",
      rating: 4.8,
      reviews: 562,
      badge: "Wireless"
   },
   {
      id: 4,
      name: "Apex Utility Backpack",
      price: 1899,
      oldPrice: 2799,
      desc: "Water-resistant, 20L capacity, padded laptop compartment + USB charging port.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format",
      rating: 4.5,
      reviews: 314,
      badge: "Eco"
   },
   {
      id: 5,
      name: "Vector Aviator Shades",
      price: 1599,
      oldPrice: 2999,
      desc: "UV400 polarized lenses, titanium frame – classic style meets protection.",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&auto=format",
      rating: 4.6,
      reviews: 198,
      badge: "Summer"
   },
   {
      id: 6,
      name: "Strider X Running Shoes",
      price: 3999,
      oldPrice: 5999,
      desc: "Energy-return foam, anti-slip grip, breathable mesh upper for runners.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format",
      rating: 4.8,
      reviews: 451,
      badge: "Performance"
   },
   {
      id: 7,
      name: "ThermoHeat Smart Mug",
      price: 1299,
      oldPrice: 2299,
      desc: "Smart temperature control, keeps coffee 55°C for 2h. App connectivity.",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop&auto=format",
      rating: 4.4,
      reviews: 129,
      badge: "Gadget"
   },
   {
      id: 8,
      name: "ErgoMesh Office Chair",
      price: 8999,
      oldPrice: 14999,
      desc: "Adjustable lumbar, 3D armrests, breathable mesh & recline lock.",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop&auto=format",
      rating: 4.9,
      reviews: 312,
      badge: "Premium"
   }
];

// Helper: render star rating
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

// display product grid
function displayProducts() {
   const gridContainer = document.getElementById('productGrid');
   if (!gridContainer) return;

   let html = '';
   products.forEach(product => {
      const starHtml = renderStars(product.rating);
      html += `
    <div class="product-card" onclick="openDetail(${product.id})">
         <div class="card-badge">${product.badge}</div>
         <img class="card-img" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://placehold.co/400x300/eef2ff/0d6efd?text=UrbanCart'">
         <div class="card-content">
            <h3 class="product-title">${product.name}</h3>
            <div class="rating">
               <div class="stars">${starHtml}</div>
               <span class="review-count">(${product.reviews} reviews)</span>
            </div>
            <div class="price-wrapper">
               <span class="current-price">${product.price}</span>
               ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
            </div>
            <p class="product-desc">${product.desc}</p>
            <div class="card-actions">
               <button class="btn-cart" data-id="${product.id}" data-name="${product.name}">
                  <i class="fa-solid fa-bag-shopping"></i> Add to Cart
               </button>
               <button class="btn-wishlist" data-id="${product.id}">
                  <i class="fa-regular fa-heart"></i>
               </button>
            </div>
         </div>
      </div>
   `;
   });
   gridContainer.innerHTML = html;
}

function openDetail(id) {
   let selectedProduct = products.find(item => item.id == id);
   localStorage.setItem("productDetail", JSON.stringify(selectedProduct));
   window.location.href = "exe23_detail.html";
}

// Toast manager
let toastTimeout;
function showToast(message, isError = false) {
   const toast = document.getElementById('toastMsg');
   if (toastTimeout) clearTimeout(toastTimeout);
   toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> ${message}`;
   toast.classList.add('show');
   toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
   }, 2200);
}

// Event delegation for cart & wishlist buttons
function attachProductEvents() {
   const grid = document.getElementById('productGrid');
   if (!grid) return;
   grid.addEventListener('click', (e) => {
      const cartBtn = e.target.closest('.btn-cart');
      const wishBtn = e.target.closest('.btn-wishlist');

      if (cartBtn) {
         const productName = cartBtn.getAttribute('data-name') || 'item';
         showToast(`${productName} added ✨`);
         // optional micro animation
         const icon = cartBtn.querySelector('i');
         if (icon) {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => { if (icon) icon.style.transform = ''; }, 150);
         }
         e.preventDefault();
         e.stopPropagation(); // Stops dynamic opening of detail view card click
      }
      if (wishBtn) {
         const heartIcon = wishBtn.querySelector('i');
         if (heartIcon) {
            if (heartIcon.classList.contains('fa-regular')) {
               heartIcon.classList.remove('fa-regular');
               heartIcon.classList.add('fa-solid', 'fa-heart');
               heartIcon.style.color = '#ef4444';
               showToast('❤️ Saved to wishlist!');
            } else {
               heartIcon.classList.remove('fa-solid', 'fa-heart');
               heartIcon.classList.add('fa-regular');
               heartIcon.style.color = '';
               showToast('Removed from wishlist');
            }
         } else {
            showToast('wishlist updated', false);
         }
         e.preventDefault();
         e.stopPropagation();
      }
   });
}

// ----- MOBILE MENU ( improved toggle + resize handling ) -----
function initMobileMenu() {
   const menuIcon = document.getElementById('menuIcon');
   const navList = document.getElementById('navList');
   if (!menuIcon || !navList) return;

   const toggleMenu = () => {
      navList.classList.toggle('show');
      // change icon style
      if (navList.classList.contains('show')) {
         menuIcon.classList.remove('fa-bars');
         menuIcon.classList.add('fa-times');
      } else {
         menuIcon.classList.remove('fa-times');
         menuIcon.classList.add('fa-bars');
      }
   };

   menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
   });

   // close menu when a link is clicked (mobile)
   const links = navList.querySelectorAll('a');
   links.forEach(link => {
      link.addEventListener('click', () => {
         if (window.innerWidth <= 768) {
            navList.classList.remove('show');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
         }
      });
   });

   // handle resize: if screen > 768, ensure menu is not forced hidden
   window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
         if (navList.classList.contains('show')) {
            navList.classList.remove('show');
            if (menuIcon.classList.contains('fa-times')) {
               menuIcon.classList.remove('fa-times');
               menuIcon.classList.add('fa-bars');
            }
         }
         // also ensure display style gets removed (CSS handles flex)
         navList.style.display = '';
      }
   });
}

// additional micro: scroll reveal effect & card entrance (subtle)
function addScrollFade() {
   const cards = document.querySelectorAll('.product-card');
   if (!cards.length) return;
   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
         }
      });
   }, { threshold: 0.05 });
   cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.35s ease';
      observer.observe(card);
   });
}

// smooth dummy for login/register links (prevent default)
function preventEmptyLinks() {
   const allLinks = document.querySelectorAll('.list a');
   allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '') {
         link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('✨ Demo: Authentication portal coming soon!', false);
         });
      }
   });
}

// initialize full application
function initApp() {
   displayProducts();
   attachProductEvents();
   initMobileMenu();
   preventEmptyLinks();
   setTimeout(() => {
      addScrollFade();
   }, 100);
}

// run after DOM ready
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initApp);
} else {
   initApp();
}