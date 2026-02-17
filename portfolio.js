// Portfolio.js - Main portfolio page functionality

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    loadPortfolioData();
    setupMobileMenu();
    setupImageModal();
    setupMusicPlayer();
    fetchDiscordStats();
    setupViewCounter();
    loadPortfolioImages();
    loadReviews();
    loadPricing();
});

function loadPortfolioData() {
    const data = PortfolioConfig.getData();
    
    document.getElementById('username').textContent = data.username;
    document.getElementById('user-subtitle').textContent = data.subtitle;
    document.getElementById('nav-title').textContent = data.navTitle;
    document.getElementById('footer-text').textContent = data.footerText;
    document.title = `🥂 ${data.username}`;
    
    if (data.bannerImage) document.getElementById('banner-image').src = data.bannerImage;
    if (data.profileImage) document.getElementById('profile-image').src = data.profileImage;
    if (data.serverIcon) document.getElementById('server-icon').src = data.serverIcon;
    
    // Update contact link to Discord profile
    const discordUserId = '1272978844248178730';
    document.getElementById('contact-link').href = `https://discord.com/users/${discordUserId}`;
    document.getElementById('contact-link').target = '_blank';
    
    if (data.discordInvite) document.getElementById('discord-link').href = data.discordInvite;
}

function setupMobileMenu() {
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
}

function setupImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    window.openModal = function(imageSrc) {
        if(!modal || !modalImg) return;
        modalImg.src = imageSrc;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalImg.classList.remove('scale-95');
            modalImg.classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        if(!modal) return;
        modal.classList.add('opacity-0');
        modalImg.classList.remove('scale-100');
        modalImg.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modalImg.src = '';
        }, 300);
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function setupMusicPlayer() {
    const data = PortfolioConfig.getData();
    const audio = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('artist-name');
    const artEl = document.getElementById('album-art');
    
    if (!audio) return;
    
    let isPlaying = false;
    
    titleEl.textContent = data.songTitle || 'Song Title';
    artistEl.textContent = data.artistName || 'Artist Name';
    artEl.src = data.albumArt || '';
    
    if (data.spotifyUrl) {
        const playerContainer = document.getElementById('player-container');
        playerContainer.onclick = () => {
            window.open(data.spotifyUrl, '_blank');
        };
        playerContainer.style.cursor = 'pointer';
        progressBar.style.width = '0%';
        timeDisplay.textContent = 'Click to play on Spotify';
        
        // Auto-open Spotify if autoplay is enabled
        if (data.autoplay) {
            setTimeout(() => {
                window.open(data.spotifyUrl, '_blank');
            }, 1000);
        }
        return;
    }
    
    window.togglePlay = function() {
        if(!audio.src) {
            if (data.spotifyUrl) {
                window.open(data.spotifyUrl, '_blank');
            }
            return;
        }
        
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.log("Auto-play prevented:", e));
        }
        isPlaying = !isPlaying;
    };
    
    if(audio) {
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            }
        };
        
        audio.onended = () => {
            isPlaying = false;
            progressBar.style.width = '0%';
        };
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

async function fetchDiscordStats() {
    const data = PortfolioConfig.getData();
    const INVITE_CODE = data.discordInviteCode || 'UXpQ8RTtQq';
    
    try {
        const response = await fetch(`https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true`);
        const discordData = await response.json();
        
        if (discordData && discordData.guild) {
            const nameEl = document.getElementById('discord-name');
            const onlineEl = document.getElementById('discord-online');
            const memEl = document.getElementById('discord-members');
            
            if(nameEl) nameEl.textContent = discordData.guild.name;
            if(onlineEl && discordData.approximate_presence_count) {
                onlineEl.textContent = discordData.approximate_presence_count.toLocaleString();
            }
            if(memEl && discordData.approximate_member_count) {
                memEl.textContent = discordData.approximate_member_count.toLocaleString();
            }
        }
    } catch (error) {
        console.log("Discord API Error:", error);
    }
}

function setupViewCounter() {
    const viewCountEl = document.getElementById('view-count');
    const counterContainer = document.getElementById('view-counter');
    
    let views = parseInt(localStorage.getItem('siteViews') || '850');
    views++;
    localStorage.setItem('siteViews', views.toString());
    
    if (viewCountEl) viewCountEl.textContent = views.toLocaleString();
    if (counterContainer) counterContainer.style.opacity = '1';
}

function loadPortfolioImages() {
    const data = PortfolioConfig.getData();
    const workGrid = document.getElementById('past-work-grid');
    
    if (!workGrid) return;
    
    const images = data.portfolioImages || [];
    
    if (images.length === 0) {
        workGrid.innerHTML = `
            <div class="col-span-full text-center text-gray-500 py-10">
                <p>No portfolio images yet. Add some in the admin panel!</p>
            </div>`;
        return;
    }
    
    workGrid.innerHTML = '';
    
    images.forEach((imageUrl, index) => {
        const card = document.createElement('div');
        card.className = "group relative h-48 sm:h-56 md:h-72 bg-[#111] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-white/5 cursor-pointer w-full max-w-5xl hover-lift";
        card.onclick = () => openModal(imageUrl);
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Portfolio image ${index + 1}`;
        img.className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500";
        img.onerror = () => {
            card.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-500">Failed to load image</div>`;
        };
        
        card.appendChild(img);
        workGrid.appendChild(card);
    });
    
    setTimeout(() => AOS.refresh(), 100);
}

function loadReviews() {
    const data = PortfolioConfig.getData();
    const grid = document.getElementById('reviews-grid');
    const badge = document.getElementById('review-count-badge');
    
    if (!grid) return;
    
    const reviews = data.reviews || [];
    
    grid.innerHTML = '';
    
    if(badge) {
        badge.textContent = reviews.length;
        if (reviews.length > 0) {
            badge.classList.remove('hidden');
        }
    }
    
    if (reviews.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-10 border border-white/5 rounded-2xl bg-[#111]">
                <p class="text-gray-500">No reviews yet.</p>
            </div>`;
        return;
    }
    
    reviews.forEach((rev, index) => {
        const delay = (index % 3) * 100;
        const stars = "★".repeat(rev.stars);
        const emptyStars = "☆".repeat(5 - rev.stars);
        
        const card = document.createElement('div');
        card.className = "bg-[#111] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 hover-lift flex flex-col h-full";
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', delay);

        card.innerHTML = `
            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img src="${rev.avatar}" alt="${rev.name}" class="w-full h-full object-cover" onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
                </div>
                <div class="min-w-0">
                    <h3 class="font-bold text-base sm:text-lg text-white leading-tight truncate">${rev.name}</h3>
                    <div class="flex text-yellow-500 text-xs sm:text-sm tracking-widest mt-1" title="${rev.stars}/5">
                        ${stars}<span class="text-gray-700">${emptyStars}</span>
                    </div>
                </div>
            </div>
            <div class="relative flex-grow">
                <p class="text-gray-300 text-sm sm:text-lg font-medium leading-relaxed">
                    "${rev.feedback}"
                </p>
            </div>
            <div class="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center gap-2">
                <span class="text-[9px] sm:text-[10px] text-gray-500 font-mono uppercase tracking-widest">Verified Client</span>
                <span class="text-[9px] sm:text-[10px] text-gray-600 font-mono">${new Date(rev.created_at).toLocaleDateString()}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    setTimeout(() => AOS.refresh(), 100);
}

function loadPricing() {
    const data = PortfolioConfig.getData();
    const packagesContainer = document.getElementById('pricing-packages');
    const servicesContainer = document.getElementById('individual-services');
    
    if (!packagesContainer) return;
    
    const packages = data.packages || [];
    packagesContainer.innerHTML = '';
    
    packages.forEach((pkg, index) => {
        const delay = (index + 1) * 100;
        const popularClass = pkg.popular ? 'bg-[#1a1a1a] border-blue-500/50 md:transform md:-translate-y-4 animate-glow' : 'bg-[#111] border-white/10 hover:border-white/20';
        const popularBadge = pkg.popular ? `<div class="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 bg-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wide shadow-lg">Most Popular</div>` : '';
        const titleColor = pkg.popular ? 'text-blue-400' : 'text-gray-300 group-hover:text-white';
        const checkmarkClass = pkg.popular ? 'bg-blue-500 text-black font-bold' : 'bg-blue-500/20 text-blue-400';
        const buttonClass = pkg.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-white/10 hover:bg-white text-white hover:text-black';
        
        const card = document.createElement('div');
        card.className = `p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${popularClass} border transition-all hover-lift flex flex-col group relative`;
        card.setAttribute('data-aos', 'zoom-in-up');
        card.setAttribute('data-aos-delay', delay);
        
        const featuresHTML = pkg.features.map(feature => 
            `<li class="flex items-center gap-2 sm:gap-3"><span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full ${checkmarkClass} flex items-center justify-center text-xs flex-shrink-0">✓</span> ${feature}</li>`
        ).join('');
        
        card.innerHTML = `
            ${popularBadge}
            <h3 class="text-lg sm:text-xl font-bold ${titleColor} transition-colors">${pkg.name}</h3>
            <div class="my-3 sm:my-4 flex items-baseline">
                <span class="text-${pkg.popular ? '4xl sm:text-5xl' : '3xl sm:text-4xl'} font-bold text-white">${pkg.price}</span>
                <span class="text-sm sm:text-base text-gray-500 ml-2">${pkg.currency}</span>
            </div>
            <p class="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8">${pkg.description}</p>
            <ul class="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1 text-xs sm:text-sm text-gray-300">
                ${featuresHTML}
            </ul>
            <a href="${pkg.purchaseLink}" target="_blank" class="w-full py-2.5 sm:py-3 rounded-xl ${buttonClass} font-bold transition-all text-center no-underline block text-sm sm:text-base">Purchase Plan</a>
        `;
        
        packagesContainer.appendChild(card);
    });
    
    if (servicesContainer) {
        const services = data.services || [];
        servicesContainer.innerHTML = '';
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'p-3 sm:p-4 rounded-xl bg-[#111] border border-white/10 hover:border-white/20 transition-all hover-lift';
            serviceCard.innerHTML = `
                <p class="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">${service.name}</p>
                <p class="text-xl sm:text-2xl font-bold text-white">${service.price} <span class="text-xs sm:text-sm text-gray-500">${service.currency}</span></p>
            `;
            servicesContainer.appendChild(serviceCard);
        });
    }
    
    setTimeout(() => AOS.refresh(), 100);
}
