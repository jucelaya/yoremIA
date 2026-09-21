import React, { useEffect, useState } from 'react';
import { CompetenciasData } from '../types';
import { cnebData, competenciasTransversales } from '../cnebData';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle,
  Laptop,
  Compass,
  GraduationCap,
  BookOpen,
  Info
} from 'lucide-react';

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
  const [expandedCompId, setExpandedCompId] = useState<string | null>(null);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  // Obtener la jerarquía curricular oficial (CNEB)
  const nivelObj = cnebData.niveles.find((n) => n.id === nivel) || cnebData.niveles[0];
  const gradoObj = nivelObj.grados.find((g) => g.id === gradoId) || nivelObj.grados[0];
  const ciclo = gradoObj.ciclo; // 1.° y 2.° -> Ciclo VI | 3.°, 4.°, 5.° -> Ciclo VII
  const areaObj = nivelObj.areas.find((a) => a.id.toLowerCase() === areaId.toLowerCase()) || nivelObj.areas[0];
  const competencias = areaObj.competencias;

  // Si no hay competencias seleccionadas o la seleccionada no pertenece al área actual, preseleccionar la 1ra
  useEffect(() => {
    const idsValidos = data.competenciaIds.filter((id) =>
      competencias.some((c) => c.id === id)
    );

    if (idsValidos.length === 0 && competencias.length > 0) {
      onChange({
        ...data,
        competenciaIds: [competencias[0].id]
      });
    } else if (idsValidos.length !== data.competenciaIds.length) {
      onChange({
        ...data,
        competenciaIds: idsValidos
      });
    }
  }, [areaId, nivel, gradoId]);

  // Manejar selección de competencias del área (hasta 2)
  const handleToggleCompetencia = (compId: string) => {
    const isSelected = data.competenciaIds.includes(compId);

    if (isSelected) {
      if (data.competenciaIds.length === 1) {
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
        alert('Según la normativa del CNEB, se recomienda seleccionar hasta 2 competencias del área curricular por sesión de aprendizaje.');
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

  // Manejar selección de competencias transversales (opcionales)
  const handleToggleTransversal = (transId: string) => {
    const current = data.competenciasTransversalesIds || [];
    const isSelected = current.includes(transId);
    const next = isSelected ? current.filter((id) => id !== transId) : [...current, transId];

    onChange({
      ...data,
      competenciasTransversalesIds: next
    });
  };

  const handleNextClick = () => {
    if (data.competenciaIds.length === 0) {
      setHasAttemptedNext(true);
      return;
    }
    onNext();
  };

  // Sugerencia inteligente de competencia basada en el tema y el área
  const handleAutoSuggestCompetency = () => {
    const temaLower = (tema || '').toLowerCase();
    let mejorComp = competencias[0];

    if (areaId === 'matematica') {
      if (temaLower.includes('patron') || temaLower.includes('ecuacion') || temaLower.includes('funcion') || temaLower.includes('algebra') || temaLower.includes('desigualdad')) {
        mejorComp = competencias.find((c) => c.id === 'resuelve_regularidad') || competencias[0];
      } else if (temaLower.includes('figura') || temaLower.includes('forma') || temaLower.includes('prisma') || temaLower.includes('area') || temaLower.includes('volumen') || temaLower.includes('trigonometr') || temaLower.includes('triangul') || temaLower.includes('angulo')) {
        mejorComp = competencias.find((c) => c.id === 'resuelve_forma') || competencias[0];
      } else if (temaLower.includes('grafico') || temaLower.includes('tabla') || temaLower.includes('encuesta') || temaLower.includes('estadistica') || temaLower.includes('probabilidad') || temaLower.includes('media') || temaLower.includes('frecuencia')) {
        mejorComp = competencias.find((c) => c.id === 'resuelve_datos') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'resuelve_cantidad') || competencias[0];
      }
    } else if (areaId === 'comunicacion') {
      if (temaLower.includes('escrib') || temaLower.includes('redact') || temaLower.includes('ensayo') || temaLower.includes('afiche') || temaLower.includes('cuento') || temaLower.includes('articulo') || temaLower.includes('texto')) {
        mejorComp = competencias.find((c) => c.id === 'escribe_diversos_textos') || competencias[0];
      } else if (temaLower.includes('oral') || temaLower.includes('dialog') || temaLower.includes('debat') || temaLower.includes('exposi') || temaLower.includes('discurso') || temaLower.includes('asamblea')) {
        mejorComp = competencias.find((c) => c.id === 'se_comunica_oralmente') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'lee_diversos_textos') || competencias[0];
      }
    } else if (areaId === 'ciencia_tecnologia') {
      if (temaLower.includes('indaga') || temaLower.includes('experiment') || temaLower.includes('hipotesis') || temaLower.includes('variable')) {
        mejorComp = competencias.find((c) => c.id === 'ct_indaga') || competencias[0];
      } else if (temaLower.includes('disen') || temaLower.includes('prototipo') || temaLower.includes('solucion tecnologica') || temaLower.includes('constru')) {
        mejorComp = competencias.find((c) => c.id === 'ct_disena') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'explica_mundo_fisico') || competencias[0];
      }
    } else if (areaId === 'ciencias_sociales') {
      if (temaLower.includes('ambiente') || temaLower.includes('espacio') || temaLower.includes('clima') || temaLower.includes('cuenca') || temaLower.includes('mapa') || temaLower.includes('geograf') || temaLower.includes('desastre')) {
        mejorComp = competencias.find((c) => c.id === 'cs_espacio_ambiente') || competencias[0];
      } else if (temaLower.includes('econom') || temaLower.includes('recurso') || temaLower.includes('presupuesto') || temaLower.includes('financier') || temaLower.includes('tribut') || temaLower.includes('ahorro') || temaLower.includes('sunat') || temaLower.includes('indecopi')) {
        mejorComp = competencias.find((c) => c.id === 'cs_recursos_economicos') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'cs_historicas') || competencias[0];
      }
    } else if (areaId === 'dpcc') {
      if (temaLower.includes('conviv') || temaLower.includes('democra') || temaLower.includes('conflicto') || temaLower.includes('asunto publico') || temaLower.includes('norma') || temaLower.includes('participa')) {
        mejorComp = competencias.find((c) => c.id === 'dpcc_convive') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'dpcc_identidad') || competencias[0];
      }
    } else if (areaId === 'arte_cultura') {
      if (temaLower.includes('crea') || temaLower.includes('mural') || temaLower.includes('proyecto') || temaLower.includes('teatro') || temaLower.includes('dibuj') || temaLower.includes('pintur')) {
        mejorComp = competencias.find((c) => c.id === 'arte_crea') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'arte_aprecia') || competencias[0];
      }
    } else if (areaId === 'ingles') {
      if (temaLower.includes('writ') || temaLower.includes('escrib') || temaLower.includes('email') || temaLower.includes('essay')) {
        mejorComp = competencias.find((c) => c.id === 'ingles_escribe') || competencias[0];
      } else if (temaLower.includes('speak') || temaLower.includes('oral') || temaLower.includes('dialog') || temaLower.includes('talk')) {
        mejorComp = competencias.find((c) => c.id === 'ingles_oral') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'ingles_lee') || competencias[0];
      }
    } else if (areaId === 'educacion_fisica') {
      if (temaLower.includes('salud') || temaLower.includes('aliment') || temaLower.includes('cardiac') || temaLower.includes('hidrat') || temaLower.includes('nutricion')) {
        mejorComp = competencias.find((c) => c.id === 'ef_vida_saludable') || competencias[0];
      } else if (temaLower.includes('sociomot') || temaLower.includes('juego') || temaLower.includes('estrategia') || temaLower.includes('equipo') || temaLower.includes('deporte') || temaLower.includes('tactica')) {
        mejorComp = competencias.find((c) => c.id === 'ef_sociomotrices') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'ef_motricidad') || competencias[0];
      }
    } else if (areaId === 'educacion_religiosa') {
      if (temaLower.includes('encuentro') || temaLower.includes('comunitar') || temaLower.includes('accion') || temaLower.includes('solidar') || temaLower.includes('caridad')) {
        mejorComp = competencias.find((c) => c.id === 'rel_experiencia') || competencias[0];
      } else {
        mejorComp = competencias.find((c) => c.id === 'rel_identidad') || competencias[0];
      }
    }

    onChange({
      ...data,
      competenciaIds: [mejorComp.id],
      sugeridaPorIA: true
    });
    setExpandedCompId(mejorComp.id);
  };

  return (
    <div className="space-y-6">
      {/* 1. Contexto Curricular Oficial: Nivel, Grado, Ciclo y Área */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <h2 className="text-base font-bold text-emerald-950">
                Paso 3: Competencias CNEB (MINEDU)
              </h2>
            </div>
            <p className="text-xs text-emerald-800/90">
              Taxonomía oficial alineada al Currículo Nacional de la Educación Básica
            </p>
          </div>

          <button
            type="button"
            onClick={handleAutoSuggestCompetency}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition shadow-sm ${
              data.sugeridaPorIA
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.sugeridaPorIA ? 'Sugerido por IA activo' : 'Sugerir según tema'}</span>
          </button>
        </div>

        {/* Barra de correspondencia curricular normalizada: 1. Nivel, 2. Grado + Ciclo derivado, 3. Área */}
        <div className="mt-3 pt-3 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center gap-2 bg-white/80 rounded-xl px-3 py-2 border border-emerald-100">
            <GraduationCap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Nivel</span>
              <span className="text-xs font-bold text-slate-800">{nivel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 rounded-xl px-3 py-2 border border-emerald-100">
            <Compass className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Grado & Ciclo Normativo</span>
              <span className="text-xs font-bold text-slate-800">
                {gradoObj.nombre} <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">({ciclo})</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 rounded-xl px-3 py-2 border border-emerald-100">
            <BookOpen className="w-4 h-4 text-cyan-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Área Curricular</span>
              <span className="text-xs font-bold text-slate-800 truncate block max-w-[200px]" title={areaObj.nombre}>
                {areaObj.nombre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Competencias del Área Curricular */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-1">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Competencias de {areaObj.nombre}</span>
              <span className="text-xs font-normal text-slate-500">({competencias.length} disponibles)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Selecciona hasta 2 competencias curriculares oficiales para la sesión:
            </p>
          </div>
          <span className={`self-start sm:self-auto px-2.5 py-1 rounded-full font-bold text-[11px] transition ${
            data.competenciaIds.length > 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {data.competenciaIds.length} / 2 seleccionadas
          </span>
        </div>

        {/* Lista de competencias del área */}
        <div className="space-y-3">
          {competencias.map((comp, idx) => {
            const isSelected = data.competenciaIds.includes(comp.id);
            const isExpanded = expandedCompId === comp.id;
            const estandarCiclo = comp.estandares[ciclo] || Object.values(comp.estandares)[0];
            const desempenosGrado = comp.desempenos[gradoId] || comp.desempenos['1'] || [];

            return (
              <div
                key={comp.id}
                className={`border rounded-2xl transition duration-150 overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-sm'
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
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          Comp. {idx + 1}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Seleccionada
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-slate-900 block leading-snug mt-1">
                        {comp.nombre}
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        {comp.capacidades.length} Capacidades asociadas • {desempenosGrado.length} Desempeños para {gradoObj.nombre}
                      </span>
                    </div>
                  </label>

                  <button
                    type="button"
                    onClick={() => setExpandedCompId(isExpanded ? null : comp.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition flex items-center gap-1 text-xs font-semibold"
                    title="Ver capacidades, estándares y desempeños oficiales"
                  >
                    <span className="hidden sm:inline text-[11px] text-slate-500">
                      {isExpanded ? 'Ocultar' : 'Ver detalle'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Acordeón de Capacidades literales, Estándar de ciclo y Desempeños de grado */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-3 border-t border-slate-100 bg-slate-50/80 text-xs space-y-3">
                    {/* Capacidades */}
                    <div>
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                        Capacidades Literales (CNEB):
                      </span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700">
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
                      <p className="text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                        "{estandarCiclo}"
                      </p>
                    </div>

                    {/* Desempeños graduados */}
                    <div>
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1">
                        Desempeños Graduados Oficiales ({gradoObj.nombre}):
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
      </div>

      {/* 5. Competencias Transversales a todas las áreas (Selección Opcional) */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-indigo-600" />
              <span>5. Competencias Transversales (Opcional)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Se consideran en todos los grados de Secundaria y pueden vincularse a cualquier área según la sesión:
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full self-start sm:self-auto">
            {(data.competenciasTransversalesIds || []).length} vinculadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {competenciasTransversales.map((trans) => {
            const isTransSelected = (data.competenciasTransversalesIds || []).includes(trans.id);
            const isTransExpanded = expandedCompId === trans.id;
            const estandarCiclo = trans.estandares[ciclo] || Object.values(trans.estandares)[0];
            const desempenosGrado = trans.desempenos[gradoId] || trans.desempenos['1'] || [];

            return (
              <div
                key={trans.id}
                className={`border rounded-2xl transition duration-150 overflow-hidden ${
                  isTransSelected
                    ? 'border-indigo-500 bg-indigo-50/20 ring-1 ring-indigo-500 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="p-3.5 flex items-start justify-between gap-2.5">
                  <label className="flex items-start gap-2.5 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={isTransSelected}
                      onChange={() => handleToggleTransversal(trans.id)}
                      className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-snug">
                        {trans.nombre}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        {trans.capacidades.length} Capacidades CNEB
                      </span>
                    </div>
                  </label>

                  <button
                    type="button"
                    onClick={() => setExpandedCompId(isTransExpanded ? null : trans.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                    title="Ver detalle curricular"
                  >
                    {isTransExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isTransExpanded && (
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100 bg-slate-50/90 text-[11px] space-y-2">
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">
                        Capacidades:
                      </span>
                      <ul className="list-disc pl-3.5 space-y-0.5 text-slate-600">
                        {trans.capacidades.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">
                        Estándar ({ciclo}):
                      </span>
                      <p className="text-slate-600 italic bg-white p-2 rounded-lg border border-slate-200">
                        "{estandarCiclo}"
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-0.5">
                        Desempeños ({gradoObj.nombre}):
                      </span>
                      <ul className="list-disc pl-3.5 space-y-0.5 text-slate-600">
                        {desempenosGrado.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerta si no se seleccionó ninguna competencia obligatoria */}
      {hasAttemptedNext && data.competenciaIds.length === 0 && (
        <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-xs text-rose-800 font-semibold flex items-center gap-2 animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>Obligatorio: Debes seleccionar al menos 1 competencia oficial del CNEB para continuar.</span>
        </div>
      )}

      {/* Botones de navegación */}
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
