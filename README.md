# NJ Design Portfolio Website

A modern, bilingual (English/Uzbek) portfolio website built with React, TypeScript, and Express. Features a stunning animated background, admin panel for content management, and a responsive design.

## 🌟 Features

- **Bilingual Support**: Switch between English and Uzbek languages
- **Admin Panel**: Manage portfolio items, about section, pricing, and contact information
- **Animated Background**: Premium 3D animated lines background using Three.js
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Image Upload**: Upload and manage portfolio images
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type-Safe**: Full TypeScript implementation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm** (recommended)

To check if you have Node.js installed:

```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Extract the Project

Extract the project folder to your desired location.

### 2. Install Dependencies

Open a terminal/command prompt in the project folder and run:

```bash
npm install
```

Or if you have pnpm installed:

```bash
pnpm install
```

This will install all required dependencies (may take a few minutes).

### 3. Start the Development Server

Run the following command:

```bash
npm run dev
```

The application will start on `http://localhost:5000`

### 4. Access the Application

- **Main Website**: Open your browser and go to `http://localhost:5000`
- **Admin Panel**: Navigate to `http://localhost:5000/admin`

## 🔧 Available Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start development server (frontend + backend) |
| `npm run build`      | Build for production                          |
| `npm run start`      | Start production server (after build)         |
| `npm run format.fix` | Format code with Prettier                     |
| `npm run typecheck`  | Check TypeScript types                        |

## 📁 Project Structure

```
nj-design-portfolio/
├── client/                 # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components (Home, Admin)
│   ├── utils/            # Utility functions (translations)
│   └── global.css        # Global styles
├── server/                # Backend Express application
│   ├── routes/           # API routes
│   ├── data/             # Data storage (JSON files)
│   ├── uploads/          # Uploaded images
│   └── storage.ts        # Data management logic
├── shared/                # Shared types and schemas
│   └── schema.ts         # TypeScript types
├── public/               # Static assets
└── package.json          # Project dependencies
```

## 🎨 Admin Panel Guide

### Accessing the Admin Panel

1. Navigate to `http://localhost:5000/admin`
2. The admin panel has 5 main sections:

#### Section 1: About Me

- Edit your name, title, and description
- Upload your profile image
- Toggle visibility on the main page

#### Section 2: Portfolio Items

- Add/Edit/Delete portfolio projects
- Upload project images
- Set project titles and descriptions
- Toggle individual item visibility

#### Section 3: Pricing

- Manage pricing tiers
- Set prices and features
- Toggle pricing section visibility

#### Section 4: Contact Information

- Update email, phone, and location
- Manage social media links
- Toggle contact section visibility

#### Section 5: Change Password

- Update admin panel access password
- Secure your admin area

### Uploading Images

1. Click the "Upload Image" button in any section
2. Select an image file (JPG, PNG, WebP)
3. The image will be automatically uploaded and displayed
4. Images are stored in `server/uploads/`

## 🌐 Language Switching

The website supports two languages:

- **English** (default)
- **Uzbek** (O'zbek)

Users can switch languages using the language toggle buttons in the header. The selected language is saved in the browser's local storage.

## 🔒 Security Notes

- The admin panel is accessible to anyone who knows the URL
- Consider adding authentication for production use
- Change default passwords before deployment
- Keep your `.env` file secure and never commit it to version control

## 📦 Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

To run the production build locally:

```bash
npm run start
```

## 🚀 Deployment Options

### Option 1: Traditional Hosting (VPS/Dedicated Server)

1. Build the project: `npm run build`
2. Upload the entire project folder to your server
3. Install Node.js on the server
4. Run `npm install --production`
5. Start the server: `npm run start`
6. Use a process manager like PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start dist/server/node-build.mjs --name "portfolio"
   pm2 save
   pm2 startup
   ```

### Option 2: Cloud Platforms

- **Vercel**: Connect your Git repository and deploy automatically
- **Netlify**: Similar to Vercel, great for static sites
- **Railway**: Easy Node.js deployment
- **Render**: Free tier available for Node.js apps
- **DigitalOcean App Platform**: Managed deployment

### Option 3: Docker (Advanced)

A `.dockerignore` file is included. You can containerize the application for deployment.

## 🛠️ Customization

### Changing Colors

Edit `client/global.css` to modify the color scheme:

```css
:root {
  --primary: 262.1 83.3% 57.8%;
  --secondary: 220 14.3% 95.9%;
  /* ... other colors */
}
```

### Modifying Translations

Edit `client/utils/translations.ts` to add or modify translations:

```typescript
export const translations = {
  en: {
    // English translations
  },
  uz: {
    // Uzbek translations
  },
};
```

### Changing the Animated Background

The animated background is in `client/components/AnimatedLinesBackground.tsx`. You can adjust:

- Number of lines
- Animation speed
- Colors
- Particle count

## 🐛 Troubleshooting

### Port Already in Use

If port 5000 is already in use, you can change it in `server/index.ts`:

```typescript
const PORT = process.env.PORT || 5000; // Change 5000 to another port
```

### Images Not Uploading

- Check that the `server/uploads/` folder exists
- Ensure you have write permissions
- Check file size limits in `server/routes.ts`

### Build Errors

- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📞 Support

For technical support or questions about this project:

- Check the documentation in the `DOCUMENTATION.md` file
- Review the deployment guide in `DEPLOYMENT.md`
- Contact the developer who delivered this project

## 📄 License

This project is proprietary and licensed for use by the client.

## 🙏 Credits

Built with:

- React + TypeScript
- Express.js
- Tailwind CSS
- shadcn/ui
- Three.js
- Framer Motion

---

**Last Updated**: February 2026
**Version**: 1.0.0
