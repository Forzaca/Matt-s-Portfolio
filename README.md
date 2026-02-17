# Portfolio Website with Admin Panel

A customizable portfolio website with a secure admin panel for managing all content.

## 🚀 Features

### Portfolio Page (index.html)
- **Fully Responsive Design** - Works on all devices
- **Animated Sections** - Smooth scroll animations
- **Clickable Portfolio Images** - Opens images in fullscreen modal
- **Spotify Integration** - Links to your Spotify tracks
- **Discord Integration** - Live server stats and invite
- **Dynamic Reviews** - Client testimonials with star ratings
- **Editable Pricing** - Packages and individual services
- **View Counter** - Tracks site visits

### Admin Panel (admin.html)
- **Secure Password Protection** - Default: `admin123`
- **Easy Management** - Edit all content from one place
- **Real-time Updates** - Changes reflect immediately
- **Image Management** - Banner, profile, server icon, and portfolio images
- **Review Management** - Add, edit, and remove client reviews
- **Pricing Control** - Manage packages and services
- **Music Settings** - Link Spotify tracks with auto-play option
- **Discord Settings** - Configure server invite and icon

## 📁 File Structure

```
portfolio/
├── index.html          # Main portfolio page
├── admin.html          # Admin panel (accessible at /admin.html)
├── config.js           # Configuration and data management
├── portfolio.js        # Portfolio page functionality
├── admin.js            # Admin panel functionality
└── README.md           # This file
```

## 🔧 Setup Instructions

1. **Upload Files**: Upload all files to your web hosting service

2. **Access Your Portfolio**: 
   - Main site: `https://yoursite.com/`
   - Admin panel: `https://yoursite.com/admin.html`

3. **First Login**:
   - Default password: `admin123`
   - **IMPORTANT**: Change this immediately in Settings > Security

4. **Configure Your Site**:
   - Go to admin panel
   - Update Basic Info (username, subtitle, etc.)
   - Upload your images (banner, profile, server icon)
   - Add portfolio images
   - Add client reviews
   - Configure pricing packages
   - Set up Spotify and Discord links

## 🎨 Customization Guide

### Basic Information
Navigate to **Basic Info** tab:
- **Username**: Your display name (appears in title and header)
- **Subtitle**: Your tagline (e.g., "Designer | Developer")
- **Nav Title**: Navigation bar title
- **Footer Text**: Copyright text

### Images
Navigate to **Images** tab:
- **Banner Image**: Main header banner (recommended: 1920x600px)
- **Profile Image**: Your avatar (recommended: 400x400px)
- **Server Icon**: Discord server icon (recommended: 256x256px)

*Tip: Use image hosting services like Imgur or upload to your server*

### Portfolio Images
Navigate to **Portfolio** tab:
- Click "+ Add Image" to add new portfolio work
- Paste image URLs (use Imgur, GitHub, or your own hosting)
- Images are clickable on the main site
- Drag/reorder not supported - delete and re-add to reorder

### Reviews
Navigate to **Reviews** tab:
- Click "+ Add Review" to create new review
- Edit name, avatar URL, star rating (1-5), and feedback
- Reviews display in a grid on the main site

### Pricing
Navigate to **Pricing** tab:
- **Packages**: Create full service packages
  - Name, price, currency
  - Description
  - Features list (one per line)
  - Purchase link
  - Mark as "Popular" for special styling
- **Services**: Individual à la carte services
  - Service name, price, currency

### Music & Discord
Navigate to **Settings** tab:
- **Spotify URL**: Full track URL from Spotify
  - Example: `https://open.spotify.com/track/3DamFFqW32WihKkTVlwTYQ`
  - Song info displays in player
  - Clicking opens Spotify
  - Enable "Auto-open" to open Spotify on page load
- **Discord Invite**: Full invite link
- **Discord Code**: Just the code part (e.g., `UXpQ8RTtQq`)

## 🔐 Security

### Change Default Password
1. Go to Settings > Security
2. Enter new password
3. Click "Change Password"
4. **Remember your new password** - there's no recovery!

### Password Storage
- Passwords are stored in browser's localStorage
- Clearing browser data will reset to default password
- Session-based authentication (logout clears session)

## 📱 Contact Button

The contact button opens this Discord profile: `1272978844248178730`
Users can message you directly through Discord.

## 💾 Data Storage

All portfolio data is stored in the browser's localStorage:
- **Pros**: No server-side database needed, works instantly
- **Cons**: Data is local to the browser
  - Clearing browser data = losing all changes
  - Changes made on one device won't sync to others
  - **Solution**: Export/backup your localStorage data or use same device

### Backup Your Data
1. Open browser console (F12)
2. Go to "Application" or "Storage" tab
3. Find "localStorage"
4. Copy the `portfolioData` value
5. Save to a text file

### Restore Your Data
1. Open browser console
2. Paste: `localStorage.setItem('portfolioData', 'YOUR_SAVED_DATA_HERE')`
3. Refresh the page

## 🎨 Color Customization

To change the color scheme, edit the Tailwind classes in the HTML:
- **Blue** (current): `bg-blue-600`, `text-blue-400`, `border-blue-500`
- **Purple**: Replace `blue` with `purple`
- **Green**: Replace `blue` with `green`
- **Red**: Replace `blue` with `red`

## 🐛 Troubleshooting

### "Images not loading"
- Check that image URLs are valid and publicly accessible
- Use HTTPS URLs (not HTTP)
- Try using Imgur or another reliable image host

### "Discord stats not showing"
- Ensure Discord invite code is correct (just the code, not full URL)
- Server must have invite link enabled
- Check browser console for errors

### "Portfolio looks broken"
- Ensure all files are in the same directory
- Check that config.js, portfolio.js load before other scripts
- Clear browser cache and refresh

### "Lost access to admin panel"
- Default password is always `admin123` if localStorage is cleared
- Check console for JavaScript errors

## 📋 Tips & Best Practices

1. **Optimize Images**: Compress images before uploading for faster loading
2. **Regular Backups**: Export localStorage data regularly
3. **Test Changes**: Check the live site after making changes
4. **Mobile Testing**: Always test on mobile devices
5. **Spotify Links**: Use full track URLs, not playlist URLs
6. **Review Avatars**: Use Discord avatar URLs for consistency

## 🌟 Tab Title

The browser tab always shows: **🥂 matthimself** (or your custom username)

## 📞 Support

For issues or questions:
- Check this README
- Review browser console for errors
- Test in different browsers

---

**Built with ❤️ for matthimself**
*Made by colourfulplanets*
