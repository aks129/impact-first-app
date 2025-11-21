# Impact-First Product Evaluation Tool

## Overview
A Next.js web application for evaluating product proposals using Matt LeMay's Impact-First Product Teams framework. The tool provides instant scoring and AI-powered strategic insights using Claude AI.

## Project Information
- **Framework:** Next.js 16 with App Router and Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI Integration:** Anthropic Claude SDK
- **Current State:** Fully functional and running on Replit

## Recent Changes
- **2024-11-21:** Initial Replit setup completed
  - Configured Next.js to run on 0.0.0.0:5000 for Replit environment
  - Added `allowedDevOrigins: ['*']` to handle Replit's proxy
  - Installed all dependencies
  - Configured deployment settings for autoscale
  - Verified application is working correctly

## Project Architecture

### Frontend Structure
- **App Router:** `/app` directory with Next.js 15+ App Router
- **Pages:**
  - `/app/page.tsx` - Main evaluation form and results
  - `/app/layout.tsx` - Root layout with navigation

### Components
- **ProposalForm.tsx** - Main form for product proposal evaluation
- **EvaluationResults.tsx** - Displays scoring breakdown and recommendations
- **FormProgress.tsx** - Progress indicator for multi-step form

### API Routes (Backend)
All API routes are in `/app/api/`:
- `/api/ai-assist` - AI-powered field assistance and suggestions
- `/api/ai-evaluate` - Deep strategic analysis using Claude
- `/api/ai-improve` - Specific improvement recommendations

### Scoring Engine
Located in `/lib/scoring/`:
- `evaluationEngine.ts` - Main scoring orchestrator
- `businessImpactScorer.ts` - CEO funding test (35% weight)
- `quantifiableImpactScorer.ts` - 4 impact questions (25% weight)
- `processTheatreScorer.ts` - Process vs outcomes (20% weight)
- `deathSpiralScorer.ts` - Low-impact work detection (15% weight)
- `commercialScorer.ts` - Commercial mindset (5% weight)

### AI Features
- Requires `ANTHROPIC_API_KEY` environment variable
- Uses Claude Sonnet 4 model
- Features:
  - Real-time field assistance
  - Deep strategic analysis
  - Improvement suggestions
  - CEO-level questioning

## Environment Configuration

### Required Environment Variables
- `ANTHROPIC_API_KEY` - API key from https://console.anthropic.com/
  - Optional but required for AI features
  - Can be set as a Replit secret

### Development
The app runs on:
- Host: `0.0.0.0` (required for Replit)
- Port: `5000` (required for Replit webview)
- Command: `npm run dev`

### Production
- Deployment type: Autoscale (stateless)
- Build command: `npm run build`
- Run command: `npm start`

## Key Framework Principles
Based on Matt LeMay's Impact-First Teams:
1. Business expects ROI
2. CEO funding test - Would CEO fully fund this?
3. Break the death spiral - Focus on fewer, high-impact goals
4. Quantifiable impact using 4 questions
5. Outcomes over process theatre

## Dependencies
All dependencies are managed in `package.json`:
- Production: React 19, Next.js 16, Tailwind CSS 4, Anthropic SDK
- Development: TypeScript, ESLint, PostCSS

## Important Notes
- Next.js 16 uses Turbopack by default (faster than webpack)
- The app is configured for Replit's proxy environment
- WebSocket warnings in browser console are expected (HMR through proxy)
- AI features are optional - app works without API key

## User Preferences
None documented yet.
