import React, { useState, useEffect } from 'react';
import { EvaluacionData } from '../types';
import { Clock, CheckSquare, Users, Accessibility, FileCheck2, Upload, Download, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface Step5Props {
  data: EvaluacionData;
  onChange: (data: EvaluacionData) => void;
  onGenerar: () => void;
  onGenerarYDescargar: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
  hasGeneratedSesion: boolean;
  onVerVistaPrevia: () => void;
  onBack: () => void;
  customTemplateBuffer?: ArrayBuffer | null;
  onUploadCustomTemplate: (buffer: ArrayBuffer | null, filename?: string) => void;
  onDownloadMasterTemplate: () => void;
}

export const Step5EvaluacionGenerar: React.FC<Step5Props> = ({
  data,
  onChange,
  onGenerar,
  onGenerarYDescargar,
  isGenerating,
  isDownloading,
  hasGeneratedSesion,
  onVerVistaPrevia,
  onBack,
  customTemplateBuffer,
  onUploadCustomTemplate,
  onDownloadMasterTemplate
}) => {
  const [templateFileName, setTemplateFileName] = useState<string | null>(null);

  // Cargar lista de alumnos guardada previamente por el usuario sólo si existe y no es la muestra genérica
  useEffect(() => {
    try {
      const storedAlumnos = localStorage.getItem('planifica_student_roster');
      // Si el usuario había guardado previamente una nómina y data.listaAlumnosRaw está vacío, restaurarla sólo si no es la muestra automática
      if (storedAlumnos && storedAlumnos.trim() && !data.listaAlumnosRaw) {
        if (!storedAlumnos.includes('Alarcón Flores, Mateo')) {
          onChange({ ...data, listaAlumnosRaw: storedAlumnos });
        } else {
          // Limpiar residuo de la muestra automática previa
          localStorage.removeItem('planifica_student_roster');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAlumnosChange = (val: string) => {
    onChange({ ...data, listaAlumnosRaw: val });
    try {
      localStorage.setItem('planifica_student_roster', val);
    } catch {}
  };

  // Calcular número de alumnos válidos
  const cantidadAlumnos = data.listaAlumnosRaw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0).length;

  // Cargar lista de muestra estándar
  const handlePrecargarMuestra = () => {
    const nombres = [
      'Alarcón Flores, Mateo Sebastián',
      'Barrientos Quispe, Camila Lucía',
      'Cárdenas Mendoza, Joaquín David',
      'Delgado Paredes, Valeria Sofía',
      'Espinoza Ramos, Thiago André',
      'Gutiérrez Huamán, Mia Antonella',
      'Hernández Castillo, Diego Alonso',
      'Mamani Yupanqui, Rodrigo Gabriel',
      'Navarro Morales, Romina Nicole',
      'Pérez Salazar, Franco Alexander',
      'Quispe Condori, Valentina María',
      'Rojas Villanueva, Álvaro Daniel',
      'Sánchez Ortiz, Andrea Belén',
      'Torres Benítez, Matías Benjamín',
      'Vega Córdova, Luciana Fernanda'
    ].join('\n');
    handleAlumnosChange(nombres);
  };

  // Manejador de archivo Word personalizado
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        setTemplateFileName(file.name);
        onUploadCustomTemplate(buffer, file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-4 sm:p-5">
        <h2 className="text-base font-bold text-purple-950 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-purple-600" />
          Paso 5: Evaluación, Estudiantes y Ensamblado Word (.docx)
        </h2>
        <p className="text-xs text-purple-800/80 mt-0.5">
          Configura el instrumento de evaluación formativa, la nómina de estudiantes y el motor de compilación Word.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selector de Duración en Minutos */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-600" />
            Duración de la Sesión pedagógica
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 45, label: '45 min', sub: '1 bloque' },
              { val: 90, label: '90 min', sub: '2 bloques (Estándar)' },
              { val: 135, label: '135 min', sub: '3 bloques' }
            ].map((d) => (
              <button
                key={d.val}
                type="button"
                onClick={() => onChange({ ...data, duracionMinutos: d.val })}
                className={`p-3 rounded-xl border text-center transition ${
                  data.duracionMinutos === d.val
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="block text-sm font-bold">{d.label}</span>
                <span className={`block text-[10px] ${data.duracionMinutos === d.val ? 'text-purple-100' : 'text-slate-400'}`}>
                  {d.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Instrumento de Evaluación */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-indigo-600" />
            Instrumento de Evaluación Formativa
          </label>
          <div className="space-y-2">
            {[
              { id: 'Lista de cotejo', desc: 'Registro dicotómico (Sí / No) de criterios observables' },
              { id: 'Rúbrica de evaluación', desc: 'Niveles de logro: En Inicio, En Proceso, Logro Esperado, Destacado' },
              { id: 'Escala de valoración', desc: 'Gradación cualitativa del desempeño individual' }
            ].map((inst) => (
              <label
                key={inst.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition ${
                  data.instrumento === inst.id
                    ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-400'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/20'
                }`}
              >
                <input
                  type="radio"
                  name="instrumento"
                  checked={data.instrumento === inst.id}
                  onChange={() => onChange({ ...data, instrumento: inst.id as any })}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">{inst.id}</span>
                  <span className="text-slate-500 text-[11px] block">{inst.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Checkbox Adaptaciones NEE */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.adaptacionesNee}
            onChange={(e) => onChange({ ...data, adaptacionesNee: e.target.checked })}
            className="mt-1 w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
          />
          <div>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-purple-600" />
              Adaptaciones Curriculares para Necesidades Educativas Especiales (NEE)
            </span>
            <span className="text-xs text-slate-500 block mt-0.5 leading-relaxed">
              Al activar esta opción, el motor CNEB / Gemini inyectará estrategias específicas de accesibilidad cognitiva, apoyos visuales y adecuación de tiempos en la secuencia didáctica y en los criterios de evaluación.
            </span>
          </div>
        </label>
      </div>

      {/* Lista de Alumnos (Opcional - Textarea por línea con persistencia local) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-600" />
                Nómina de Estudiantes
              </label>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Opcional
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
              <strong>Completamente opcional:</strong> Puedes dejar este campo en blanco. Si no ingresas nombres, el instrumento de evaluación en el documento Word se generará automáticamente con filas numeradas en blanco listas para imprimir y registrar a mano.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {cantidadAlumnos > 0 ? (
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                {cantidadAlumnos} alumno(s) ingresado(s)
              </span>
            ) : (
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Sin nombres (filas en blanco)
              </span>
            )}
            <button
              type="button"
              onClick={handlePrecargarMuestra}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-lg transition"
              title="Pegar una nómina modelo de prueba si deseas probar la funcionalidad"
            >
              Cargar ejemplo
            </button>
            {cantidadAlumnos > 0 && (
              <button
                type="button"
                onClick={() => handleAlumnosChange('')}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium px-1.5"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <textarea
          rows={4}
          placeholder="(Opcional) Deja este campo vacío para generar casilleros en blanco imprimibles, o ingresa un estudiante por línea si deseas personalizar la lista..."
          value={data.listaAlumnosRaw}
          onChange={(e) => handleAlumnosChange(e.target.value)}
          className="w-full text-xs font-mono text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50 leading-relaxed"
        />
        <p className="text-[11px] text-slate-400">
          * Si ingresas nombres, se recordarán en tu navegador para tus siguientes sesiones.
        </p>
      </div>

      {/* Plantilla Word (.docx) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              Plantilla Word Maestra (.docx con etiquetas Mustache)
            </h3>
            <p className="text-xs text-slate-500">
              {templateFileName ? (
                <span className="text-emerald-700 font-semibold">Usando plantilla personalizada: {templateFileName}</span>
              ) : (
                <span>Usando plantilla oficial preformateada: <code className="text-indigo-700 font-semibold">modelo-minedu-sesion.docx</code></span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownloadMasterTemplate}
              className="flex items-center gap-1 text-xs bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition shadow-sm font-medium"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              Descargar plantilla base
            </button>

            <label className="flex items-center gap-1 text-xs bg-white border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition shadow-sm font-medium cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Subir .docx personalizado</span>
              <input type="file" accept=".docx" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Main Action Callout: GENERAR Y DESCARGAR WORD */}
      <div className="p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-400/20 text-amber-300 rounded-lg">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <h3 className="text-lg font-bold">
              ¿Listo para obtener tu sesión de aprendizaje oficial?
            </h3>
          </div>
          <p className="text-xs text-indigo-100 mt-1.5 max-w-xl leading-relaxed">
            Se procesarán las competencias del CNEB, los 3 momentos pedagógicos (Inicio, Desarrollo y Cierre), criterios, evidencias, rúbricas y la plantilla de Word, descargando el archivo <strong>.docx</strong> inmediatamente a tu computadora.
          </p>
          {hasGeneratedSesion && (
            <p className="text-xs text-emerald-300 font-semibold mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sesión pedagógica ya generada y lista en memoria para descarga instantánea.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Botón Principal: Generar y Descargar Word Directamente */}
          <button
            type="button"
            onClick={onGenerarYDescargar}
            disabled={isGenerating || isDownloading}
            className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                <span>Generando y Descargando Word...</span>
              </>
            ) : isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                <span>Procesando CNEB e IA...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 text-slate-950" />
                <span>{hasGeneratedSesion ? 'Descargar Word (.docx)' : 'Generar y Descargar Word (.docx)'}</span>
              </>
            )}
          </button>

          {/* Botón Secundario: Vista Previa */}
          <button
            type="button"
            onClick={hasGeneratedSesion ? onVerVistaPrevia : onGenerar}
            disabled={isGenerating || isDownloading}
            className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{hasGeneratedSesion ? 'Ver Vista Previa' : 'Previsualizar en Pantalla'}</span>
          </button>
        </div>
      </div>

      {/* Navigation button */}
      <div className="flex justify-start pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
        >
          ← Volver a Enfoques y Recursos
        </button>
      </div>
    </div>
  );
};
