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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <button
          onClick={() => setShowForm(false)}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
        {initialProposal && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-green-900">
                Example Loaded: High-Impact Proposal
              </p>
            </div>
            <p className="text-xs text-green-700 mt-1 ml-7">
              This is a well-crafted proposal that demonstrates best practices. Feel free to modify and experiment!
            </p>
          </div>
        )}
        <ProposalForm onSubmit={handleEvaluate} initialData={initialProposal} />
      </main>
    );
  }

  if (evaluation && proposal) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <EvaluationResults evaluation={evaluation} proposal={proposal} />
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Evaluate Another Proposal
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Stop Building
              </span>
              <br />
              <span className="text-gray-900">Start Delivering Impact</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Evaluate your product proposals using Matt LeMay's proven Impact-First framework.
              Get instant scoring and AI-powered strategic insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleStartEvaluation}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Evaluation
                <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={handleTryExample}
                className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Try Example
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: '5 Dimensions', value: '100%', desc: 'Comprehensive evaluation', icon: '📊' },
            { label: 'CEO Test', value: '35%', desc: 'Business impact weight', icon: '💼' },
            { label: 'AI-Powered', value: 'Claude', desc: 'Strategic insights', icon: '🤖' },
            { label: 'Instant', value: '<1s', desc: 'Scoring results', icon: '⚡' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl text-center transform hover:scale-105 transition-all hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to evaluate your proposal's true business impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Fill the Form',
                desc: 'Answer critical questions about your proposal: CEO funding test, quantifiable impact, and death spiral risks.',
                icon: '📝',
              },
              {
                step: '02',
                title: 'Get Instant Score',
                desc: 'Receive automated scoring across 5 dimensions weighted by business importance (0-100 scale).',
                icon: '🎯',
              },
              {
                step: '03',
                title: 'AI Insights',
                desc: 'Optional: Get CEO-level strategic analysis and specific improvement recommendations from Claude.',
                icon: '🤖',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Dimensions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">5 Evaluation Dimensions</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on Matt LeMay's Impact-First Product Teams framework
          </p>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Business Impact & Goal Alignment', weight: 35, desc: 'Would the CEO fund this team?', color: 'from-blue-500 to-blue-600' },
            { name: 'Quantifiable Impact', weight: 25, desc: 'Can you answer the 4 impact questions?', color: 'from-purple-500 to-purple-600' },
            { name: 'Focus Over Process Theatre', weight: 20, desc: 'Outcomes vs. process compliance', color: 'from-pink-500 to-pink-600' },
            { name: 'Death Spiral Avoidance', weight: 15, desc: 'Does this create more low-impact work?', color: 'from-orange-500 to-orange-600' },
            { name: 'Commercial Mindedness', weight: 5, desc: 'Grounded in costs, benefits, tradeoffs', color: 'from-green-500 to-green-600' },
          ].map((dimension, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{dimension.name}</h4>
                <span className={`px-4 py-1 bg-gradient-to-r ${dimension.color} text-white font-bold rounded-full text-sm`}>
                  {dimension.weight}%
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{dimension.desc}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${dimension.color}`}
                  style={{ width: `${dimension.weight * 2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Evaluate Your Proposal?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Stop the death spiral of low-impact work. Focus on what truly matters.
          </p>
          <button
            onClick={handleStartEvaluation}
            className="px-10 py-5 bg-white text-purple-600 text-lg font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Free Evaluation Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              Based on <span className="font-semibold text-white">Matt LeMay's Impact-First Product Teams</span> framework
            </p>
            <p className="text-sm mt-2">
              Powered by <span className="font-semibold text-white">Claude Sonnet 4</span> • Built with Next.js
            </p>
            <p className="text-xs mt-4 text-gray-500">
              © 2025 Impact-First Evaluation Tool • v2.0 AI
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
