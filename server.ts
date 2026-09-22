import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Cliente Lazy de Gemini
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Ruta de Salud y Estadísticas de Optimización
interface CacheEntry {
  data: any;
  timestamp: number;
}
const suggestionCache = new Map<string, CacheEntry>();
const sessionCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 horas

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    sessionModel: "gemini-3.8-flash",
    suggestionsModel: "gemini-3.1-flash-lite",
    cachedSuggestions: suggestionCache.size,
    cachedSessions: sessionCache.size,
    tokenOptimizations: [
      "Base de datos CNEB (capacidades, estándares y desempeños) 100% local a 0 tokens",
      "Compilador de Word .docx (docxtemplater) 100% en cliente a 0 tokens",
      "Caché en memoria para evitar llamadas redundantes a la API (0 tokens en repetición)",
      "Modelo ultra ligero gemini-3.1-flash-lite para sugerencias de micro-campos",
      "Esquema JSON estricto con límites de tokens (maxOutputTokens) para evitar divagaciones",
      "Motor pedagógico curricular local de respaldo a 0 tokens"
    ]
  });
});

// Endpoint 1: Generación completa de Sesión CNEB con Gemini Flash (Optimizado)
app.post("/api/generate-session", async (req, res) => {
  try {
    const payload = req.body;
    const ai = getGeminiClient();

    // Clave de caché para evitar regenerar la misma sesión exacta
    const cacheKey = `${payload.nivel}_${payload.grado}_${payload.area}_${payload.tema}_${payload.duracion}_${payload.instrumento}_${(payload.competencias || []).map((c: any) => c.nombre).join("|")}`.toLowerCase();
    const cached = sessionCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      return res.json({
        success: true,
        data: cached.data,
        source: "cache_zero_tokens",
        cacheHit: true
      });
    }

    // Si no hay API key configurada o falla la conexión, generamos con motor curricular local a 0 tokens
    if (!ai) {
      console.log("No GEMINI_API_KEY detected, using expert CNEB curriculum engine fallback (0 tokens)");
      const fallbackResult = generarSesionPedagogicaFallback(payload);
      return res.json({ success: true, data: fallbackResult, source: "curriculum_engine_0_tokens" });
    }

    const systemPrompt = `Especialista Curricular CNEB (MINEDU Perú). Diseña propósitos, criterios e inicio-desarrollo-cierre oficiales con lenguaje técnico docente.`;

    const competenciasTxt = (payload.competencias || [])
      .map((c: any) => `- ${c.nombre} (Cap: ${(c.capacidades || []).slice(0, 3).join("; ")})`)
      .join("\n");

    const enfoquesTxt = (payload.enfoques || [])
      .map((e: any) => e.nombre)
      .join(", ");

    const userPrompt = `Sesión CNEB:
- Grado/Nivel: ${payload.grado} de ${payload.nivel} | Área: ${payload.area}
- Tema: ${payload.tema}
- Unidad: ${payload.tituloUnidad || payload.tema} | Sesión: ${payload.tituloSesion || payload.tema}
- Duración: ${payload.duracion || 90} min | Instrumento: ${payload.instrumento || 'Lista de cotejo'}
- Contexto DUA: ${payload.contextoDua || 'Estilos diversos y andamiaje visual'}
- NEE: ${payload.adaptacionesNee ? 'Sí' : 'No'}
- Competencias:
${competenciasTxt || payload.area}
- Enfoques: ${enfoquesTxt || 'Derechos y Bien Común'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 2500,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            proposito: { type: Type.STRING },
            criterios: { type: Type.STRING },
            evidencia_1: { type: Type.STRING },
            reto: { type: Type.STRING },
            situacion_significativa: { type: Type.STRING },
            producto: { type: Type.STRING },
            necesidades_aprendizaje: { type: Type.STRING },
            inicio: { type: Type.STRING },
            desarrollo: { type: Type.STRING },
            cierre: { type: Type.STRING },
            teoria: { type: Type.STRING },
            dua: { type: Type.STRING },
            trabajo_entre_pares: { type: Type.STRING },
            consideraciones_diversidad: { type: Type.STRING },
            instrumento_contenido: { type: Type.STRING },
            ficha: { type: Type.STRING }
          },
          required: [
            "proposito", "criterios", "evidencia_1", "reto", "situacion_significativa",
            "producto", "necesidades_aprendizaje", "inicio", "desarrollo", "cierre",
            "teoria", "dua", "trabajo_entre_pares", "consideraciones_diversidad", "instrumento_contenido", "ficha"
          ]
        }
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);

    // Guardar en caché
    sessionCache.set(cacheKey, { data: parsedData, timestamp: Date.now() });

    res.json({
      success: true,
      data: parsedData,
      source: "gemini-3.8-flash"
    });
  } catch (error: any) {
    console.error("Error en /api/generate-session:", error);
    const fallbackResult = generarSesionPedagogicaFallback(req.body);
    res.json({
      success: true,
      data: fallbackResult,
      source: "curriculum_engine_fallback",
      warning: "Generado con motor curricular CNEB local (0 tokens consumidos)"
    });
  }
});

// Endpoint 2: Sugerencias rápidas con IA optimizado con Flash-Lite y Caché
app.post("/api/suggest-field", async (req, res) => {
  try {
    const { tipo, area, nivel, grado, tema } = req.body;

    // Verificar caché primero (0 tokens consumidos para consultas repetidas)
    const cacheKey = `${tipo}_${area}_${nivel}_${grado}_${tema}`.toLowerCase().trim();
    const cached = suggestionCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      if (tipo === "titulos") {
        return res.json({ success: true, data: cached.data, fromCache: true });
      }
      return res.json({ success: true, sugerencia: cached.data, fromCache: true });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackSuggestions = obtenerSugerenciaLocal(tipo, area, tema, grado);
      return res.json({ success: true, sugerencia: fallbackSuggestions, source: "local_0_tokens" });
    }

    let prompt = "";
    if (tipo === "titulos") {
      prompt = `CNEB Perú. Sugiere Título de Unidad y Título de Sesión para tema "${tema}", área ${area}, ${grado} ${nivel}. Formato JSON { "tituloUnidad": "...", "tituloSesion": "..." }`;
    } else if (tipo === "referencias") {
      prompt = `3 referencias bibliográficas MINEDU/oficiales para tema "${tema}" en ${area}, ${grado}. Texto en viñetas concisas.`;
    } else if (tipo === "recursos") {
      prompt = `3 a 4 recursos educativos y TIC concretos para sesión de ${area} sobre "${tema}" en ${grado}. Viñetas concisas.`;
    } else if (tipo === "materiales") {
      prompt = `Materiales concretos y de escritorio pertinentes para ${area}, ${grado}, tema "${tema}". Viñetas concisas.`;
    } else {
      prompt = `Sugerencias breves para ${tipo} sobre tema "${tema}".`;
    }

    // Usamos gemini-3.1-flash-lite para máxima velocidad y consumo ultra reducido de tokens
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        maxOutputTokens: 250,
        temperature: 0.5,
        responseMimeType: tipo === "titulos" ? "application/json" : "text/plain"
      }
    });

    const resultText = response.text || "";
    if (tipo === "titulos") {
      try {
        const parsed = JSON.parse(resultText);
        suggestionCache.set(cacheKey, { data: parsed, timestamp: Date.now() });
        return res.json({ success: true, data: parsed });
      } catch {
        const fallbackTitulos = {
          tituloUnidad: `Unidad: Desarrollamos aprendizajes sobre ${tema}`,
          tituloSesion: `Descubrimos y aplicamos ${tema} en situaciones cotidianas`
        };
        suggestionCache.set(cacheKey, { data: fallbackTitulos, timestamp: Date.now() });
        return res.json({ success: true, data: fallbackTitulos });
      }
    }

    const trimmed = resultText.trim();
    suggestionCache.set(cacheKey, { data: trimmed, timestamp: Date.now() });
    res.json({ success: true, sugerencia: trimmed });
  } catch (err: any) {
    console.error("Error en /api/suggest-field:", err);
    const fallback = obtenerSugerenciaLocal(req.body.tipo, req.body.area, req.body.tema, req.body.grado);
    res.json({ success: true, sugerencia: fallback, source: "fallback_0_tokens" });
  }
});

// Generador curricular oficial CNEB de alta fidelidad (Motor Local CNEB)
function generarSesionPedagogicaFallback(payload: any) {
  const tema = payload.tema || "el tema curricular";
  const area = payload.area || "Matemática";
  const grado = payload.grado || "3° grado";
  const instrumento = payload.instrumento || "Lista de cotejo";

  return {
    proposito: `Hoy los estudiantes de ${grado} aprenderán a comprender, representar y aplicar los conceptos fundamentales de ${tema} para resolver situaciones problemáticas de su contexto real, explicando los procedimientos empleados y justificando sus resultados.`,
    criterios: `- Identifica y relaciona los datos clave vinculados a ${tema} a partir de situaciones significativas de su entorno.\n- Representa gráfica y simbólicamente las relaciones y conceptos de ${tema} usando material concreto y esquemas.\n- Emplea estrategias heurísticas y procedimientos ordenados para resolver problemas referidos a ${tema}.\n- Explica con claridad y argumentos el procedimiento seguido y la validez de la solución obtenida.`,
    evidencia_1: `Ficha de aplicación práctica resuelta con justificación de procedimientos y organizador visual individual/grupal sobre ${tema}.`,
    inicio: `1. Motivación y Contextualización (15 min):\n- El docente saluda cordialmente a los estudiantes y presenta una situación cotidiana o imagen desafiante vinculada a ${tema}.\n- Se formula la pregunta de conflicto cognitivo: "¿De qué manera nos ayuda conocer ${tema} en nuestra vida diaria y qué ocurriría si no supiéramos aplicarlo?".\n- Recojo de saberes previos mediante lluvia de ideas anotadas en la pizarra.\n- Se comunica el propósito de la sesión y se establecen de manera concertada dos normas de convivencia para el trabajo armónico.`,
    desarrollo: `2. Gestión y Acompañamiento del Aprendizaje (60 min):\n- Familiarización con el reto: Los estudiantes leen y analizan en equipos la situación planteada sobre ${tema}, identificando datos e incógnitas.\n- Búsqueda y ejecución de estrategias: Manipulan recursos educativos y materiales concretos para modelar el problema. El docente monitorea grupo por grupo brindando andamiaje y retroalimentación por descubrimiento.\n- Socialización de representaciones: Un representante por equipo sustenta su resolución en la pizarra o papelote, contrastando diferentes métodos de solución.\n- Formalización y reflexión: El docente consolida los conceptos teóricos clave de ${tema} destacando las propiedades y algoritmos pertinentes.\n- Transferencia: Los estudiantes resuelven de forma autónoma una situación nueva de aplicación.`,
    cierre: `3. Evaluación Formativa y Metacognición (15 min):\n- Los estudiantes reflexionan sobre su proceso de aprendizaje respondiendo:\n  * ¿Qué aprendimos hoy sobre ${tema}?\n  * ¿Qué dificultades encontramos y cómo logramos superarlas?\n  * ¿En qué situaciones cotidianas podemos aplicar lo aprendido?\n- Se aplica el instrumento formativo (${instrumento}) para verificar el logro de los criterios.\n- Felicitación al grupo por su compromiso y participación activa.`,
    teoria: `SÍNTESIS CONCEPTUAL - ${tema.toUpperCase()}\n\n1. Definición:\n${tema} constituye una noción fundamental del área de ${area}, que permite modelar, cuantificar o comunicar fenómenos del entorno escolar y comunitario.\n\n2. Elementos Principales:\n- Conceptos base y propiedades características.\n- Reglas y procedimientos operativos estandarizados.\n- Aplicación directa en la resolución de problemas cotidianos.\n\n3. Ejemplo Práctico Demostrativo:\nSe explica paso a paso la estrategia de resolución modelo para que los estudiantes la conserven en su cuaderno de trabajo como guía de consulta.`,
    dua: `Estrategias DUA Implementadas:\n- Múltiples formas de representación: Uso de material concreto, gráficos explicativos, organizadores visuales y textos claros.\n- Múltiples formas de acción y expresión: Opciones para responder en forma oral, gráfica o escrita; trabajo colaborativo con roles asignados.\n- Apoyos NEE: Tiempo adicional para la resolución, lectura asistida de consignas y refuerzo visual paso a paso.`,
    trabajo_entre_pares: `El trabajo entre pares se evidencia cuando los estudiantes interactúan en parejas o equipos colaborativos para resolver las situaciones de ${tema}, contrastando sus procedimientos de resolución, confrontando hipótesis y brindándose retroalimentación mutua para alcanzar el propósito de aprendizaje.`,
    reto: `¿De qué manera podemos utilizar los conocimientos sobre ${tema} para resolver situaciones problemáticas y tomar decisiones informadas en nuestra vida diaria y comunitaria?`,
    situacion_significativa: `En la comunidad escolar, los estudiantes de ${grado} se enfrentan a desafíos diarios que requieren aplicar nociones de ${area}. A través del estudio de ${tema}, investigarán y construirán propuestas de solución argumentadas para compartirlas con sus compañeros.`,
    producto: `Ficha de aplicación práctica con resolución de problemas contextualizados sobre ${tema} y sustentación en equipo.`,
    necesidades_aprendizaje: `Desarrollar capacidades de razonamiento reflexivo, modelación matemática/comunicativa y aplicación autónoma de estrategias con trabajo colaborativo.`,
    consideraciones_diversidad: `Atención personalizada con respeto a los diversos ritmos y estilos de aprendizaje; diseño de actividades multinivel con andamiaje pedagógico y retroalimentación formativa oportuna.`,
    instrumento_contenido: `INSTRUMENTO DE EVALUACIÓN: ${instrumento.toUpperCase()}\n\nCRITERIOS A EVALUAR:\n1. Reconoce y organiza datos pertinentes referidos a ${tema}.\n2. Aplica procedimientos matemáticos/conceptuales para resolver las tareas propuestas.\n3. Explica con claridad la validez de los resultados obtenidos.\n4. Participa activamente demostrando respeto y trabajo colaborativo.`,
    ficha: `FICHA DE TRABAJO Y APLICACIÓN PRÁCTICA - ${tema.toUpperCase()}\n\nActividad 1: Lee el enunciado con atención, subraya los datos principales e identifica la interrogante central.\nActividad 2: Emplea tus propias estrategias y representaciones gráficas para modelar la situación de ${tema}.\nActividad 3: Redacta tu respuesta final y reflexiona sobre el proceso que seguiste para resolverla.`
  };
}

function obtenerSugerenciaLocal(tipo: string, area: string, tema: string, grado: string) {
  if (tipo === "titulos") {
    return {
      tituloUnidad: `Unidad de Aprendizaje: Desarrollamos habilidades en ${area} para resolver problemas de nuestra comunidad`,
      tituloSesion: `Descubrimos y aplicamos ${tema || 'nuevos aprendizajes'} en situaciones cotidianas`
    };
  }
  if (tipo === "referencias") {
    return `- Ministerio de Educación del Perú (MINEDU). (2016). Currículo Nacional de la Educación Básica (CNEB).\n- MINEDU. (2020). Programa Curricular de Educación Primaria / Secundaria.\n- Cuaderno de Trabajo del Estudiante - ${area} ${grado || ''}, Editorial MINEDU.\n- Guía Docente para la Planificación Curricular y Evaluación Formativa.`;
  }
  if (tipo === "recursos") {
    return `- Ficha de trabajo estructurada con actividades graduadas por nivel de complejidad.\n- Papelotes cuadriculados y plumones gruesos para la socialización por equipos.\n- Láminas ilustrativas y presentaciones visuales contextualizadas.\n- Recursos interactivos de la plataforma PerúEduca / fichas de autoaprendizaje.`;
  }
  if (tipo === "materiales") {
    return `- Material concreto estructurado (bloques lógicos, material Base Diez, regletas de Cuisenaire o tarjetas léxicas según corresponda).\n- Hojas bond, cartulinas, tijeras, goma y reglas milimetradas.\n- Cuaderno de trabajo oficial del área de ${area}.\n- Cinta adhesiva o limpiatipo para exhibición de evidencias en el mural del aula.`;
  }
  return "Sugerencia curricular basada en el CNEB.";
}

// Integración de Vite / Producción
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = (typeof __dirname !== "undefined" && path.basename(__dirname) === "dist")
      ? __dirname
      : path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Planifica Virtual server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
