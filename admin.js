// Admin Panel JavaScript

// Password Management
const ADMIN_PASSWORD_KEY = 'adminPassword';
const DEFAULT_PASSWORD = 'admin123';

function getAdminPassword() {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
}

function setAdminPassword(newPassword) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
}

// Login System
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-message');
    
    if (password === getAdminPassword()) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadAllData();
    } else {
        errorMsg.textContent = 'Incorrect password';
        errorMsg.classList.remove('hidden');
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', function() {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
});

// Check if already logged in
window.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadAllData();
    }
});

// Tab System
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('border-blue-500', 'text-blue-500');
            b.classList.add('border-transparent', 'text-gray-400');
        });
        
        this.classList.add('border-blue-500', 'text-blue-500');
        this.classList.remove('border-transparent', 'text-gray-400');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(tabName + '-tab').classList.add('active');
    });
});

// Load All Data
function loadAllData() {
    loadBasicInfo();
    loadImages();
    loadPortfolioImages();
    loadReviews();
    loadPricing();
    loadSettings();
}

// Basic Info
function loadBasicInfo() {
    const data = PortfolioConfig.getData();
    document.getElementById('username-input').value = data.username || '';
    document.getElementById('subtitle-input').value = data.subtitle || '';
    document.getElementById('navtitle-input').value = data.navTitle || '';
    document.getElementById('footer-input').value = data.footerText || '';
}

function saveBasicInfo() {
    const data = PortfolioConfig.getData();
    data.username = document.getElementById('username-input').value;
    data.subtitle = document.getElementById('subtitle-input').value;
    data.navTitle = document.getElementById('navtitle-input').value;
    data.footerText = document.getElementById('footer-input').value;
    PortfolioConfig.saveData(data);
    showSuccess('Basic info saved!');
}

// Images
function loadImages() {
    const data = PortfolioConfig.getData();
    
    const bannerInput = document.getElementById('banner-image-input');
    const profileInput = document.getElementById('profile-image-input');
    const serverInput = document.getElementById('server-icon-input');
    
    bannerInput.value = data.bannerImage || '';
    profileInput.value = data.profileImage || '';
    serverInput.value = data.serverIcon || '';
    
    updateImagePreview('banner-preview', data.bannerImage);
    updateImagePreview('profile-preview', data.profileImage);
    updateImagePreview('server-preview', data.serverIcon);
    
    bannerInput.addEventListener('input', (e) => updateImagePreview('banner-preview', e.target.value));
    profileInput.addEventListener('input', (e) => updateImagePreview('profile-preview', e.target.value));
    serverInput.addEventListener('input', (e) => updateImagePreview('server-preview', e.target.value));
}

function updateImagePreview(previewId, url) {
    const preview = document.getElementById(previewId);
    const img = preview.querySelector('img');
    if (img && url) {
        img.src = url;
    }
}

function saveImages() {
    const data = PortfolioConfig.getData();
    data.bannerImage = document.getElementById('banner-image-input').value;
    data.profileImage = document.getElementById('profile-image-input').value;
    data.serverIcon = document.getElementById('server-icon-input').value;
    PortfolioConfig.saveData(data);
    showSuccess('Images saved!');
}

// Portfolio Images
function loadPortfolioImages() {
    const data = PortfolioConfig.getData();
    const container = document.getElementById('portfolio-images-list');
    container.innerHTML = '';
    
    if (!data.portfolioImages || data.portfolioImages.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No portfolio images yet. Click "Add Image" to get started!</p>';
        return;
    }
    
    data.portfolioImages.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 bg-[#111] border border-white/10 rounded-lg p-4';
        item.innerHTML = `
            <div class="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                <img src="${url}" alt="Portfolio ${index + 1}" class="w-full h-full object-cover">
            </div>
            <input type="text" value="${url}" data-index="${index}" class="portfolio-url-input flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none">
            <button onclick="removePortfolioImage(${index})" class="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">Delete</button>
        `;
        container.appendChild(item);
    });
    
    document.querySelectorAll('.portfolio-url-input').forEach(input => {
        input.addEventListener('change', function() {
            const data = PortfolioConfig.getData();
            const index = parseInt(this.dataset.index);
            data.portfolioImages[index] = this.value;
            PortfolioConfig.saveData(data);
            showSuccess('Portfolio image updated!');
        });
    });
}

function addPortfolioImage() {
    const url = prompt('Enter image URL:');
    if (url) {
        const data = PortfolioConfig.getData();
        if (!data.portfolioImages) data.portfolioImages = [];
        data.portfolioImages.push(url);
        PortfolioConfig.saveData(data);
        loadPortfolioImages();
        showSuccess('Portfolio image added!');
    }
}

function removePortfolioImage(index) {
    if (confirm('Are you sure you want to remove this image?')) {
        const data = PortfolioConfig.getData();
        data.portfolioImages.splice(index, 1);
        PortfolioConfig.saveData(data);
        loadPortfolioImages();
        showSuccess('Portfolio image removed!');
    }
}

// Reviews
function loadReviews() {
    const data = PortfolioConfig.getData();
    const container = document.getElementById('reviews-list');
    container.innerHTML = '';
    
    if (!data.reviews || data.reviews.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No reviews yet. Click "Add Review" to get started!</p>';
        return;
    }
    
    data.reviews.forEach((review, index) => {
        const item = document.createElement('div');
        item.className = 'bg-[#111] border border-white/10 rounded-xl p-6';
        item.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" value="${review.name}" data-index="${index}" data-field="name" class="review-input px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Name">
                <input type="text" value="${review.avatar}" data-index="${index}" data-field="avatar" class="review-input px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Avatar URL">
                <div>
                    <label class="text-xs text-gray-400 mb-1 block">Stars (1-5)</label>
                    <input type="number" min="1" max="5" value="${review.stars}" data-index="${index}" data-field="stars" class="review-input w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none">
                </div>
            </div>
            <textarea data-index="${index}" data-field="feedback" class="review-input w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none mb-4" rows="3" placeholder="Review feedback">${review.feedback}</textarea>
            <button onclick="removeReview(${index})" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">Delete Review</button>
        `;
        container.appendChild(item);
    });
    
    document.querySelectorAll('.review-input').forEach(input => {
        input.addEventListener('change', function() {
            const data = PortfolioConfig.getData();
            const index = parseInt(this.dataset.index);
            const field = this.dataset.field;
            if (field === 'stars') {
                data.reviews[index][field] = parseInt(this.value);
            } else {
                data.reviews[index][field] = this.value;
            }
            PortfolioConfig.saveData(data);
            showSuccess('Review updated!');
        });
    });
}

function addReview() {
    const data = PortfolioConfig.getData();
    if (!data.reviews) data.reviews = [];
    
    data.reviews.push({
        name: 'New Client',
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
        stars: 5,
        feedback: 'Great service!',
        created_at: new Date().toISOString()
    });
    
    PortfolioConfig.saveData(data);
    loadReviews();
    showSuccess('Review added!');
}

function removeReview(index) {
    if (confirm('Are you sure you want to remove this review?')) {
        const data = PortfolioConfig.getData();
        data.reviews.splice(index, 1);
        PortfolioConfig.saveData(data);
        loadReviews();
        showSuccess('Review removed!');
    }
}

// Pricing
function loadPricing() {
    loadPackages();
    loadServices();
}

function loadPackages() {
    const data = PortfolioConfig.getData();
    const container = document.getElementById('packages-list');
    container.innerHTML = '';
    
    if (!data.packages || data.packages.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No packages yet.</p>';
        return;
    }
    
    data.packages.forEach((pkg, index) => {
        const item = document.createElement('div');
        item.className = 'bg-[#111] border border-white/10 rounded-xl p-6';
        item.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="text" value="${pkg.name}" data-index="${index}" data-field="name" class="package-input px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Package Name">
                <input type="text" value="${pkg.price}" data-index="${index}" data-field="price" class="package-input px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Price">
                <input type="text" value="${pkg.currency}" data-index="${index}" data-field="currency" class="package-input px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Currency">
            </div>
            <textarea data-index="${index}" data-field="description" class="package-input w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none mb-4" rows="2" placeholder="Description">${pkg.description}</textarea>
            <textarea data-index="${index}" data-field="features" class="package-input w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none mb-4" rows="4" placeholder="Features (one per line)">${pkg.features.join('\n')}</textarea>
            <input type="text" value="${pkg.purchaseLink}" data-index="${index}" data-field="purchaseLink" class="package-input w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none mb-4" placeholder="Purchase Link">
            <div class="flex items-center justify-between">
                <label class="flex items-center gap-2">
                    <input type="checkbox" ${pkg.popular ? 'checked' : ''} data-index="${index}" data-field="popular" class="package-checkbox w-4 h-4">
                    <span class="text-sm">Mark as Popular</span>
                </label>
                <button onclick="removePackage(${index})" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
    
    document.querySelectorAll('.package-input').forEach(input => {
        input.addEventListener('change', function() {
            const data = PortfolioConfig.getData();
            const index = parseInt(this.dataset.index);
            const field = this.dataset.field;
            if (field === 'features') {
                data.packages[index][field] = this.value.split('\n').filter(f => f.trim());
            } else {
                data.packages[index][field] = this.value;
            }
            PortfolioConfig.saveData(data);
            showSuccess('Package updated!');
        });
    });
    
    document.querySelectorAll('.package-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const data = PortfolioConfig.getData();
            const index = parseInt(this.dataset.index);
            data.packages[index].popular = this.checked;
            PortfolioConfig.saveData(data);
            showSuccess('Package updated!');
        });
    });
}

function addPackage() {
    const data = PortfolioConfig.getData();
    if (!data.packages) data.packages = [];
    
    data.packages.push({
        name: 'New Package',
        price: '1000',
        currency: 'robux',
        description: 'Package description',
        features: ['Feature 1', 'Feature 2'],
        purchaseLink: 'https://www.roblox.com/',
        popular: false
    });
    
    PortfolioConfig.saveData(data);
    loadPackages();
    showSuccess('Package added!');
}

function removePackage(index) {
    if (confirm('Are you sure you want to remove this package?')) {
        const data = PortfolioConfig.getData();
        data.packages.splice(index, 1);
        PortfolioConfig.saveData(data);
        loadPackages();
        showSuccess('Package removed!');
    }
}

function loadServices() {
    const data = PortfolioConfig.getData();
    const container = document.getElementById('services-list');
    container.innerHTML = '';
    
    if (!data.services || data.services.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">No services yet.</p>';
        return;
    }
    
    data.services.forEach((service, index) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 bg-[#111] border border-white/10 rounded-lg p-4';
        item.innerHTML = `
            <input type="text" value="${service.name}" data-index="${index}" data-field="name" class="service-input flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Service Name">
            <input type="text" value="${service.price}" data-index="${index}" data-field="price" class="service-input w-24 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Price">
            <input type="text" value="${service.currency}" data-index="${index}" data-field="currency" class="service-input w-20 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm focus:border-blue-500 focus:outline-none" placeholder="Currency">
            <button onclick="removeService(${index})" class="px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm">Delete</button>
        `;
        container.appendChild(item);
    });
    
    document.querySelectorAll('.service-input').forEach(input => {
        input.addEventListener('change', function() {
            const data = PortfolioConfig.getData();
            const index = parseInt(this.dataset.index);
            const field = this.dataset.field;
            data.services[index][field] = this.value;
            PortfolioConfig.saveData(data);
            showSuccess('Service updated!');
        });
    });
}

function addService() {
    const data = PortfolioConfig.getData();
    if (!data.services) data.services = [];
    
    data.services.push({
        name: 'New Service',
        price: '100',
        currency: 'rbx'
    });
    
    PortfolioConfig.saveData(data);
    loadServices();
    showSuccess('Service added!');
}

function removeService(index) {
    if (confirm('Are you sure you want to remove this service?')) {
        const data = PortfolioConfig.getData();
        data.services.splice(index, 1);
        PortfolioConfig.saveData(data);
        loadServices();
        showSuccess('Service removed!');
    }
}

// Settings
function loadSettings() {
    const data = PortfolioConfig.getData();
    
    document.getElementById('spotify-url-input').value = data.spotifyUrl || '';
    document.getElementById('song-title-input').value = data.songTitle || '';
    document.getElementById('artist-name-input').value = data.artistName || '';
    document.getElementById('album-art-input').value = data.albumArt || '';
    document.getElementById('autoplay-input').checked = data.autoplay || false;
    
    document.getElementById('discord-invite-input').value = data.discordInvite || '';
    document.getElementById('discord-code-input').value = data.discordInviteCode || '';
}

function saveSettings() {
    const data = PortfolioConfig.getData();
    
    data.spotifyUrl = document.getElementById('spotify-url-input').value;
    data.songTitle = document.getElementById('song-title-input').value;
    data.artistName = document.getElementById('artist-name-input').value;
    data.albumArt = document.getElementById('album-art-input').value;
    data.autoplay = document.getElementById('autoplay-input').checked;
    
    data.discordInvite = document.getElementById('discord-invite-input').value;
    data.discordInviteCode = document.getElementById('discord-code-input').value;
    
    PortfolioConfig.saveData(data);
    showSuccess('Settings saved!');
}

function changePassword() {
    const newPassword = document.getElementById('new-password-input').value;
    if (!newPassword) {
        alert('Please enter a new password');
        return;
    }
    
    if (confirm('Are you sure you want to change the admin password?')) {
        setAdminPassword(newPassword);
        document.getElementById('new-password-input').value = '';
        showSuccess('Password changed successfully!');
    }
}

// Success Message
function showSuccess(message) {
    const existingToast = document.querySelector('.success-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'success-toast fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
