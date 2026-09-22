import React, { useState } from 'react';
import { Download, FileText, CheckCircle, RefreshCw, X, Sparkles, Layers, BookOpen, Clock, Users } from 'lucide-react';
import { SesionGeneradaResponse } from '../geminiService';
import { PlanificaFormData } from '../types';
import { YoremiaLogo } from './YoremiaLogo';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sesion: SesionGeneradaResponse | null;
  formData: PlanificaFormData;
  onDownloadDocx: () => void;
  isDownloading: boolean;
  onRegenerate: () => void;
}

export const SesionPreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  sesion,
  formData,
  onDownloadDocx,
  isDownloading,
  onRegenerate
}) => {
  if (!isOpen || !sesion) return null;

  const alumnosList = formData.evaluacion.listaAlumnosRaw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                Vista Previa de la Sesión CNEB Compilada
              </h2>
              <p className="text-xs text-slate-400">
                {formData.institucion.colegio} • {formData.curso.areaId.toUpperCase()} • {formData.curso.gradoId}° {formData.curso.nivel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sesión lista para exportar a Microsoft Word (.docx)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRegenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span>Regenerar con IA</span>
            </button>

            <button
              type="button"
              onClick={onDownloadDocx}
              disabled={isDownloading}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-200 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generando archivo .docx...' : 'Descargar Word (.docx)'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Header Card */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-slate-50/50 to-white shadow-sm space-y-3">
            {/* Cabecera Oficial YOREMIA + MINEDU */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <YoremiaLogo variant="horizontal" size="sm" showAuthor={false} />
              <div className="text-center sm:text-right">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest block">
                  MINISTERIO DE EDUCACIÓN - CNEB
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Sesión Pedagógica Oficial Automatizada
                </span>
              </div>
            </div>

            <div className="text-center py-1">
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
                SESIÓN DE APRENDIZAJE: {formData.curso.tituloSesion || formData.curso.tema}
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {formData.curso.tituloUnidad}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Docente</span>
                <span className="font-semibold text-slate-800">{formData.institucion.docente || 'Docente de aula'}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Institución</span>
                <span className="font-semibold text-slate-800">{formData.institucion.colegio || 'I.E. Oficial'}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Grado y Área</span>
                <span className="font-semibold text-slate-800">{formData.curso.gradoId}° {formData.curso.nivel} - {formData.curso.areaId.toUpperCase()}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Duración</span>
                <span className="font-semibold text-slate-800">{formData.evaluacion.duracionMinutos} minutos</span>
              </div>
            </div>
          </div>

          {/* I. PROPÓSITOS Y CRITERIOS */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-extrabold">I</span>
              Propósitos de Aprendizaje y Criterios de Evaluación
            </h3>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Propósito de la Sesión:</span>
              <p className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-indigo-950 font-medium leading-relaxed">
                {sesion.proposito}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">Criterios de Evaluación:</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-line text-xs font-mono">
                  {sesion.criterios}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">Evidencia Tangible de Aprendizaje:</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-xs">
                  {sesion.evidencia_1}
                </div>
                <div className="mt-3">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Instrumento de Evaluación:</span>
                  <span className="inline-block px-2.5 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-lg border border-purple-200">
                    {formData.evaluacion.instrumento}
                  </span>
                </div>
              </div>
            </div>

            {/* Alineamiento Pedagógico CNEB */}
            {(sesion.reto || sesion.situacion_significativa) && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50/70 p-3 rounded-xl">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block uppercase">Reto / Situación Significativa:</span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {sesion.reto || sesion.situacion_significativa}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block uppercase">Producto / Necesidades de Aprendizaje:</span>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    {sesion.producto || sesion.necesidades_aprendizaje || sesion.evidencia_1}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* II. SECUENCIA DIDÁCTICA */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-extrabold">II</span>
              Secuencia Pedagógica de los Momentos de la Sesión
            </h3>

            {/* Inicio */}
            <div className="border-l-4 border-amber-500 pl-4 py-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">1. Momento de Inicio (15 - 20 minutos)</h4>
                <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-bold">
                  Motivación • Saberes Previos • Conflicto Cognitivo • Propósito
                </span>
              </div>
              <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-amber-50/30 p-3 rounded-xl border border-amber-100/70">
                {sesion.inicio}
              </div>
            </div>

            {/* Desarrollo */}
            <div className="border-l-4 border-blue-500 pl-4 py-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">2. Momento de Desarrollo (55 - 65 minutos)</h4>
                <span className="text-[10px] text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md font-bold">
                  Gestión y Acompañamiento • Procesos Didácticos • Retroalimentación
                </span>
              </div>
              <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-blue-50/30 p-3 rounded-xl border border-blue-100/70">
                {sesion.desarrollo}
              </div>
            </div>

            {/* Cierre */}
            <div className="border-l-4 border-emerald-500 pl-4 py-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">3. Momento de Cierre (10 - 15 minutos)</h4>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
                  Metacognición • Evaluación Formativa • Transferencia
                </span>
              </div>
              <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/70">
                {sesion.cierre}
              </div>
            </div>
          </div>

          {/* III. TEORÍA Y DUA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teoría */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Resumen Teórico para el Cuaderno
              </h4>
              <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                {sesion.teoria}
              </div>
            </div>

            {/* DUA y Trabajo entre Pares */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-3">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  Estrategias DUA y Accesibilidad
                </h4>
                <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-pink-50/30 p-2.5 rounded-xl border border-pink-100 max-h-32 overflow-y-auto">
                  {sesion.dua}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Trabajo entre Pares
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100">
                  {sesion.trabajo_entre_pares || `Los estudiantes interactúan en parejas o equipos colaborativos para resolver las situaciones de ${formData.curso.tema}, contrastando sus procedimientos y brindándose retroalimentación mutua.`}
                </p>
              </div>
            </div>
          </div>

          {/* IV. NÓMINA DE ALUMNOS (LISTA DE COTEJO) */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-600" />
                Instrumento de Evaluación Formativa en Word
              </h4>
              <span className="text-[11px] font-medium text-slate-500">
                {alumnosList.length > 0
                  ? `${alumnosList.length} alumno(s) registrados`
                  : 'Sin nómina de alumnos (Opcional - Filas en blanco para imprimir)'}
              </span>
            </div>

            <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="px-3 py-1.5 w-12 text-center">N°</th>
                    <th className="px-3 py-1.5">Apellidos y Nombres</th>
                    <th className="px-3 py-1.5 text-center">Criterio 1</th>
                    <th className="px-3 py-1.5 text-center">Criterio 2</th>
                    <th className="px-3 py-1.5 text-center">Criterio 3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alumnosList.length > 0 ? (
                    alumnosList.map((nombre, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-1 text-center font-mono text-slate-400">{i + 1}</td>
                        <td className="px-3 py-1 font-medium text-slate-800">{nombre}</td>
                        <td className="px-3 py-1 text-center text-slate-300 font-mono">[  ]</td>
                        <td className="px-3 py-1 text-center text-slate-300 font-mono">[  ]</td>
                        <td className="px-3 py-1 text-center text-slate-300 font-mono">[  ]</td>
                      </tr>
                    ))
                  ) : (
                    Array.from({ length: 5 }, (_, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-1 text-center font-mono text-slate-400">{i + 1}</td>
                        <td className="px-3 py-1 text-slate-300 italic font-mono">
                          ____________________________________
                        </td>
                        <td className="px-3 py-1 text-center text-slate-300 font-mono">[  ]</td>
                        <td className="px-3 py-1 text-center text-slate-300 font-mono">[  ]</td>
                        <td className="px-3 py-1 text-center text-slate-300 font-mono">[  ]</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {alumnosList.length === 0 && (
              <p className="text-[11px] text-slate-400 italic">
                * En el archivo Word se descargarán 15 casilleros vacíos numerados con formato para calificar con lápiz/lapicero en el aula.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            ← Volver a editar datos
          </button>

          <button
            type="button"
            onClick={onDownloadDocx}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-200 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generando archivo...' : 'Descargar Word (.docx) Oficial'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
