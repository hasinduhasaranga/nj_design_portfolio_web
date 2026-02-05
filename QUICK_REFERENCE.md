# Quick Reference Guide

A one-page reference for common tasks in the NJ Design Portfolio website.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit the site
http://localhost:5000
```

## 🔑 Admin Panel Access

**URL:** `http://localhost:5000/admin`

## 📝 Common Tasks

### Add a Portfolio Item

1. Go to Admin Panel → Portfolio Section
2. Click "Add New Item"
3. Fill in title and description
4. Upload an image
5. Click "Save"
6. Toggle visibility ON

### Update About Section

1. Go to Admin Panel → About Me Section
2. Edit name, title, or description
3. Upload new profile image (optional)
4. Click "Save Changes"
5. Toggle visibility ON

### Change Pricing

1. Go to Admin Panel → Pricing Section
2. Edit tier name, price, or features
3. Click "Save Changes"
4. Toggle visibility ON

### Update Contact Info

1. Go to Admin Panel → Contact Section
2. Update email, phone, or location
3. Update social media links
4. Click "Save Changes"
5. Toggle visibility ON

### Upload Images

1. Click "Upload Image" button in any section
2. Select image file (JPG, PNG, WebP)
3. Image uploads automatically
4. Image path is saved

### Switch Language

- Click language toggle in header
- Choose English or Uzbek (O'zbek)
- Language preference is saved

## 🛠️ Troubleshooting

### Site Won't Start

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 5000 in Use

Edit `server/index.ts` and change port number

### Images Not Showing

- Check `server/uploads/` folder exists
- Verify image paths in admin panel
- Check file permissions

### Build Fails

```bash
npm run build
# Check error messages
# Usually fixed by reinstalling dependencies
```

## 📦 Deployment Quick Steps

### Vercel (Easiest)

1. Push code to GitHub
2. Sign up at vercel.com
3. Import repository
4. Click Deploy

### VPS

```bash
# On server
npm install
npm run build
npm install -g pm2
pm2 start dist/server/node-build.mjs --name portfolio
```

## 🔄 Updating Content

1. Make changes in Admin Panel
2. Changes save automatically
3. Refresh main page to see updates

## 💾 Backup

```bash
# Backup data
cp server/data/data.json backup-data.json

# Backup images
cp -r server/uploads backup-uploads
```

## 📞 Need Help?

1. Check README.md for detailed setup
2. Check DEPLOYMENT.md for deployment help
3. Check DOCUMENTATION.md for technical details
4. Contact your developer

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Search (if implemented)
- `Esc` - Close modals
- `Tab` - Navigate form fields

## 🎨 Quick Customization

### Change Primary Color

Edit `client/global.css`:

```css
:root {
  --primary: 262.1 83.3% 57.8%; /* Purple */
}
```

### Add New Language

Edit `client/utils/translations.ts`

### Modify Background Animation

Edit `client/components/AnimatedLinesBackground.tsx`

---

**Keep this guide handy for quick reference!**
