import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { field, currentValue, context } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    let prompt = '';

    switch (field) {
      case 'ceoFundingTest':
        prompt = `Help write a strong CEO funding test answer for this product proposal.

Current answer: "${currentValue}"
Context: ${context}

Provide a compelling, specific answer that:
1. Clearly articulates business value (revenue, retention, growth)
2. Quantifies expected ROI if possible
3. Connects to critical business metrics
4. Shows why a CEO would fund this over other initiatives
5. Is concise but thorough (100-200 words)

Write the improved answer directly - no preamble.`;
        break;

      case 'quantifiableImpact':
        prompt = `Help estimate realistic numbers for the 4 impact questions.

Context: ${context}
Current inputs: ${currentValue}

Provide:
1. A realistic reach estimate with reasoning
2. Suggested conversion likelihood based on similar initiatives
3. How to calculate action value
4. Any assumptions to validate

Be specific and data-driven where possible.`;
        break;

      case 'outcomeDescription':
        prompt = `Rewrite this outcome description to focus on business results, not process.

Current: "${currentValue}"
Context: ${context}

Rewrite to:
1. Focus on measurable business outcomes (not process/frameworks)
2. Avoid buzzwords like "OKR", "best practice", "alignment"
3. Be specific about what changes for users/business
4. Keep it under 100 words

Provide the rewritten version directly.`;
        break;

      case 'deathSpiral':
        prompt = `Help assess death spiral risks honestly for this proposal.

Proposal context: ${context}
Current answer: "${currentValue}"

Provide:
1. Honest assessment: Will this create downstream work?
2. Simplification opportunities
3. How to reduce complexity
4. Specific dependencies to avoid

Be brutally honest - low-impact work kills teams.`;
        break;

      default:
        prompt = `Improve this section of a product proposal using the Impact-First framework.

Field: ${field}
Current: "${currentValue}"
Context: ${context}

Provide specific, actionable improvements focused on demonstrating clear business impact.`;
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const suggestion = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      suggestion,
      usage: message.usage,
    });
  } catch (error: any) {
    console.error('AI Assist Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate AI assistance' },
      { status: 500 }
    );
  }
}
