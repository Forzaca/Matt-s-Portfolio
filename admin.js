// Password
const ADMIN_PASSWORD = 'Matt123';

// Storage Keys
const STORAGE_KEYS = {
    BANNER: 'portfolio_banner',
    PFP: 'portfolio_pfp',
    NAME: 'portfolio_name',
    TITLE: 'portfolio_title',
    EMAIL: 'portfolio_email',
    PORTFOLIO: 'portfolio_images',
    REVIEWS: 'portfolio_reviews',
    MUSIC: 'portfolio_music',
    DISCORD: 'portfolio_discord',
    PRICING: 'portfolio_pricing',
    LOGGED_IN: 'admin_logged_in'
};

// Login System
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password-input').value;
    const errorEl = document.getElementById('login-error');
    
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
        showAdminPanel();
    } else {
        errorEl.classList.remove('hidden');
        document.getElementById('password-input').value = '';
    }
});

function showAdminPanel() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('admin-panel').classList.add('active');
    initAdminPanel();
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEYS.LOGGED_IN);
    document.getElementById('admin-panel').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('password-input').value = '';
}

// Check if already logged in
if (sessionStorage.getItem(STORAGE_KEYS.LOGGED_IN) === 'true') {
    showAdminPanel();
}

// Tab Management
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-white');
        btn.classList.add('border-transparent', 'text-gray-400');
    });
    
    document.getElementById('content-' + tabName).classList.remove('hidden');
    const activeBtn = document.getElementById('tab-' + tabName);
    activeBtn.classList.remove('border-transparent', 'text-gray-400');
    activeBtn.classList.add('border-blue-600', 'text-white');
}

// Initialize Admin Panel
function initAdminPanel() {
    loadProfileSettings();
    loadPortfolioAdmin();
    loadReviewsAdmin();
    loadMusicAdmin();
    loadDiscordAdmin();
    loadPricingAdmin();
}

// Profile Management
function loadProfileSettings() {
    const savedBanner = localStorage.getItem(STORAGE_KEYS.BANNER);
    const savedPfp = localStorage.getItem(STORAGE_KEYS.PFP);
    const savedName = localStorage.getItem(STORAGE_KEYS.NAME);
    const savedTitle = localStorage.getItem(STORAGE_KEYS.TITLE);
    const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
    
    if (savedBanner) document.getElementById('preview-banner').src = savedBanner;
    if (savedPfp) document.getElementById('preview-pfp').src = savedPfp;
    if (savedName) document.getElementById('input-name').value = savedName;
    if (savedTitle) document.getElementById('input-title').value = savedTitle;
    if (savedEmail) document.getElementById('input-email').value = savedEmail;
}

document.getElementById('upload-banner')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('preview-banner').src = event.target.result;
            localStorage.setItem(STORAGE_KEYS.BANNER, event.target.result);
            alert('Banner updated!');
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('upload-pfp')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('preview-pfp').src = event.target.result;
            localStorage.setItem(STORAGE_KEYS.PFP, event.target.result);
            alert('Profile picture updated!');
        };
        reader.readAsDataURL(file);
    }
});

function saveProfileInfo() {
    const name = document.getElementById('input-name').value;
    const title = document.getElementById('input-title').value;
    const email = document.getElementById('input-email').value;
    
    localStorage.setItem(STORAGE_KEYS.NAME, name);
    localStorage.setItem(STORAGE_KEYS.TITLE, title);
    localStorage.setItem(STORAGE_KEYS.EMAIL, email);
    alert('Profile information saved!');
}

// Portfolio Management
function loadPortfolioAdmin() {
    const grid = document.getElementById('portfolio-admin-grid');
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.PORTFOLIO) || '[]');
    
    grid.innerHTML = '';
    
    if (images.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 border border-white/5 rounded-2xl bg-[#111]"><p class="text-gray-500 mb-4">No portfolio images yet.</p></div>';
        return;
    }
    
    images.forEach((src, index) => {
        const card = document.createElement('div');
        card.className = 'bg-[#111] rounded-xl border border-white/10 overflow-hidden hover-lift';
        card.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${src}" alt="Portfolio ${index + 1}" class="w-full h-full object-cover">
            </div>
            <div class="p-4 flex justify-between items-center">
                <span class="text-sm text-gray-400">Image ${index + 1}</span>
                <button onclick="removePortfolioImageAdmin(${index})" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition-all">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addNewPortfolioImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.PORTFOLIO) || '[]');
                images.push(event.target.result);
                localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(images));
                loadPortfolioAdmin();
                alert('Image added!');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function removePortfolioImageAdmin(index) {
    if (confirm('Delete this image?')) {
        const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.PORTFOLIO) || '[]');
        images.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(images));
        loadPortfolioAdmin();
    }
}

// Reviews Management
function loadReviewsAdmin() {
    const tbody = document.getElementById('reviews-table-body');
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    
    tbody.innerHTML = '';
    
    if (reviews.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="px-6 py-12 text-center text-gray-500">No reviews yet.</td></tr>';
        return;
    }
    
    reviews.forEach((review, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-white/5 hover:bg-[#1a1a1a]';
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <img src="${review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'}" alt="${review.name}" class="w-10 h-10 rounded-full object-cover border border-white/10">
                    <span class="font-medium">${review.name}</span>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="text-yellow-500">${'★'.repeat(review.stars)}</span>
            </td>
            <td class="px-6 py-4">
                <p class="text-sm text-gray-300 line-clamp-2 max-w-md">${review.feedback}</p>
            </td>
            <td class="px-6 py-4">
                <button onclick="deleteReview(${index})" class="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

let currentReviewRating = 0;

function openReviewModal() {
    currentReviewRating = 0;
    const modal = document.createElement('div');
    modal.id = 'review-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-[#111] rounded-2xl max-w-2xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-white/10">
                <h3 class="text-2xl font-bold">Add Review</h3>
            </div>
            <form id="review-form" class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Client Name</label>
                    <input type="text" id="review-name" required class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Avatar URL (optional)</label>
                    <input type="url" id="review-avatar" placeholder="https://..." class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Rating</label>
                    <div class="flex gap-2">
                        ${[1,2,3,4,5].map(n => `<button type="button" onclick="setReviewRating(${n})" class="rating-btn px-4 py-2 bg-black border border-white/10 rounded-lg hover:bg-gray-900">${n} ★</button>`).join('')}
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Feedback</label>
                    <textarea id="review-feedback" required rows="4" class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none resize-none"></textarea>
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium">Save</button>
                    <button type="button" onclick="closeReviewModal()" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (currentReviewRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        const review = {
            name: document.getElementById('review-name').value,
            avatar: document.getElementById('review-avatar').value || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
            stars: currentReviewRating,
            feedback: document.getElementById('review-feedback').value,
            created_at: new Date().toISOString()
        };
        
        const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
        reviews.push(review);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        closeReviewModal();
        loadReviewsAdmin();
        alert('Review added!');
    });
}

function setReviewRating(rating) {
    currentReviewRating = rating;
    document.querySelectorAll('.rating-btn').forEach((btn, idx) => {
        if (idx < rating) {
            btn.classList.add('bg-yellow-500', 'text-black');
            btn.classList.remove('bg-black');
        } else {
            btn.classList.remove('bg-yellow-500', 'text-black');
            btn.classList.add('bg-black');
        }
    });
}

function closeReviewModal() {
    document.getElementById('review-modal')?.remove();
}

function deleteReview(index) {
    if (confirm('Delete this review?')) {
        const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
        reviews.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        loadReviewsAdmin();
    }
}

// Music Management  
function loadMusicAdmin() {
    const list = document.getElementById('music-list');
    const music = JSON.parse(localStorage.getItem(STORAGE_KEYS.MUSIC) || '[]');
    
    list.innerHTML = '';
    
    if (music.length === 0) {
        list.innerHTML = '<div class="text-center py-12 border border-white/5 rounded-2xl bg-[#111]"><p class="text-gray-500">No songs yet.</p></div>';
        return;
    }
    
    music.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = 'bg-[#111] p-4 rounded-xl border border-white/10 flex items-center gap-4';
        card.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" class="w-16 h-16 rounded-lg object-cover">
            <div class="flex-1">
                <h4 class="font-bold">${song.title}</h4>
                <p class="text-sm text-gray-400">${song.artist}</p>
            </div>
            <button onclick="deleteMusic(${index})" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">Delete</button>
        `;
        list.appendChild(card);
    });
}

function openMusicModal() {
    const modal = document.createElement('div');
    modal.id = 'music-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-[#111] rounded-2xl max-w-2xl w-full border border-white/10">
            <div class="p-6 border-b border-white/10">
                <h3 class="text-2xl font-bold">Add Song</h3>
            </div>
            <form id="music-form" class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Song Title</label>
                    <input type="text" id="music-title" required class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Artist Name</label>
                    <input type="text" id="music-artist" required class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Audio File URL</label>
                    <input type="url" id="music-file" placeholder="https://..." class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Cover Image URL</label>
                    <input type="url" id="music-cover" placeholder="https://..." class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium">Save</button>
                    <button type="button" onclick="closeMusicModal()" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('music-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const song = {
            title: document.getElementById('music-title').value,
            artist: document.getElementById('music-artist').value,
            file: document.getElementById('music-file').value,
            cover: document.getElementById('music-cover').value
        };
        
        const music = JSON.parse(localStorage.getItem(STORAGE_KEYS.MUSIC) || '[]');
        music.push(song);
        localStorage.setItem(STORAGE_KEYS.MUSIC, JSON.stringify(music));
        closeMusicModal();
        loadMusicAdmin();
        alert('Song added!');
    });
}

function closeMusicModal() {
    document.getElementById('music-modal')?.remove();
}

function deleteMusic(index) {
    if (confirm('Delete this song?')) {
        const music = JSON.parse(localStorage.getItem(STORAGE_KEYS.MUSIC) || '[]');
        music.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.MUSIC, JSON.stringify(music));
        loadMusicAdmin();
    }
}

// Discord Management
function loadDiscordAdmin() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.DISCORD) || '{}');
    if (data.serverName) document.getElementById('discord-server-name').value = data.serverName;
    if (data.inviteCode) document.getElementById('discord-invite-code').value = data.inviteCode;
    if (data.serverIcon) document.getElementById('discord-server-icon').value = data.serverIcon;
}

function saveDiscordInfo() {
    const data = {
        serverName: document.getElementById('discord-server-name').value,
        inviteCode: document.getElementById('discord-invite-code').value,
        serverIcon: document.getElementById('discord-server-icon').value
    };
    localStorage.setItem(STORAGE_KEYS.DISCORD, JSON.stringify(data));
    alert('Discord info saved!');
}

// Pricing Management
function loadPricingAdmin() {
    const list = document.getElementById('pricing-list');
    const pricing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICING) || '[]');
    
    list.innerHTML = '';
    
    if (pricing.length === 0) {
        list.innerHTML = '<div class="col-span-full text-center py-12 border border-white/5 rounded-2xl bg-[#111]"><p class="text-gray-500">No pricing plans yet.</p></div>';
        return;
    }
    
    pricing.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = 'bg-[#111] p-6 rounded-xl border border-white/10';
        card.innerHTML = `
            <h4 class="font-bold text-lg mb-2">${plan.name}</h4>
            <p class="text-3xl font-bold mb-2">${plan.price} <span class="text-sm text-gray-500">${plan.currency || ''}</span></p>
            <p class="text-sm text-gray-400 mb-4">${plan.description}</p>
            <button onclick="deletePricing(${index})" class="w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">Delete</button>
        `;
        list.appendChild(card);
    });
}

function openPricingModal() {
    const modal = document.createElement('div');
    modal.id = 'pricing-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-[#111] rounded-2xl max-w-2xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-white/10">
                <h3 class="text-2xl font-bold">Add Pricing Plan</h3>
            </div>
            <form id="pricing-form" class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Plan Name</label>
                    <input type="text" id="pricing-name" required placeholder="Basic" class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Price</label>
                        <input type="text" id="pricing-price" required placeholder="500" class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Currency</label>
                        <input type="text" id="pricing-currency" placeholder="robux" class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Description</label>
                    <input type="text" id="pricing-desc" placeholder="Best for simple projects" class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Features (one per line)</label>
                    <textarea id="pricing-features" rows="6" placeholder="5 banners
1 footer
2 edits" class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none resize-none"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Purchase Link (optional)</label>
                    <input type="url" id="pricing-link" placeholder="https://..." class="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none">
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium">Save</button>
                    <button type="button" onclick="closePricingModal()" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('pricing-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const plan = {
            name: document.getElementById('pricing-name').value,
            price: document.getElementById('pricing-price').value,
            currency: document.getElementById('pricing-currency').value,
            description: document.getElementById('pricing-desc').value,
            features: document.getElementById('pricing-features').value.split('\n').filter(f => f.trim()),
            link: document.getElementById('pricing-link').value
        };
        
        const pricing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICING) || '[]');
        pricing.push(plan);
        localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricing));
        closePricingModal();
        loadPricingAdmin();
        alert('Pricing plan added!');
    });
}

function closePricingModal() {
    document.getElementById('pricing-modal')?.remove();
}

function deletePricing(index) {
    if (confirm('Delete this pricing plan?')) {
        const pricing = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRICING) || '[]');
        pricing.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricing));
        loadPricingAdmin();
    }
}
