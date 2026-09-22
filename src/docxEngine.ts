import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

export interface SesionDocxData {
  titulo_sesion_documento?: string;
  docente: string;
  director: string;
  colegio: string;
  nivel: string;
  grado: string;
  area: string;
  tema: string;
  fecha?: string;
  duracion_minutos: number | string;
  titulo_unidad?: string;
  competencia_1: string;
  capacidades_1: string;
  estandares: string;
  desempenos: string;
  criterios: string;
  hay_competencia_2?: boolean;
  competencia_2?: string;
  capacidades_2?: string;
  proposito: string;
  reto?: string;
  situacion_significativa?: string;
  evidencia_1: string;
  producto?: string;
  necesidades_aprendizaje?: string;
  instrumento_nombre: string;
  enfoque_transversal_1: string;
  enfoque_transversal_valor_1?: string;
  enfoque_transversal_actitud_1?: string;
  enfoque_transversal_2?: string;
  enfoque_transversal_valor_2?: string;
  enfoque_transversal_actitud_2?: string;
  consideraciones_diversidad?: string;
  dua: string;
  trabajo_entre_pares?: string;
  inicio: string;
  desarrollo: string;
  cierre: string;
  hay_adaptaciones?: boolean;
  hay_adaptaciones_1?: boolean;
  adaptaciones_1?: string;
  adaptaciones_actividad_1?: string;
  hay_adaptaciones_2?: boolean;
  adaptaciones_2?: string;
  adaptaciones_actividad_2?: string;
  hay_adaptaciones_3?: boolean;
  adaptaciones_3?: string;
  adaptaciones_actividad_3?: string;
  referencias?: string;
  recursos?: string;
  materiales?: string;
  teoria: string;
  instrumento_contenido?: string;
  ficha?: string;
  transversal_1_nombre?: string;
  transversal_1_capacidades?: string;
  transversal_1_estandar?: string;
  transversal_1_desempeno?: string;
  transversal_1_evidencia?: string;
  transversal_2_nombre?: string;
  transversal_2_capacidades?: string;
  transversal_2_estandar?: string;
  transversal_2_desempeno?: string;
  transversal_2_evidencia?: string;
  alumnos?: Array<{ numero: number; nombre: string }>;
}

function limpiarTextoPedagogico(texto?: string): string {
  if (!texto) return '';
  return texto
    .replace(/\*\*(.*?)\*\*/g, '$1') // remover markdown bold **texto**
    .replace(/^#+\s*/gm, '') // remover markdown headers ###
    .replace(/_{4,}/g, '____________________') // normalizar líneas de subrayado
    .trim();
}

/**
 * Motor de ensamblado Word (.docx) en el navegador usando Docxtemplater y PizZip.
 * Carga 'modelo-minedu-sesion.docx' o un template provisto por el usuario,
 * inyecta las etiquetas exactas de Mustache y genera la descarga directa.
 */
export async function ensamblarYDescargarDocx(
  data: SesionDocxData,
  customTemplateBuffer?: ArrayBuffer
): Promise<{ success: boolean; blob?: Blob; fileName?: string; error?: string }> {
  try {
    let templateArrayBuffer: ArrayBuffer;

    if (customTemplateBuffer) {
      templateArrayBuffer = customTemplateBuffer;
    } else {
      const response = await fetch('/modelo-minedu-sesion.docx');
      if (!response.ok) {
        throw new Error(`No se pudo cargar la plantilla base (HTTP ${response.status})`);
      }
      templateArrayBuffer = await response.arrayBuffer();
    }

    // Inicializar PizZip
    const zip = new PizZip(templateArrayBuffer);

    // Normalización automática de parámetros entre paréntesis (parametro) o corchetes [parametro]
    try {
      const docXmlFile = zip.file('word/document.xml');
      if (docXmlFile) {
        let xmlStr = docXmlFile.asText();
        const paramKeys = [
          'titulo_sesion_documento', 'docente', 'profesor', 'director', 'directora', 'colegio', 'ie', 'institucion',
          'nivel', 'grado', 'area', 'tema', 'fecha', 'duracion_minutos', 'duracion', 'tiempo', 'titulo_unidad',
          'competencia_1', 'competencia', 'competencias', 'capacidades_1', 'capacidades',
          'estandares', 'estandar', 'desempenos', 'desempeno', 'proposito', 'criterios',
          'hay_competencia_2', 'competencia_2', 'capacidades_2',
          'reto', 'situacion_significativa', 'evidencia_1', 'evidencia', 'producto', 'necesidades_aprendizaje',
          'instrumento_nombre', 'instrumento',
          'enfoque_transversal_1', 'enfoque_transversal_valor_1', 'enfoque_transversal_actitud_1',
          'enfoque_transversal_2', 'enfoque_transversal_valor_2', 'enfoque_transversal_actitud_2',
          'consideraciones_diversidad', 'dua', 'trabajo_entre_pares', 'inicio', 'desarrollo', 'cierre',
          'hay_adaptaciones', 'hay_adaptaciones_1', 'adaptaciones_1', 'adaptaciones_actividad_1',
          'hay_adaptaciones_2', 'adaptaciones_2', 'adaptaciones_actividad_2',
          'hay_adaptaciones_3', 'adaptaciones_3', 'adaptaciones_actividad_3',
          'referencias', 'recursos', 'materiales', 'teoria', 'instrumento_contenido', 'ficha', 'alumnos',
          'transversal_1_nombre', 'transversal_1_capacidades', 'transversal_1_estandar', 'transversal_1_desempeno', 'transversal_1_evidencia',
          'transversal_2_nombre', 'transversal_2_capacidades', 'transversal_2_estandar', 'transversal_2_desempeno', 'transversal_2_evidencia'
        ];

        for (const key of paramKeys) {
          // Reemplazar (key) y [key] por {{key}} en el XML
          const reParen = new RegExp(`\\(${key}\\)`, 'gi');
          const reBracket = new RegExp(`\\[${key}\\]`, 'gi');
          xmlStr = xmlStr.replace(reParen, `{{${key}}}`).replace(reBracket, `{{${key}}}`);
        }
        zip.file('word/document.xml', xmlStr);
      }
    } catch (normError) {
      console.warn('Advertencia al normalizar etiquetas entre paréntesis:', normError);
    }

    const doc = new Docxtemplater(zip, {
      delimiters: { start: '{{', end: '}}' },
      paragraphLoop: true,
      linebreaks: true
    });

    // Formatear datos para Mustache con alias cruzados para admitir cualquier variante
    const formattedData: Record<string, any> = {
      titulo_sesion_documento: data.titulo_sesion_documento || data.tema || 'Sesión de Aprendizaje',
      docente: data.docente || 'Docente de Aula',
      profesor: data.docente || 'Docente de Aula',
      director: data.director || 'Director General',
      directora: data.director || 'Director General',
      colegio: data.colegio || 'I.E. República del Perú',
      ie: data.colegio || 'I.E. República del Perú',
      institucion: data.colegio || 'I.E. República del Perú',
      nivel: data.nivel || 'Primaria',
      grado: data.grado || '3° de Primaria',
      area: data.area || 'Matemática',
      tema: data.tema || 'Sesión de Aprendizaje',
      fecha: data.fecha || new Date().toLocaleDateString('es-PE'),
      duracion_minutos: data.duracion_minutos || 90,
      duracion: data.duracion_minutos || 90,
      tiempo: data.duracion_minutos || 90,
      titulo_unidad: data.titulo_unidad || 'Unidad de Aprendizaje',
      competencia_1: data.competencia_1 || '',
      competencia: data.competencia_1 || '',
      competencias: data.competencia_1 || '',
      capacidades_1: data.capacidades_1 || '',
      capacidades: data.capacidades_1 || '',
      hay_competencia_2: Boolean(data.hay_competencia_2 && data.competencia_2),
      competencia_2: data.competencia_2 || '',
      capacidades_2: data.capacidades_2 || '',
      estandares: data.estandares || '',
      estandar: data.estandares || '',
      desempenos: data.desempenos || '',
      desempeno: data.desempenos || '',
      proposito: data.proposito || '',
      criterios: data.criterios || '',
      reto: data.reto || `¿Cómo aplicamos ${data.tema || 'este aprendizaje'} en nuestra vida cotidiana?`,
      situacion_significativa: data.situacion_significativa || `Los estudiantes de la I.E. ${data.colegio || 'local'} necesitan fortalecer sus aprendizajes en ${data.area || 'el área'} para resolver retos reales.`,
      evidencia_1: data.evidencia_1 || '',
      evidencia: data.evidencia_1 || '',
      producto: data.producto || data.evidencia_1 || 'Ficha de trabajo y resolución de problemas',
      necesidades_aprendizaje: data.necesidades_aprendizaje || 'Consolidar destrezas prácticas, trabajo colaborativo y pensamiento crítico.',
      instrumento_nombre: data.instrumento_nombre || 'Lista de cotejo',
      instrumento: data.instrumento_nombre || 'Lista de cotejo',
      enfoque_transversal_1: data.enfoque_transversal_1 || 'Enfoque de Derechos',
      enfoque_transversal_valor_1: data.enfoque_transversal_valor_1 || 'Conciencia de derechos',
      enfoque_transversal_actitud_1: data.enfoque_transversal_actitud_1 || 'Disposición a conocer, reconocer y valorar los derechos individuales y colectivos.',
      enfoque_transversal_2: data.enfoque_transversal_2 || 'Enfoque Orientación al bien común',
      enfoque_transversal_valor_2: data.enfoque_transversal_valor_2 || 'Solidaridad y empatía',
      enfoque_transversal_actitud_2: data.enfoque_transversal_actitud_2 || 'Disposición a apoyar incondicionalmente a las personas en situaciones comprometidas o difíciles.',
      consideraciones_diversidad: data.consideraciones_diversidad || 'Atención personalizada, múltiples formas de representación y expresión, y evaluación formativa continua.',
      dua: data.dua || 'Se aplican estrategias del DUA: representación visual y andamiaje gradual.',
      trabajo_entre_pares: data.trabajo_entre_pares || `El trabajo entre pares se evidencia cuando los estudiantes interactúan en equipos o parejas de manera colaborativa para movilizar capacidades y resolver el reto de la sesión (${data.tema || 'el aprendizaje propuesto'}), confrontando procedimientos y brindándose retroalimentación mutua.`,
      inicio: data.inicio || '',
      desarrollo: data.desarrollo || '',
      cierre: data.cierre || '',
      hay_adaptaciones: Boolean(data.hay_adaptaciones),
      hay_adaptaciones_1: Boolean(data.hay_adaptaciones && data.adaptaciones_1),
      adaptaciones_1: data.adaptaciones_1 || 'Estudiante con necesidad de apoyo específico',
      adaptaciones_actividad_1: data.adaptaciones_actividad_1 || 'Uso de material concreto, consignas fragmentadas paso a paso y refuerzo visual con mayor tiempo para la resolución.',
      hay_adaptaciones_2: Boolean(data.hay_adaptaciones_2),
      adaptaciones_2: data.adaptaciones_2 || '',
      adaptaciones_actividad_2: data.adaptaciones_actividad_2 || '',
      hay_adaptaciones_3: Boolean(data.hay_adaptaciones_3),
      adaptaciones_3: data.adaptaciones_3 || '',
      adaptaciones_actividad_3: data.adaptaciones_actividad_3 || '',
      referencias: data.referencias || 'Currículo Nacional de la Educación Básica (MINEDU) - Texto escolar MINEDU.',
      recursos: data.recursos || 'Fichas de trabajo, papelotes, plumones, proyector/pantalla digital.',
      materiales: data.materiales || 'Material concreto estructurado, útiles de escritorio, fichas impresas.',
      teoria: limpiarTextoPedagogico(data.teoria) || '',
      sistema_yoremia: 'YOREMIA • Inteligencia educativa para docentes',
      autor_yoremia: 'Por Yovana María Remuzgo Velazco',
      instrumento_contenido: limpiarTextoPedagogico(data.instrumento_contenido) || `LISTA DE COTEJO:\n- Criterio 1: Comprende el propósito y conceptos centrales.\n- Criterio 2: Aplica estrategias para resolver las actividades propuestas.\n- Criterio 3: Comunica sus conclusiones y reflexiona sobre su aprendizaje.`,
      ficha: limpiarTextoPedagogico(data.ficha) || `FICHA DE APLICACIÓN PRÁCTICA:\n1. Lee con atención la situación problemática y subraya los datos clave.\n2. Aplica los procedimientos aprendidos en clase para encontrar la respuesta.\n3. Explica con tus propias palabras el procedimiento que utilizaste.`,
      transversal_1_nombre: data.transversal_1_nombre || 'Se desenvuelve en entornos virtuales generados por las TIC',
      transversal_1_capacidades: data.transversal_1_capacidades || '• Personaliza entornos virtuales.\n• Gestiona información del entorno virtual.\n• Interactúa en entornos virtuales.\n• Crea objetos virtuales en diversos formatos.',
      transversal_1_estandar: data.transversal_1_estandar || 'Se desenvuelve en los entornos virtuales cuando integra distintas actividades, actitudes y conocimientos de diversos contextos socioculturales en su entorno virtual personal.',
      transversal_1_desempeno: data.transversal_1_desempeno || 'Navega en diversos entornos virtuales recomendados adaptando funcionalidades básicas de acuerdo con sus necesidades de aprendizaje.',
      transversal_1_evidencia: data.transversal_1_evidencia || 'Organiza sus carpetas y materiales digitales utilizando herramientas virtuales de manera ética y segura.',
      transversal_2_nombre: data.transversal_2_nombre || 'Gestiona su aprendizaje de manera autónoma',
      transversal_2_capacidades: data.transversal_2_capacidades || '• Define metas de aprendizaje.\n• Organiza acciones estratégicas para alcanzar sus metas de aprendizaje.\n• Monitorea y ajusta su desempeño durante el proceso de aprendizaje.',
      transversal_2_estandar: data.transversal_2_estandar || 'Gestiona su aprendizaje de manera autónoma al darse cuenta lo que debe aprender al distinguir lo sencillo o complejo de una tarea, y por ende define metas personales.',
      transversal_2_desempeno: data.transversal_2_desempeno || 'Determina metas de aprendizaje viables asociadas a sus conocimientos, estilos de aprendizaje y recursos disponibles.',
      transversal_2_evidencia: data.transversal_2_evidencia || 'Asume el control de su propio proceso de aprendizaje, reconociendo qué necesita aprender y qué dificultades enfrenta.',
      alumnos: data.alumnos && data.alumnos.length > 0
        ? data.alumnos
        : Array.from({ length: 15 }, (_, i) => ({
            numero: i + 1,
            nombre: '' // Celda en blanco limpia para llenado manual / impresión
          }))
    };

    // Renderizar tags de Mustache
    doc.render(formattedData);

    // Generar archivo binario
    const outputBlob = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      compression: 'DEFLATE'
    });

    // Crear nombre de archivo sanitizado
    const sanitizedArea = (data.area || 'Area').replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedTema = (data.tema || 'Sesion').substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `Sesion_${sanitizedArea}_${sanitizedTema}.docx`;

    // Descargar automáticamente con soporte multientorno (iframe y ventana nativa)
    try {
      const url = window.URL.createObjectURL(outputBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 2500);
    } catch (linkErr) {
      console.warn('Fallback a FileSaver saveAs:', linkErr);
      saveAs(outputBlob, fileName);
    }

    return {
      success: true,
      blob: outputBlob,
      fileName
    };
  } catch (err: any) {
    console.error('Error en ensamblado Docx:', err);
    return {
      success: false,
      error: err?.message || 'Error al procesar la plantilla de Word'
    };
  }
}
