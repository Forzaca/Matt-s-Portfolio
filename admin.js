// Storage Keys
const STORAGE_KEYS = {
    BANNER: 'portfolio_banner',
    PFP: 'portfolio_pfp',
    NAME: 'portfolio_name',
    TITLE: 'portfolio_title',
    PORTFOLIO: 'portfolio_images',
    REVIEWS: 'portfolio_reviews'
};

let currentEditingIndex = null;

// Tab Management
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active state from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-white');
        btn.classList.add('border-transparent', 'text-gray-400');
    });
    
    // Show selected tab
    document.getElementById('content-' + tabName).classList.remove('hidden');
    
    // Set active tab button
    const activeBtn = document.getElementById('tab-' + tabName);
    activeBtn.classList.remove('border-transparent', 'text-gray-400');
    activeBtn.classList.add('border-blue-600', 'text-white');
}

// Profile Management
function loadProfileSettings() {
    // Load banner
    const savedBanner = localStorage.getItem(STORAGE_KEYS.BANNER);
    const previewBanner = document.getElementById('preview-banner');
    if (savedBanner && previewBanner) {
        previewBanner.src = savedBanner;
    }
    
    // Load profile picture
    const savedPfp = localStorage.getItem(STORAGE_KEYS.PFP);
    const previewPfp = document.getElementById('preview-pfp');
    if (savedPfp && previewPfp) {
        previewPfp.src = savedPfp;
    }
    
    // Load name and title
    const savedName = localStorage.getItem(STORAGE_KEYS.NAME);
    const savedTitle = localStorage.getItem(STORAGE_KEYS.TITLE);
    
    const inputName = document.getElementById('input-name');
    const inputTitle = document.getElementById('input-title');
    
    if (savedName && inputName) inputName.value = savedName;
    if (savedTitle && inputTitle) inputTitle.value = savedTitle;
}

// Banner upload
document.getElementById('upload-banner')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            document.getElementById('preview-banner').src = imageData;
            localStorage.setItem(STORAGE_KEYS.BANNER, imageData);
            alert('Banner updated successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// Profile picture upload
document.getElementById('upload-pfp')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            document.getElementById('preview-pfp').src = imageData;
            localStorage.setItem(STORAGE_KEYS.PFP, imageData);
            alert('Profile picture updated successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// Save profile info
function saveProfileInfo() {
    const name = document.getElementById('input-name').value;
    const title = document.getElementById('input-title').value;
    
    if (!name || !title) {
        alert('Please fill in all fields');
        return;
    }
    
    localStorage.setItem(STORAGE_KEYS.NAME, name);
    localStorage.setItem(STORAGE_KEYS.TITLE, title);
    alert('Profile information saved successfully!');
}

// Portfolio Management
function loadPortfolioAdmin() {
    const grid = document.getElementById('portfolio-admin-grid');
    if (!grid) return;
    
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.PORTFOLIO) || '[]');
    
    grid.innerHTML = '';
    
    if (images.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 border border-white/5 rounded-2xl bg-[#111]">
                <p class="text-gray-500 mb-4">No portfolio images yet.</p>
                <button onclick="addNewPortfolioImage()" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all">Add Your First Image</button>
            </div>`;
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
                alert('Image added successfully!');
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

function removePortfolioImageAdmin(index) {
    if (confirm('Are you sure you want to delete this image?')) {
        const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.PORTFOLIO) || '[]');
        images.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(images));
        loadPortfolioAdmin();
        alert('Image deleted successfully!');
    }
}

// Load reviews into table
function loadReviews() {
    const tbody = document.getElementById('reviews-table-body');
    if (!tbody) return;
    
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    
    tbody.innerHTML = '';
    
    if (reviews.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                    No reviews yet. Click "Add Review" to create your first one.
                </td>
            </tr>
        `;
        return;
    }
    
    reviews.forEach((review, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-white/5 hover:bg-[#1a1a1a] transition-colors';
        
        const stars = '★'.repeat(review.stars);
        const avatar = review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop';
        
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <img src="${avatar}" alt="${review.name}" class="w-10 h-10 rounded-full object-cover border border-white/10" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'">
                    <span class="font-medium">${review.name}</span>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="text-yellow-500">${stars}</span>
                <span class="text-gray-500 text-sm ml-1">(${review.stars}/5)</span>
            </td>
            <td class="px-6 py-4">
                <p class="text-sm text-gray-300 line-clamp-2 max-w-md">${review.feedback}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-400">
                ${new Date(review.created_at).toLocaleDateString()}
            </td>
            <td class="px-6 py-4">
                <div class="flex gap-2">
                    <button onclick="editReview(${index})" class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm transition-all">Edit</button>
                    <button onclick="deleteReview(${index})" class="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm transition-all">Delete</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Modal functions
function openAddModal() {
    currentEditingIndex = null;
    document.getElementById('modal-title').textContent = 'Add Review';
    document.getElementById('review-form').reset();
    document.getElementById('review-id').value = '';
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('bg-yellow-500', 'text-black');
        btn.classList.add('bg-black');
    });
    document.getElementById('review-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('review-modal').classList.remove('active');
    currentEditingIndex = null;
}

function setRating(stars) {
    document.getElementById('rating-value').value = stars;
    
    // Update button styles
    document.querySelectorAll('.rating-btn').forEach((btn, index) => {
        if (index < stars) {
            btn.classList.remove('bg-black');
            btn.classList.add('bg-yellow-500', 'text-black');
        } else {
            btn.classList.remove('bg-yellow-500', 'text-black');
            btn.classList.add('bg-black');
        }
    });
}

// Edit review
function editReview(index) {
    currentEditingIndex = index;
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    const review = reviews[index];
    
    document.getElementById('modal-title').textContent = 'Edit Review';
    document.getElementById('client-name').value = review.name;
    document.getElementById('avatar-url').value = review.avatar || '';
    document.getElementById('feedback').value = review.feedback;
    setRating(review.stars);
    
    document.getElementById('review-modal').classList.add('active');
}

// Delete review
function deleteReview(index) {
    if (confirm('Are you sure you want to delete this review?')) {
        const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
        reviews.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        loadReviews();
    }
}

// Handle form submission
document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('client-name').value;
    const avatar = document.getElementById('avatar-url').value;
    const stars = parseInt(document.getElementById('rating-value').value);
    const feedback = document.getElementById('feedback').value;
    
    if (!stars) {
        alert('Please select a rating');
        return;
    }
    
    const review = {
        name,
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
        stars,
        feedback,
        created_at: new Date().toISOString()
    };
    
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    
    if (currentEditingIndex !== null) {
        // Update existing review
        reviews[currentEditingIndex] = review;
    } else {
        // Add new review
        reviews.push(review);
    }
    
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    loadReviews();
    closeModal();
});

// Close modal when clicking outside
document.getElementById('review-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProfileSettings();
    loadPortfolioAdmin();
    loadReviews();
});
