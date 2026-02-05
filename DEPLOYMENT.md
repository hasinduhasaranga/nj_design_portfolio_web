# Deployment Guide

This guide provides detailed instructions for deploying your NJ Design Portfolio website to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested the application locally (`npm run dev`)
- [ ] Built the production version successfully (`npm run build`)
- [ ] Updated all content in the admin panel
- [ ] Uploaded all necessary images
- [ ] Changed any default passwords
- [ ] Reviewed and updated contact information
- [ ] Tested both English and Uzbek language versions
- [ ] Verified all portfolio items are displaying correctly

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is perfect for this project and offers a generous free tier.

#### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Prepare Your Project**
   - Initialize a Git repository in your project folder:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```
   - Push to GitHub/GitLab/Bitbucket

3. **Import Project to Vercel**
   - Click "New Project" in Vercel dashboard
   - Import your repository
   - Vercel will auto-detect the settings

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes!

6. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

**Pros:**

- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on Git push
- ✅ Easy to use

**Cons:**

- ⚠️ Serverless functions have execution time limits

---

### Option 2: Railway

Railway is great for full-stack applications with persistent storage.

#### Steps:

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment**
   - Railway will auto-detect Node.js
   - Set environment variables if needed

4. **Deploy**
   - Railway will automatically build and deploy
   - You'll get a URL like `your-app.railway.app`

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain

**Pros:**

- ✅ Free tier with $5 monthly credit
- ✅ Persistent storage
- ✅ Easy database integration
- ✅ Automatic HTTPS

**Cons:**

- ⚠️ Free tier has usage limits

---

### Option 3: Render

Render offers a free tier for web services.

#### Steps:

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub/GitLab

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository

3. **Configure Service**
   - Name: `nj-portfolio`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

5. **Custom Domain (Optional)**
   - Go to Settings → Custom Domain
   - Add your domain

**Pros:**

- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Persistent disks available
- ✅ Good documentation

**Cons:**

- ⚠️ Free tier may spin down after inactivity
- ⚠️ Slower cold starts

---

### Option 4: DigitalOcean App Platform

Good for scalable applications with more control.

#### Steps:

1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://digitalocean.com)
   - Sign up (may require payment method)

2. **Create New App**
   - Go to Apps → Create App
   - Connect your GitHub repository

3. **Configure App**
   - Detected as Node.js app
   - Build Command: `npm run build`
   - Run Command: `npm run start`

4. **Choose Plan**
   - Basic plan starts at $5/month
   - Select appropriate resources

5. **Deploy**
   - Review and create
   - App will be deployed

**Pros:**

- ✅ Reliable infrastructure
- ✅ Good performance
- ✅ Easy scaling
- ✅ Automatic HTTPS

**Cons:**

- ⚠️ No free tier
- ⚠️ Minimum $5/month

---

### Option 5: Traditional VPS (Advanced)

For full control, deploy to a VPS like DigitalOcean Droplet, AWS EC2, or Linode.

#### Steps:

1. **Provision a Server**
   - Create a VPS with Ubuntu 22.04
   - Recommended: 1GB RAM minimum

2. **Connect to Server**

   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2 (Process Manager)**

   ```bash
   sudo npm install -g pm2
   ```

5. **Upload Your Project**

   ```bash
   # On your local machine
   scp -r /path/to/project root@your-server-ip:/var/www/portfolio
   ```

6. **Install Dependencies and Build**

   ```bash
   cd /var/www/portfolio
   npm install
   npm run build
   ```

7. **Start with PM2**

   ```bash
   pm2 start dist/server/node-build.mjs --name "portfolio"
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx (Reverse Proxy)**

   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/portfolio
   ```

   Add this configuration:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:

   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Pros:**

- ✅ Full control
- ✅ Can host multiple apps
- ✅ Customizable
- ✅ Good for learning

**Cons:**

- ⚠️ Requires server management skills
- ⚠️ You manage security updates
- ⚠️ More complex setup

---

## 🔐 Environment Variables

If you need to add environment variables:

### For Vercel/Railway/Render:

- Go to project settings
- Add environment variables in the dashboard
- Common variables:
  - `NODE_ENV=production`
  - `PORT=5000` (usually auto-set)

### For VPS:

Create a `.env` file in the project root:

```bash
NODE_ENV=production
PORT=5000
```

---

## 📊 Post-Deployment

After deployment:

1. **Test the Live Site**
   - Visit your deployed URL
   - Test all sections (About, Portfolio, Pricing, Contact)
   - Test language switching
   - Test on mobile devices

2. **Access Admin Panel**
   - Navigate to `your-domain.com/admin`
   - Verify you can login
   - Test adding/editing content

3. **Monitor Performance**
   - Use tools like Google PageSpeed Insights
   - Check loading times
   - Monitor error logs

4. **Setup Analytics (Optional)**
   - Add Google Analytics
   - Setup error tracking (Sentry)

---

## 🔄 Updating Your Site

### For Git-based Deployments (Vercel/Railway/Render):

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main
# Automatic deployment will trigger
```

### For VPS:

```bash
# On your local machine
scp -r /path/to/updated/files root@your-server-ip:/var/www/portfolio

# On the server
cd /var/www/portfolio
npm install
npm run build
pm2 restart portfolio
```

---

## 🆘 Troubleshooting

### Site Not Loading

- Check if the server is running
- Verify DNS settings
- Check firewall rules
- Review deployment logs

### Images Not Showing

- Ensure `server/uploads/` folder is included
- Check file permissions
- Verify image paths are correct

### Admin Panel Not Accessible

- Check the route is `/admin`
- Verify build includes all files
- Check browser console for errors

### Slow Performance

- Enable caching
- Optimize images
- Use a CDN
- Upgrade server resources

---

## 📞 Need Help?

If you encounter issues:

1. Check the deployment platform's documentation
2. Review error logs in the platform dashboard
3. Test locally first (`npm run build && npm run start`)
4. Contact your developer for support

---

## 🎯 Recommended Deployment

For most users, we recommend **Vercel** or **Railway**:

- Easy to set up
- Free tier available
- Automatic deployments
- Good performance
- Minimal maintenance

For advanced users who need full control, use a **VPS with PM2 and Nginx**.

---

**Good luck with your deployment! 🚀**
