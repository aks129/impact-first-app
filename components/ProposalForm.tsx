'use client';

import { useState, FormEvent } from 'react';
import { ProductProposal } from '@/types';

interface ProposalFormProps {
  onSubmit: (proposal: ProductProposal) => void;
}

export default function ProposalForm({ onSubmit }: ProposalFormProps) {
  const [formData, setFormData] = useState<ProductProposal>({
    title: '',
    description: '',
    businessAlignment: {
      ceoFundingTest: '',
      connectionToGoals: '',
      marketExpectations: '',
    },
    quantifiableImpact: {
      reach: 0,
      action: '',
      actionValue: 0,
      conversionLikelihood: 0,
    },
    processCheck: {
      outcomeDescription: '',
      simplificationPlan: '',
      dependenciesCreated: '',
    },
    deathSpiralCheck: {
      downstreamWork: '',
      complexityImpact: '',
      goalClarity: '',
    },
    commercialMindset: {
      costBenefitAnalysis: '',
      tradeoffs: '',
      businessModelFit: '',
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (section: keyof ProductProposal, field: string, value: any) => {
    if (section === 'title' || section === 'description') {
      setFormData({ ...formData, [section]: value });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section] as any),
          [field]: value,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-lg shadow-lg p-8">
      {/* Basic Info */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposal Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => updateField('title', '', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., User Onboarding Optimization"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', '', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief overview of the proposal"
            />
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          1. Business Impact & Goal Alignment (35%)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          The most critical factor - does this deliver clear business value?
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CEO Funding Test * <span className="text-xs text-gray-500">(If you were the CEO, would you fully fund this team?)</span>
            </label>
            <textarea
              required
              value={formData.businessAlignment.ceoFundingTest}
              onChange={(e) => updateField('businessAlignment', 'ceoFundingTest', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Explain why the CEO would fund this work. What business value does it deliver?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connection to Critical Business Goals *
            </label>
            <textarea
              required
              value={formData.businessAlignment.connectionToGoals}
              onChange={(e) => updateField('businessAlignment', 'connectionToGoals', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How is this directly connected (1 step away) to critical business metrics?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market/Board Expectations
            </label>
            <textarea
              value={formData.businessAlignment.marketExpectations}
              onChange={(e) => updateField('businessAlignment', 'marketExpectations', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How does this align with market expectations and board commitments?"
            />
          </div>
        </div>
      </section>

      {/* Quantifiable Impact */}
      <section className="border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          2. Quantifiable Impact (25%)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Answer all 4 questions to calculate expected impact
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reach (How many people?) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.quantifiableImpact.reach}
              onChange={(e) => updateField('quantifiableImpact', 'reach', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Value ($ per action) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.quantifiableImpact.actionValue}
              onChange={(e) => updateField('quantifiableImpact', 'actionValue', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Likelihood (%) *
            </label>
            <input
              type="number"
              required
              min="0"
              max="100"
              value={formData.quantifiableImpact.conversionLikelihood}
              onChange={(e) => updateField('quantifiableImpact', 'conversionLikelihood', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 15"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Action *
            </label>
            <input
              type="text"
              required
              value={formData.quantifiableImpact.action}
              onChange={(e) => updateField('quantifiableImpact', 'action', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Complete purchase, upgrade to premium"
            />
          </div>
        </div>
      </section>

      {/* Process Theatre Check */}
      <section className="border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          3. Focus Over Process Theatre (20%)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Ensure we're delivering value, not just following process
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outcome Description (not process) *
            </label>
            <textarea
              required
              value={formData.processCheck.outcomeDescription}
              onChange={(e) => updateField('processCheck', 'outcomeDescription', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What tangible business outcome will this deliver? (Focus on results, not frameworks/processes)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Simplification Plan
            </label>
            <textarea
              value={formData.processCheck.simplificationPlan}
              onChange={(e) => updateField('processCheck', 'simplificationPlan', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How does this simplify vs. complicate the product?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dependencies Created
            </label>
            <textarea
              value={formData.processCheck.dependenciesCreated}
              onChange={(e) => updateField('processCheck', 'dependenciesCreated', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What new dependencies does this create? (fewer is better)"
            />
          </div>
        </div>
      </section>

      {/* Death Spiral Check */}
      <section className="border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          4. Death Spiral Avoidance (15%)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Low-impact work begets more low-impact work
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Downstream Low-Impact Work *
            </label>
            <textarea
              required
              value={formData.deathSpiralCheck.downstreamWork}
              onChange={(e) => updateField('deathSpiralCheck', 'downstreamWork', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Will this create more low-impact 'work around work' downstream? Be honest."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complexity Impact
            </label>
            <textarea
              value={formData.deathSpiralCheck.complexityImpact}
              onChange={(e) => updateField('deathSpiralCheck', 'complexityImpact', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Does this simplify or complicate the product?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Clarity
            </label>
            <textarea
              value={formData.deathSpiralCheck.goalClarity}
              onChange={(e) => updateField('deathSpiralCheck', 'goalClarity', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Can you state the goals without reviewing documentation?"
            />
          </div>
        </div>
      </section>

      {/* Commercial Mindset */}
      <section className="border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          5. Commercial Mindedness (5%)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Grounded in costs, benefits, and tradeoffs
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost-Benefit Analysis
            </label>
            <textarea
              value={formData.commercialMindset.costBenefitAnalysis}
              onChange={(e) => updateField('commercialMindset', 'costBenefitAnalysis', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What are the costs vs. benefits?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tradeoffs
            </label>
            <textarea
              value={formData.commercialMindset.tradeoffs}
              onChange={(e) => updateField('commercialMindset', 'tradeoffs', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What tradeoffs are we making? What are we NOT doing?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Model Fit
            </label>
            <textarea
              value={formData.commercialMindset.businessModelFit}
              onChange={(e) => updateField('commercialMindset', 'businessModelFit', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How does this fit our business model and help us win?"
            />
          </div>
        </div>
      </section>

      <div className="border-t pt-8">
        <button
          type="submit"
          className="w-full px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Evaluate Impact
        </button>
      </div>
    </form>
  );
}
