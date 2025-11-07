# Impact-First Product Evaluation Tool

A web application for evaluating product proposals using Matt LeMay's Impact-First Product Teams framework.

**✨ Now with AI-Powered Insights by Claude!**

## Overview

This tool helps product teams evaluate their proposals based on 5 key dimensions, with optional AI-powered deep analysis and improvement suggestions:

1. **Business Impact & Goal Alignment (35%)** - Would the CEO fund this?
2. **Quantifiable Impact (25%)** - Can you answer the 4 impact questions?
3. **Focus Over Process Theatre (20%)** - Outcomes vs. process compliance
4. **Death Spiral Avoidance (15%)** - Does this create more low-impact work?
5. **Commercial Mindedness (5%)** - Grounded in costs, benefits, tradeoffs

## Key Framework Principles

Based on Matt LeMay's work presented at Pragmatic Institute Summit:

- **Business expects ROI** - If you can't answer the value question, you're in trouble
- **Breaking the death spiral** - Focus on fewer, more impactful goals
- **Low-impact work begets more low-impact work** - Most orgs perpetuate this
- **CEO Funding Test** - "If you were the CEO, would you fully fund this team?"
- **Stay close to goals** - If you must spend hours reviewing docs to understand goals, you don't understand them

## The Four Impact Questions

Every proposal should answer:

1. How many people will this reach?
2. What action do we want them to take?
3. What's the value of that action?
4. What's the likelihood they'll complete it?

**Expected Impact = Reach × Action Value × Conversion Likelihood**

## ✨ AI-Powered Features

### 1. Deep Strategic Analysis 🎯
Get CEO-level analysis including:
- Strategic assessment and hidden risks
- Tough questions a CEO would ask
- Alternative approaches
- Go/No-Go recommendations

### 2. Specific Improvements 💪
Receive actionable recommendations:
- Targeted fixes for weak areas
- Before/after examples
- Copy-pasteable improvements
- Priority guidance

### Setup AI Features

1. Get an Anthropic API key from https://console.anthropic.com/
2. Create `.env.local` file:
   ```bash
   ANTHROPIC_API_KEY=your_api_key_here
   ```
3. For Vercel deployment: Add `ANTHROPIC_API_KEY` environment variable in dashboard

**See [AI Features Guide](docs/AI_FEATURES.md) for complete documentation.**

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the tool.

### Build

```bash
npm run build
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/impact-first-app)

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## How to Use

1. **Fill out the proposal form** with details about your product initiative
2. **Answer the critical questions** honestly:
   - CEO funding test
   - Quantifiable impact metrics
   - Process vs. outcomes focus
   - Death spiral risks
   - Commercial considerations

3. **Review your evaluation** to see:
   - Overall impact score (0-100)
   - Rating: High/Medium/Low Impact
   - Dimension-by-dimension breakdown
   - Critical issues identified
   - Recommendations for improvement

## Scoring Methodology

### Business Impact (35%)
- CEO funding justification (4 pts)
- Direct connection to goals (3 pts)
- Market/board alignment (3 pts)

### Quantifiable Impact (25%)
- All 4 questions answered (2.5 pts each)
- Calculates expected financial impact

### Process Theatre (20%)
- Starts at 10, deducts for red flags
- Checks for buzzwords without substance
- Evaluates simplification vs. complexity

### Death Spiral (15%)
- Starts at 10, deducts for risks
- Downstream work assessment (-5 pts)
- Complexity impact (-3 pts)
- Goal clarity (-2 pts)

### Commercial Mindset (5%)
- Cost-benefit analysis (4 pts)
- Tradeoffs discussion (3 pts)
- Business model fit (3 pts)

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Framework Source

Based on:
- **Book:** "Impact-First Product Teams" by Matt LeMay
- **Presentation:** Pragmatic Institute Summit - Impact First Teams
- **Core Philosophy:** Business expects ROI. Focus on impact, not just "doing product"

## License

ISC

## Contributing

Contributions welcome! Please feel free to submit issues or pull requests.
