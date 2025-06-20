# Mahalliy Market Landing Page

Bu loyiha mahalliy do'konlardan mahsulot band qilish xizmati uchun landing page hisoblanadi.

## Netlify'da Deploy qilish

### 1. GitHub'ga yuklash
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
\`\`\`

### 2. Netlify'da sozlash
1. [Netlify](https://netlify.com) saytiga kiring
2. "New site from Git" tugmasini bosing
3. GitHub repository'ni tanlang
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

### 3. Environment Variables (agar kerak bo'lsa)
Netlify dashboard'da Site settings > Environment variables bo'limida qo'shing.

### 4. Custom Domain (ixtiyoriy)
Site settings > Domain management bo'limida custom domain qo'shishingiz mumkin.

## Local Development

\`\`\`bash
# Dependencies o'rnatish
npm install

# Development server ishga tushirish
npm run dev

# Production build
npm run build
\`\`\`

## Texnologiyalar
- Next.js 14
- React 18
- Tailwind CSS
- Shadcn/ui
- Lucide React Icons

## Xususiyatlar
- Responsive design
- SEO optimized
- Fast loading
- Modern UI/UX
- Telegram integration
