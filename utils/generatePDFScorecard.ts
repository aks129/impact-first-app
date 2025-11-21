import html2pdf from 'html2pdf.js';
import { EvaluationResult, ProductProposal } from '@/types';

export const generatePDFScorecard = async (
  evaluation: EvaluationResult,
  proposal: ProductProposal
) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
          background: white;
          padding: 40px;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #3b82f6;
          padding-bottom: 30px;
        }
        .header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .proposal-title {
          font-size: 24px;
          font-weight: 600;
          color: #0f172a;
          margin: 20px 0;
        }
        .proposal-desc {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 20px;
          font-style: italic;
        }
        .score-container {
          text-align: center;
          margin: 30px 0;
        }
        .score-circle {
          display: inline-block;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f0f9ff, #f5f3ff);
          border: 3px solid #3b82f6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 20px auto;
        }
        .score-number {
          font-size: 48px;
          font-weight: 700;
          color: #3b82f6;
        }
        .score-max {
          font-size: 16px;
          color: #64748b;
          font-weight: 600;
        }
        .rating-badge {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 16px;
          margin: 20px 0;
        }
        .rating-high {
          background: #d1fae5;
          color: #065f46;
          border: 2px solid #10b981;
        }
        .rating-medium {
          background: #fef3c7;
          color: #92400e;
          border: 2px solid #f59e0b;
        }
        .rating-low {
          background: #fee2e2;
          color: #7f1d1d;
          border: 2px solid #ef4444;
        }
        .impact-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          font-size: 14px;
        }
        .impact-label {
          font-weight: 600;
          color: #475569;
        }
        .impact-value {
          color: #0f172a;
          font-weight: 700;
        }
        .section {
          margin-top: 35px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .dimension {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          page-break-inside: avoid;
        }
        .dimension-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .dimension-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }
        .dimension-score {
          font-size: 18px;
          font-weight: 700;
          color: #3b82f6;
        }
        .dimension-meta {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .progress-bar {
          background: #e2e8f0;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        .dimension-feedback {
          font-size: 13px;
          color: #475569;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .lights-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 8px;
        }
        .green-lights, .red-flags {
          font-size: 12px;
          padding: 8px;
          border-radius: 6px;
        }
        .green-lights {
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          color: #166534;
        }
        .red-flags {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #991b1b;
        }
        .lights-title {
          font-weight: 700;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
        }
        .lights-title span {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          text-align: center;
          color: white;
          font-size: 10px;
          line-height: 16px;
          margin-right: 6px;
          font-weight: bold;
        }
        .green-lights .lights-title span {
          background: #22c55e;
        }
        .red-flags .lights-title span {
          background: #ef4444;
        }
        .lights-list {
          list-style: none;
          padding: 0;
        }
        .lights-list li {
          margin-bottom: 3px;
          font-size: 11px;
        }
        .lights-list li:before {
          content: "• ";
          font-weight: bold;
          margin-right: 4px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
        }
        .summary-card {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 15px;
        }
        .summary-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .summary-value {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📊 Impact Evaluation Scorecard</h1>
        <div class="proposal-title">${proposal.title || 'Unnamed Proposal'}</div>
        ${proposal.description ? `<div class="proposal-desc">${proposal.description}</div>` : ''}
      </div>

      <div class="section">
        <div class="score-container">
          <div class="score-circle">
            <div class="score-number">${evaluation.overallScore}</div>
            <div class="score-max">/ 100</div>
          </div>
          <div class="rating-badge rating-${evaluation.rating === 'High Impact' ? 'high' : evaluation.rating === 'Medium Impact' ? 'medium' : 'low'}">
            ${evaluation.rating}
          </div>
        </div>

        <div class="summary-grid">
          <div class="summary-card">
            <div class="summary-label">Overall Score</div>
            <div class="summary-value">${evaluation.overallScore}%</div>
          </div>
          ${evaluation.expectedImpact > 0 ? `
          <div class="summary-card">
            <div class="summary-label">Expected Impact</div>
            <div class="summary-value">$${evaluation.expectedImpact.toLocaleString()}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <div class="section">
        <div class="section-title">📈 Dimension Breakdown</div>
        ${[
          evaluation.dimensions.businessImpact,
          evaluation.dimensions.quantifiableImpact,
          evaluation.dimensions.processTheatre,
          evaluation.dimensions.deathSpiral,
          evaluation.dimensions.commercialMindset,
        ]
          .map(
            (dimension) => `
          <div class="dimension">
            <div class="dimension-header">
              <div class="dimension-name">${dimension.name}</div>
              <div class="dimension-score">${dimension.score}/${dimension.maxScore}</div>
            </div>
            <div class="dimension-meta">Weight: ${dimension.weight}% • Max Points: ${dimension.maxScore}</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${(dimension.score / dimension.maxScore) * 100}%"></div>
            </div>
            <div class="dimension-feedback">${dimension.feedback}</div>
            ${
              dimension.greenLights.length > 0 || dimension.redFlags.length > 0
                ? `
              <div class="lights-container">
                ${
                  dimension.greenLights.length > 0
                    ? `
                <div class="green-lights">
                  <div class="lights-title"><span>✓</span> Strengths</div>
                  <ul class="lights-list">
                    ${dimension.greenLights.map((light) => `<li>${light}</li>`).join('')}
                  </ul>
                </div>
                `
                    : ''
                }
                ${
                  dimension.redFlags.length > 0
                    ? `
                <div class="red-flags">
                  <div class="lights-title"><span>!</span> Issues</div>
                  <ul class="lights-list">
                    ${dimension.redFlags.map((flag) => `<li>${flag}</li>`).join('')}
                  </ul>
                </div>
                `
                    : ''
                }
              </div>
            `
                : ''
            }
          </div>
        `
          )
          .join('')}
      </div>

      <div class="footer">
        <p>📧 Generated by Impact-First Product Evaluation Tool</p>
        <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </body>
    </html>
  `;

  const options = {
    margin: 10,
    filename: `${proposal.title || 'Scorecard'}-Evaluation.pdf`,
    image: { type: 'png' as const, quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  html2pdf().set(options).from(htmlContent).save();
};
