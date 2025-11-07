'use client';

import { useState } from 'react';
import { ProductProposal, EvaluationResult } from '@/types';
import { evaluateProposal } from '@/lib/scoring/evaluationEngine';
import ProposalForm from '@/components/ProposalForm';
import EvaluationResults from '@/components/EvaluationResults';

export default function Home() {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [proposal, setProposal] = useState<ProductProposal | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleEvaluate = (submittedProposal: ProductProposal) => {
    const result = evaluateProposal(submittedProposal);
    setProposal(submittedProposal);
    setEvaluation(result);
    setShowForm(false);
  };

  const handleReset = () => {
    setEvaluation(null);
    setShowForm(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Evaluate Your Product Proposal
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Key Framework Questions:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• If you were the CEO, would you fully fund this team?</li>
            <li>• How many people will this reach? What action will they take?</li>
            <li>• Does this create more low-impact work downstream?</li>
            <li>• Are we focused on outcomes vs. process theatre?</li>
          </ul>
        </div>
      </div>

      {showForm ? (
        <ProposalForm onSubmit={handleEvaluate} />
      ) : (
        <>
          {evaluation && proposal && (
            <EvaluationResults evaluation={evaluation} proposal={proposal} />
          )}
          <div className="mt-8 text-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Evaluate Another Proposal
            </button>
          </div>
        </>
      )}
    </main>
  );
}
