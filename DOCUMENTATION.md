# Project Documentation

Complete technical documentation for the NJ Design Portfolio website.

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [File Structure](#file-structure)
6. [API Endpoints](#api-endpoints)
7. [Data Storage](#data-storage)
8. [Customization Guide](#customization-guide)
9. [Maintenance](#maintenance)

---

## 🎯 Project Overview

The NJ Design Portfolio is a full-stack web application designed for showcasing design work with bilingual support (English/Uzbek). It features a modern, animated interface with a complete admin panel for content management.

### Key Characteristics:

- **Type**: Full-stack web application
- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Language Support**: English, Uzbek

---

## 🛠️ Technology Stack

### Frontend

| Technology      | Version  | Purpose                 |
| --------------- | -------- | ----------------------- |
| React           | 18.3.1   | UI framework            |
| TypeScript      | 5.9.2    | Type safety             |
| Vite            | 7.1.2    | Build tool & dev server |
| Tailwind CSS    | 3.4.17   | Styling                 |
| Framer Motion   | 12.23.12 | Animations              |
| Three.js        | 0.176.0  | 3D graphics             |
| React Router    | 6.30.1   | Routing                 |
| React Hook Form | 7.62.0   | Form management         |
| Zod             | 3.25.76  | Schema validation       |

### Backend

| Technology | Version | Purpose      |
| ---------- | ------- | ------------ |
| Express    | 5.1.0   | Web server   |
| Multer     | 2.0.2   | File uploads |
| TypeScript | 5.9.2   | Type safety  |

### UI Components

- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Headless UI primitives
- **Lucide React**: Icon library

---

## 🏗️ Architecture

### Application Flow

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │  React Application (Port 5000)                     │ │
│  │  ├─ Home Page (/)                                  │ │
│  │  ├─ Admin Panel (/admin)                           │ │
│  │  └─ Language Context (EN/UZ)                       │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────┐
│              Express Server (Port 5000)                  │
│  ┌────────────────────────────────────────────────────┐ │
│  │  API Routes                                        │ │
│  │  ├─ /api/about                                     │ │
│  │  ├─ /api/portfolio                                 │ │
│  │  ├─ /api/pricing                                   │ │
│  │  ├─ /api/contact                                   │ │
│  │  └─ /api/upload                                    │ │
│  └────────────────────────────────────────────────────┘ │
│                          ↕                              │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Data Storage (JSON Files)                        │ │
│  │  ├─ server/data/data.json                         │ │
│  │  └─ server/uploads/ (images)                      │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App.tsx
├── AnimatedLinesBackground
├── Router
    ├── Home (/)
    │   ├── Header
    │   │   └── LanguageToggle
    │   ├── HeroSection
    │   ├── AboutSection
    │   ├── PortfolioSection
    │   │   └── PortfolioModal
    │   ├── PricingSection
    │   ├── ContactSection
    │   └── Footer
    └── Admin (/admin)
        ├── AdminHeader
        │   └── LanguageToggle
        ├── AboutMeSection
        ├── PortfolioSection
        ├── PricingSection
        ├── ContactSection
        └── PasswordSection
```

---

## ✨ Features

### 1. Bilingual Support

- **Languages**: English (en), Uzbek (uz)
- **Implementation**: Context API + Local Storage
- **Location**: `client/utils/translations.ts`
- **Persistence**: Browser localStorage

### 2. Admin Panel

- **Route**: `/admin`
- **Sections**:
  - About Me: Profile info and image
  - Portfolio: Project management
  - Pricing: Service pricing tiers
  - Contact: Contact information
  - Password: Security settings

### 3. Image Upload

- **Endpoint**: `/api/upload`
- **Storage**: `server/uploads/`
- **Supported Formats**: JPG, PNG, WebP, GIF
- **Max Size**: Configurable in multer settings

### 4. Animated Background

- **Technology**: Three.js + React Three Fiber
- **Component**: `AnimatedLinesBackground.tsx`
- **Features**:
  - Animated 3D lines
  - Particle effects
  - Responsive to screen size

### 5. Responsive Design

- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Framework**: Tailwind CSS

---

## 📁 File Structure

```
nj-design-portfolio/
│
├── client/                          # Frontend application
│   ├── components/                  # React components
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── AnimatedLinesBackground.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── PortfolioModal.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   │
│   ├── pages/                      # Page components
│   │   ├── Home.tsx
│   │   └── Admin.tsx
│   │
│   ├── utils/                      # Utility functions
│   │   └── translations.ts         # Language translations
│   │
│   ├── hooks/                      # Custom React hooks
│   │   └── use-toast.ts
│   │
│   ├── lib/                        # Libraries and utilities
│   │   └── utils.ts
│   │
│   ├── App.tsx                     # Main app component
│   └── global.css                  # Global styles
│
├── server/                         # Backend application
│   ├── routes/                     # API route handlers
│   │   └── (route files)
│   │
│   ├── data/                       # Data storage
│   │   └── data.json              # Main data file
│   │
│   ├── uploads/                    # Uploaded images
│   │
│   ├── index.ts                    # Server entry point
│   ├── routes.ts                   # Route definitions
│   ├── storage.ts                  # Data management
│   └── node-build.ts              # Production build entry
│
├── shared/                         # Shared code
│   └── schema.ts                   # TypeScript types
│
├── public/                         # Static assets
│
├── .env                           # Environment variables
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind config
├── vite.config.ts                 # Vite config (client)
├── vite.config.server.ts          # Vite config (server)
│
├── README.md                      # Setup guide
├── DEPLOYMENT.md                  # Deployment guide
└── DOCUMENTATION.md               # This file
```

---

## 🔌 API Endpoints

### About Section

#### GET `/api/about`

Get about section data.

**Response:**

```json
{
  "name": "John Doe",
  "title": "Web Designer",
  "description": "I create beautiful websites...",
  "image": "/uploads/profile.jpg",
  "visible": true
}
```

#### POST `/api/about`

Update about section.

**Request Body:**

```json
{
  "name": "John Doe",
  "title": "Web Designer",
  "description": "I create beautiful websites...",
  "image": "/uploads/profile.jpg",
  "visible": true
}
```

---

### Portfolio Section

#### GET `/api/portfolio`

Get all portfolio items.

**Response:**

```json
{
  "items": [
    {
      "id": "1",
      "title": "Project Name",
      "description": "Project description",
      "image": "/uploads/project1.jpg",
      "visible": true
    }
  ]
}
```

#### POST `/api/portfolio`

Add new portfolio item.

#### PUT `/api/portfolio/:id`

Update portfolio item.

#### DELETE `/api/portfolio/:id`

Delete portfolio item.

---

### Pricing Section

#### GET `/api/pricing`

Get pricing tiers.

**Response:**

```json
{
  "tiers": [
    {
      "id": "1",
      "name": "Basic",
      "price": "$99",
      "features": ["Feature 1", "Feature 2"],
      "visible": true
    }
  ]
}
```

#### POST `/api/pricing`

Update pricing data.

---

### Contact Section

#### GET `/api/contact`

Get contact information.

**Response:**

```json
{
  "email": "contact@example.com",
  "phone": "+1234567890",
  "location": "New York, USA",
  "social": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/...",
    "linkedin": "https://linkedin.com/..."
  },
  "visible": true
}
```

#### POST `/api/contact`

Update contact information.

---

### File Upload

#### POST `/api/upload`

Upload an image file.

**Request:** multipart/form-data with file field

**Response:**

```json
{
  "url": "/uploads/filename.jpg"
}
```

---

## 💾 Data Storage

### Storage Method

Data is stored in JSON files in the `server/data/` directory.

### Data Structure

**File:** `server/data/data.json`

```json
{
  "about": {
    "name": "string",
    "title": "string",
    "description": "string",
    "image": "string",
    "visible": boolean
  },
  "portfolio": {
    "items": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "image": "string",
        "visible": boolean
      }
    ]
  },
  "pricing": {
    "tiers": [
      {
        "id": "string",
        "name": "string",
        "price": "string",
        "features": ["string"],
        "visible": boolean
      }
    ]
  },
  "contact": {
    "email": "string",
    "phone": "string",
    "location": "string",
    "social": {
      "facebook": "string",
      "instagram": "string",
      "linkedin": "string"
    },
    "visible": boolean
  }
}
```

### Image Storage

- **Location**: `server/uploads/`
- **Naming**: Original filename with timestamp
- **Access**: Via `/uploads/filename.jpg` URL

---

## 🎨 Customization Guide

### Changing Colors

Edit `client/global.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 262.1 83.3% 57.8%;
  --secondary: 220 14.3% 95.9%;
  /* ... more colors */
}
```

### Adding New Languages

1. Edit `client/utils/translations.ts`:

```typescript
export const translations = {
  en: {
    /* English */
  },
  uz: {
    /* Uzbek */
  },
  es: {
    /* Spanish - NEW */
  },
};

export type Language = "en" | "uz" | "es";
```

2. Update language selector in Header component

### Modifying Animated Background

Edit `client/components/AnimatedLinesBackground.tsx`:

```typescript
// Change number of lines
const lineCount = 50; // Default: 50

// Change animation speed
const speed = 0.001; // Default: 0.001

// Change colors
const lineColor = "#8b5cf6"; // Purple
```

### Adding New Sections

1. Create component in `client/components/`
2. Add to Home page in `client/pages/Home.tsx`
3. Add translations in `client/utils/translations.ts`
4. Create API endpoint in `server/routes.ts`
5. Update data schema in `shared/schema.ts`

### Customizing Admin Panel

Edit `client/pages/Admin.tsx` to:

- Add new sections
- Modify existing sections
- Change layout
- Add new fields

---

## 🔧 Maintenance

### Regular Tasks

#### Weekly

- [ ] Check for broken images
- [ ] Review contact form submissions
- [ ] Test admin panel functionality

#### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Backup data files
- [ ] Review and optimize images

#### Quarterly

- [ ] Update Node.js version
- [ ] Review and update content
- [ ] Performance audit
- [ ] Security audit

### Backup Strategy

#### What to Backup

1. `server/data/data.json` - All content data
2. `server/uploads/` - All uploaded images
3. `.env` - Environment configuration

#### How to Backup

**Manual Backup:**

```bash
# Create backup folder
mkdir backups

# Copy data
cp server/data/data.json backups/data-$(date +%Y%m%d).json
cp -r server/uploads backups/uploads-$(date +%Y%m%d)
```

**Automated Backup (Linux/Mac):**
Create a cron job:

```bash
0 0 * * 0 /path/to/backup-script.sh
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update package-name

# Update to latest (breaking changes possible)
npm install package-name@latest
```

### Security Best Practices

1. **Keep Dependencies Updated**

   ```bash
   npm audit fix
   ```

2. **Use Environment Variables**
   - Never commit `.env` file
   - Use different values for production

3. **Implement Authentication**
   - Add login system for admin panel
   - Use JWT or session-based auth

4. **Sanitize User Input**
   - Already implemented with Zod schemas
   - Validate all API inputs

5. **HTTPS Only**
   - Use SSL certificates in production
   - Redirect HTTP to HTTPS

### Performance Optimization

1. **Image Optimization**
   - Compress images before upload
   - Use WebP format
   - Implement lazy loading

2. **Code Splitting**
   - Already implemented with Vite
   - Lazy load routes

3. **Caching**
   - Enable browser caching
   - Use CDN for static assets

4. **Minification**
   - Automatic in production build
   - Verify with `npm run build`

---

## 🐛 Common Issues

### Issue: Port 5000 Already in Use

**Solution:** Change port in `server/index.ts`

### Issue: Images Not Loading

**Solution:** Check `server/uploads/` permissions

### Issue: Build Fails

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Language Not Switching

**Solution:** Clear browser localStorage

---

## 📊 Performance Metrics

### Target Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90

### Monitoring

Use Google PageSpeed Insights or Lighthouse to monitor performance.

---

## 🔗 Useful Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Vite Documentation](https://vitejs.dev)

---

## 📝 Version History

### Version 1.0.0 (February 2026)

- Initial release
- Bilingual support (EN/UZ)
- Admin panel
- Portfolio management
- Animated background
- Responsive design

---

**For additional support, refer to README.md and DEPLOYMENT.md**
