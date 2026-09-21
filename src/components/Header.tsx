import React from 'react';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { YoremiaLogo } from './YoremiaLogo';

interface HeaderProps {
  hasApiKey: boolean;
  onDownloadTemplate: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasApiKey, onDownloadTemplate, onReset }) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Official Logo */}
        <YoremiaLogo size="md" variant="horizontal" showAuthor={true} />

        {/* Actions & Status */}
        <div className="flex items-center gap-3">
          {/* AI Connection status */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
            {hasApiKey ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Gemini Flash Activo</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Motor CNEB Local (0 Tokens)</span>
              </>
            )}
          </div>

          {/* Download Official Template */}
          <button
            onClick={onDownloadTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-sm"
            title="Descargar la plantilla maestra .docx con sintaxis Mustache"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Plantilla Maestra</span> .docx
          </button>

          {/* Reset form */}
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-slate-800 transition px-2 py-1"
          >
            Limpiar todo
          </button>
        </div>
      </div>
    </header>
  );
};
