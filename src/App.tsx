import React, { useState, useEffect } from 'react';
import { PlanificaFormData } from './types';
import { cnebData, enfoquesTransversales, obtenerCurriculo, competenciasTransversales } from './cnebData';
import { Header } from './components/Header';
import { WizardSteps } from './components/WizardSteps';
import { Step1Institucion } from './components/Step1Institucion';
import { Step2CursoTema } from './components/Step2CursoTema';
import { Step3Competencias } from './components/Step3Competencias';
import { Step4EnfoquesRecursos } from './components/Step4EnfoquesRecursos';
import { Step5EvaluacionGenerar } from './components/Step5EvaluacionGenerar';
import { SesionPreviewModal } from './components/SesionPreviewModal';
import { YoremiaLogo } from './components/YoremiaLogo';
import { llamarGeminiGenerador, SesionGeneradaResponse } from './geminiService';
import { ensamblarYDescargarDocx, SesionDocxData } from './docxEngine';
import { saveAs } from 'file-saver';
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

const INITIAL_FORM_DATA: PlanificaFormData = {
  institucion: {
    docente: '',
    colegio: '',
    director: '',
    contextoDua: ''
  },
  curso: {
    nivel: 'Primaria',
    gradoId: '3',
    areaId: 'matematica',
    tema: '',
    tituloUnidad: '',
    tituloSesion: ''
  },
  competencias: {
    competenciaIds: ['resuelve_cantidad'],
    competenciasTransversalesIds: [],
    sugeridaPorIA: false
  },
  enfoques: {
    enfoquesIds: ['derechos', 'orientacion_bien_comun'],
    referencias: '- Ministerio de Educación del Perú (MINEDU). (2016). Currículo Nacional de la Educación Básica (CNEB).\n- MINEDU. (2020). Cuaderno de Trabajo de Matemática 3° Grado de Primaria.\n- Guía Docente para el Desarrollo de Competencias Matemáticas.',
    recursos: '- Ficha de aplicación estructurada con situaciones contextualizadas.\n- Papelotes cuadriculados y plumones acrílicos para trabajo grupal.\n- Billetes y monedas de juguete del kit escolar MINEDU.',
    materiales: '- Material multibase (Base Diez), regletas de Cuisenaire y ábacos.\n- Hojas bond, reglas, colores y tijeras.'
  },
  evaluacion: {
    duracionMinutos: 90,
    instrumento: 'Lista de cotejo',
    listaAlumnosRaw: '',
    adaptacionesNee: true
  }
};

export function App() {
  const [formData, setFormData] = useState<PlanificaFormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  // Estados de generación y descarga
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [generatedSesion, setGeneratedSesion] = useState<SesionGeneradaResponse | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [customTemplateBuffer, setCustomTemplateBuffer] = useState<ArrayBuffer | null>(null);
  const [toastNotification, setToastNotification] = useState<{ title: string; desc: string; type: 'success' | 'error' } | null>(null);

  // Verificar estado del servidor y API Key
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasApiKey) {
          setHasApiKey(true);
        }
      })
      .catch(() => {
        setHasApiKey(false);
      });
  }, []);

  const showNotification = (title: string, desc: string, type: 'success' | 'error' = 'success') => {
    setToastNotification({ title, desc, type });
    setTimeout(() => setToastNotification(null), 5000);
  };

  const handleNextStep = (next: number) => {
    // Validar paso 1 si se intenta ir más allá
    if (next > 1 && (!formData.institucion.docente.trim() || !formData.institucion.colegio.trim() || !formData.institucion.director.trim())) {
      showNotification('Paso 1 incompleto', 'Debes completar Nombre del Docente, I.E. y Director(a) para avanzar.', 'error');
      setCurrentStep(1);
      return;
    }
    // Validar paso 2
    if (next > 2 && !formData.curso.tema.trim()) {
      showNotification('Paso 2 incompleto', 'Debes ingresar el Tema específico de la sesión para avanzar.', 'error');
      setCurrentStep(2);
      return;
    }
    // Validar paso 3
    if (next > 3 && formData.competencias.competenciaIds.length === 0) {
      showNotification('Paso 3 incompleto', 'Debes seleccionar al menos una Competencia del CNEB.', 'error');
      setCurrentStep(3);
      return;
    }
    // Validar paso 4
    if (next > 4 && formData.enfoques.enfoquesIds.length === 0) {
      showNotification('Paso 4 incompleto', 'Debes seleccionar al menos un Enfoque Transversal.', 'error');
      setCurrentStep(4);
      return;
    }

    setCurrentStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepSelect = (step: number) => {
    // Si el usuario da clic arriba en los pasos, validar dependencias previas
    if (step > 1 && (!formData.institucion.docente.trim() || !formData.institucion.colegio.trim() || !formData.institucion.director.trim())) {
      showNotification('Paso 1 obligatorio', 'Por favor completa Nombre del Docente, I.E. y Director(a) antes de continuar.', 'error');
      setCurrentStep(1);
      return;
    }
    if (step > 2 && !formData.curso.tema.trim()) {
      showNotification('Paso 2 obligatorio', 'Por favor completa el Tema de la sesión antes de continuar.', 'error');
      setCurrentStep(2);
      return;
    }
    if (step > 3 && formData.competencias.competenciaIds.length === 0) {
      showNotification('Paso 3 obligatorio', 'Por favor selecciona al menos una Competencia antes de continuar.', 'error');
      setCurrentStep(3);
      return;
    }
    if (step > 4 && formData.enfoques.enfoquesIds.length === 0) {
      showNotification('Paso 4 obligatorio', 'Por favor selecciona al menos un Enfoque Transversal antes de continuar.', 'error');
      setCurrentStep(4);
      return;
    }

    if (step <= Math.max(maxStepReached, currentStep)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas reiniciar todos los campos a sus valores predeterminados?')) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setMaxStepReached(1);
      setGeneratedSesion(null);
    }
  };

  // Descargar plantilla oficial maestra .docx
  const handleDownloadMasterTemplate = async () => {
    try {
      const response = await fetch('/modelo-minedu-sesion.docx');
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      saveAs(blob, 'modelo-minedu-sesion-plantilla.docx');
      showNotification('Plantilla descargada', 'Se descargó el archivo modelo-minedu-sesion-plantilla.docx');
    } catch {
      showNotification('Error', 'No se pudo descargar la plantilla maestra.', 'error');
    }
  };

  // Subir plantilla .docx personalizada
  const handleUploadCustomTemplate = (buffer: ArrayBuffer | null, filename?: string) => {
    setCustomTemplateBuffer(buffer);
    if (buffer && filename) {
      showNotification('Plantilla cargada', `Se usará la plantilla personalizada: ${filename}`);
    }
  };

  // Validar requisitos previos
  const validarCamposPrevios = (): boolean => {
    if (!formData.institucion.docente.trim() || !formData.institucion.colegio.trim() || !formData.institucion.director.trim()) {
      alert('⚠️ Faltan datos institucionales obligatorios en el Paso 1: Nombre del Docente, I.E. y Director(a).');
      setCurrentStep(1);
      return false;
    }
    if (!formData.curso.tema.trim()) {
      alert('⚠️ Por favor ingresa el Tema específico en el Paso 2 antes de generar la sesión.');
      setCurrentStep(2);
      return false;
    }
    if (formData.competencias.competenciaIds.length === 0) {
      alert('⚠️ Por favor selecciona al menos una Competencia en el Paso 3 antes de generar la sesión.');
      setCurrentStep(3);
      return false;
    }
    if (formData.enfoques.enfoquesIds.length === 0) {
      alert('⚠️ Por favor selecciona al menos un Enfoque Transversal en el Paso 4 antes de generar la sesión.');
      setCurrentStep(4);
      return false;
    }
    return true;
  };

  // Construir payload oficial para Gemini / CNEB
  const construirPayloadGenerador = () => {
    const nivelObj = cnebData.niveles.find((n) => n.id === formData.curso.nivel) || cnebData.niveles[0];
    const gradoObj = nivelObj.grados.find((g) => g.id === formData.curso.gradoId) || nivelObj.grados[0];
    const areaObj = nivelObj.areas.find((a) => a.id === formData.curso.areaId) || nivelObj.areas[0];

    const competenciasDetalladas = formData.competencias.competenciaIds.map((cId) => {
      const c = areaObj.competencias.find((comp) => comp.id === cId);
      if (!c) return { nombre: cId, capacidades: [], estandar: '', desempenos: [] };
      return {
        nombre: c.nombre,
        capacidades: c.capacidades,
        estandar: c.estandares[gradoObj.ciclo] || Object.values(c.estandares)[0],
        desempenos: c.desempenos[formData.curso.gradoId] || c.desempenos['1'] || []
      };
    });

    const competenciasTransversalesDetalladas = (formData.competencias.competenciasTransversalesIds || [])
      .map((tId) => {
        const trans = competenciasTransversales.find((c) => c.id === tId);
        if (!trans) return null;
        return {
          nombre: trans.nombre,
          capacidades: trans.capacidades,
          estandar: trans.estandares[gradoObj.ciclo] || Object.values(trans.estandares)[0],
          desempenos: trans.desempenos[formData.curso.gradoId] || trans.desempenos['1'] || []
        };
      })
      .filter(Boolean);

    const enfoquesDetallados = formData.enfoques.enfoquesIds.map((eId) => {
      const enf = enfoquesTransversales.find((e) => e.id === eId);
      return {
        nombre: enf?.nombre || eId,
        valores: enf?.valores || '',
        actitud: enf?.actitud || ''
      };
    });

    const listaAlumnos = formData.evaluacion.listaAlumnosRaw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((nombre, idx) => ({ numero: idx + 1, nombre }));

    return {
      docente: formData.institucion.docente,
      director: formData.institucion.director,
      colegio: formData.institucion.colegio,
      nivel: formData.curso.nivel,
      grado: `${formData.curso.gradoId}° de ${formData.curso.nivel}`,
      area: areaObj.nombre,
      tema: formData.curso.tema,
      tituloUnidad: formData.curso.tituloUnidad,
      tituloSesion: formData.curso.tituloSesion || formData.curso.tema,
      duracion: formData.evaluacion.duracionMinutos,
      instrumento: formData.evaluacion.instrumento,
      contextoDua: formData.institucion.contextoDua,
      adaptacionesNee: formData.evaluacion.adaptacionesNee,
      competencias: competenciasDetalladas,
      competenciasTransversales: competenciasTransversalesDetalladas,
      enfoques: enfoquesDetallados,
      referencias: formData.enfoques.referencias,
      recursos: formData.enfoques.recursos,
      materiales: formData.enfoques.materiales,
      alumnos: listaAlumnos
    };
  };

  // Construir datos mapeados para el motor Docx (Mustache)
  const construirDocxData = (sesion: SesionGeneradaResponse): SesionDocxData => {
    const nivelObj = cnebData.niveles.find((n) => n.id === formData.curso.nivel) || cnebData.niveles[0];
    const gradoObj = nivelObj.grados.find((g) => g.id === formData.curso.gradoId) || nivelObj.grados[0];
    const areaObj = nivelObj.areas.find((a) => a.id === formData.curso.areaId) || nivelObj.areas[0];

    const comp1 = areaObj.competencias.find((c) => c.id === formData.competencias.competenciaIds[0]);
    const comp2 = areaObj.competencias.find((c) => c.id === formData.competencias.competenciaIds[1]);

    let competenciaTexto = comp1 ? comp1.nombre : areaObj.nombre;
    let capacidadesTexto = comp1 ? comp1.capacidades.join('\n- ') : '';
    let estandaresTexto = comp1 ? (comp1.estandares[gradoObj.ciclo] || '') : '';
    let desempenosTexto = comp1 ? (comp1.desempenos[formData.curso.gradoId] || []).join('\n- ') : '';

    if (comp2) {
      competenciaTexto += `\n\n${comp2.nombre}`;
      capacidadesTexto += `\n\n${comp2.capacidades.join('\n- ')}`;
    }

    const enf1 = enfoquesTransversales.find((e) => e.id === formData.enfoques.enfoquesIds[0]) || enfoquesTransversales[0];
    const enf2 = enfoquesTransversales.find((e) => e.id === formData.enfoques.enfoquesIds[1]) || enfoquesTransversales[5];

    const rawAlumnos = formData.evaluacion.listaAlumnosRaw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((nombre, i) => ({ numero: i + 1, nombre }));

    // Si la lista de alumnos está vacía, generamos 15 filas en blanco para que la tabla en Word se imprima lista para rellenar a mano
    const alumnos = rawAlumnos.length > 0
      ? rawAlumnos
      : Array.from({ length: 15 }, (_, i) => ({ numero: i + 1, nombre: '________________________________' }));

    return {
      titulo_sesion_documento: formData.curso.tituloSesion || formData.curso.tema,
      docente: formData.institucion.docente,
      director: formData.institucion.director,
      colegio: formData.institucion.colegio,
      nivel: formData.curso.nivel,
      grado: `${formData.curso.gradoId}° de ${formData.curso.nivel}`,
      area: areaObj.nombre,
      tema: formData.curso.tema,
      fecha: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      duracion_minutos: formData.evaluacion.duracionMinutos,
      titulo_unidad: formData.curso.tituloUnidad || 'Unidad de Aprendizaje',
      competencia_1: comp1 ? comp1.nombre : areaObj.nombre,
      capacidades_1: comp1 ? comp1.capacidades.map((c) => `• ${c}`).join('\n') : '',
      desempenos: desempenosTexto ? `- ${desempenosTexto}` : '',
      criterios: sesion.criterios,
      hay_competencia_2: Boolean(comp2),
      competencia_2: comp2 ? comp2.nombre : '',
      capacidades_2: comp2 ? comp2.capacidades.map((c) => `• ${c}`).join('\n') : '',
      estandares: estandaresTexto,
      proposito: sesion.proposito,
      reto: (sesion as any).reto || `¿De qué manera podemos aplicar ${formData.curso.tema} para resolver situaciones problemáticas en nuestra vida diaria?`,
      situacion_significativa: (sesion as any).situacion_significativa || `En la I.E. ${formData.institucion.colegio || 'local'}, los estudiantes de ${formData.curso.gradoId}° fortalecen sus competencias en ${areaObj.nombre} investigando y aplicando ${formData.curso.tema}.`,
      evidencia_1: sesion.evidencia_1,
      producto: (sesion as any).producto || sesion.evidencia_1,
      necesidades_aprendizaje: (sesion as any).necesidades_aprendizaje || 'Consolidar destrezas prácticas, trabajo colaborativo y razonamiento crítico.',
      instrumento_nombre: formData.evaluacion.instrumento,
      enfoque_transversal_1: enf1?.nombre || 'Enfoque de Derechos',
      enfoque_transversal_valor_1: enf1?.valores || 'Conciencia de derechos',
      enfoque_transversal_actitud_1: 'Disposición a conocer, reconocer y valorar los derechos individuales y colectivos.',
      enfoque_transversal_2: enf2?.nombre || 'Enfoque Orientación al bien común',
      enfoque_transversal_valor_2: enf2?.valores || 'Solidaridad y empatía',
      enfoque_transversal_actitud_2: 'Disposición a apoyar incondicionalmente a las personas en situaciones comprometidas.',
      consideraciones_diversidad: (sesion as any).consideraciones_diversidad || 'Atención personalizada, múltiples formas de representación y expresión, y evaluación formativa continua.',
      dua: sesion.dua || formData.institucion.contextoDua,
      inicio: sesion.inicio,
      desarrollo: sesion.desarrollo,
      cierre: sesion.cierre,
      hay_adaptaciones: formData.evaluacion.adaptacionesNee,
      hay_adaptaciones_1: formData.evaluacion.adaptacionesNee,
      adaptaciones_1: 'Estudiante(s) con necesidad de apoyo específico',
      adaptaciones_actividad_1: 'Uso de material concreto, consignas fragmentadas paso a paso y refuerzo visual con mayor tiempo para la resolución.',
      referencias: formData.enfoques.referencias || 'Currículo Nacional de la Educación Básica (MINEDU) - Texto escolar MINEDU.',
      recursos: formData.enfoques.recursos || 'Fichas de trabajo, papelotes, plumones, proyector/pantalla digital.',
      materiales: formData.enfoques.materiales || 'Material concreto estructurado, útiles de escritorio, fichas impresas.',
      teoria: sesion.teoria,
      instrumento_contenido: (sesion as any).instrumento_contenido,
      ficha: (sesion as any).ficha,
      alumnos: alumnos
    };
  };

  // Función: Generar sesión con IA y abrir vista previa
  const handleGenerarSesion = async () => {
    if (!validarCamposPrevios()) return;
    setIsGenerating(true);

    try {
      const payload = construirPayloadGenerador();
      const resultado = await llamarGeminiGenerador(payload);
      setGeneratedSesion(resultado);
      setShowPreviewModal(true);

      showNotification(
        '¡Sesión generada con éxito!',
        'Revisa los momentos pedagógicos y criterios antes de descargar el archivo Word.'
      );
    } catch (err: any) {
      console.error(err);
      showNotification('Error al generar', err?.message || 'Ocurrió un inconveniente al generar la sesión.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Función: Ensamblar y Descargar archivo Word (.docx) directamente desde modal o pantalla
  const handleDownloadDocx = async () => {
    if (!generatedSesion) return;

    setIsDownloading(true);
    try {
      const docxData = construirDocxData(generatedSesion);
      const res = await ensamblarYDescargarDocx(docxData, customTemplateBuffer || undefined);
      if (res.success) {
        showNotification('¡Descarga completada!', `Se generó el documento: ${res.fileName}`);
      } else {
        throw new Error(res.error);
      }
    } catch (e: any) {
      console.error('Error al compilar Word:', e);
      showNotification('Error en Word', e?.message || 'No se pudo compilar el archivo Word.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  // Función: Generar y Descargar Word directamente en un solo clic desde el Paso 5
  const handleGenerarYDescargarDocx = async () => {
    if (!validarCamposPrevios()) return;
    setIsDownloading(true);
    try {
      let sesion = generatedSesion;
      if (!sesion) {
        setIsGenerating(true);
        const payload = construirPayloadGenerador();
        sesion = await llamarGeminiGenerador(payload);
        setGeneratedSesion(sesion);
        setIsGenerating(false);
      }

      const docxData = construirDocxData(sesion);
      const res = await ensamblarYDescargarDocx(docxData, customTemplateBuffer || undefined);
      if (res.success) {
        showNotification(
          '¡Documento Word (.docx) descargado!',
          `Se generó y guardó exitosamente: ${res.fileName}`
        );
      } else {
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.error('Error generando o descargando Word:', err);
      showNotification('Error al descargar', err?.message || 'No se pudo generar o descargar el archivo Word.', 'error');
    } finally {
      setIsGenerating(false);
      setIsDownloading(false);
    }
  };

  const nivelObj = cnebData.niveles.find((n) => n.id === formData.curso.nivel) || cnebData.niveles[0];
  const gradoObj = nivelObj.grados.find((g) => g.id === formData.curso.gradoId) || nivelObj.grados[0];
  const areaObj = nivelObj.areas.find((a) => a.id === formData.curso.areaId) || nivelObj.areas[0];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Header */}
      <Header
        hasApiKey={hasApiKey}
        onDownloadTemplate={handleDownloadMasterTemplate}
        onReset={handleReset}
      />

      {/* Floating Notification Toast */}
      {toastNotification && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in max-w-sm">
          <div
            className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 ${
              toastNotification.type === 'success'
                ? 'bg-slate-900 text-white border-slate-700'
                : 'bg-red-900 text-white border-red-700'
            }`}
          >
            {toastNotification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs font-bold">{toastNotification.title}</p>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toastNotification.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Breadcrumb / Step Indicator */}
        <WizardSteps
          currentStep={currentStep}
          onSelectStep={handleStepSelect}
          maxStepReached={maxStepReached}
        />

        {/* Dynamic Wizard Steps */}
        <div className="mt-4">
          {currentStep === 1 && (
            <Step1Institucion
              data={formData.institucion}
              onChange={(institucion) => setFormData({ ...formData, institucion })}
              onNext={() => handleNextStep(2)}
            />
          )}

          {currentStep === 2 && (
            <Step2CursoTema
              data={formData.curso}
              onChange={(curso) => setFormData({ ...formData, curso })}
              onNext={() => handleNextStep(3)}
              onBack={() => handleNextStep(1)}
            />
          )}

          {currentStep === 3 && (
            <Step3Competencias
              data={formData.competencias}
              onChange={(competencias) => setFormData({ ...formData, competencias })}
              nivel={formData.curso.nivel}
              gradoId={formData.curso.gradoId}
              areaId={formData.curso.areaId}
              tema={formData.curso.tema}
              onNext={() => handleNextStep(4)}
              onBack={() => handleNextStep(2)}
            />
          )}

          {currentStep === 4 && (
            <Step4EnfoquesRecursos
              data={formData.enfoques}
              onChange={(enfoques) => setFormData({ ...formData, enfoques })}
              areaNombre={areaObj.nombre}
              nivel={formData.curso.nivel}
              gradoNombre={gradoObj.nombre}
              tema={formData.curso.tema}
              onNext={() => handleNextStep(5)}
              onBack={() => handleNextStep(3)}
            />
          )}

          {currentStep === 5 && (
            <Step5EvaluacionGenerar
              data={formData.evaluacion}
              onChange={(evaluacion) => setFormData({ ...formData, evaluacion })}
              onGenerar={handleGenerarSesion}
              onGenerarYDescargar={handleGenerarYDescargarDocx}
              isGenerating={isGenerating}
              isDownloading={isDownloading}
              hasGeneratedSesion={Boolean(generatedSesion)}
              onVerVistaPrevia={() => setShowPreviewModal(true)}
              onBack={() => handleNextStep(4)}
              customTemplateBuffer={customTemplateBuffer}
              onUploadCustomTemplate={handleUploadCustomTemplate}
              onDownloadMasterTemplate={handleDownloadMasterTemplate}
            />
          )}
        </div>
      </main>

      {/* Modal de Previsualización y Descarga de Sesión */}
      <SesionPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        sesion={generatedSesion}
        formData={formData}
        onDownloadDocx={handleDownloadDocx}
        isDownloading={isDownloading}
        onRegenerate={handleGenerarSesion}
      />

      {/* Footer */}
      <footer className="mt-14 py-8 border-t border-slate-200 text-center text-xs text-slate-500 bg-white/80 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
          <YoremiaLogo variant="full" size="md" showAuthor={true} />
          <p className="text-[11px] text-slate-400 font-medium pt-1">
            Plataforma pedagógica alineada al Currículo Nacional de la Educación Básica (CNEB - MINEDU)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
