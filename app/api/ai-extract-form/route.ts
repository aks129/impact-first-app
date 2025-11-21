import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { ProductProposal } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are an expert at understanding product proposals from natural speech and extracting structured data.

User's spoken proposal:
"${transcript}"

Extract and structure this into a product proposal format. Return ONLY valid JSON with this exact structure (fill empty strings if information not provided):

{
  "title": "string - the proposal/project name",
  "description": "string - brief overview",
  "businessAlignment": {
    "ceoFundingTest": "string - why would a CEO fund this? business value",
    "connectionToGoals": "string - connection to business metrics",
    "marketExpectations": "string - market/board alignment"
  },
  "quantifiableImpact": {
    "reach": number - how many people affected,
    "action": "string - desired action",
    "actionValue": number - value per action in dollars,
    "conversionLikelihood": number - likelihood percentage 0-100
  },
  "processCheck": {
    "outcomeDescription": "string - tangible business outcome",
    "simplificationPlan": "string - does it simplify or complicate",
    "dependenciesCreated": "string - new dependencies"
  },
  "deathSpiralCheck": {
    "downstreamWork": "string - will this create low-impact work",
    "complexityImpact": "string - complexity impact",
    "goalClarity": "string - can goals be stated without docs"
  },
  "commercialMindset": {
    "costBenefitAnalysis": "string - costs vs benefits",
    "tradeoffs": "string - tradeoffs and what we're NOT doing",
    "businessModelFit": "string - business model fit"
  }
}

Be intelligent about parsing natural speech. Extract numbers as numbers, and fill in reasonable estimates where the user mentions impact metrics. Return ONLY the JSON object, no other text.`;

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

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Parse the JSON response
    let extractedData: Partial<ProductProposal>;
    try {
      extractedData = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      extractedData,
      transcript,
    });
  } catch (error: any) {
    console.error('AI Extract Form Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to extract form data' },
      { status: 500 }
    );
  }
}
