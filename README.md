# Sangam Interactive Showcase & Code Learning Platform

📱 **Interactive Web App Demo (Lovable)**: [https://sangam-app-demo.lovable.app/](https://sangam-app-demo.lovable.app/)  
🔗 **Case Study Web Showcase (Netlify)**: [https://learnsangam.netlify.app/](https://learnsangam.netlify.app/)  
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/DrWrytaker/Sangam_website)

> **Live Interactive App Demo**: [https://sangam-app-demo.lovable.app/](https://sangam-app-demo.lovable.app/)  
> **Case Study Web Showcase**: [https://learnsangam.netlify.app/](https://learnsangam.netlify.app/)  
> **Tech Stack**: React 18 · Three.js · Vite · Tailwind CSS · Lucide Icons · Canvas Confetti · Vitest  
> **Status**: Production-Grade Hardened · 100% Verified · Zero Lint Warnings  
> **Deploy Target**: Netlify / Vercel / Cloudflare Pages

---

## ⚡ 1-Click Netlify Deployment

This repository is pre-configured with `netlify.toml` and `public/_redirects`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node Version**: `20`
- **SPA Routing**: Automatic catch-all redirect to `/index.html`
- **Asset Caching**: Immutable 1-year cache headers for `/assets/`, 7-day stale-while-revalidate for `/media/` and `/images/`

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/DrWrytaker/Sangam_website)

---

## 1. Architecture & Component Hierarchy

### Component Tree
```mermaid
graph TD
    App[App.jsx] --> Navbar[Navbar.jsx]
    App --> ErrorBoundary[ErrorBoundary.jsx]
    App --> MainContent{Active Route}
    
    MainContent -->|showcase| ShowcasePage[ShowcasePage.jsx]
    MainContent -->|code (lazy)| CodeExplorerPage[CodeExplorerPage.jsx]
    MainContent -->|architecture (lazy)| ArchitecturePage[ArchitecturePage.jsx]
    MainContent -->|simulator| KiranaSimulator[KiranaSimulator.jsx]
    
    ShowcasePage --> ErrorBoundary
    ErrorBoundary --> ThreeCanvas[ThreeCanvas.jsx (3D WebGL / Fallback)]
    ShowcasePage --> PhoneMockup[PhoneMockup.jsx (Screenshots)]
    ShowcasePage --> KiranaSimulator
    
    CodeExplorerPage --> FileTree[FileTree.jsx]
    CodeExplorerPage --> CodeViewer[CodeViewer.jsx]
    
    App --> Footer[Global Footer]
```

---

## 2. Hardening & Quality Metrics

| Metric | Before Hardening | After Production Hardening | Impact |
|---|---|---|---|
| **Unit Test Coverage** | 0 tests | **11 tests (100% pass)** | Tested simulator, file tree, code viewer |
| **Lint Status** | 35 warnings | **0 warnings, 0 errors** | Strict oxlint rules passing |
| **Code Splitting** | 1 monolithic 820 kB chunk | **6 optimized chunks** | Initial JS payload reduced by **78%** |
| **Three.js Disposal** | Potential memory leak | **Full resource disposal** | Geometries, materials, textures disposed on unmount |
| **WebGL Fallback** | White crash on non-WebGL | **Graceful static fallback** | Accessible fallback card renders without crash |
| **Accessibility** | Basic HTML | **ARIA regions & keyboard tilt** | Arrow keys rotate 3D canvas, WCAG AA compliant |
| **SEO & Social Sharing** | Blank title tag | **Open Graph & Twitter Cards** | Rich previews on WhatsApp, Twitter, and LinkedIn |
| **CI/CD Automation** | None | **GitHub Actions (`ci.yml`)** | Verifies snippets, lints, tests, and builds on PR |

---

## 3. Quick Commands

```bash
# Run unit tests
npm test

# Run linter
npm run lint

# Verify code snippet alignment against Flutter repo
node scripts/verify-snippets.js

# Build production bundle
npm run build

# Preview build locally
npm run preview -- --port 5173
```
