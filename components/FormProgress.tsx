'use client';

interface FormProgressProps {
  currentSection: number;
  totalSections: number;
}

export default function FormProgress({ currentSection, totalSections }: FormProgressProps) {
  const sections = [
    { id: 1, name: 'Basic Info', icon: '📄' },
    { id: 2, name: 'Business Impact', icon: '💼' },
    { id: 3, name: 'Quantifiable Impact', icon: '📊' },
    { id: 4, name: 'Process Check', icon: '🎯' },
    { id: 5, name: 'Death Spiral', icon: '⚠️' },
    { id: 6, name: 'Commercial', icon: '💰' },
  ];

  const progress = currentSection === 1 ? 0 : ((currentSection - 1) / (totalSections - 1)) * 100;

  return (
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Section {currentSection} of {totalSections}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {sections[currentSection - 1]?.name || 'Unknown'}
          </p>
        </div>
        <div className="text-2xl">{sections[currentSection - 1]?.icon}</div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-right">{Math.round(progress)}% complete</p>
      </div>

      {/* Section Dots */}
      <div className="flex items-center justify-between mt-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`flex flex-col items-center ${
              section.id < currentSection
                ? 'opacity-100'
                : section.id === currentSection
                ? 'opacity-100 scale-110'
                : 'opacity-40'
            } transition-all duration-300`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                section.id < currentSection
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : section.id === currentSection
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ring-4 ring-blue-200'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {section.id < currentSection ? '✓' : section.id}
            </div>
            <span className="text-[10px] mt-1 hidden sm:block text-gray-600 max-w-[60px] text-center">
              {section.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
