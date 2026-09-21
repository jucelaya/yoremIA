/**
 * Base de Datos Curricular CNEB (MINEDU - Perú) - Versión Vanilla JS Standalone
 */
const cnebData = {
  niveles: [
    {
      id: 'Primaria',
      nombre: 'Educación Primaria',
      grados: [
        { id: '1', nombre: '1° de Primaria', ciclo: 'Ciclo III' },
        { id: '2', nombre: '2° de Primaria', ciclo: 'Ciclo III' },
        { id: '3', nombre: '3° de Primaria', ciclo: 'Ciclo IV' },
        { id: '4', nombre: '4° de Primaria', ciclo: 'Ciclo IV' },
        { id: '5', nombre: '5° de Primaria', ciclo: 'Ciclo V' },
        { id: '6', nombre: '6° de Primaria', ciclo: 'Ciclo V' }
      ],
      areas: [
        {
          id: 'matematica',
          nombre: 'Matemática',
          competencias: [
            {
              id: 'resuelve_cantidad',
              nombre: 'Resuelve problemas de cantidad',
              capacidades: [
                'Traduce cantidades a expresiones numéricas.',
                'Comunica su comprensión sobre los números y las operaciones.',
                'Usa estrategias y procedimientos de estimación y cálculo.',
                'Argumenta afirmaciones sobre las relaciones numéricas y las operaciones.'
              ],
              estandares: {
                'Ciclo III': 'Resuelve problemas referidos a acciones de juntar, separar, agregar, quitar, igualar y comparar cantidades; y las traduce a expresiones de adición y sustracción, doble y mitad.',
                'Ciclo IV': 'Resuelve problemas referidos a una o más acciones de agregar, quitar, igualar, repetir o repartir una cantidad, combinar colecciones y fracciones usuales.',
                'Ciclo V': 'Resuelve problemas referidos a comparar, igualar, reiterar y dividir cantidades con números naturales, fracciones y decimales.'
              },
              desempenos: {
                '1': ['Establece relaciones entre datos y acciones de agregar, quitar y juntar cantidades hasta 20.'],
                '2': ['Establece relaciones entre datos y acciones de juntar, separar, comparar e igualar hasta dos cifras.'],
                '3': ['Establece relaciones entre datos y operaciones de adición, sustracción y multiplicación hasta tres cifras.'],
                '4': ['Establece relaciones entre datos de partir y repartir unidades y colecciones en partes iguales (fracciones).'],
                '5': ['Establece relaciones con valor posicional hasta seis cifras y operaciones combinadas con fracciones y decimales.'],
                '6': ['Resuelve problemas con operaciones combinadas, múltiplos, divisores y números primos y compuestos.']
              }
            },
            {
              id: 'resuelve_regularidad',
              nombre: 'Resuelve problemas de regularidad, equivalencia y cambio',
              capacidades: [
                'Traduce datos y condiciones a expresiones algebraicas y gráficas.',
                'Comunica su comprensión sobre las relaciones algebraicas.',
                'Usa estrategias y procedimientos para encontrar equivalencias y reglas generales.',
                'Argumenta afirmaciones sobre relaciones de cambio y equivalencia.'
              ],
              estandares: {
                'Ciclo III': 'Resuelve problemas con equivalencias y patrones de repetición o aditivos.',
                'Ciclo IV': 'Resuelve problemas con dos equivalencias o relaciones de cambio entre magnitudes.',
                'Ciclo V': 'Resuelve problemas con ecuaciones de cuatro operaciones y patrones aditivos y multiplicativos.'
              },
              desempenos: {
                '1': ['Establece relaciones entre datos que se repiten y los transforma en patrones de repetición.'],
                '2': ['Establece regularidades en cantidades que aumentan o disminuyen de hasta 20 en 20.'],
                '3': ['Establece equivalencias entre dos grupos de hasta 20 objetos y las traslada a igualdades.'],
                '4': ['Describe la regla de formación de un patrón multiplicativo o aditivo con números de hasta tres cifras.'],
                '5': ['Transforma relaciones de equivalencia en ecuaciones simples y proporcionalidad directa.'],
                '6': ['Justifica el valor de la incógnita en una ecuación y generaliza patrones.']
              }
            }
          ]
        },
        {
          id: 'comunicacion',
          nombre: 'Comunicación',
          competencias: [
            {
              id: 'se_comunica_oralmente',
              nombre: 'Se comunica oralmente en su lengua materna',
              capacidades: [
                'Obtiene información del texto oral.',
                'Infiere e interpreta información del texto oral.',
                'Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada.',
                'Utiliza recursos no verbales y paraverbales de forma estratégica.',
                'Interactúa estratégicamente con distintos interlocutores.',
                'Reflexiona y evalúa la forma, el contenido y contexto del texto oral.'
              ],
              estandares: {
                'Ciclo III': 'Se comunica oralmente mediante textos orales breves, identificando información explícita e infiriendo hechos.',
                'Ciclo IV': 'Se comunica oralmente deduciendo relaciones lógicas entre ideas y opinando con argumentos.',
                'Ciclo V': 'Se comunica oralmente en situaciones formales e informales evaluando la adecuación al propósito.'
              },
              desempenos: {
                '1': ['Recupera información explícita de textos orales seleccionando nombres, hechos y lugares.'],
                '2': ['Relata con sus propias palabras sucesos importantes de textos orales escuchados.'],
                '3': ['Explica el tema, el propósito comunicativo y relaciones lógicas de causa-efecto.'],
                '4': ['Adecúa su texto oral a la situación comunicativa con registro formal e informal.'],
                '5': ['Recupera información relevante de textos orales complejos sintetizando ideas clave.'],
                '6': ['Evalúa la eficacia de recursos verbales y no verbales en exposiciones y debates.']
              }
            },
            {
              id: 'lee_diversos_textos',
              nombre: 'Lee diversos tipos de textos escritos en su lengua materna',
              capacidades: [
                'Obtiene información del texto escrito.',
                'Infiere e interpreta información del texto.',
                'Reflexiona y evalúa la forma, el contenido y contexto del texto.'
              ],
              estandares: {
                'Ciclo III': 'Lee diversos tipos de textos de estructura simple con palabras conocidas e ilustraciones.',
                'Ciclo IV': 'Lee diversos tipos de textos de estructura simple con algunos elementos complejos y vocabulario variado.',
                'Ciclo V': 'Lee diversos tipos de textos con elementos complejos, deduciendo tema central y relaciones causa-efecto.'
              },
              desempenos: {
                '1': ['Identifica información explícita en lugares evidentes como título, inicio o final.'],
                '2': ['Deduce la causa de un hecho y la acción de personajes a partir del texto e ilustraciones.'],
                '3': ['Deduce características implícitas y determina el significado de palabras por contexto.'],
                '4': ['Identifica información explícita y complementaria en textos continuos y discontinuos.'],
                '5': ['Deduce la intención del autor y evalúa elementos paratextuales como tablas y gráficos.'],
                '6': ['Sintetiza la información relevante distinguiendo ideas principales de secundarias.']
              }
            }
          ]
        }
      ]
    },
    {
      id: 'Secundaria',
      nombre: 'Educación Secundaria',
      grados: [
        { id: '1', nombre: '1° de Secundaria', ciclo: 'Ciclo VI' },
        { id: '2', nombre: '2° de Secundaria', ciclo: 'Ciclo VI' },
        { id: '3', nombre: '3° de Secundaria', ciclo: 'Ciclo VII' },
        { id: '4', nombre: '4° de Secundaria', ciclo: 'Ciclo VII' },
        { id: '5', nombre: '5° de Secundaria', ciclo: 'Ciclo VII' }
      ],
      areas: [
        {
          id: 'matematica',
          nombre: 'Matemática',
          competencias: [
            {
              id: 'resuelve_cantidad',
              nombre: 'Resuelve problemas de cantidad',
              capacidades: [
                'Traduce cantidades a expresiones numéricas.',
                'Comunica su comprensión sobre los números y las operaciones.',
                'Usa estrategias y procedimientos de estimación y cálculo.',
                'Argumenta afirmaciones sobre las relaciones numéricas y las operaciones.'
              ],
              estandares: {
                'Ciclo VI': 'Resuelve problemas con números enteros y racionales, aumentos y descuentos porcentuales y potencias de 10.',
                'Ciclo VII': 'Resuelve problemas con números reales, notación científica, interés simple y compuesto y magnitudes.'
              },
              desempenos: {
                '1': ['Establece relaciones entre datos y las transforma a expresiones numéricas con enteros y racionales.'],
                '2': ['Resuelve problemas con porcentajes sucesivos, potencias de base 10 y operaciones combinadas.'],
                '3': ['Aplica números racionales e irracionales, notación científica y tasa de interés simple.'],
                '4': ['Modela situaciones financieras y científicas con números reales e interés compuesto.'],
                '5': ['Evalúa modelos numéricos en problemas de optimización de costos y presupuestos.']
              }
            },
            {
              id: 'resuelve_regularidad',
              nombre: 'Resuelve problemas de regularidad, equivalencia y cambio',
              capacidades: [
                'Traduce datos y condiciones a expresiones algebraicas y gráficas.',
                'Comunica su comprensión sobre las relaciones algebraicas.',
                'Usa estrategias y procedimientos para encontrar equivalencias y reglas generales.',
                'Argumenta afirmaciones sobre relaciones de cambio y equivalencia.'
              ],
              estandares: {
                'Ciclo VI': 'Resuelve problemas con ecuaciones lineales, desigualdades y funciones afines.',
                'Ciclo VII': 'Resuelve problemas con sistemas de ecuaciones, ecuaciones cuadráticas y modelos exponenciales.'
              },
              desempenos: {
                '1': ['Transforma relaciones de equivalencia a ecuaciones lineales y funciones en el plano.'],
                '2': ['Combina métodos algebraicos y gráficos para resolver sistemas de ecuaciones lineales.'],
                '3': ['Modela situaciones mediante ecuaciones cuadráticas y analiza la parábola.'],
                '4': ['Interpreta el comportamiento de funciones racionales y sistemas de tres variables.'],
                '5': ['Aplica funciones trigonométricas y logarítmicas para modelar fenómenos reales.']
              }
            }
          ]
        },
        {
          id: 'comunicacion',
          nombre: 'Comunicación',
          competencias: [
            {
              id: 'se_comunica_oralmente',
              nombre: 'Se comunica oralmente en su lengua materna',
              capacidades: [
                'Obtiene información del texto oral.',
                'Infiere e interpreta información del texto oral.',
                'Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada.',
                'Utiliza recursos no verbales y paraverbales de forma estratégica.',
                'Interactúa estratégicamente con distintos interlocutores.',
                'Reflexiona y evalúa la forma, el contenido y contexto del texto oral.'
              ],
              estandares: {
                'Ciclo VI': 'Se comunica oralmente infiriendo temas y conclusiones en discursos formales.',
                'Ciclo VII': 'Se comunica oralmente evaluando validez de argumentos, sesgos y falacias en debates y ponencias.'
              },
              desempenos: {
                '1': ['Recupera información explícita y deduce relaciones lógicas en textos orales formales.'],
                '2': ['Emplea recursos paraverbales y no verbales en diálogos y presentaciones.'],
                '3': ['Organiza discursos argumentativos con tesis, argumentos sólidos y conclusión.'],
                '4': ['Analiza contradicciones y utiliza figuras retóricas en debates éticos o sociales.'],
                '5': ['Sustenta ponencias académicas con dominio escénico y rigor argumentativo.']
              }
            },
            {
              id: 'lee_diversos_textos',
              nombre: 'Lee diversos tipos de textos escritos en su lengua materna',
              capacidades: [
                'Obtiene información del texto escrito.',
                'Infiere e interpreta información del texto.',
                'Reflexiona y evalúa la forma, el contenido y contexto del texto.'
              ],
              estandares: {
                'Ciclo VI': 'Lee diversos textos complejos integrando información contrapuesta o ambigua.',
                'Ciclo VII': 'Lee textos especializados y literarios evaluando intencionalidad, ideología y estilo.'
              },
              desempenos: {
                '1': ['Identifica información complementaria y deduce relaciones intertextuales.'],
                '2': ['Integra información de diversas fuentes y deduce figuras retóricas.'],
                '3': ['Sintetiza ensayos científicos deduciendo tesis y argumentos de respaldo.'],
                '4': ['Contrasta textos de diferentes autores sobre una misma temática.'],
                '5': ['Evalúa la solidez de premisas y conclusiones en ensayos filosóficos y científicos.']
              }
            }
          ]
        }
      ]
    }
  ]
};

function obtenerCurriculo(nivelNombre, gradoId, areaId, competenciaId) {
  const nivelObj = cnebData.niveles.find((n) => n.id === nivelNombre);
  if (!nivelObj) return null;
  const gradoObj = nivelObj.grados.find((g) => g.id === gradoId);
  const ciclo = gradoObj ? gradoObj.ciclo : (nivelNombre === 'Primaria' ? 'Ciclo III' : 'Ciclo VI');
  const areaObj = nivelObj.areas.find((a) => a.id.toLowerCase() === areaId.toLowerCase());
  if (!areaObj) return null;

  if (competenciaId) {
    const comp = areaObj.competencias.find((c) => c.id.toLowerCase() === competenciaId.toLowerCase());
    if (!comp) return null;
    return {
      nivel: nivelNombre,
      grado: gradoObj ? gradoObj.nombre : gradoId,
      ciclo: ciclo,
      area: areaObj.nombre,
      competencia: comp.nombre,
      capacidades: comp.capacidades,
      estandar: comp.estandares[ciclo] || Object.values(comp.estandares)[0] || '',
      desempenos: comp.desempenos[gradoId] || comp.desempenos['1'] || []
    };
  }

  return {
    nivel: nivelNombre,
    grado: gradoObj ? gradoObj.nombre : gradoId,
    ciclo: ciclo,
    area: areaObj.nombre,
    competencias: areaObj.competencias.map((comp) => ({
      id: comp.id,
      nombre: comp.nombre,
      capacidades: comp.capacidades,
      estandar: comp.estandares[ciclo] || Object.values(comp.estandares)[0] || '',
      desempenos: comp.desempenos[gradoId] || comp.desempenos['1'] || []
    }))
  };
}

if (typeof module !== 'undefined') {
  module.exports = { cnebData, obtenerCurriculo };
}
