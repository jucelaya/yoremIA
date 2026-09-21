import React, { useState, useEffect } from 'react';
import { InstitucionData } from '../types';
import { Save, Download, Sparkles, Building2, User, UserCheck, HeartHandshake, Check, AlertCircle, AlertTriangle } from 'lucide-react';
import { YoremiaLogo } from './YoremiaLogo';

interface Step1Props {
  data: InstitucionData;
  onChange: (data: InstitucionData) => void;
  onNext: () => void;
}

export const Step1Institucion: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
  const [savedProfiles, setSavedProfiles] = useState<Array<{ id: string; name: string; data: InstitucionData }>>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [profileNameInput, setProfileNameInput] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasAttemptedNext, setHasAttemptedNext] = useState<boolean>(false);

  // Cargar perfiles guardados de localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('planifica_saved_profiles');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedProfiles(parsed);
      } else {
        // Precargar un perfil de muestra por defecto
        const defaultProfile = {
          id: 'def-1',
          name: 'I.E. Ricardo Palma (Ejemplo Oficial)',
          data: {
            docente: 'Prof. Carlos Alberto Mendoza Ramos',
            colegio: 'I.E. N° 1250 "Ricardo Palma" - UGEL 06',
            director: 'Dra. María Elena Quispe Huamán',
            contextoDua: 'Aula con 28 estudiantes de zona urbana. Presentan ritmos y estilos de aprendizaje variados: 6 estudiantes con necesidad de andamiaje visual y organizadores gráficos; 2 estudiantes con timidez para la expresión oral en público; aula dinámica con alto interés en dinámicas lúdicas y trabajo colaborativo.'
          }
        };
        setSavedProfiles([defaultProfile]);
        localStorage.setItem('planifica_saved_profiles', JSON.stringify([defaultProfile]));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCargarEjemploRapido = () => {
    onChange({
      docente: 'Prof. Carlos Alberto Mendoza Ramos',
      colegio: 'I.E. N° 1250 "Ricardo Palma" - UGEL 06',
      director: 'Dra. María Elena Quispe Huamán',
      contextoDua: data.contextoDua || 'Aula con 28 estudiantes de zona urbana. Presentan ritmos variados con necesidad de andamiaje visual y trabajo cooperativo.'
    });
    setHasAttemptedNext(false);
    showToast('Datos de ejemplo cargados en el formulario');
  };

  const handleSaveProfile = () => {
    const name = profileNameInput.trim() || data.colegio || 'Mi Institución';
    const newProfile = {
      id: Date.now().toString(),
      name,
      data: { ...data }
    };
    const updated = [...savedProfiles.filter((p) => p.name !== name), newProfile];
    setSavedProfiles(updated);
    localStorage.setItem('planifica_saved_profiles', JSON.stringify(updated));
    setSelectedProfileId(newProfile.id);
    setProfileNameInput('');
    showToast(`Perfil "${name}" guardado exitosamente`);
  };

  const handleLoadProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    const found = savedProfiles.find((p) => p.id === profileId);
    if (found) {
      onChange({ ...found.data });
      setHasAttemptedNext(false);
      showToast(`Perfil "${found.name}" cargado`);
    }
  };

  const handleSaveDuaOnly = () => {
    localStorage.setItem('planifica_dua_template', data.contextoDua);
    showToast('Contexto DUA guardado en el navegador');
  };

  const handleLoadDuaOnly = () => {
    const stored = localStorage.getItem('planifica_dua_template');
    if (stored) {
      onChange({ ...data, contextoDua: stored });
      showToast('Contexto DUA cargado');
    } else {
      showToast('No hay contexto DUA guardado previamente');
    }
  };

  const handleInsertDuaTag = (snippet: string) => {
    const current = data.contextoDua ? `${data.contextoDua.trim()} ` : '';
    onChange({ ...data, contextoDua: current + snippet });
  };

  // Validar si los campos obligatorios están llenos
  const isDocenteEmpty = !data.docente.trim();
  const isColegioEmpty = !data.colegio.trim();
  const isDirectorEmpty = !data.director.trim();
  const hasIncompleteFields = isDocenteEmpty || isColegioEmpty || isDirectorEmpty;

  // Manejar avance al siguiente paso con validación estricta
  const handleNextClick = () => {
    if (hasIncompleteFields) {
      setHasAttemptedNext(true);
      showToast('⚠️ Faltan campos obligatorios por completar. Por favor llena los datos resaltados.');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in shadow-sm border ${
          toastMessage.includes('⚠️')
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toastMessage.includes('⚠️') ? (
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Alerta si intentó continuar sin rellenar */}
      {hasAttemptedNext && hasIncompleteFields && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3 shadow-sm animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-rose-900">Campos obligatorios requeridos para continuar</h3>
            <p className="text-xs text-rose-700 mt-0.5">
              Para poder avanzar al Paso 2 (Curso y Tema), debes completar:
            </p>
            <ul className="text-xs font-semibold text-rose-800 list-disc list-inside mt-1.5 space-y-0.5">
              {isDocenteEmpty && <li>Nombre del Docente</li>}
              {isColegioEmpty && <li>Institución Educativa (I.E.)</li>}
              {isDirectorEmpty && <li>Director(a) de la I.E.</li>}
            </ul>
          </div>
        </div>
      )}

      {/* Banner de Identidad Oficial YOREMIA */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <YoremiaLogo variant="horizontal" size="lg" showAuthor={true} />
        <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 hidden sm:block">
          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
            Planificador Curricular 2024-2026
          </span>
          <p className="text-[11px] text-slate-500 mt-1 max-w-[210px] leading-tight">
            Estructura curricular oficial y descarga directa en Microsoft Word (.docx)
          </p>
        </div>
      </div>

      {/* Top Banner & Profile Manager */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Paso 1: Datos de la Institución y Contexto DUA
            </h2>
            <p className="text-xs text-indigo-800/80 mt-0.5">
              Los campos señalados con <span className="font-bold text-rose-600">[COMPLETAR]</span> son estrictamente obligatorios para la sesión oficial del MINEDU.
            </p>
          </div>

          {/* Profile selector dropdown & Quick Fill */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCargarEjemploRapido}
              className="text-xs font-semibold px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              title="Cargar datos de ejemplo oficiales para probar rápidamente"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ejemplo rápido</span>
            </button>

            <select
              value={selectedProfileId}
              onChange={(e) => handleLoadProfile(e.target.value)}
              className="text-xs bg-white border border-indigo-200 rounded-xl px-3 py-2 text-slate-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Cargar perfil guardado --</option>
              {savedProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Docente */}
        <div className={`bg-white border rounded-2xl p-4 shadow-sm transition ${
          hasAttemptedNext && isDocenteEmpty
            ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/10'
            : 'border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500'
        }`}>
          <div className="flex items-center justify-between gap-1 mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              Nombre del Docente <span className="text-rose-500">*</span>
            </label>
            {isDocenteEmpty ? (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 text-rose-500" /> COMPLETAR
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Check className="w-3 h-3 text-emerald-600" /> LISTO
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="[COMPLETAR] Nombre y apellidos del docente (Ej. Prof. Juan Pérez)"
            value={data.docente}
            onChange={(e) => {
              onChange({ ...data, docente: e.target.value });
              if (hasAttemptedNext && e.target.value.trim()) {
                setHasAttemptedNext(false);
              }
            }}
            className="w-full text-sm font-medium text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
          {hasAttemptedNext && isDocenteEmpty ? (
            <p className="text-[11px] font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              Obligatorio: Por favor completa el nombre del docente.
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-2">Aparece en la carátula y firma oficial de la sesión.</p>
          )}
        </div>

        {/* Institución Educativa */}
        <div className={`bg-white border rounded-2xl p-4 shadow-sm transition ${
          hasAttemptedNext && isColegioEmpty
            ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/10'
            : 'border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500'
        }`}>
          <div className="flex items-center justify-between gap-1 mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              Institución Educativa (I.E.) <span className="text-rose-500">*</span>
            </label>
            {isColegioEmpty ? (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 text-rose-500" /> COMPLETAR
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Check className="w-3 h-3 text-emerald-600" /> LISTO
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="[COMPLETAR] Nombre o N° de la I.E. (Ej. I.E. N° 1150 Mariscal Castilla)"
            value={data.colegio}
            onChange={(e) => {
              onChange({ ...data, colegio: e.target.value });
              if (hasAttemptedNext && e.target.value.trim()) {
                setHasAttemptedNext(false);
              }
            }}
            className="w-full text-sm font-medium text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
          {hasAttemptedNext && isColegioEmpty ? (
            <p className="text-[11px] font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              Obligatorio: Por favor completa el nombre de la I.E.
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-2">Colegio o Red Educativa del MINEDU.</p>
          )}
        </div>

        {/* Director */}
        <div className={`bg-white border rounded-2xl p-4 shadow-sm transition ${
          hasAttemptedNext && isDirectorEmpty
            ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/10'
            : 'border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500'
        }`}>
          <div className="flex items-center justify-between gap-1 mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              Director(a) de la I.E. <span className="text-rose-500">*</span>
            </label>
            {isDirectorEmpty ? (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 text-rose-500" /> COMPLETAR
              </span>
            ) : (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Check className="w-3 h-3 text-emerald-600" /> LISTO
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="[COMPLETAR] Nombre del director(a) (Ej. Lic. Carmen Delgado Rosas)"
            value={data.director}
            onChange={(e) => {
              onChange({ ...data, director: e.target.value });
              if (hasAttemptedNext && e.target.value.trim()) {
                setHasAttemptedNext(false);
              }
            }}
            className="w-full text-sm font-medium text-slate-900 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
          />
          {hasAttemptedNext && isDirectorEmpty ? (
            <p className="text-[11px] font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              Obligatorio: Por favor completa el director(a).
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 mt-2">Aparece en el pie de página y visto bueno institucional.</p>
          )}
        </div>
      </div>

      {/* Save profile mini bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
        <span className="text-xs text-slate-600 font-medium">¿Deseas guardar estos datos para futuras sesiones?</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nombre del perfil (ej. Mi Aula 2026)"
            value={profileNameInput}
            onChange={(e) => setProfileNameInput(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleSaveProfile}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Guardar perfil
          </button>
        </div>
      </div>

      {/* Contexto de los Estudiantes y DUA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-pink-600" />
              Contexto de los Estudiantes y Diseño Universal para el Aprendizaje (DUA)
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Describe las características del grupo, estilos de aprendizaje, barreras o intereses para adaptar la sesión.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDuaOnly}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition"
              title="Guardar este texto DUA en localStorage"
            >
              <Save className="w-3 h-3" />
              Guardar DUA
            </button>
            <button
              type="button"
              onClick={handleLoadDuaOnly}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition"
              title="Cargar texto DUA guardado en localStorage"
            >
              <Download className="w-3 h-3" />
              Cargar DUA
            </button>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          rows={4}
          placeholder="[COMPLETAR] Ejemplo: El aula cuenta con 30 estudiantes con ritmos diversos. Se identifican 5 estudiantes que aprenden mejor con recursos visuales y manipulativos, 2 con timidez en participaciones orales y 4 estudiantes con nivel avanzado que requieren actividades de extensión..."
          value={data.contextoDua}
          onChange={(e) => onChange({ ...data, contextoDua: e.target.value })}
          className="w-full text-sm text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition leading-relaxed bg-slate-50/50"
        />

        {/* Quick DUA snippets */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Insertar apoyos DUA comunes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Andamiaje con organizadores visuales y pictogramas.',
              'Uso de material concreto estructurado en equipos.',
              'Flexibilidad en la expresión oral y escrita.',
              'Consignas segmentadas paso a paso.',
              'Trabajo cooperativo con roles rotativos.'
            ].map((snippet, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertDuaTag(snippet)}
                className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition"
              >
                + {snippet}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation button */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-500">
          {hasIncompleteFields ? (
            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Completa los campos obligatorios para desbloquear el siguiente paso.
            </span>
          ) : (
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-4 h-4" /> Todos los datos obligatorios de la institución están listos.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleNextClick}
          className={`px-6 py-2.5 text-white text-sm font-semibold rounded-xl shadow-md transition duration-150 flex items-center gap-2 ${
            hasIncompleteFields
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
          }`}
        >
          Siguiente: Curso y Tema →
        </button>
      </div>
    </div>
  );
};
