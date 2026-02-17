# Portfolio Website with Admin Panel

A modern, customizable portfolio website with floating snow effects and a comprehensive admin panel. Visitors can view your portfolio, while you manage all content from the admin panel at `/admin.html`.

## 🎨 Features

### Main Portfolio Page (index.html)
- ❄️ **Floating Snow Effect** - Beautiful animated snowflakes in the background
- 📸 **Portfolio Gallery** - Showcase your work with beautiful image grid
- ⭐ **Reviews Section** - Display client testimonials with star ratings
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎯 **View Only** - Visitors can only view, not edit content

### Admin Panel (admin.html)
- 🎨 **Profile Tab**:
  - Upload banner image (1200x400px recommended)
  - Upload profile picture (400x400px recommended)
  - Edit name and title/role
  
- 📸 **Portfolio Tab**:
  - Add portfolio images
  - Delete portfolio images
  - Visual grid management
  
- ⭐ **Reviews Tab**:
  - Add client reviews
  - Edit existing reviews
  - Delete reviews
  - Set star ratings (1-5)
  - Add custom client avatars

## 🚀 How to Use

### Accessing Your Portfolio

1. **View Your Portfolio**: Open `index.html` in any browser
   - This is what visitors see
   - All content is read-only for visitors
   - Features your profile, portfolio, and reviews

2. **Manage Your Content**: Open `admin.html` in your browser
   - This is your control panel
   - Edit everything from here
   - Changes appear instantly on the main site

### Admin Panel Guide

#### Profile Settings
1. Click the **Profile** tab
2. **Change Banner**:
   - Click "Upload Banner"
   - Select your image
   - Recommended size: 1200x400px
3. **Change Profile Picture**:
   - Click "Upload Profile Picture"
   - Select your image
   - Recommended size: 400x400px (square)
4. **Edit Name & Title**:
   - Type your name
   - Type your role (e.g., "Designer | Developer")
   - Click "Save Profile Info"

#### Portfolio Management
1. Click the **Portfolio** tab
2. **Add Images**:
   - Click "+ Add Image"
   - Select an image from your computer
   - Image appears immediately
3. **Delete Images**:
   - Click "Delete" under any image
   - Confirm deletion

#### Review Management
1. Click the **Reviews** tab
2. **Add Review**:
   - Click "+ Add Review"
   - Fill in:
     - Client Name
     - Avatar URL (optional - leave blank for default)
     - Click rating (1-5 stars)
     - Write feedback
   - Click "Save Review"
3. **Edit Review**:
   - Click "Edit" next to any review
   - Make changes
   - Click "Save Review"
4. **Delete Review**:
   - Click "Delete" next to any review
   - Confirm deletion

## 💾 Data Storage

All your content is stored in your browser's **Local Storage**:
- ✅ Automatic saving - no "save" button needed
- ✅ Works completely offline
- ✅ No server or database required
- ⚠️ Use the same browser to keep your changes
- ⚠️ Clearing browser data will reset everything

## 📁 File Structure

```
portfolio/
├── index.html      ← Main portfolio page (visitors see this)
├── admin.html      ← Admin panel (you edit here)
├── script.js       ← Portfolio page functionality
├── admin.js        ← Admin panel functionality
└── README.md       ← This file
```

## 🌐 Deployment

### Option 1: Local Use
Just open the files in your browser - works immediately!

### Option 2: Web Hosting
Upload all files to any web host:
- Your portfolio: `yourwebsite.com/index.html`
- Admin panel: `yourwebsite.com/admin.html`

**Popular free hosting options:**
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## 🎯 Best Practices

### Images
- **Banner**: 1200x400px or larger (landscape)
- **Profile Picture**: 400x400px (square)
- **Portfolio**: 800x600px or larger
- Use high-quality images for best results
- Compress images to keep file sizes reasonable

### Reviews
- Keep feedback 2-3 sentences for best display
- Add client avatars for authenticity
- Use real testimonials for credibility

### Profile Info
- Keep name concise
- Title/role should be brief (2-4 words)

## 🔒 Security Note

The admin panel stores data in browser Local Storage. For public websites:
- Don't leave the admin panel open on public computers
- Consider password-protecting `/admin.html` on your server
- Local Storage is per-browser, so only you can edit (when using your browser)

## 🆘 Troubleshooting

### My changes aren't showing up
- Make sure you're viewing `index.html` (not editing in admin.html)
- Refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check you're using the same browser

### Images not uploading
- Check file is a valid image (JPG, PNG, GIF, WebP)
- Try a smaller file size (< 5MB recommended)
- Clear browser cache and try again

### Lost all my data
- Check if you cleared browser data/cookies
- Make sure you're in the same browser
- Local Storage is per-browser and per-domain

## ✨ Customization

Want to change colors or styles? Edit the HTML files:
- Find classes like `bg-blue-600` (background color)
- Find classes like `text-white` (text color)
- Tailwind CSS powers all the styling

## 📝 Tips

1. **Backup your data**: Export Local Storage occasionally
2. **Test on mobile**: Check how it looks on different devices
3. **Use consistent image sizes**: Makes the gallery look professional
4. **Keep portfolio focused**: 6-12 images is often enough
5. **Update reviews regularly**: Fresh testimonials build trust

## 🎉 Features

- ✅ No coding required for updates
- ✅ No database needed
- ✅ No monthly fees
- ✅ Fully offline capable
- ✅ Lightning fast
- ✅ Mobile responsive
- ✅ Modern design

Enjoy your new portfolio website! 🚀
