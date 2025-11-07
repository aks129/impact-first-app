import { ProductProposal, ScoringDimension } from '@/types';

export function scoreBusinessImpact(proposal: ProductProposal): ScoringDimension {
  let score = 0;
  const redFlags: string[] = [];
  const greenLights: string[] = [];
  let feedback = '';

  const { ceoFundingTest, connectionToGoals, marketExpectations } = proposal.businessAlignment;

  // CEO Funding Test (4 points)
  const ceoTestLower = ceoFundingTest.toLowerCase();
  if (ceoTestLower.includes('yes') && ceoTestLower.length > 50) {
    score += 4;
    greenLights.push('Clear CEO funding justification provided');
  } else if (ceoTestLower.includes('maybe') || ceoTestLower.includes('unsure')) {
    score += 2;
    redFlags.push('Uncertain CEO funding test - may indicate weak business value');
  } else if (ceoTestLower.includes('no') || ceoFundingTest.length < 20) {
    score += 0;
    redFlags.push('Would not pass CEO funding test - critical business value unclear');
  } else {
    score += 2;
  }

  // Connection to Goals (3 points)
  const connectionLower = connectionToGoals.toLowerCase();
  if (connectionLower.includes('direct') || connectionLower.includes('1 step')) {
    score += 3;
    greenLights.push('Direct connection to critical business metrics (1 step away)');
  } else if (connectionLower.includes('2 step') || connectionLower.includes('indirect')) {
    score += 1.5;
    redFlags.push('Multiple steps from critical metrics - alignment unclear');
  } else if (connectionLower.length < 30) {
    score += 0;
    redFlags.push('No clear connection to business goals stated');
  } else {
    score += 2;
  }

  // Market/Board Expectations (3 points)
  if (marketExpectations.length > 50 &&
      (marketExpectations.toLowerCase().includes('market') ||
       marketExpectations.toLowerCase().includes('board'))) {
    score += 3;
    greenLights.push('Aligned with market expectations and board commitments');
  } else if (marketExpectations.length > 20) {
    score += 1.5;
  } else {
    score += 0;
    redFlags.push('Market/board alignment not addressed');
  }

  // Generate feedback
  if (score >= 8) {
    feedback = 'Excellent business alignment. This proposal clearly articulates business value and would likely receive CEO funding.';
  } else if (score >= 5) {
    feedback = 'Moderate business alignment. Strengthen the connection to critical business metrics and clarify CEO funding justification.';
  } else {
    feedback = 'Weak business alignment. This proposal needs significant work to demonstrate clear business value. Consider: Would the CEO fund this team?';
  }

  return {
    name: 'Business Impact & Goal Alignment',
    score: Math.round(score * 10) / 10,
    maxScore: 10,
    weight: 35,
    feedback,
    redFlags,
    greenLights,
  };
}
