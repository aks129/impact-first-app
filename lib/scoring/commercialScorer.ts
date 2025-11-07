import { ProductProposal, ScoringDimension } from '@/types';

export function scoreCommercialMindset(proposal: ProductProposal): ScoringDimension {
  let score = 0;
  const redFlags: string[] = [];
  const greenLights: string[] = [];
  let feedback = '';

  const { costBenefitAnalysis, tradeoffs, businessModelFit } = proposal.commercialMindset;

  const costBenefitLower = costBenefitAnalysis.toLowerCase();
  const tradeoffsLower = tradeoffs.toLowerCase();
  const businessModelLower = businessModelFit.toLowerCase();

  // Cost-benefit analysis (4 points)
  if ((costBenefitLower.includes('cost') || costBenefitLower.includes('investment')) &&
      (costBenefitLower.includes('benefit') || costBenefitLower.includes('return'))) {
    score += 4;
    greenLights.push('Clear cost-benefit analysis provided');
  } else if (costBenefitAnalysis.length > 30) {
    score += 2;
  } else {
    score += 0;
    redFlags.push('No cost-benefit analysis - commercial viability unclear');
  }

  // Tradeoffs discussed (3 points)
  if (tradeoffsLower.includes('tradeoff') || tradeoffsLower.includes('trade-off') ||
      (tradeoffsLower.includes('vs') || tradeoffsLower.includes('versus'))) {
    score += 3;
    greenLights.push('Tradeoffs clearly considered and articulated');
  } else if (tradeoffs.length > 20) {
    score += 1.5;
  } else {
    score += 0;
    redFlags.push('Tradeoffs not discussed - may indicate surface-level thinking');
  }

  // Business model fit (3 points)
  if (businessModelLower.includes('business model') ||
      businessModelLower.includes('revenue') ||
      businessModelLower.includes('competitive') ||
      businessModelLower.includes('market position')) {
    score += 3;
    greenLights.push('Aligned with business model and competitive strategy');
  } else if (businessModelFit.length > 20) {
    score += 1.5;
  } else {
    score += 0;
    redFlags.push('Business model fit not addressed');
  }

  // Generate feedback
  if (score >= 8) {
    feedback = 'Excellent commercial mindset. Grounded in costs, benefits, and tradeoffs. "Doing the best to help the company win."';
  } else if (score >= 5) {
    feedback = 'Moderate commercial awareness. Strengthen the cost-benefit analysis and tradeoff discussion.';
  } else {
    feedback = 'Weak commercial mindset. Needs clear discussion of costs, benefits, tradeoffs, and business model fit.';
  }

  return {
    name: 'Commercial Mindedness',
    score: Math.round(score * 10) / 10,
    maxScore: 10,
    weight: 5,
    feedback,
    redFlags,
    greenLights,
  };
}
