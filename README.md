# SYNARCH Landing Page

A modern, luxury-focused landing page for SYNARCH - a private deep-tech holding company.

## 🚀 Status: BUILD FIXED & FULLY FUNCTIONAL

**Latest Update:** Build issues completely resolved. All pages working with internationalization.

## ✨ Features

- **Internationalization (i18n)** - English and Spanish support
- **Modern UI/UX** - Luxury design with smooth animations
- **Performance Optimized** - Static generation with Next.js 15
- **Accessibility** - WCAG compliant with skip links and ARIA labels
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, structured data, and performance metrics

## 🏗️ Architecture

### Directory Structure
```
app/
├── [locale]/           # Internationalized routes
│   ├── layout.tsx     # Main app layout with i18n
│   ├── page.tsx       # Home page
│   ├── contact/       # Contact page
│   ├── entities/      # Entities page
│   ├── manifesto/     # Manifesto page
│   ├── privacy/       # Privacy policy
│   ├── terms/         # Terms of service
│   └── thesis/        # Thesis page
├── layout.tsx         # Root layout (minimal, for error pages)
├── globals.css        # Global styles
└── not-found.tsx      # 404 page
```

### Key Components
- **ClientLayout** - Main content wrapper
- **Header/Footer** - Navigation components
- **LuxuryHero** - Hero section with animations
- **ScrollController** - Smooth scroll management
- **PerformanceMonitor** - Real-time performance tracking

## 🌍 Internationalization

- **Supported Languages:** English (en), Spanish (es)
- **Locale Detection:** Automatic with fallback to English
- **Static Generation:** Enabled with `setRequestLocale`
- **Message Files:** JSON-based translations in `/messages`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Robbin360/synarch-landing.git
cd synarch-landing

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=production
NEXT_PUBLIC_BUILD_VERSION=${VERCEL_GIT_COMMIT_SHA}
```

### Next.js Configuration
- **Framework:** Next.js 15.4.7
- **Internationalization:** next-intl 3.26.5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP

## 📱 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:** Optimized for all metrics
- **Bundle Size:** Optimized with code splitting
- **Image Optimization:** Next.js Image component with WebP/AVIF

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📦 Build & Deployment

### Build Process
1. **Compilation** - TypeScript compilation with Next.js
2. **Static Generation** - Pages pre-rendered at build time
3. **Internationalization** - Locale-specific builds
4. **Optimization** - Bundle splitting and minification

### Deployment
- **Platform:** Vercel (recommended)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Version:** 18.x

## 🐛 Troubleshooting

### Common Issues

**Build Fails with Internationalization Error:**
- ✅ **SOLVED:** Updated to use `setRequestLocale` for static rendering
- ✅ **SOLVED:** Simplified root layout for error pages
- ✅ **SOLVED:** Proper middleware configuration

**Performance Issues:**
- Check bundle analyzer: `npm run analyze`
- Monitor Core Web Vitals in development
- Use Performance Dashboard component

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved by SYNARCH.

## 🆘 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Last Updated:** September 1, 2025  
**Build Status:** ✅ SUCCESSFUL  
**Version:** 0.2.0
