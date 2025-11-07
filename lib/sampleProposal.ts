import { ProductProposal } from '@/types';

export const sampleProposal: ProductProposal = {
  title: 'AI-Powered Customer Churn Prediction Dashboard',
  description: 'Build a predictive analytics dashboard that identifies at-risk customers 30 days before potential churn, enabling proactive retention campaigns.',

  businessAlignment: {
    ceoFundingTest: 'Yes, absolutely. Customer retention directly impacts our MRR and LTV. With current churn at 8%, reducing it by even 2 percentage points would save $2.4M annually. The CEO has explicitly stated that improving retention is a top 3 priority for this year. This initiative has a clear 6-month ROI with expected payback of 5x the investment.',
    connectionToGoals: 'This connects directly (1 step) to our #1 company goal: Increase net revenue retention from 95% to 102%. It specifically targets the retention metric and has a quantifiable impact on ARR growth.',
    marketExpectations: 'Our board has committed to investors that we will achieve 100% NRR by Q4. The market expects SaaS companies in our category to maintain sub-5% churn. This initiative directly addresses both commitments and positions us competitively.',
  },

  quantifiableImpact: {
    reach: 5000,
    action: 'Respond to early warning notifications and engage in retention campaigns',
    actionValue: 480,
    conversionLikelihood: 25,
  },

  processCheck: {
    outcomeDescription: 'Reduce monthly churn rate from 8% to 6% within 90 days, saving $200K MRR. Customer success team will have actionable insights to engage at-risk accounts before they cancel.',
    simplificationPlan: 'This simplifies our current manual process where CSMs reactively respond to cancellation requests. Replaces 3 separate tools (Excel tracking, manual outreach lists, post-cancellation surveys) with one unified early-warning system.',
    dependenciesCreated: 'Minimal - uses existing data warehouse and Salesforce integration. No new systems required. Single dashboard reduces tool sprawl.',
  },

  deathSpiralCheck: {
    downstreamWork: 'No. This actually reduces downstream work by preventing cancellations that require win-back campaigns, onboarding replacement customers, and revenue recovery efforts. Each prevented churn saves 10+ hours of CSM time.',
    complexityImpact: 'Simplifies operations significantly. Eliminates reactive firefighting and enables proactive, data-driven retention. Reduces cognitive load on CSMs who currently juggle multiple incomplete signals.',
    goalClarity: 'Crystal clear: Reduce churn from 8% to 6% in 90 days. Increase NRR from 95% to 100%+ by year-end. Every team member can state this without documentation.',
  },

  commercialMindset: {
    costBenefitAnalysis: 'Investment: $150K (2 engineers for 3 months). Benefit: $2.4M annual savings from 2% churn reduction. ROI: 16x in year one, compounding annually as retained customers expand. Break-even in 1 month.',
    tradeoffs: 'We are NOT building new features for acquisition this quarter. This is a deliberate choice to fix retention before scaling acquisition (leaky bucket problem). We are also NOT pursuing the enterprise redesign, which scored lower on impact.',
    businessModelFit: 'Perfect fit for our SaaS model where LTV depends on retention. Aligns with our shift from growth-at-all-costs to efficient, sustainable growth. Positions us to raise next round on strong unit economics rather than vanity metrics.',
  },
};

export const sampleProposalBad: ProductProposal = {
  title: 'Redesign Dashboard UI',
  description: 'Make the dashboard look more modern.',

  businessAlignment: {
    ceoFundingTest: 'Maybe? Users have mentioned it looks outdated.',
    connectionToGoals: 'Could help with user satisfaction scores.',
    marketExpectations: 'Not sure, but modern UIs are best practice.',
  },

  quantifiableImpact: {
    reach: 0,
    action: 'Use the new dashboard',
    actionValue: 0,
    conversionLikelihood: 0,
  },

  processCheck: {
    outcomeDescription: 'Implement new design system using Figma components and establish UI/UX governance framework with quarterly design reviews.',
    simplificationPlan: 'We will need to update our component library and train the team on new patterns.',
    dependenciesCreated: 'Will require design system maintenance, ongoing Figma license costs, quarterly design committee meetings, and coordination with all product teams.',
  },

  deathSpiralCheck: {
    downstreamWork: 'Yes, will need to maintain the new design system, update documentation, train new team members, and handle requests from other teams to update their interfaces to match.',
    complexityImpact: 'Adds a new design system to maintain and creates dependencies across all product teams who will need to adopt it.',
    goalClarity: 'Need to review the design docs and OKR framework to fully understand the alignment.',
  },

  commercialMindset: {
    costBenefitAnalysis: 'Will require designers and developers. Could improve brand perception.',
    tradeoffs: 'We might need to pause other initiatives.',
    businessModelFit: 'Modern design is a best practice in SaaS.',
  },
};
