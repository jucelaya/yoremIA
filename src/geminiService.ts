/**
 * Conector de Inteligencia Artificial (Gemini Flash) para Planifica Virtual
 * Implementa la función oficial asíncrona `llamarGeminiGenerador(payload)`
 * comunicándose con la capa backend protegida para mantener las credenciales seguras.
 */

export interface GeneradorPayload {
  docente: string;
  director: string;
  colegio: string;
  nivel: string;
  grado: string;
  area: string;
  tema: string;
  tituloUnidad: string;
  tituloSesion: string;
  duracion: number | string;
  instrumento: string;
  contextoDua: string;
  adaptacionesNee: boolean;
  competencias: Array<{
    nombre: string;
    capacidades: string[];
    estandar: string;
    desempenos: string[];
  }>;
  enfoques: Array<{
    nombre: string;
    valores: string;
    actitud: string;
  }>;
  referencias?: string;
  recursos?: string;
  materiales?: string;
  alumnos?: Array<{ numero: number; nombre: string }>;
}

export interface SesionGeneradaResponse {
  proposito: string;
  criterios: string;
  evidencia_1: string;
  reto?: string;
  situacion_significativa?: string;
  producto?: string;
  necesidades_aprendizaje?: string;
  inicio: string;
  desarrollo: string;
  cierre: string;
  teoria: string;
  dua: string;
  trabajo_entre_pares?: string;
  consideraciones_diversidad?: string;
  instrumento_contenido?: string;
  ficha?: string;
  source?: string;
}

/**
 * Función asíncrona oficial solicitada: llamarGeminiGenerador(payload)
 * Envía el payload a la API de Gemini Flash con formato estructurado.
 */
export async function llamarGeminiGenerador(
  payload: GeneradorPayload
): Promise<SesionGeneradaResponse> {
  try {
    const response = await fetch('/api/generate-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error en servidor: ${response.statusText}`);
    }

    const json = await response.json();
    if (json.success && json.data) {
      return {
        ...json.data,
        source: json.source || 'gemini-3.8-flash'
      };
    }

    throw new Error(json.error || 'Respuesta inválida del motor de generación');
  } catch (error) {
    console.warn('Fallback al motor curricular CNEB local:', error);
    // Generador CNEB local de rescate si el servidor no responde
    return generarFallbackCliente(payload);
  }
}

/**
 * Función auxiliar para sugerir títulos con IA
 */
export async function sugerirTitulos(params: {
  area: string;
  nivel: string;
  grado: string;
  tema: string;
}): Promise<{ tituloUnidad: string; tituloSesion: string }> {
  try {
    const response = await fetch('/api/suggest-field', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'titulos', ...params })
    });
    const json = await response.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error();
  } catch {
    return {
      tituloUnidad: `Unidad de Aprendizaje: Aplicamos ${params.area} para resolver problemas de nuestro entorno`,
      tituloSesion: `Descubrimos y resolvemos situaciones con ${params.tema || 'aprendizajes significativos'}`
    };
  }
}

/**
 * Función auxiliar para sugerir referencias, recursos o materiales con IA
 */
export async function sugerirCampo(
  tipo: 'referencias' | 'recursos' | 'materiales',
  params: { area: string; nivel: string; grado: string; tema: string }
): Promise<string> {
  try {
    const response = await fetch('/api/suggest-field', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, ...params })
    });
    const json = await response.json();
    if (json.success && json.sugerencia) {
      return json.sugerencia;
    }
    throw new Error();
  } catch {
    if (tipo === 'referencias') {
      return `- Ministerio de Educación del Perú (MINEDU). (2016). Currículo Nacional de la Educación Básica (CNEB).\n- MINEDU. (2021). Orientaciones para la Evaluación Formativa en el Aula.\n- Cuaderno de autoaprendizaje de ${params.area} para ${params.grado}.`;
    }
    if (tipo === 'recursos') {
      return `- Ficha de trabajo contextualizada con problemas graduados.\n- Papelotes cuadriculados y plumones acrílicos para trabajo grupal.\n- Videos explicativos cortos y diapositivas interactivas.\n- Fichas de autoevaluación formativa.`;
    }
    return `- Material concreto estructurado (Base Diez, regletas o tarjetas léxicas según el área).\n- Útiles escolares: cuaderno de trabajo, regla, colores y hojas bond.\n- Papelógrafo y limpiatipo para la galería de producciones.`;
  }
}

function generarFallbackCliente(payload: GeneradorPayload): SesionGeneradaResponse {
  const tema = payload.tema || 'el tema curricular';
  const grado = payload.grado || 'el grado correspondiente';
  const instrumento = payload.instrumento || 'Lista de cotejo';

  return {
    proposito: `Hoy los estudiantes de ${grado} aprenderán a comprender, relacionar y aplicar los conceptos fundamentales de "${tema}" mediante situaciones auténticas de su vida cotidiana, desarrollando autonomía y trabajo colaborativo.`,
    criterios: `- Identifica datos y relaciones esenciales sobre ${tema} en situaciones contextualizadas.\n- Modela y representa gráficamente conceptos y algoritmos vinculados a ${tema}.\n- Aplica estrategias y procedimientos pertinentes para la resolución de situaciones problemáticas.\n- Argumenta sus conclusiones y explica con claridad el procedimiento empleado.`,
    evidencia_1: `Ficha de aplicación resuelta con justificación de procedimientos y organizador gráfico elaborado en equipo sobre ${tema}.`,
    inicio: `1. Motivación y Saberes Previos (15 min):\n- Saludo afectuoso y bienvenida a los estudiantes. El docente presenta una situación vivencial de su localidad que involucra ${tema}.\n- Preguntas para rescatar saberes previos: "¿Qué sabemos sobre este tema? ¿Dónde lo hemos observado antes?".\n- Conflicto cognitivo: "¿De qué manera este aprendizaje nos ayuda a tomar mejores decisiones en nuestra comunidad?".\n- Se socializa el propósito de la sesión y se consensúan dos normas de convivencia para la clase.`,
    desarrollo: `2. Gestión y Acompañamiento del Aprendizaje (60 min):\n- Comprensión de la situación: Lectura y análisis en equipos cooperativos de la actividad referida a ${tema}.\n- Búsqueda de estrategias: Los estudiantes exploran caminos de solución utilizando materiales concretos y esquemas visuales.\n- Representación y socialización: Cada equipo expone sus hallazgos en la pizarra o papelote, validando resultados con sus pares.\n- Formalización del aprendizaje: El docente sintetiza y consolida los conceptos teóricos clave de ${tema}, aclarando dudas y reforzando procedimientos.\n- Aplicación a nuevas situaciones: Resolución individual de un reto de afianzamiento con retroalimentación oportuna.`,
    cierre: `3. Metacognición y Evaluación Formativa (15 min):\n- Los estudiantes evalúan su propio desempeño a través de las preguntas:\n  * ¿Qué aprendí hoy sobre ${tema}?\n  * ¿Cómo lo aprendí y qué estrategia me resultó más útil?\n  * ¿Para qué me servirá en mi vida cotidiana?\n- Aplicación del instrumento (${instrumento}) para registrar evidencias de logro.\n- Felicitaciones por el trabajo realizado y motivación para seguir aprendiendo.`,
    teoria: `RESUMEN CONCEPTUAL - ${tema.toUpperCase()}\n\n1. Concepto Central:\n${tema} es una noción clave que nos permite estructurar el pensamiento, comunicar ideas con rigor y resolver problemas del contexto real.\n\n2. Pasos y Procedimientos Clave:\n- Paso 1: Lectura analítica e identificación de datos.\n- Paso 2: Selección del procedimiento o estrategia adecuada.\n- Paso 3: Ejecución ordenada y verificación de resultados.\n\n3. Conclusión Práctica:\nEl dominio de este contenido fortalece las competencias del área y promueve el pensamiento crítico.`,
    dua: `Pautas DUA Implementadas:\n- Principio I (Múltiples formas de representación): Apoyo con esquemas visuales, material concreto y vocabulario accesible.\n- Principio II (Múltiples formas de acción y expresión): Libertad para expresar soluciones de manera oral, escrita o gráfica.\n- Principio III (Múltiples formas de implicación): Trabajo en parejas heterogéneas, retos graduados y retroalimentación positiva continua.`
  };
}
