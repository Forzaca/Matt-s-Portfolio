// Configuration and Data Management
const PortfolioConfig = {
    // Initialize with default data
    init() {
        if (!localStorage.getItem('portfolioData')) {
            const defaultData = {
                // Basic Info
                username: 'matthimself',
                subtitle: 'Designer | Developer',
                navTitle: "matthimself's portfolio",
                contactEmail: 'contact@matthimself.com',
                footerText: '© 2026 matthimself. All rights reserved.',
                
                // Images
                bannerImage: 'images/banners/mattbanner.png',
                profileImage: 'images/pfp/mattpfp.png',
                serverIcon: 'images/logos/bigskyicon.png',
                
                // Discord
                discordInvite: 'https://discord.gg/HCcPuGabRE',
                discordInviteCode: 'HCcPuGabRE',
                
                // Spotify/Music
                spotifyUrl: 'https://open.spotify.com/track/3DamFFqW32WihKkTVlwTYQ',
                songTitle: 'Fireflies',
                artistName: 'Owl City',
                albumArt: 'images/covers/fireflies.png',
                autoplay: true,
                
                // Portfolio Images
                portfolioImages: [
                    'https://matthimself.vercel.app/images/portfolio/bscbanner.png',
                    'https://matthimself.vercel.app/images/portfolio/flrpbanner.png',
                    'https://matthimself.vercel.app/images/portfolio/takecareposter.png',
                    'https://matthimself.vercel.app/images/portfolio/bsrgen.png',
                    'https://matthimself.vercel.app/images/portfolio/flowstatebanner.png',
                ],
                
                // Reviews
                reviews: [
                    {
                        name: 'John Doe',
                        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
                        stars: 5,
                        feedback: 'Amazing work! Very professional and delivered on time.',
                        created_at: new Date().toISOString()
                    }
                ],
                
                // Pricing Packages
                packages: [
                    {
                        name: 'Basic',
                        price: '500',
                        currency: 'robux',
                        description: 'Best for simple projects and personal starts.',
                        features: ['5 banners', '1 footer', '2 edits', '1 generic banner'],
                        purchaseLink: 'https://www.roblox.com/catalog/107020045617068',
                        popular: false
                    },
                    {
                        name: 'Premium',
                        price: '3000',
                        currency: 'robux',
                        description: 'For growing projects requiring more power.',
                        features: ['25 banners', 'Department banners (x3)', '2 generic banners', '3 footers', '5 edits', '20 emojis'],
                        purchaseLink: 'https://www.roblox.com/catalog/74174742843208',
                        popular: true
                    },
                    {
                        name: 'Essential',
                        price: '1000',
                        currency: 'robux',
                        description: 'Full scale solutions for larger teams.',
                        features: ['15 banners', '2 generic banners', '2 footers', '3 edits', '10 emojis'],
                        purchaseLink: 'https://www.roblox.com/catalog/90912468779617',
                        popular: false
                    }
                ],
                
                // Individual Services
                services: [
                    { name: 'Per Livery', price: '130', currency: 'rbx' },
                    { name: 'Per Photo', price: '100', currency: 'rbx' },
                    { name: 'Per Embed', price: '100', currency: 'rbx' },
                    { name: 'Per Banner', price: '100', currency: 'rbx' },
                    { name: 'Per Footer', price: '75', currency: 'rbx' },
                    { name: 'Per Emoji', price: '50', currency: 'rbx' }
                ]
            };
            
            localStorage.setItem('portfolioData', JSON.stringify(defaultData));
        }
    },
    
    // Get data
    getData() {
        this.init();
        return JSON.parse(localStorage.getItem('portfolioData'));
    },
    
    // Save data
    saveData(data) {
        localStorage.setItem('portfolioData', JSON.stringify(data));
    },
    
    // Update specific field
    updateField(field, value) {
        const data = this.getData();
        data[field] = value;
        this.saveData(data);
    }
};

// Initialize on load
PortfolioConfig.init();
