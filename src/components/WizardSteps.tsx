import React from 'react';
import { School, Layers, Award, Sparkles, Send, Check } from 'lucide-react';

interface WizardStepsProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  maxStepReached: number;
}

export const WizardSteps: React.FC<WizardStepsProps> = ({
  currentStep,
  onSelectStep,
  maxStepReached
}) => {
  const steps = [
    { num: 1, label: 'Institución y DUA', icon: School },
    { num: 2, label: 'Curso y Tema', icon: Layers },
    { num: 3, label: 'Competencias CNEB', icon: Award },
    { num: 4, label: 'Enfoques y Recursos', icon: Sparkles },
    { num: 5, label: 'Evaluación y Generar', icon: Send }
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm mb-6">
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCurrent = currentStep === step.num;
          const isCompleted = step.num < currentStep || (step.num <= maxStepReached && step.num !== currentStep);
          const isClickable = step.num <= Math.max(maxStepReached, currentStep);

          return (
            <button
              key={step.num}
              type="button"
              disabled={!isClickable}
              onClick={() => onSelectStep(step.num)}
              className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-200 relative ${
                isCurrent
                  ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 shadow-sm'
                  : isClickable
                  ? 'text-slate-600 hover:bg-slate-50 cursor-pointer'
                  : 'text-slate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-300 ring-offset-2'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
              </div>
              <span className="text-xs font-medium leading-tight line-clamp-1 sm:line-clamp-none">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
