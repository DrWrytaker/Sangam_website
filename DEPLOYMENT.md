# Deployment Guide — Sangam Showcase Web Platform

This guide explains how to deploy `showcase-app` to **Vercel**, **Netlify**, or **Firebase Hosting** with optimized caching headers and performance budgets.

---

## 1. Quick Build

```bash
cd showcase-app
npm install
npm run build
```

The optimized output will be in `showcase-app/dist/`.

---

## 2. Deploying to Vercel

### Configuration (`vercel.json`)
Create a `vercel.json` file inside `showcase-app/`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=604800, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

Deploy via CLI:
```bash
npx vercel --prod
```

---

## 3. Deploying to Netlify

### Configuration (`netlify.toml`)
Create a `netlify.toml` file inside `showcase-app/`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=604800, stale-while-revalidate=86400"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 4. Deploying to Firebase Hosting

In the parent project directory:

```bash
firebase init hosting
# Set public directory: showcase-app/dist
# Configure as a single-page app: Yes
firebase deploy --only hosting
```

### In `firebase.json`:
```json
{
  "hosting": {
    "public": "showcase-app/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## 5. Performance Check Checklist Before Deploying

- [x] Run `node scripts/verify-snippets.js` $\rightarrow$ 17/17 verified.
- [x] Run `npm run lint` $\rightarrow$ 0 warnings, 0 errors.
- [x] Run `npm test` $\rightarrow$ 11/11 unit tests pass.
- [x] Run `npm run build` $\rightarrow$ code-split into `react-core`, `three-vendor`, `lucide-icons`, `CodeExplorerPage`, and `ArchitecturePage`.
