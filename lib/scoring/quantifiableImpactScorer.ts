import { ProductProposal, ScoringDimension } from '@/types';

export function scoreQuantifiableImpact(proposal: ProductProposal): ScoringDimension {
  let score = 0;
  const redFlags: string[] = [];
  const greenLights: string[] = [];
  let feedback = '';

  const { reach, action, actionValue, conversionLikelihood } = proposal.quantifiableImpact;

  // Check if all 4 questions are answered
  let questionsAnswered = 0;

  // 1. Reach (2.5 points)
  if (reach > 0) {
    questionsAnswered++;
    score += 2.5;
    greenLights.push(`Clear reach defined: ${reach.toLocaleString()} people`);
  } else {
    redFlags.push('Reach not quantified - how many people will this impact?');
  }

  // 2. Action (2.5 points)
  if (action && action.length > 10) {
    questionsAnswered++;
    score += 2.5;
    greenLights.push('Desired action clearly defined');
  } else {
    redFlags.push('Desired action not clearly stated');
  }

  // 3. Action Value (2.5 points)
  if (actionValue > 0) {
    questionsAnswered++;
    score += 2.5;
    greenLights.push(`Action value quantified: $${actionValue.toLocaleString()}`);
  } else {
    redFlags.push('Action value not quantified - what is the $ value?');
  }

  // 4. Conversion Likelihood (2.5 points)
  if (conversionLikelihood > 0 && conversionLikelihood <= 100) {
    questionsAnswered++;
    score += 2.5;
    greenLights.push(`Conversion likelihood estimated: ${conversionLikelihood}%`);
  } else {
    redFlags.push('Conversion likelihood not estimated');
  }

  // Calculate expected impact
  const expectedImpact = reach * actionValue * (conversionLikelihood / 100);

  // Generate feedback
  if (questionsAnswered === 4) {
    feedback = `All 4 impact questions answered. Expected impact: $${expectedImpact.toLocaleString()} (${reach.toLocaleString()} people × $${actionValue} × ${conversionLikelihood}% conversion)`;
  } else if (questionsAnswered === 3) {
    feedback = `3 of 4 impact questions answered. Missing: ${redFlags[0]}`;
  } else if (questionsAnswered >= 2) {
    feedback = `Only ${questionsAnswered} of 4 impact questions answered. This proposal needs more quantification to evaluate true impact.`;
  } else {
    feedback = 'Critical: Impact not quantified. Answer all 4 questions: reach, action, value, likelihood.';
  }

  return {
    name: 'Quantifiable Impact Potential',
    score: Math.round(score * 10) / 10,
    maxScore: 10,
    weight: 25,
    feedback,
    redFlags,
    greenLights,
  };
}
