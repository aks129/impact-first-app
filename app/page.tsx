'use client';

import { useState } from 'react';
import { ProductProposal, EvaluationResult } from '@/types';
import { evaluateProposal } from '@/lib/scoring/evaluationEngine';
import ProposalForm from '@/components/ProposalForm';
import EvaluationResults from '@/components/EvaluationResults';
import { sampleProposal } from '@/lib/sampleProposal';

export default function Home() {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [proposal, setProposal] = useState<ProductProposal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [initialProposal, setInitialProposal] = useState<ProductProposal | null>(null);

  const handleEvaluate = (submittedProposal: ProductProposal) => {
    const result = evaluateProposal(submittedProposal);
    setProposal(submittedProposal);
    setEvaluation(result);
    setShowForm(false);
  };

  const handleReset = () => {
    setEvaluation(null);
    setProposal(null);
    setInitialProposal(null);
    setShowForm(false);
  };

  const handleStartEvaluation = () => {
    setInitialProposal(null);
    setShowForm(true);
  };

  const handleTryExample = () => {
    setInitialProposal(sampleProposal);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setShowForm(false)}
            className="mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          {initialProposal && (
            <div className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 flex gap-3">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-emerald-900">Sample Proposal Loaded</p>
                <p className="text-sm text-emerald-700">Review this well-crafted example to see best practices in action.</p>
              </div>
            </div>
          )}
          <ProposalForm onSubmit={handleEvaluate} initialData={initialProposal} />
        </div>
      </main>
    );
  }

  if (evaluation && proposal) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EvaluationResults evaluation={evaluation} proposal={proposal} />
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Evaluate Another Proposal
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              AI-Powered Product Evaluation
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Evaluate Proposals With <span className="gradient-text">Proven Impact</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Make data-driven product decisions using the Impact-First framework. Instant scoring, AI insights, and actionable recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartEvaluation}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={handleTryExample}
              className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-900 font-semibold rounded-lg hover:border-slate-300 hover:shadow-md transition-all"
            >
              View Sample Report
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '5 Dimensions', value: '100%', desc: 'Framework coverage' },
              { label: 'AI Powered', value: 'Claude', desc: 'Strategic insights' },
              { label: 'Instant Results', value: '<1s', desc: 'Real-time analysis' },
              { label: 'Enterprise Ready', value: '99.9%', desc: 'Uptime SLA' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-900">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Three simple steps to evaluate proposal impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📋',
                title: 'Fill the Form',
                desc: 'Answer structured questions about your proposal across 5 key dimensions'
              },
              {
                step: '02',
                icon: '⚡',
                title: 'Get Instant Score',
                desc: 'Receive weighted scoring (0-100) with detailed dimension breakdown'
              },
              {
                step: '03',
                icon: '🤖',
                title: 'AI Analysis',
                desc: 'Get CEO-level strategic insights and specific improvement recommendations'
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg">
                  {item.step}
                </div>
                <div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-blue-300 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">5 Evaluation Dimensions</h2>
            <p className="text-lg text-slate-600">Based on Matt LeMay's Impact-First framework</p>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Business Impact', weight: 35, color: 'from-blue-500 to-blue-600' },
              { name: 'Quantifiable Impact', weight: 25, color: 'from-purple-500 to-purple-600' },
              { name: 'Focus Over Process', weight: 20, color: 'from-pink-500 to-pink-600' },
              { name: 'Death Spiral Avoidance', weight: 15, color: 'from-amber-500 to-amber-600' },
              { name: 'Commercial Mindedness', weight: 5, color: 'from-green-500 to-green-600' },
            ].map((dim, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <span className="font-semibold text-slate-900">{dim.name}</span>
                <div className="flex items-center gap-4">
                  <div className="w-40 bg-slate-100 rounded-full h-2">
                    <div className={`h-full rounded-full bg-gradient-to-r ${dim.color}`} style={{ width: `${dim.weight * 2}%` }}></div>
                  </div>
                  <span className={`px-3 py-1 bg-gradient-to-r ${dim.color} text-white text-sm font-bold rounded-full w-14 text-center`}>{dim.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Evaluate?</h2>
          <p className="text-xl text-blue-100 mb-8">Stop guessing. Start delivering impact with data-driven decisions.</p>
          <button
            onClick={handleStartEvaluation}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Start Your First Evaluation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center text-sm">
          <p>Impact Calculator • Powered by AI • Built for Product Managers</p>
          <p className="mt-2">Based on Matt LeMay's Impact-First Product Teams framework</p>
        </div>
      </footer>
    </main>
  );
}
