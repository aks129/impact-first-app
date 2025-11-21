'use client';

import { useState } from 'react';
import { ProductProposal } from '@/types';

interface SpeechInputProps {
  onDataExtracted: (data: Partial<ProductProposal>) => void;
}

export default function SpeechInput({ onDataExtracted }: SpeechInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError('Speech recognition not supported in your browser');
        return false;
      }
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.language = 'en-US';
      setRecognition(rec);
      return true;
    }
    return false;
  };

  const startListening = () => {
    if (!recognition) {
      if (!initializeSpeechRecognition()) return;
    }

    setTranscript('');
    setError(null);
    setIsListening(true);

    const rec = recognition;
    let interimTranscript = '';

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (event: any) => {
      interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptSegment + ' ');
        } else {
          interimTranscript += transcriptSegment;
        }
      }
    };

    rec.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processTranscript = async () => {
    if (!transcript.trim()) {
      setError('Please provide some speech input first');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-extract-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to process speech');
      }

      const data = await response.json();
      onDataExtracted(data.extractedData);
      setTranscript('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>🎤</span> Voice Input
          </h3>
          <p className="text-sm text-slate-400 mt-1">Describe your proposal and AI will auto-fill the form</p>
        </div>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-300">
            <span className="font-semibold">Transcribed:</span> {transcript}
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-300">⚠️ {error}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        {!isListening ? (
          <button
            onClick={startListening}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span className="text-lg">🎤</span>
            Start Speaking
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 animate-pulse"
          >
            <span className="text-lg">⏹️</span>
            Stop Recording
          </button>
        )}

        {transcript && !isListening && (
          <button
            onClick={processTranscript}
            disabled={isProcessing}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <span>{isProcessing ? '⏳' : '✨'}</span>
            {isProcessing ? 'Processing...' : 'Fill Form with AI'}
          </button>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-4">
        💡 Tip: Describe your proposal naturally. Claude will intelligently extract and fill the form fields.
      </p>
    </div>
  );
}
