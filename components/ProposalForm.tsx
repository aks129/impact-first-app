'use client';

import { useState, FormEvent, useEffect } from 'react';
import { ProductProposal } from '@/types';
import FormProgress from './FormProgress';

interface ProposalFormProps {
  onSubmit: (proposal: ProductProposal) => void;
  initialData?: ProductProposal | null;
}

const defaultFormData: ProductProposal = {
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
};

export default function ProposalForm({ onSubmit, initialData }: ProposalFormProps) {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<ProductProposal>(initialData || defaultFormData);

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-section]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setCurrentSection(index + 1);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Section = ({ num, title, description, children }: any) => (
    <section data-section={num} className="scroll-mt-24">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg">
          {num}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <p className="text-slate-600 text-sm mt-1">{description}</p>
        </div>
      </div>
      <div className="space-y-6 ml-4 pl-4 border-l-2 border-slate-200">
        {children}
      </div>
    </section>
  );

  const InputField = ({ label, required, value, onChange, placeholder, type = 'text' }: any) => (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );

  const TextAreaField = ({ label, required, value, onChange, placeholder, rows = 3 }: any) => (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-fade-in">
      <FormProgress currentSection={currentSection} totalSections={6} />

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-16">
        {/* Basic Info */}
        <Section num="1" title="Basic Information" description="Define your proposal">
          <InputField
            label="Proposal Title"
            required
            value={formData.title}
            onChange={(e: any) => updateField('title', '', e.target.value)}
            placeholder="e.g., Mobile App Redesign"
          />
          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(e: any) => updateField('description', '', e.target.value)}
            placeholder="Brief overview of your proposal"
            rows={3}
          />
        </Section>

        {/* Business Impact */}
        <Section num="2" title="Business Impact (35%)" description="The most critical dimension">
          <TextAreaField
            label="CEO Funding Test"
            required
            value={formData.businessAlignment.ceoFundingTest}
            onChange={(e: any) => updateField('businessAlignment', 'ceoFundingTest', e.target.value)}
            placeholder="If you were the CEO, would you fully fund this? Explain the business value."
          />
          <TextAreaField
            label="Connection to Critical Business Goals"
            required
            value={formData.businessAlignment.connectionToGoals}
            onChange={(e: any) => updateField('businessAlignment', 'connectionToGoals', e.target.value)}
            placeholder="How does this connect to key metrics? Be direct."
          />
          <TextAreaField
            label="Market/Board Expectations"
            value={formData.businessAlignment.marketExpectations}
            onChange={(e: any) => updateField('businessAlignment', 'marketExpectations', e.target.value)}
            placeholder="Alignment with market trends and board commitments"
          />
        </Section>

        {/* Quantifiable Impact */}
        <Section num="3" title="Quantifiable Impact (25%)" description="Measure the real impact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Reach (How many people?)"
              required
              type="number"
              value={formData.quantifiableImpact.reach}
              onChange={(e: any) => updateField('quantifiableImpact', 'reach', parseInt(e.target.value) || 0)}
              placeholder="10000"
            />
            <InputField
              label="Value per Action ($)"
              required
              type="number"
              value={formData.quantifiableImpact.actionValue}
              onChange={(e: any) => updateField('quantifiableImpact', 'actionValue', parseFloat(e.target.value) || 0)}
              placeholder="50"
            />
            <InputField
              label="Conversion Likelihood (%)"
              required
              type="number"
              value={formData.quantifiableImpact.conversionLikelihood}
              onChange={(e: any) => updateField('quantifiableImpact', 'conversionLikelihood', parseFloat(e.target.value) || 0)}
              placeholder="15"
            />
            <InputField
              label="Desired Action"
              required
              value={formData.quantifiableImpact.action}
              onChange={(e: any) => updateField('quantifiableImpact', 'action', e.target.value)}
              placeholder="e.g., Complete purchase"
            />
          </div>
        </Section>

        {/* Process Check */}
        <Section num="4" title="Focus Over Process (20%)" description="Outcomes vs. process">
          <TextAreaField
            label="Outcome Description (not process)"
            required
            value={formData.processCheck.outcomeDescription}
            onChange={(e: any) => updateField('processCheck', 'outcomeDescription', e.target.value)}
            placeholder="What tangible business outcome? Focus on results, not frameworks."
          />
          <TextAreaField
            label="Simplification Plan"
            value={formData.processCheck.simplificationPlan}
            onChange={(e: any) => updateField('processCheck', 'simplificationPlan', e.target.value)}
            placeholder="Does this simplify or complicate the product?"
          />
          <TextAreaField
            label="Dependencies Created"
            value={formData.processCheck.dependenciesCreated}
            onChange={(e: any) => updateField('processCheck', 'dependenciesCreated', e.target.value)}
            placeholder="What new dependencies? Fewer is better."
          />
        </Section>

        {/* Death Spiral */}
        <Section num="5" title="Death Spiral Avoidance (15%)" description="Break the low-impact cycle">
          <TextAreaField
            label="Downstream Low-Impact Work"
            required
            value={formData.deathSpiralCheck.downstreamWork}
            onChange={(e: any) => updateField('deathSpiralCheck', 'downstreamWork', e.target.value)}
            placeholder="Will this create low-impact 'work around work'? Be honest."
          />
          <TextAreaField
            label="Complexity Impact"
            value={formData.deathSpiralCheck.complexityImpact}
            onChange={(e: any) => updateField('deathSpiralCheck', 'complexityImpact', e.target.value)}
            placeholder="Does this simplify or complicate the product?"
          />
          <TextAreaField
            label="Goal Clarity"
            value={formData.deathSpiralCheck.goalClarity}
            onChange={(e: any) => updateField('deathSpiralCheck', 'goalClarity', e.target.value)}
            placeholder="Can you state the goals without reading documentation?"
          />
        </Section>

        {/* Commercial */}
        <Section num="6" title="Commercial Mindedness (5%)" description="Grounded in reality">
          <TextAreaField
            label="Cost-Benefit Analysis"
            value={formData.commercialMindset.costBenefitAnalysis}
            onChange={(e: any) => updateField('commercialMindset', 'costBenefitAnalysis', e.target.value)}
            placeholder="What are the costs vs. benefits?"
          />
          <TextAreaField
            label="Tradeoffs"
            value={formData.commercialMindset.tradeoffs}
            onChange={(e: any) => updateField('commercialMindset', 'tradeoffs', e.target.value)}
            placeholder="What are we NOT doing? What are the tradeoffs?"
          />
          <TextAreaField
            label="Business Model Fit"
            value={formData.commercialMindset.businessModelFit}
            onChange={(e: any) => updateField('commercialMindset', 'businessModelFit', e.target.value)}
            placeholder="How does this fit our business model?"
          />
        </Section>

        {/* Submit */}
        <div className="border-t pt-8">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
          >
            Evaluate Impact
          </button>
        </div>
      </div>
    </form>
  );
}
