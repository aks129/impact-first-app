import { ProductProposal, ScoringDimension } from '@/types';

export function scoreDeathSpiral(proposal: ProductProposal): ScoringDimension {
  let score = 10; // Start at max, deduct for red flags
  const redFlags: string[] = [];
  const greenLights: string[] = [];
  let feedback = '';

  const { downstreamWork, complexityImpact, goalClarity } = proposal.deathSpiralCheck;

  const downstreamLower = downstreamWork.toLowerCase();
  const complexityLower = complexityImpact.toLowerCase();
  const goalLower = goalClarity.toLowerCase();

  // Check if this creates more low-impact work (-5 points)
  if (downstreamLower.includes('no') || downstreamLower.includes('none') ||
      downstreamLower.includes('minimal')) {
    greenLights.push('Does not create downstream low-impact work');
  } else if (downstreamLower.includes('yes') || downstreamLower.includes('will require') ||
             downstreamLower.includes('needs')) {
    score -= 5;
    redFlags.push('CRITICAL: Creates downstream low-impact work - death spiral risk!');
  } else if (downstreamLower.includes('maybe') || downstreamLower.includes('possibly')) {
    score -= 3;
    redFlags.push('May create downstream work - needs careful scope management');
  }

  // Check complexity impact (-3 points)
  if (complexityLower.includes('simplif') || complexityLower.includes('reduce') ||
      complexityLower.includes('streamline')) {
    greenLights.push('Simplifies product and reduces complexity');
    score += 0; // No penalty, this is good
  } else if (complexityLower.includes('complicat') || complexityLower.includes('add') ||
             complexityLower.includes('more features')) {
    score -= 3;
    redFlags.push('Increases product complexity - harder to maintain');
  } else {
    score -= 1;
  }

  // Check goal clarity (-2 points)
  if (goalLower.includes('yes') && goalLower.length > 30) {
    greenLights.push('Goals are clearly stated and understandable');
  } else if (goalLower.includes('need to review') || goalLower.includes('documentation') ||
             goalLower.includes('unclear')) {
    score -= 2;
    redFlags.push('Goals require documentation review - not clearly understood');
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  // Generate feedback
  if (score >= 8) {
    feedback = 'Low death spiral risk. This proposal maintains focus and simplicity.';
  } else if (score >= 5) {
    feedback = 'Moderate death spiral risk. Watch for scope creep and complexity growth.';
  } else {
    feedback = 'HIGH DEATH SPIRAL RISK! This proposal may create more low-impact work and increase complexity. Reconsider approach.';
  }

  return {
    name: 'Death Spiral Avoidance',
    score: Math.round(score * 10) / 10,
    maxScore: 10,
    weight: 15,
    feedback,
    redFlags,
    greenLights,
  };
}
