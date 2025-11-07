# AI-Powered Features Guide

## Overview

The Impact-First Product Evaluation Tool now includes Claude AI integration to provide expert-level strategic analysis and improvement suggestions for your product proposals.

## Features

### 1. **Deep Strategic Analysis** 🎯

Get comprehensive, CEO-level analysis of your proposal including:

- **Strategic Assessment**: Honest evaluation of true business impact
- **Hidden Risks**: Identifies unstated assumptions, market timing issues, competitive threats
- **CEO-Level Questions**: What tough questions would a CEO ask?
- **Alternative Approaches**: Simpler, higher-impact ways to achieve the goal
- **Death Spiral Assessment**: Analysis of whether this creates more low-impact work
- **Go/No-Go Recommendation**: Should this proceed, be revised, or be killed?

**How to use:**
1. Complete your proposal evaluation
2. Click "Deep Analysis" button in the AI-Powered Insights section
3. Wait 10-15 seconds for Claude to analyze
4. Review the comprehensive strategic assessment

### 2. **Specific Improvement Recommendations** 💪

Get actionable, copy-pasteable improvements tailored to your proposal's weak areas:

- **Targeted Fixes**: Focuses on lowest-scoring dimensions first
- **Before/After Examples**: Shows specific text improvements
- **Concrete Rewrites**: Exact language you can use
- **Priority Guidance**: The ONE most critical change for maximum impact
- **Alternative Direction**: For low scores (<50), suggests complete rethinking

**How to use:**
1. Review your evaluation results
2. Click "Get Improvements" button
3. Receive specific, actionable recommendations
4. Apply suggested improvements to your proposal
5. Re-evaluate to see score increase

### 3. **Real-Time Proposal Assistant** (Coming Soon)

Future enhancement: Get help writing better proposals in real-time as you fill out the form.

## Setup

### Required: Anthropic API Key

To enable AI features, you need an Anthropic API key:

1. **Get API Key**:
   - Visit https://console.anthropic.com/
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new API key

2. **Configure Environment Variable**:

   **For Local Development:**
   ```bash
   # Create .env.local file in project root
   echo "ANTHROPIC_API_KEY=your_api_key_here" > .env.local
   ```

   **For Vercel Deployment:**
   1. Go to your Vercel project dashboard
   2. Navigate to Settings → Environment Variables
   3. Add new variable:
      - Name: `ANTHROPIC_API_KEY`
      - Value: Your Anthropic API key
      - Environment: Production, Preview, Development
   4. Redeploy your application

3. **Restart Development Server** (if running locally):
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /api/ai-evaluate

Provides deep strategic analysis of a product proposal.

**Request Body:**
```typescript
{
  // Full ProductProposal object
  title: string;
  description: string;
  businessAlignment: {...};
  quantifiableImpact: {...};
  processCheck: {...};
  deathSpiralCheck: {...};
  commercialMindset: {...};
}
```

**Response:**
```typescript
{
  analysis: string;  // Comprehensive markdown-formatted analysis
  usage: {
    input_tokens: number;
    output_tokens: number;
  }
}
```

**Model Used:** claude-sonnet-4-20250514 (Latest Claude Sonnet)

### POST /api/ai-improve

Generates specific improvement recommendations based on evaluation results.

**Request Body:**
```typescript
{
  proposal: ProductProposal;
  evaluation: EvaluationResult;
}
```

**Response:**
```typescript
{
  improvements: string;  // Specific, actionable improvements
  usage: {
    input_tokens: number;
    output_tokens: number;
  }
}
```

### POST /api/ai-assist

Provides field-specific assistance while filling out proposals. (Future feature)

**Request Body:**
```typescript
{
  field: string;         // Field name needing help
  currentValue: string;  // Current field value
  context: string;       // Proposal context
}
```

## Cost Estimation

Based on Anthropic's pricing for Claude Sonnet 4:

- **Input**: ~$3 per million tokens
- **Output**: ~$15 per million tokens

**Typical Usage Per Evaluation:**
- Deep Analysis: ~2,000 input tokens, ~3,000 output tokens = ~$0.05
- Improvements: ~1,500 input tokens, ~2,000 output tokens = ~$0.04

**Total per complete AI-enhanced evaluation: ~$0.09**

For 100 evaluations/month: ~$9/month

## Best Practices

### When to Use AI Analysis

✅ **Use AI when:**
- Proposal scores below 75 (not High Impact)
- You're stuck on how to improve
- You need CEO-level questioning
- Looking for alternative approaches
- Want to validate strategic thinking

❌ **Don't use AI when:**
- Proposal already scores 75+ (High Impact)
- Just making minor tweaks
- Doing rapid iteration (use built-in scoring)

### Getting Better AI Responses

1. **Provide Complete Information**: Fill out all fields thoroughly
2. **Be Specific**: More context = better AI analysis
3. **Honest Inputs**: AI works best with truthful assessments
4. **Iterate**: Apply improvements and re-evaluate

## Security & Privacy

- **API Key Security**: Never commit `.env.local` to git (already in .gitignore)
- **Data Transmission**: Proposals sent securely via HTTPS to Anthropic
- **Data Retention**: Per Anthropic's policy, API data not retained for training
- **No Database**: Proposals not stored server-side (client-side evaluation only)

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"

**Problem**: Environment variable not set

**Solution**:
1. Create `.env.local` file with your API key
2. For Vercel: Add environment variable in dashboard
3. Restart dev server or redeploy

### "Failed to evaluate proposal with AI"

**Possible Causes:**
1. Invalid API key → Check key in console.anthropic.com
2. Rate limit exceeded → Wait and retry
3. Network issues → Check internet connection
4. Service outage → Check Anthropic status page

### AI Response is Generic

**Possible Causes:**
1. Insufficient proposal details → Fill out all fields thoroughly
2. Vague descriptions → Be more specific
3. Missing context → Provide business context

**Solution**: Rewrite proposal with more specific details and re-evaluate

## Examples

### Example: Low Score Improvement

**Before AI** (Score: 42/100):
- "Build new dashboard"
- CEO Test: "Maybe?"
- No quantified impact

**After AI Improvements** (Score: 78/100):
- "Increase customer retention by 10% through proactive churn prediction dashboard"
- CEO Test: "Yes - expected $2M ARR impact with 3-month payback"
- Reach: 5,000 at-risk customers
- Action: Respond to early warning notifications
- Value: $400 average annual value
- Likelihood: 25% retention improvement

### Example: Death Spiral Detection

**AI Analysis Identifies:**
- "This proposal creates 3 new dependencies"
- "Requires ongoing support team"
- "Will need quarterly updates"
- **Recommendation**: "Simplify to core functionality or partner with existing solution"

## FAQ

**Q: Is AI required to use the tool?**
A: No. The core evaluation engine works without AI. AI provides enhanced insights.

**Q: Which Claude model is used?**
A: Claude Sonnet 4 (claude-sonnet-4-20250514) - optimized for strategic analysis.

**Q: Can I use different AI models?**
A: Currently supports Claude only. Open an issue for other model support.

**Q: How long does AI analysis take?**
A: Typically 10-20 seconds depending on proposal complexity.

**Q: Is there a rate limit?**
A: Yes, per your Anthropic account limits. Default is generous for typical usage.

**Q: Can AI analysis be wrong?**
A: Yes. AI provides suggestions, not absolute truth. Use your judgment.

## Future Enhancements

Planned AI features:

- [ ] Real-time form assistance
- [ ] Proposal template generation
- [ ] Competitive analysis
- [ ] Market sizing assistance
- [ ] Historical proposal comparison
- [ ] Team collaboration insights
- [ ] Auto-save and iterate mode

## Support

- **Documentation**: See [README.md](../README.md)
- **Issues**: https://github.com/aks129/impact-first-app/issues
- **Anthropic Docs**: https://docs.anthropic.com/
- **API Status**: https://status.anthropic.com/

---

**Powered by Claude Sonnet 4** - Anthropic's latest model optimized for complex analysis and strategic thinking.
