import { ProductProposal, EvaluationResult } from '@/types';
import { scoreBusinessImpact } from './businessImpactScorer';
import { scoreQuantifiableImpact } from './quantifiableImpactScorer';
import { scoreProcessTheatre } from './processTheatreScorer';
import { scoreDeathSpiral } from './deathSpiralScorer';
import { scoreCommercialMindset } from './commercialScorer';

export function evaluateProposal(proposal: ProductProposal): EvaluationResult {
  // Score each dimension
  const businessImpact = scoreBusinessImpact(proposal);
  const quantifiableImpact = scoreQuantifiableImpact(proposal);
  const processTheatre = scoreProcessTheatre(proposal);
  const deathSpiral = scoreDeathSpiral(proposal);
  const commercialMindset = scoreCommercialMindset(proposal);

  // Calculate weighted overall score
  const overallScore = Math.round(
    (businessImpact.score * businessImpact.weight) / 10 +
    (quantifiableImpact.score * quantifiableImpact.weight) / 10 +
    (processTheatre.score * processTheatre.weight) / 10 +
    (deathSpiral.score * deathSpiral.weight) / 10 +
    (commercialMindset.score * commercialMindset.weight) / 10
  );

  // Determine rating
  let rating: 'High Impact' | 'Medium Impact' | 'Low Impact';
  if (overallScore >= 75) {
    rating = 'High Impact';
  } else if (overallScore >= 50) {
    rating = 'Medium Impact';
  } else {
    rating = 'Low Impact';
  }

  // Calculate expected impact
  const { reach, actionValue, conversionLikelihood } = proposal.quantifiableImpact;
  const expectedImpact = reach * actionValue * (conversionLikelihood / 100);

  // Collect all red flags as critical issues
  const criticalIssues: string[] = [
    ...businessImpact.redFlags,
    ...quantifiableImpact.redFlags,
    ...processTheatre.redFlags,
    ...deathSpiral.redFlags,
    ...commercialMindset.redFlags,
  ];

  // Generate recommendations
  const recommendations: string[] = [];

  if (businessImpact.score < 7) {
    recommendations.push('Strengthen business alignment: Clearly articulate how this connects to critical business metrics (1 step away)');
    recommendations.push('Apply the CEO test: Would the CEO fund this team to do this work? If not, reconsider the proposal');
  }

  if (quantifiableImpact.score < 7) {
    recommendations.push('Quantify all 4 impact questions: reach, action, value, and conversion likelihood');
  }

  if (processTheatre.score < 6) {
    recommendations.push('Focus on outcomes over process: Remove framework buzzwords and focus on tangible business value');
  }

  if (deathSpiral.score < 6) {
    recommendations.push('CRITICAL: Reduce scope to avoid creating downstream low-impact work and complexity');
    recommendations.push('Simplify the approach: Focus on fewer, more impactful outcomes');
  }

  if (commercialMindset.score < 5) {
    recommendations.push('Add cost-benefit analysis: Ground the proposal in costs, benefits, and tradeoffs');
  }

  if (overallScore < 50) {
    recommendations.push('⚠️ This proposal needs significant rework before proceeding. Consider: Is this the highest impact work we could be doing?');
  }

  return {
    proposalId: proposal.id || 'unknown',
    overallScore,
    rating,
    dimensions: {
      businessImpact,
      quantifiableImpact,
      processTheatre,
      deathSpiral,
      commercialMindset,
    },
    expectedImpact,
    recommendations,
    criticalIssues,
    evaluatedAt: new Date(),
  };
}
