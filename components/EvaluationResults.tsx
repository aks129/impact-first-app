'use client';

import { useState } from 'react';
import { EvaluationResult, ProductProposal, AIAnalysis, AIImprovements } from '@/types';

interface EvaluationResultsProps {
  evaluation: EvaluationResult;
  proposal: ProductProposal;
}

export default function EvaluationResults({ evaluation, proposal }: EvaluationResultsProps) {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiImprovements, setAiImprovements] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingImprovements, setLoadingImprovements] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAIAnalysis = async () => {
    setLoadingAnalysis(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposal),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI analysis');
      }
      const data: AIAnalysis = await response.json();
      setAiAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleAIImprovements = async () => {
    setLoadingImprovements(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal, evaluation }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI improvements');
      }
      const data: AIImprovements = await response.json();
      setAiImprovements(data.improvements);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingImprovements(false);
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'High Impact':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Medium Impact':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Low Impact':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) return 'text-emerald-600';
    if (percentage >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const dimensions = [
    evaluation.dimensions.businessImpact,
    evaluation.dimensions.quantifiableImpact,
    evaluation.dimensions.processTheatre,
    evaluation.dimensions.deathSpiral,
    evaluation.dimensions.commercialMindset,
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-12 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Evaluation Results</h2>
          
          {/* Score Circle */}
          <div className="inline-flex flex-col items-center mb-6">
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreColor(evaluation.overallScore, 100)}`}>
                  {evaluation.overallScore}
                </div>
                <div className="text-sm text-slate-600 font-semibold">/ 100</div>
              </div>
            </div>
          </div>

          <div className={`inline-block px-6 py-2 rounded-full border-2 ${getRatingColor(evaluation.rating)} text-lg font-bold mb-4`}>
            {evaluation.rating}
          </div>

          {evaluation.expectedImpact > 0 && (
            <p className="text-lg text-slate-600">
              Expected Financial Impact: <span className="font-bold text-emerald-600">
                ${evaluation.expectedImpact.toLocaleString()}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Dimensions Breakdown */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Dimension Breakdown</h3>
        {dimensions.map((dimension, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{dimension.name}</h4>
                <p className="text-sm text-slate-600">Weight: {dimension.weight}% • {dimension.maxScore} points</p>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(dimension.score, dimension.maxScore)}`}>
                {dimension.score}/{dimension.maxScore}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    (dimension.score / dimension.maxScore) * 100 >= 75
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      : (dimension.score / dimension.maxScore) * 100 >= 50
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  style={{ width: `${(dimension.score / dimension.maxScore) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-slate-700 mb-4">{dimension.feedback}</p>

            <div className="grid md:grid-cols-2 gap-4">
              {dimension.greenLights.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-emerald-900 mb-2 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2 text-xs">✓</span>
                    Strengths
                  </p>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    {dimension.greenLights.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {dimension.redFlags.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-xs font-bold text-red-900 mb-2 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-xs">!</span>
                    Issues
                  </p>
                  <ul className="text-sm text-red-800 space-y-1">
                    {dimension.redFlags.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Critical Issues */}
      {evaluation.criticalIssues.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-3 text-sm font-bold">!</span>
            Critical Issues
          </h3>
          <ul className="space-y-2">
            {evaluation.criticalIssues.map((issue, index) => (
              <li key={index} className="text-red-800">
                • {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {evaluation.recommendations.length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 text-sm">💡</span>
            Recommendations
          </h3>
          <ol className="space-y-2 list-decimal list-inside">
            {evaluation.recommendations.map((rec, index) => (
              <li key={index} className="text-blue-800">
                {rec}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-1">🤖 AI-Powered Insights</h3>
            <p className="text-sm text-purple-700">Get expert analysis powered by Claude</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAIAnalysis}
              disabled={loadingAnalysis || !!aiAnalysis}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed font-semibold text-sm transition-all"
            >
              {loadingAnalysis ? 'Analyzing...' : aiAnalysis ? 'Analyzed ✓' : 'Deep Analysis'}
            </button>
            <button
              onClick={handleAIImprovements}
              disabled={loadingImprovements || !!aiImprovements}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed font-semibold text-sm transition-all"
            >
              {loadingImprovements ? 'Generating...' : aiImprovements ? 'Generated ✓' : 'Get Improvements'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 rounded p-3 mb-4">
            <p className="text-sm text-red-800">
              ⚠️ {error}
              {error.includes('API') && (
                <span className="block mt-1 text-xs">Configure ANTHROPIC_API_KEY to enable AI features.</span>
              )}
            </p>
          </div>
        )}

        {aiAnalysis && (
          <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3">🎯 Strategic Analysis</h4>
            <div className="text-sm text-slate-700 whitespace-pre-wrap">{aiAnalysis}</div>
          </div>
        )}

        {aiImprovements && (
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3">💪 Improvement Recommendations</h4>
            <div className="text-sm text-slate-700 whitespace-pre-wrap">{aiImprovements}</div>
          </div>
        )}

        {!aiAnalysis && !aiImprovements && !error && (
          <p className="text-sm text-purple-700">Click the buttons above to get AI-powered insights.</p>
        )}
      </div>

      {/* Framework Reference */}
      <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">📚 Impact-First Framework</h3>
        <p className="text-sm text-slate-700 mb-3">Based on Matt LeMay's proven methodology:</p>
        <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
          <li>Business expects ROI from your team</li>
          <li>Focus on fewer, more impactful goals</li>
          <li>Avoid the "death spiral" of low-impact work</li>
          <li>Stay close to business fundamentals</li>
          <li>"If you can't answer the value question, you're in trouble"</li>
        </ul>
      </div>
    </div>
  );
}
