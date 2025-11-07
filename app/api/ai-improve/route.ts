import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { ProductProposal, EvaluationResult } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { proposal, evaluation }: { proposal: ProductProposal; evaluation: EvaluationResult } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const criticalIssues = evaluation.criticalIssues.join('\n- ');
    const recommendations = evaluation.recommendations.join('\n- ');

    const prompt = `You are a product strategy coach helping improve a product proposal using the Impact-First framework. The proposal has been scored and has some issues.

**Current Proposal:**
Title: ${proposal.title}
Overall Score: ${evaluation.overallScore}/100 (${evaluation.rating})

**Critical Issues Identified:**
- ${criticalIssues}

**Current Recommendations:**
- ${recommendations}

**Dimension Scores:**
- Business Impact: ${evaluation.dimensions.businessImpact.score}/10
- Quantifiable Impact: ${evaluation.dimensions.quantifiableImpact.score}/10
- Process Theatre: ${evaluation.dimensions.processTheatre.score}/10
- Death Spiral: ${evaluation.dimensions.deathSpiral.score}/10
- Commercial Mindset: ${evaluation.dimensions.commercialMindset.score}/10

---

**Your Task:** Provide specific, rewritable suggestions to improve this proposal. For each weak area, provide:

1. **What's Wrong**: Explain the specific problem
2. **Why It Matters**: Connect to business impact
3. **Concrete Fix**: Provide exact text or approach to use instead
4. **Example**: Show before/after if applicable

Focus on the **lowest-scoring dimensions first** and provide actionable rewrites the user can copy and paste. Be specific, not generic.

Also answer:
- What's the ONE most critical change that would have the biggest impact on the score?
- If this proposal scored below 50, should it be completely rethought? If so, suggest an alternative direction.

Be direct, actionable, and focused on getting to High Impact (75+).`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3072,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const improvements = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      improvements,
      usage: message.usage,
    });
  } catch (error: any) {
    console.error('AI Improvement Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate improvements with AI' },
      { status: 500 }
    );
  }
}
