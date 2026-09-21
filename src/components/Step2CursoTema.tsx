import React, { useState } from 'react';
import { CursoTemaData } from '../types';
import { cnebData } from '../cnebData';
import { sugerirTitulos } from '../geminiService';
import { Sparkles, Layers, BookOpen, GraduationCap, Lightbulb, Loader2, AlertCircle, Check } from 'lucide-react';

interface Step2Props {
  data: CursoTemaData;
  onChange: (data: CursoTemaData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2CursoTema: React.FC<Step2Props> = ({ data, onChange, onNext, onBack }) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  // Obtener nivel actual
  const nivelActual = cnebData.niveles.find((n) => n.id === data.nivel) || cnebData.niveles[0];

  // Grados disponibles para el nivel
  const gradosDisponibles = nivelActual.grados;

  // Grado seleccionado actualmente
  const gradoSeleccionado = gradosDisponibles.find((g) => g.id === data.gradoId) || gradosDisponibles[0];

  // Áreas disponibles para el nivel
  const areasDisponibles = nivelActual.areas;

  // Área seleccionada
  const areaSeleccionada = areasDisponibles.find((a) => a.id === data.areaId) || areasDisponibles[0];

  // Manejar cambio de Nivel en cascada
  const handleNivelChange = (nuevoNivelId: 'Primaria' | 'Secundaria') => {
    const nuevoNivelObj = cnebData.niveles.find((n) => n.id === nuevoNivelId) || cnebData.niveles[0];
    const primerGrado = nuevoNivelObj.grados[0].id;
    const primeraArea = nuevoNivelObj.areas[0].id;

    onChange({
      ...data,
      nivel: nuevoNivelId,
      gradoId: primerGrado,
      areaId: primeraArea
    });
  };

  // Manejar cambio de Grado
  const handleGradoChange = (nuevoGradoId: string) => {
    onChange({
      ...data,
      gradoId: nuevoGradoId
    });
  };

  // Manejar cambio de Área
  const handleAreaChange = (nuevaAreaId: string) => {
    onChange({
      ...data,
      areaId: nuevaAreaId
    });
  };

  // Sugerir Títulos con IA
  const handleSugerirTitulos = async () => {
    if (!data.tema.trim()) {
      alert('Por favor escribe primero un Tema específico antes de sugerir títulos con IA.');
      return;
    }

    setLoadingAi(true);
    try {
      const res = await sugerirTitulos({
        area: areaSeleccionada.nombre,
        nivel: data.nivel,
        grado: gradoSeleccionado.nombre,
        tema: data.tema
      });

      onChange({
        ...data,
        tituloUnidad: res.tituloUnidad || data.tituloUnidad,
        tituloSesion: res.tituloSesion || data.tituloSesion
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  // Validación de tema obligatorio
  const isTemaEmpty = !data.tema.trim();

  const handleNextClick = () => {
    if (isTemaEmpty) {
      setHasAttemptedNext(true);
      return;
    }
    onNext();
  };

  // Sugerencias de temas rápidos para demostración instantánea
  const temasEjemplo: Record<string, string[]> = {
    matematica: [
      'Resolvemos problemas con números enteros y racionales en situaciones financieras',
      'Las ecuaciones lineales y funciones afines en el modelado del presupuesto familiar',
      'Calculamos áreas y volúmenes de prismas y pirámides en maquetas sostenibles',
      'Analizamos medidas de tendencia central y dispersión en encuestas locales'
    ],
    comunicacion: [
      'Debatimos sobre la importancia del uso responsable y ético de redes sociales',
      'Escribimos un ensayo argumentativo sobre la preservación de las lenguas originarias',
      'Leemos críticamente artículos de divulgación científica identificando tesis y argumentos',
      'Elaboramos un texto instructivo y afiche publicitario para el cuidado del agua'
    ],
    ciencia_tecnologia: [
      'Indagamos experimentalmente sobre cómo influye la luz y los nutrientes en el crecimiento vegetal',
      'Explicamos la estructura del átomo y las propiedades periódicas de los elementos',
      'Diseñamos y construimos un prototipo de filtro purificador de agua para zonas vulnerables',
      'Explicamos la relación entre el ADN, la síntesis de proteínas y la transmisión de caracteres'
    ],
    ciencias_sociales: [
      'Analizamos las fuentes históricas sobre el Tahuantinsuyo y el legado andino',
      'Explicamos las causas económicas y sociales de la Independencia del Perú',
      'Evaluamos el impacto del cambio climático en las cuencas hidrográficas de nuestra región',
      'Formulamos un presupuesto familiar y analizamos las funciones de la SUNAT e INDECOPI'
    ],
    dpcc: [
      'Reconocemos nuestras potencialidades y regulamos nuestras emociones ante la presión de grupo',
      'Deliberamos sobre la no discriminación y el respeto a la diversidad cultural en la escuela',
      'Analizamos dilemas morales cotidianos fundamentando nuestras decisiones en los derechos humanos',
      'Diseñamos acuerdos de convivencia democrática y mecanismos de mediación pacífica de conflictos'
    ],
    educacion_trabajo: [
      'Aplicamos la metodología Design Thinking para idear soluciones a necesidades de la comunidad',
      'Diseñamos el modelo de negocios Lean Canvas para un emprendimiento ecológico escolar',
      'Elaboramos el prototipo de un producto artesanal considerando costos y normas de bioseguridad',
      'Calculamos el punto de equilibrio y formulamos un plan de comercialización en redes sociales'
    ],
    educacion_fisica: [
      'Regulamos el esfuerzo motriz y monitoreamos la frecuencia cardíaca en pruebas aeróbicas',
      'Creamos secuencias rítmicas y danzas tradicionales coordinando desplazamientos espaciales',
      'Aplicamos estrategias tácticas de ataque y defensa en partidos de futsal y vóleibol',
      'Diseñamos un plan de acondicionamiento físico personal y hábitos de alimentación balanceada'
    ],
    arte_cultura: [
      'Apreciamos críticamente la iconografía y el simbolismo de la cerámica prehispánica peruana',
      'Creamos un mural colectivo con materiales reciclados sobre la identidad y la memoria histórica',
      'Experimentamos con técnicas de grabado y claroscuro para comunicar un mensaje socioambiental',
      'Elaboramos un guion teatral corto y diseñamos la puesta en escena con cotidiáfonos'
    ],
    ingles: [
      'Talking about daily routines and healthy habits using the simple present tense',
      'Writing an informal email to an international pen pal about Peruvian traditions',
      'Reading and discussing environmental challenges and eco-friendly solutions',
      'Expressing opinions and making predictions about the future of technology'
    ],
    educacion_religiosa: [
      'Acogemos el mensaje de las Bienaventuranzas como camino de solidaridad con el prójimo',
      'Reflexionamos sobre el cuidado de la casa común a la luz de la encíclica Laudato Si\'',
      'Fundamentamos la dignidad inalienable de toda persona humana creada a imagen de Dios',
      'Promovemos el diálogo interreligioso, la reconciliación y una cultura de paz'
    ],
    castellano_segunda_lengua: [
      'Nos comunicamos oralmente en situaciones escolares formales usando vocabulario ampliado',
      'Leemos y comprendemos textos expositivos identificando la idea central y vocabulario nuevo',
      'Redactamos cartas y descripciones estructuradas en párrafos con conectores de causa y efecto',
      'Revisamos la concordancia gramatical y normas ortográficas básicas en nuestras redacciones'
    ],
    personal_social: [
      'Identificamos nuestras emociones y proponemos acuerdos para el buen trato',
      'Deliberamos sobre la gestión adecuada de residuos en la comunidad'
    ]
  };

  const listaTemasSugeridos = temasEjemplo[data.areaId] || temasEjemplo.matematica;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 sm:p-5">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Paso 2: Curso, Tema y Unidad Curricular
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Configura los selectores en cascada e ingresa el tema específico de aprendizaje. El tema es estrictamente obligatorio.
        </p>
      </div>

      {/* Selectores en cascada */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Nivel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            1. Nivel Educativo
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Primaria', 'Secundaria'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleNivelChange(lvl)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                  data.nivel === lvl
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Determina el marco de estándares del CNEB.</p>
        </div>

        {/* Grado */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            2. Grado Escolar
          </label>
          <select
            value={data.gradoId}
            onChange={(e) => handleGradoChange(e.target.value)}
            className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {gradosDisponibles.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre} ({g.ciclo})
              </option>
            ))}
          </select>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {gradoSeleccionado.ciclo}
            </span>
            <span className="text-[11px] text-slate-400">Ciclo normativo del MINEDU</span>
          </div>
        </div>

        {/* Área Curricular */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            3. Área Curricular
          </label>
          <select
            value={data.areaId}
            onChange={(e) => handleAreaChange(e.target.value)}
            className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {areasDisponibles.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 mt-2">Carga automática de competencias oficiales.</p>
        </div>
      </div>

      {/* Tema Específico */}
      <div className={`bg-white border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 transition ${
        hasAttemptedNext && isTemaEmpty
          ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/10'
          : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between gap-1">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Tema Específico de la Sesión <span className="text-rose-500">*</span>
          </label>
          {isTemaEmpty ? (
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
          placeholder="[COMPLETAR] Tema específico (Ej. Resolvemos problemas de sustracción con canjes en el mercado)"
          value={data.tema}
          onChange={(e) => {
            onChange({ ...data, tema: e.target.value });
            if (hasAttemptedNext && e.target.value.trim()) {
              setHasAttemptedNext(false);
            }
          }}
          className="w-full text-sm text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
        />

        {hasAttemptedNext && isTemaEmpty && (
          <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            Obligatorio: Por favor completa el tema de la sesión para poder continuar.
          </p>
        )}

        {/* Chips de temas sugeridos rápidos */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            O selecciona un tema frecuente en {areaSeleccionada.nombre}:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {listaTemasSugeridos.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange({ ...data, tema: t });
                  setHasAttemptedNext(false);
                }}
                className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition text-left"
              >
                + {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Título de la Unidad y Título de la Sesión con Botón Sugerir con IA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Títulos de la Unidad y de la Sesión</h3>
            <p className="text-xs text-slate-500">
              Puedes redactarlos manualmente o generarlos de acuerdo al enfoque del CNEB con un clic.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSugerirTitulos}
            disabled={loadingAi}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition shadow-sm disabled:opacity-50"
          >
            {loadingAi ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generando sugerencia...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sugerir con IA</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título de la Unidad */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Título de la Unidad de Aprendizaje
            </label>
            <input
              type="text"
              placeholder="[COMPLETAR] Ej. Unidad 1: Promovemos el cuidado de la salud en nuestra comunidad"
              value={data.tituloUnidad}
              onChange={(e) => onChange({ ...data, tituloUnidad: e.target.value })}
              className="w-full text-xs sm:text-sm text-slate-900 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Título de la Sesión */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Título Pedagógico de la Sesión
            </label>
            <input
              type="text"
              placeholder="[COMPLETAR] Ej. Comparamos y agrupamos cantidades para organizar la feria escolar"
              value={data.tituloSesion}
              onChange={(e) => onChange({ ...data, tituloSesion: e.target.value })}
              className="w-full text-xs sm:text-sm text-slate-900 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
        >
          ← Volver a Institución
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-100 transition flex items-center gap-2"
        >
          Siguiente: Competencias CNEB →
        </button>
      </div>
    </div>
  );
};
