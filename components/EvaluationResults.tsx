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
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium Impact':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low Impact':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
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
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Evaluation Results</h2>
          <div className={`inline-block px-6 py-3 rounded-lg border-2 ${getRatingColor(evaluation.rating)} text-xl font-bold mb-4`}>
            {evaluation.rating}
          </div>
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {evaluation.overallScore}
            <span className="text-2xl text-gray-600">/100</span>
          </div>
          {evaluation.expectedImpact > 0 && (
            <p className="text-lg text-gray-600">
              Expected Impact: <span className="font-bold text-green-600">
                ${evaluation.expectedImpact.toLocaleString()}
              </span>
            </p>
          )}
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4">
          {dimensions.map((dimension, index) => (
            <div key={index} className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{dimension.name}</h3>
                  <p className="text-xs text-gray-500">Weight: {dimension.weight}%</p>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(dimension.score, dimension.maxScore)}`}>
                  {dimension.score}/{dimension.maxScore}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full transition-all ${
                    (dimension.score / dimension.maxScore) * 100 >= 75
                      ? 'bg-green-500'
                      : (dimension.score / dimension.maxScore) * 100 >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(dimension.score / dimension.maxScore) * 100}%` }}
                />
              </div>

              <p className="text-sm text-gray-700 mb-3">{dimension.feedback}</p>

              {dimension.greenLights.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded p-3 mb-2">
                  <p className="text-xs font-semibold text-green-900 mb-1">✓ Strengths:</p>
                  <ul className="text-xs text-green-800 space-y-1">
                    {dimension.greenLights.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {dimension.redFlags.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-xs font-semibold text-red-900 mb-1">⚠ Issues:</p>
                  <ul className="text-xs text-red-800 space-y-1">
                    {dimension.redFlags.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Critical Issues */}
      {evaluation.criticalIssues.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4">⚠ Critical Issues</h3>
          <ul className="space-y-2">
            {evaluation.criticalIssues.map((issue, index) => (
              <li key={index} className="text-sm text-red-800">
                • {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {evaluation.recommendations.length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Recommendations</h3>
          <ul className="space-y-2">
            {evaluation.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-blue-800">
                {index + 1}. {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI-Powered Enhancements */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-purple-900 mb-1">🤖 AI-Powered Insights</h3>
            <p className="text-sm text-purple-700">Get expert analysis from Claude</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAIAnalysis}
              disabled={loadingAnalysis}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
            >
              {loadingAnalysis ? 'Analyzing...' : 'Deep Analysis'}
            </button>
            <button
              onClick={handleAIImprovements}
              disabled={loadingImprovements}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
            >
              {loadingImprovements ? 'Generating...' : 'Get Improvements'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 rounded p-3 mb-4">
            <p className="text-sm text-red-800">
              ⚠️ {error}
              {error.includes('API') && (
                <span className="block mt-1 text-xs">
                  Configure ANTHROPIC_API_KEY environment variable to enable AI features.
                </span>
              )}
            </p>
          </div>
        )}

        {aiAnalysis && (
          <div className="bg-white rounded-lg p-6 mb-4 border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center">
              <span className="mr-2">🎯</span> Expert Strategic Analysis
            </h4>
            <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
              {aiAnalysis}
            </div>
          </div>
        )}

        {aiImprovements && (
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <span className="mr-2">💪</span> Specific Improvement Recommendations
            </h4>
            <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
              {aiImprovements}
            </div>
          </div>
        )}

        {!aiAnalysis && !aiImprovements && !error && (
          <p className="text-sm text-purple-700">
            Click the buttons above to get AI-powered insights from Claude, trained on product strategy best practices.
          </p>
        )}
      </div>

      {/* Framework Reference */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Impact-First Framework</h3>
        <p className="text-sm text-gray-700 mb-3">
          This evaluation is based on Matt LeMay's Impact-First Product Teams framework, emphasizing:
        </p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Business expects ROI from your team</li>
          <li>• Focus on fewer, more impactful goals</li>
          <li>• Avoid the "death spiral" of low-impact work</li>
          <li>• Stay close to business fundamentals</li>
          <li>• "If you can't answer the value question, you're in trouble"</li>
        </ul>
      </div>
    </div>
  );
}
