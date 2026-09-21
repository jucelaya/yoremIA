import React, { useState } from 'react';
import { EnfoquesRecursosData } from '../types';
import { enfoquesTransversales } from '../cnebData';
import { sugerirCampo } from '../geminiService';
import { Sparkles, Compass, BookOpen, MonitorPlay, Scissors, Loader2, Check, AlertCircle, AlertTriangle } from 'lucide-react';

interface Step4Props {
  data: EnfoquesRecursosData;
  onChange: (data: EnfoquesRecursosData) => void;
  areaNombre: string;
  nivel: string;
  gradoNombre: string;
  tema: string;
  onNext: () => void;
  onBack: () => void;
}

export const Step4EnfoquesRecursos: React.FC<Step4Props> = ({
  data,
  onChange,
  areaNombre,
  nivel,
  gradoNombre,
  tema,
  onNext,
  onBack
}) => {
  const [loadingField, setLoadingField] = useState<'referencias' | 'recursos' | 'materiales' | null>(null);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  // Manejar toggle de enfoque transversal
  const handleToggleEnfoque = (id: string) => {
    const isSelected = data.enfoquesIds.includes(id);
    if (isSelected) {
      onChange({
        ...data,
        enfoquesIds: data.enfoquesIds.filter((item) => item !== id)
      });
    } else {
      onChange({
        ...data,
        enfoquesIds: [...data.enfoquesIds, id]
      });
      setHasAttemptedNext(false);
    }
  };

  // Sugerir con IA para cada textarea individual
  const handleSugerirIndividual = async (tipo: 'referencias' | 'recursos' | 'materiales') => {
    setLoadingField(tipo);
    try {
      const sugerencia = await sugerirCampo(tipo, {
        area: areaNombre,
        nivel,
        grado: gradoNombre,
        tema: tema || 'el tema curricular'
      });

      onChange({
        ...data,
        [tipo]: sugerencia
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingField(null);
    }
  };

  const isEnfoquesEmpty = data.enfoquesIds.length === 0;

  const handleNextClick = () => {
    if (isEnfoquesEmpty) {
      setHasAttemptedNext(true);
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 sm:p-5">
        <h2 className="text-base font-bold text-amber-950 flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-600" />
          Paso 4: Enfoques Transversales y Recursos Pedagógicos
        </h2>
        <p className="text-xs text-amber-800/80 mt-0.5">
          Selecciona los enfoques transversales a priorizar e ingresa los materiales y fuentes oficiales.
        </p>
      </div>

      {/* 7 Enfoques Transversales Oficiales del CNEB */}
      <div className={`bg-white border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 transition ${
        hasAttemptedNext && isEnfoquesEmpty
          ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/10'
          : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            7 Enfoques Transversales Oficiales (MINEDU) <span className="text-rose-500">*</span>
          </label>
          {isEnfoquesEmpty ? (
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <AlertCircle className="w-3 h-3 text-rose-500" /> COMPLETAR (Mín. 1)
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Check className="w-3 h-3 text-emerald-600" /> {data.enfoquesIds.length} seleccionado(s)
            </span>
          )}
        </div>

        {hasAttemptedNext && isEnfoquesEmpty && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>Obligatorio: Por favor marca al menos un enfoque transversal para avanzar al siguiente paso.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {enfoquesTransversales.map((enf) => {
            const isChecked = data.enfoquesIds.includes(enf.id);
            return (
              <label
                key={enf.id}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                  isChecked
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleEnfoque(enf.id)}
                  className="mt-0.5 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">
                    {enf.nombre}
                  </span>
                  <span className="text-slate-600 block mt-0.5 text-[11px] leading-relaxed">
                    <strong className="text-slate-700">Valores:</strong> {enf.valores}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3 Textareas con botón individual "Sugerir con IA" */}
      <div className="space-y-4">
        {/* 1. Referencias Bibliográficas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Referencias Bibliográficas (MINEDU / Guías Docentes)
            </label>
            <button
              type="button"
              onClick={() => handleSugerirIndividual('referencias')}
              disabled={loadingField === 'referencias'}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg border border-blue-200 transition shadow-sm disabled:opacity-50"
            >
              {loadingField === 'referencias' ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-500" />
              )}
              <span>Sugerir con IA</span>
            </button>
          </div>
          <textarea
            rows={3}
            placeholder="- Ministerio de Educación del Perú (2016). Currículo Nacional de la Educación Básica..."
            value={data.referencias}
            onChange={(e) => onChange({ ...data, referencias: e.target.value })}
            className="w-full text-xs sm:text-sm text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 leading-relaxed"
          />
        </div>

        {/* 2. Recursos Educativos */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <MonitorPlay className="w-4 h-4 text-indigo-600" />
              Recursos Educativos y Medios Didácticos
            </label>
            <button
              type="button"
              onClick={() => handleSugerirIndividual('recursos')}
              disabled={loadingField === 'recursos'}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition shadow-sm disabled:opacity-50"
            >
              {loadingField === 'recursos' ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-500" />
              )}
              <span>Sugerir con IA</span>
            </button>
          </div>
          <textarea
            rows={3}
            placeholder="- Ficha de aplicación estructurada, papelotes cuadriculados, láminas ilustrativas..."
            value={data.recursos}
            onChange={(e) => onChange({ ...data, recursos: e.target.value })}
            className="w-full text-xs sm:text-sm text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 leading-relaxed"
          />
        </div>

        {/* 3. Materiales y Herramientas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-emerald-600" />
              Materiales Concretos y Fungibles del Aula
            </label>
            <button
              type="button"
              onClick={() => handleSugerirIndividual('materiales')}
              disabled={loadingField === 'materiales'}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition shadow-sm disabled:opacity-50"
            >
              {loadingField === 'materiales' ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-500" />
              )}
              <span>Sugerir con IA</span>
            </button>
          </div>
          <textarea
            rows={3}
            placeholder="- Material Base Diez, plumones acrílicos, hojas bond, regla milimetrada..."
            value={data.materiales}
            onChange={(e) => onChange({ ...data, materiales: e.target.value })}
            className="w-full text-xs sm:text-sm text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 leading-relaxed"
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
        >
          ← Volver a Competencias
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-amber-100 transition flex items-center gap-2"
        >
          Siguiente: Evaluación y Generar →
        </button>
      </div>
    </div>
  );
};
