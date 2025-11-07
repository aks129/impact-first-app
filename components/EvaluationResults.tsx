'use client';

import { EvaluationResult } from '@/types';

interface EvaluationResultsProps {
  evaluation: EvaluationResult;
}

export default function EvaluationResults({ evaluation }: EvaluationResultsProps) {
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
