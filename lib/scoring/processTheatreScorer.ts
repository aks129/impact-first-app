import { ProductProposal, ScoringDimension } from '@/types';

export function scoreProcessTheatre(proposal: ProductProposal): ScoringDimension {
  let score = 10; // Start at max, deduct for red flags
  const redFlags: string[] = [];
  const greenLights: string[] = [];
  let feedback = '';

  const { outcomeDescription, simplificationPlan, dependenciesCreated } = proposal.processCheck;

  // Process theatre buzzwords that indicate focus on process over outcome
  const processTheatreBuzzwords = [
    'okr', 'framework', 'best practice', 'methodology', 'process',
    'documentation', 'governance', 'compliance', 'alignment meeting'
  ];

  const outcomeLower = outcomeDescription.toLowerCase();
  const simplificationLower = simplificationPlan.toLowerCase();
  const dependenciesLower = dependenciesCreated.toLowerCase();

  // Check for process theatre in outcome description (-3 points)
  let buzzwordCount = 0;
  processTheatreBuzzwords.forEach(word => {
    if (outcomeLower.includes(word)) buzzwordCount++;
  });

  if (buzzwordCount >= 3) {
    score -= 3;
    redFlags.push('Heavy process language detected - may be "process theatre" vs real outcomes');
  } else if (buzzwordCount > 0) {
    score -= 1;
  } else if (outcomeDescription.length > 40) {
    greenLights.push('Clear outcome focus without process theatre');
  }

  // Check simplification plan (-3 points for complexity)
  if (simplificationLower.includes('simplif') || simplificationLower.includes('reduce')) {
    greenLights.push('Proposal focuses on simplification');
  } else if (simplificationLower.includes('add') || simplificationLower.includes('new') ||
             simplificationLower.includes('more')) {
    score -= 2;
    redFlags.push('Adding complexity instead of simplifying');
  } else if (simplificationLower.length < 20) {
    score -= 1;
    redFlags.push('Simplification strategy not clearly stated');
  }

  // Check dependencies created (-4 points)
  if (dependenciesLower.includes('none') || dependenciesLower.includes('minimal') ||
      dependenciesLower.includes('no new')) {
    greenLights.push('Minimal or no new dependencies created');
  } else if (dependenciesLower.includes('multiple') || dependenciesLower.includes('several') ||
             dependenciesLower.includes('many')) {
    score -= 4;
    redFlags.push('Creates multiple new dependencies - increases complexity');
  } else if (dependenciesLower.length > 30) {
    score -= 2;
    redFlags.push('Dependencies created may increase system complexity');
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  // Generate feedback
  if (score >= 8) {
    feedback = 'Excellent focus on outcomes over process. This proposal avoids process theatre and maintains simplicity.';
  } else if (score >= 5) {
    feedback = 'Some process overhead detected. Ensure this work delivers tangible business value, not just process compliance.';
  } else {
    feedback = 'Warning: High risk of "process theatre" - lots of process/framework language with unclear business outcomes. Focus on value delivery.';
  }

  return {
    name: 'Focus Over Process Theatre',
    score: Math.round(score * 10) / 10,
    maxScore: 10,
    weight: 20,
    feedback,
    redFlags,
    greenLights,
  };
}
