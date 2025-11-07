# Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub (Easiest)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `impact-first-app`
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

That's it! Vercel will build and deploy your app automatically.

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd impact-first-app

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? impact-first-app
# - In which directory is your code located? ./
# - Want to modify settings? N

# Your app will be deployed!
```

### Option 3: One-Click Deploy Button

Add this to your README for easy deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aks129/impact-first-app)

## Environment Variables

No environment variables required for v1.0! The app runs entirely client-side.

## Build Configuration

The following files configure the deployment:

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## Post-Deployment

After deployment, you'll receive:
- **Production URL**: `https://impact-first-app.vercel.app`
- **Deployment Dashboard**: Manage your app at vercel.com
- **Auto-deployments**: Every push to main/master triggers a new deployment

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Performance Optimization

Current configuration:
- ✅ Static generation where possible
- ✅ Client-side evaluation (no server needed)
- ✅ Optimized production build
- ✅ Automatic code splitting

## Monitoring

Vercel provides:
- Real-time deployment logs
- Performance analytics
- Error tracking
- Usage statistics

Access these at: https://vercel.com/dashboard

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify Node.js version compatibility

### App Won't Load

1. Check browser console for errors
2. Verify all imports are correct
3. Check that all required files are committed to git

### Slow Performance

1. Review Vercel analytics
2. Check bundle size
3. Consider code splitting if needed

## Local Testing of Production Build

```bash
# Build for production
npm run build

# Start production server locally
npm start

# Open http://localhost:3000
```

## Continuous Deployment

Every push to the main branch automatically:
1. Triggers Vercel build
2. Runs build process
3. Deploys to production
4. Updates your live URL

Preview deployments are created for pull requests!

## Rollback

If something goes wrong:
1. Go to Vercel dashboard
2. Find your project
3. Click "Deployments"
4. Select a previous successful deployment
5. Click "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: https://github.com/aks129/impact-first-app/issues
