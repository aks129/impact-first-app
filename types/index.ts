// Core types for Impact-First Product Evaluation Tool

export interface ProductProposal {
  id?: string;
  title: string;
  description: string;

  // Business Impact & Goal Alignment
  businessAlignment: {
    ceoFundingTest: string; // Would CEO fund this?
    connectionToGoals: string; // How does this connect to critical metrics?
    marketExpectations: string; // Market/board alignment
  };

  // Quantifiable Impact
  quantifiableImpact: {
    reach: number; // How many people?
    action: string; // What action?
    actionValue: number; // Value of action ($)
    conversionLikelihood: number; // Probability (0-100)
  };

  // Process Theatre Check
  processCheck: {
    outcomeDescription: string; // Clear outcome vs process
    simplificationPlan: string; // How does this simplify?
    dependenciesCreated: string; // What dependencies?
  };

  // Death Spiral Check
  deathSpiralCheck: {
    downstreamWork: string; // Does this create more low-impact work?
    complexityImpact: string; // Simplifies or complicates?
    goalClarity: string; // Can goals be stated without docs?
  };

  // Commercial Mindedness
  commercialMindset: {
    costBenefitAnalysis: string;
    tradeoffs: string;
    businessModelFit: string;
  };

  submittedBy?: string;
  submittedAt?: Date;
}

export interface ScoringDimension {
  name: string;
  score: number; // 0-10
  maxScore: number;
  weight: number; // Percentage
  feedback: string;
  redFlags: string[];
  greenLights: string[];
}

export interface EvaluationResult {
  proposalId: string;
  overallScore: number; // 0-100
  rating: 'High Impact' | 'Medium Impact' | 'Low Impact';
  dimensions: {
    businessImpact: ScoringDimension;
    quantifiableImpact: ScoringDimension;
    processTheatre: ScoringDimension;
    deathSpiral: ScoringDimension;
    commercialMindset: ScoringDimension;
  };
  expectedImpact: number; // Calculated from reach * value * likelihood
  recommendations: string[];
  criticalIssues: string[];
  evaluatedAt: Date;
}

export interface ImpactCalculation {
  reach: number;
  action: string;
  actionValue: number;
  conversionLikelihood: number;
  expectedImpact: number; // reach * actionValue * (likelihood/100)
}

export interface AIAnalysis {
  analysis: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface AIImprovements {
  improvements: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface AIAssistance {
  suggestion: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}
