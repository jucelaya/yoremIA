import React, { useEffect } from 'react';
import { CompetenciasData } from '../types';
import { cnebData } from '../cnebData';
import { Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';

interface Step3Props {
  data: CompetenciasData;
  onChange: (data: CompetenciasData) => void;
  nivel: 'Primaria' | 'Secundaria';
  gradoId: string;
  areaId: string;
  tema: string;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Competencias: React.FC<Step3Props> = ({
  data,
  onChange,
  nivel,
  gradoId,
  areaId,
  tema,
  onNext,
  onBack
}) => {
  const [expandedCompId, setExpandedCompId] = React.useState<string | null>(null);
  const [hasAttemptedNext, setHasAttemptedNext] = React.useState(false);

  // Obtener las competencias del área seleccionada
  const nivelObj = cnebData.niveles.find((n) => n.id === nivel) || cnebData.niveles[0];
  const gradoObj = nivelObj.grados.find((g) => g.id === gradoId) || nivelObj.grados[0];
  const ciclo = gradoObj.ciclo;
  const areaObj = nivelObj.areas.find((a) => a.id === areaId) || nivelObj.areas[0];
  const competencias = areaObj.competencias;

  // Si no hay competencias seleccionadas, pre-seleccionar la primera por defecto
  useEffect(() => {
    if (data.competenciaIds.length === 0 && competencias.length > 0) {
      onChange({
        ...data,
        competenciaIds: [competencias[0].id]
      });
    }
  }, [areaId, nivel, gradoId]);

  // Manejar selección de competencia (hasta 2)
  const handleToggleCompetencia = (compId: string) => {
    const isSelected = data.competenciaIds.includes(compId);

    if (isSelected) {
      // Si ya está seleccionada y es la única, no desmarcar obligatoriamente para no dejar vacío
      if (data.competenciaIds.length === 1) {
        // Permitir desmarcar solo si se desea
        onChange({
          ...data,
          competenciaIds: [],
          sugeridaPorIA: false
        });
      } else {
        onChange({
          ...data,
          competenciaIds: data.competenciaIds.filter((id) => id !== compId),
          sugeridaPorIA: false
        });
      }
    } else {
      if (data.competenciaIds.length >= 2) {
        alert('Solo puedes seleccionar hasta 2 competencias oficiales por sesión de aprendizaje según la normativa del CNEB.');
        return;
      }
      onChange({
        ...data,
        competenciaIds: [...data.competenciaIds, compId],
        sugeridaPorIA: false
      });
      setHasAttemptedNext(false);
    }
  };

  const handleNextClick = () => {
    if (data.competenciaIds.length === 0) {
      setHasAttemptedNext(true);
      return;
    }
    onNext();
  };

  // Acción: Dejar que la IA sugiera la competencia idónea
  const handleAutoSuggestCompetency = () => {
    // Analizar el tema y sugerir inteligentemente
    const temaLower = (tema || '').toLowerCase();
    let mejorComp = competencias[0];

    if (areaId === 'matematica') {
      if (temaLower.includes('patron') || temaLower.includes('ecuacion') || temaLower.includes('igualdad') || temaLower.includes('algebra')) {
        mejorComp = competencias.find((c) => c.id === 'resuelve_regularidad') || competencias[0];
      } else if (temaLower.includes('figura') || temaLower.includes('forma') || temaLower.includes('plano') || temaLower.includes('perimetro') || temaLower.includes('area') || temaLower.includes('angulo')) {
        mejorComp = competencias.find((c) => c.id === 'resuelve_forma') || competencias[0];
      } else if (temaLower.includes('grafico') || temaLower.includes('tabla') || temaLower.includes('encuesta') || temaLower.includes('estadistica') || temaLower.includes('probabilidad')) {
        mejorComp = competencias.find((c) => c.id === 'resuelve_datos') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'resuelve_cantidad') || competencias[0];
      }
    } else if (areaId === 'comunicacion') {
      if (temaLower.includes('escrib') || temaLower.includes('redact') || temaLower.includes('elabor') || temaLower.includes('afiche') || temaLower.includes('cuento')) {
        mejorComp = competencias.find((c) => c.id === 'escribe_diversos_textos') || competencias[0];
      } else if (temaLower.includes('oral') || temaLower.includes('dialog') || temaLower.includes('debat') || temaLower.includes('exposi') || temaLower.includes('escuch')) {
        mejorComp = competencias.find((c) => c.id === 'se_comunica_oralmente') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'lee_diversos_textos') || competencias[0];
      }
    }

    onChange({
      competenciaIds: [mejorComp.id],
      sugeridaPorIA: true
    });
    setExpandedCompId(mejorComp.id);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Paso 3: Competencias del Área CNEB (MINEDU)
            </h2>
            <p className="text-xs text-emerald-800/80 mt-0.5">
              Área: <span className="font-semibold">{areaObj.nombre}</span> ({nivel} - {gradoObj.nombre} [{ciclo}])
            </p>
          </div>

          <button
            type="button"
            onClick={handleAutoSuggestCompetency}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition shadow-sm ${
              data.sugeridaPorIA
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.sugeridaPorIA ? 'Sugerido por IA activo' : 'Dejar que la IA sugiera'}</span>
          </button>
        </div>
      </div>

      {/* Info bar: Limit up to 2 */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-100 rounded-xl text-xs text-slate-700 font-medium">
        <span>Selecciona hasta 2 competencias curriculares oficiales:</span>
        <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
          data.competenciaIds.length > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {data.competenciaIds.length} / 2 seleccionadas
        </span>
      </div>

      {/* Lista dinámica de competencias con acordeón de capacidades y estándares */}
      <div className="space-y-3">
        {competencias.map((comp) => {
          const isSelected = data.competenciaIds.includes(comp.id);
          const isExpanded = expandedCompId === comp.id;
          const estandarCiclo = comp.estandares[ciclo] || Object.values(comp.estandares)[0];
          const desempenosGrado = comp.desempenos[gradoId] || comp.desempenos['1'] || [];

          return (
            <div
              key={comp.id}
              className={`border rounded-2xl transition duration-150 overflow-hidden ${
                isSelected
                  ? 'border-emerald-500 bg-white ring-1 ring-emerald-500 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Header card with Checkbox */}
              <div className="p-4 flex items-start justify-between gap-3">
                <label className="flex items-start gap-3 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleCompetencia(comp.id)}
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block leading-snug">
                      {comp.nombre}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      {comp.capacidades.length} Capacidades literales asociadas oficialmente
                    </span>
                  </div>
                </label>

                <button
                  type="button"
                  onClick={() => setExpandedCompId(isExpanded ? null : comp.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                  title="Ver capacidades, estándares y desempeños oficiales"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Accordion content: Capacidades fijas + Estándar + Desempeños graduados */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/70 text-xs space-y-3">
                  {/* Capacidades */}
                  <div>
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                      Capacidades literales (CNEB):
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                      {comp.capacidades.map((cap, i) => (
                        <li key={i}>{cap}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Estándar del ciclo */}
                  <div>
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                      Estándar de Aprendizaje ({ciclo}):
                    </span>
                    <p className="text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                      "{estandarCiclo}"
                    </p>
                  </div>

                  {/* Desempeños graduados */}
                  <div>
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                      Desempeños literales oficiales ({gradoObj.nombre}):
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {desempenosGrado.map((des, i) => (
                        <li key={i}>{des}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasAttemptedNext && data.competenciaIds.length === 0 && (
        <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-xs text-rose-800 font-semibold flex items-center gap-2 animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>Obligatorio: Debes seleccionar al menos 1 competencia oficial del CNEB para poder continuar.</span>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
        >
          ← Volver a Curso y Tema
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-100 transition flex items-center gap-2"
        >
          Siguiente: Enfoques y Recursos →
        </button>
      </div>
    </div>
  );
};
