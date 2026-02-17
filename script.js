// Initialize AOS animations
AOS.init({
    once: true,
    offset: 50,
    duration: 800,
    easing: 'ease-out-cubic',
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

// Create Floating Snow Effect
function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.animationDuration = (Math.random() * 3 + 7) + 's';
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    
    snowContainer.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 15000);
}

// Create snowflakes periodically
setInterval(createSnowflake, 300);
for (let i = 0; i < 20; i++) {
    setTimeout(createSnowflake, i * 100);
}

// Local Storage Management
const STORAGE_KEYS = {
    BANNER: 'portfolio_banner',
    PFP: 'portfolio_pfp',
    NAME: 'portfolio_name',
    TITLE: 'portfolio_title',
    PORTFOLIO: 'portfolio_images',
    REVIEWS: 'portfolio_reviews'
};

// Load saved images and text (view only)
function loadSavedContent() {
    // Load banner
    const savedBanner = localStorage.getItem(STORAGE_KEYS.BANNER);
    const bannerImg = document.getElementById('banner-image');
    if (savedBanner && bannerImg) {
        bannerImg.src = savedBanner;
    }
    
    // Load profile picture
    const savedPfp = localStorage.getItem(STORAGE_KEYS.PFP);
    const pfpImg = document.getElementById('pfp-image');
    if (savedPfp && pfpImg) {
        pfpImg.src = savedPfp;
    }
    
    // Load name
    const savedName = localStorage.getItem(STORAGE_KEYS.NAME);
    const nameEl = document.getElementById('profile-name');
    if (savedName && nameEl) {
        nameEl.textContent = savedName;
    }
    
    // Load title
    const savedTitle = localStorage.getItem(STORAGE_KEYS.TITLE);
    const titleEl = document.getElementById('profile-title');
    if (savedTitle && titleEl) {
        titleEl.textContent = savedTitle;
    }
}

// Portfolio Management (View Only)
function loadPortfolioImages() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.PORTFOLIO) || '[]');
    
    grid.innerHTML = '';
    
    if (images.length === 0) {
        // Add default placeholder images
        const defaultImages = [
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        ];
        defaultImages.forEach((src, index) => {
            addPortfolioImageToGrid(src, index);
        });
    } else {
        images.forEach((src, index) => {
            addPortfolioImageToGrid(src, index);
        });
    }
}

function addPortfolioImageToGrid(src, index) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    const card = document.createElement('div');
    card.className = 'group relative h-64 bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover-lift';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    card.innerHTML = `
        <img src="${src}" alt="Portfolio ${index + 1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
    `;
    
    grid.appendChild(card);
}

// Reviews Management
function loadReviews() {
    const grid = document.getElementById('reviews-grid');
    const badge = document.getElementById('review-count-badge');
    
    if (!grid) return;
    
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    
    grid.innerHTML = '';
    
    if (badge) {
        badge.textContent = reviews.length;
    }
    
    if (reviews.length === 0) {
        // Add default sample reviews
        const defaultReviews = [
            {
                name: 'John Doe',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
                stars: 5,
                feedback: 'Absolutely fantastic work! The attention to detail was incredible and the final product exceeded all my expectations.',
                created_at: new Date().toISOString()
            },
            {
                name: 'Sarah Smith',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                stars: 5,
                feedback: 'Professional, creative, and delivered on time. Could not ask for better service!',
                created_at: new Date(Date.now() - 86400000).toISOString()
            },
            {
                name: 'Mike Johnson',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                stars: 4,
                feedback: 'Great experience working together. The communication was clear and the results speak for themselves.',
                created_at: new Date(Date.now() - 172800000).toISOString()
            }
        ];
        
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(defaultReviews));
        reviews.push(...defaultReviews);
    }
    
    reviews.forEach((review, index) => {
        const delay = (index % 3) * 100;
        const stars = '★'.repeat(review.stars);
        const emptyStars = '☆'.repeat(5 - review.stars);
        
        const card = document.createElement('div');
        card.className = 'bg-[#111] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 hover-lift flex flex-col h-full';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', delay);
        
        const avatar = review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop';
        
        card.innerHTML = `
            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img src="${avatar}" alt="${review.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'">
                </div>
                <div class="min-w-0">
                    <h3 class="font-bold text-base sm:text-lg text-white leading-tight truncate">${review.name}</h3>
                    <div class="flex text-yellow-500 text-xs sm:text-sm tracking-widest mt-1" title="${review.stars}/5">
                        ${stars}<span class="text-gray-700">${emptyStars}</span>
                    </div>
                </div>
            </div>
            <div class="relative flex-grow">
                <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
                    "${review.feedback}"
                </p>
            </div>
            <div class="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center gap-2">
                <span class="text-[9px] sm:text-[10px] text-gray-500 font-mono uppercase tracking-widest">Verified Client</span>
                <span class="text-[9px] sm:text-[10px] text-gray-600 font-mono">${new Date(review.created_at).toLocaleDateString()}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    setTimeout(() => AOS.refresh(), 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedContent();
    loadPortfolioImages();
    loadReviews();
});
