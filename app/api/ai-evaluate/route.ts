import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { ProductProposal } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const proposal: ProductProposal = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are an expert product strategist and advisor specializing in Matt LeMay's Impact-First Product Teams framework. Analyze the following product proposal and provide deep, actionable insights.

**Product Proposal:**
Title: ${proposal.title}
Description: ${proposal.description}

**Business Alignment:**
- CEO Funding Test: ${proposal.businessAlignment.ceoFundingTest}
- Connection to Goals: ${proposal.businessAlignment.connectionToGoals}
- Market Expectations: ${proposal.businessAlignment.marketExpectations}

**Quantifiable Impact:**
- Reach: ${proposal.quantifiableImpact.reach.toLocaleString()} people
- Action: ${proposal.quantifiableImpact.action}
- Action Value: $${proposal.quantifiableImpact.actionValue}
- Conversion Likelihood: ${proposal.quantifiableImpact.conversionLikelihood}%

**Process Check:**
- Outcome Description: ${proposal.processCheck.outcomeDescription}
- Simplification Plan: ${proposal.processCheck.simplificationPlan}
- Dependencies Created: ${proposal.processCheck.dependenciesCreated}

**Death Spiral Check:**
- Downstream Work: ${proposal.deathSpiralCheck.downstreamWork}
- Complexity Impact: ${proposal.deathSpiralCheck.complexityImpact}
- Goal Clarity: ${proposal.deathSpiralCheck.goalClarity}

**Commercial Mindset:**
- Cost-Benefit Analysis: ${proposal.commercialMindset.costBenefitAnalysis}
- Tradeoffs: ${proposal.commercialMindset.tradeoffs}
- Business Model Fit: ${proposal.commercialMindset.businessModelFit}

---

Please provide a comprehensive analysis addressing:

1. **Strategic Assessment**: Is this truly high-impact work? Would you fund this as a CEO?

2. **Hidden Risks**: What risks or red flags are not immediately obvious? Look for:
   - Unstated assumptions
   - Market timing issues
   - Competitive threats
   - Resource constraints
   - Technical feasibility concerns

3. **CEO-Level Questions**: What tough questions would a CEO ask about this proposal?

4. **Alternative Approaches**: Are there simpler, higher-impact alternatives to achieve the same goal?

5. **Specific Improvements**: Provide 3-5 concrete, actionable recommendations to strengthen this proposal. Be specific about what to change and why.

6. **Death Spiral Assessment**: Analyze honestly whether this creates more low-impact work or truly moves the needle.

7. **Go/No-Go Recommendation**: Should this proceed, be revised, or be killed? Explain why.

Format your response in clear sections with specific, actionable insights. Be direct and honest - this is about business impact, not validation.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const analysis = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      analysis,
      usage: message.usage,
    });
  } catch (error: any) {
    console.error('AI Evaluation Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to evaluate proposal with AI' },
      { status: 500 }
    );
  }
}
