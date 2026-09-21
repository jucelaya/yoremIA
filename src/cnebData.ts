import {
  gradosSecundaria,
  areasSecundaria,
  competenciasTransversales
} from './cnebSecundariaData';

export { gradosSecundaria, areasSecundaria, competenciasTransversales };

/**
 * Base de Datos Curricular CNEB (Currículo Nacional de la Educación Básica - MINEDU Perú)
 * Contiene taxonomía oficial: Áreas, Competencias, Capacidades literales, Estándares por ciclo y Desempeños graduados.
 * 0 TOKENS de consumo de API para datos normativos.
 */

export interface CompetenciaCNEB {
  id: string;
  nombre: string;
  capacidades: string[];
  estandares: Record<string, string>; // cicloId -> texto
  desempenos: Record<string, string[]>; // gradoId -> lista de desempeños literales
}

export interface AreaCNEB {
  id: string;
  nombre: string;
  color: string;
  competencias: CompetenciaCNEB[];
}

export interface NivelEducativo {
  id: 'Primaria' | 'Secundaria';
  nombre: string;
  grados: { id: string; nombre: string; ciclo: string }[];
  areas: AreaCNEB[];
}

export const cnebData: { niveles: NivelEducativo[] } = {
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
          color: 'indigo',
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
                'Ciclo III': 'Resuelve problemas referidos a acciones de juntar, separar, agregar, quitar, igualar y comparar cantidades; y las traduce a expresiones de adición y sustracción, doble y mitad. Expresa su comprensión del valor de posición en números de hasta dos cifras y los representa mediante equivalencias entre unidades y decenas. Emplea estrategias diversas y procedimientos de cálculo mental y escrito.',
                'Ciclo IV': 'Resuelve problemas referidos a una o más acciones de agregar, quitar, igualar, repetir o repartir una cantidad, combinar dos colecciones de objetos, así como partir una unidad en partes iguales; traduciéndolas a expresiones aditivas y multiplicativas con números naturales y expresiones aditivas con fracciones usuales. Expresa su comprensión del sistema de numeración decimal con números hasta cuatro cifras.',
                'Ciclo V': 'Resuelve problemas referidos a una o más acciones de comparar, igualar, reiterar y dividir cantidades, y las traduce a expresiones aditivas y multiplicativas con números naturales y expresiones fraccionarias y decimales. Emplea estrategias heurísticas, de cálculo mental y escrito para operar con números naturales, fracciones y decimales exactos.'
              },
              desempenos: {
                '1': [
                  'Establece relaciones entre datos y acciones de agregar, quitar y juntar cantidades, y las transforma en expresiones numéricas de adición o sustracción con números naturales hasta 20.',
                  'Expresa con diversas representaciones y lenguaje numérico su comprensión de la decena como grupo de diez unidades y de las operaciones de adición y sustracción.',
                  'Emplea estrategias heurísticas y de cálculo mental (como la suma de cifras iguales, descomposición aditiva) para resolver problemas aditivos.'
                ],
                '2': [
                  'Establece relaciones entre datos y una o más acciones de agregar, quitar, avanzar, retroceder, juntar, separar, comparar e igualar cantidades, y las transforma en expresiones numéricas de adición o sustracción con números naturales de hasta dos cifras.',
                  'Expresa con diversas representaciones y lenguaje numérico su comprensión del número como ordinal al ordenar objetos hasta el vigésimo lugar, de la comparación entre números y de la decena.',
                  'Emplea estrategias y procedimientos de cálculo mental y escrito, como sumas o restas con y sin canjes usando material concreto y gráfico.'
                ],
                '3': [
                  'Establece relaciones entre datos y una o más acciones de agregar, quitar, comparar, igualar, reiterar, agrupar, repartir cantidades y combinar colecciones, y las transforma en expresiones numéricas de adición, sustracción, multiplicación y división con números naturales hasta tres cifras.',
                  'Expresa con diversas representaciones y lenguaje numérico su comprensión de la centena como nueva unidad en el sistema de numeración decimal y sus equivalencias con decenas y unidades.',
                  'Emplea estrategias y procedimientos como: estrategias heurísticas, estrategias de cálculo mental (descomposiciones aditivas y multiplicativas, duplicar o dividir por 2).'
                ],
                '4': [
                  'Establece relaciones entre datos y acciones de partir y repartir una unidad o colección de objetos en partes iguales y las transforma en expresiones numéricas de fracciones usuales.',
                  'Expresa con diversas representaciones y lenguaje numérico su comprensión de la multiplicación y división con números naturales hasta cuatro cifras y de fracciones como parte de una cantidad.',
                  'Emplea estrategias heurísticas, algoritmos formales de multiplicación y división y redondeo para resolver problemas en situaciones cotidianas.'
                ],
                '5': [
                  'Establece relaciones entre datos y una o más acciones de comparar, igualar, reiterar y dividir cantidades, y las transforma en expresiones numéricas de adición, sustracción, multiplicación y división con números naturales, y adición y sustracción con fracciones.',
                  'Expresa su comprensión del valor posicional en números hasta seis cifras y de números decimales hasta el centésimo, sus equivalencias y el orden.',
                  'Emplea estrategias heurísticas, cálculo mental y aproximaciones de números naturales y decimales exactos.'
                ],
                '6': [
                  'Establece relaciones entre datos y una o más acciones de comparar, igualar, reiterar, repartir y dividir cantidades, y las transforma en expresiones numéricas de operaciones combinadas con números naturales, fracciones y números decimales.',
                  'Expresa con representaciones concretas, gráficas y simbólicas su comprensión de los múltiplos y divisores, números primos y compuestos, y operaciones con fracciones y decimales.',
                  'Justifica sus procesos de resolución y los resultados obtenidos empleando propiedades de las operaciones.'
                ]
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
                'Ciclo III': 'Resuelve problemas que presentan equivalencias o regularidades; traduciéndolas a igualdades que contienen operaciones de adición o de sustracción y a patrones de repetición o aditivos con números hasta dos cifras.',
                'Ciclo IV': 'Resuelve problemas que presentan dos equivalencias, regularidades o relaciones de cambio entre dos magnitudes; traduciéndolas a igualdades que contienen adiciones, sustracciones o multiplicaciones y a patrones de repetición aditivos o multiplicativos.',
                'Ciclo V': 'Resuelve problemas de equivalencias, regularidades o relaciones de cambio entre dos magnitudes; traduciéndolas a ecuaciones que contienen las cuatro operaciones y a patrones de repetición o aditivos y multiplicativos con números naturales y decimales.'
              },
              desempenos: {
                '1': [
                  'Establece relaciones entre los datos que se repiten (objetos, colores, sonidos, movimientos) o entre cantidades que aumentan regularmente, y los transforma en patrones de repetición o aditivos.',
                  'Describe, usando lenguaje cotidiano y representaciones concretas, el patrón de repetición y cómo aumentan las cantidades.'
                ],
                '2': [
                  'Establece relaciones entre los datos que se repiten o regularidades en cantidades que aumentan o disminuyen de hasta 20 en 20, y los transforma en patrones aditivos.',
                  'Expresa su comprensión de la equivalencia entre dos grupos de objetos usando balanzas u objetos equilibrados y los signos = y ≠.'
                ],
                '3': [
                  'Establece relaciones de equivalencias entre dos grupos de hasta veinte objetos y las traslada a igualdades que contienen adiciones o sustracciones.',
                  'Describe la relación de cambio de una magnitud con respecto a otra, apoyándose en tablas o gráficos simples.'
                ],
                '4': [
                  'Establece relaciones entre datos de hasta dos equivalencias y las transforma en igualdades que contienen adiciones, sustracciones o multiplicaciones.',
                  'Describe la regla de formación de un patrón multiplicativo o aditivo con números de hasta tres cifras.'
                ],
                '5': [
                  'Establece relaciones entre datos y valores desconocidos de una equivalencia y relaciones de variación entre los datos de dos magnitudes, y las transforma en ecuaciones simples (por ejemplo: x + a = b) o en proporcionalidad directa.',
                  'Elabora afirmaciones sobre el término no inmediato en un patrón y las justifica con ejemplos.'
                ],
                '6': [
                  'Establece relaciones entre datos y valores desconocidos de una equivalencia y relaciones de variación entre dos magnitudes, y las transforma en ecuaciones con números naturales y proporcionalidad directa en tablas.',
                  'Justifica el valor de la incógnita en una ecuación y generaliza la regla de formación de un patrón.'
                ]
              }
            },
            {
              id: 'resuelve_forma',
              nombre: 'Resuelve problemas de forma, movimiento y localización',
              capacidades: [
                'Modela objetos con formas geométricas y sus transformaciones.',
                'Comunica su comprensión sobre las formas y relaciones geométricas.',
                'Usa estrategias y procedimientos para orientarse en el espacio.',
                'Argumenta afirmaciones sobre relaciones geométricas.'
              ],
              estandares: {
                'Ciclo III': 'Resuelve problemas al relacionar las características de los objetos del entorno con formas bidimensionales y tridimensionales. Expresa la ubicación de personas en relación a objetos en el espacio.',
                'Ciclo IV': 'Resuelve problemas en los que modela características de objetos con formas bidimensionales y tridimensionales, sus elementos y propiedades; y la ubicación y desplazamientos de objetos mediante coordenadas en cuadrículas.',
                'Ciclo V': 'Resuelve problemas modelando características de objetos con polígonos, círculos y prismas, y sus propiedades de volumen, área y perímetro; ubica y describe movimientos en el plano cartesiano.'
              },
              desempenos: {
                '1': ['Modela objetos con formas geométricas (círculos, cuadrados, triángulos, rectángulos) y describe sus características.'],
                '2': ['Describe con material concreto y dibujos las formas bidimensionales y tridimensionales a partir de sus lados, líneas rectas y curvas.'],
                '3': ['Establece relaciones entre las características de los objetos del entorno y las asocia con figuras geométricas planas y sólidos tridimensionales.'],
                '4': ['Establece relaciones entre las características de los objetos y las representa con formas bidimensionales (polígonos) y calcula perímetros y áreas.'],
                '5': ['Modela características de objetos mediante prismas rectos y cuadriláteros, y determina el perímetro, área y volumen de recipientes.'],
                '6': ['Resuelve situaciones problemáticas calculando áreas de polígonos regulares y circunferencias, y describe rotaciones y traslaciones en el plano.']
              }
            },
            {
              id: 'resuelve_datos',
              nombre: 'Resuelve problemas de gestión de datos e incertidumbre',
              capacidades: [
                'Representa datos con gráficos y medidas estadísticas o probabilísticas.',
                'Comunica su comprensión de los conceptos estadísticos y probabilísticos.',
                'Usa estrategias y procedimientos para recopilar y procesar datos.',
                'Sustenta conclusiones o decisiones con base en la información obtenida.'
              ],
              estandares: {
                'Ciclo III': 'Resuelve problemas organizando datos cualitativos en listas, tablas de conteo y pictogramas simples, y expresa la ocurrencia de sucesos cotidianos usando nociones como seguro, posible o imposible.',
                'Ciclo IV': 'Resuelve problemas recopilando datos mediante encuestas sencillas, procesándolos en tablas de doble entrada y gráficos de barras simples, determinando la moda.',
                'Ciclo V': 'Resuelve problemas que implican variables cualitativas y cuantitativas discretas, organizándolas en gráficos de barras dobles, gráficos de líneas y calculando la media aritmética y la moda.'
              },
              desempenos: {
                '1': ['Organiza datos en listas y tablas de conteo simple y los representa en pictogramas horizontales.'],
                '2': ['Interpreta información contenida en tablas de doble entrada y gráficos de barras simples a partir de situaciones del entorno.'],
                '3': ['Recopila datos mediante preguntas sencillas y los representa en tablas de doble entrada y gráficos de barras verticales.'],
                '4': ['Interpreta la moda y deduce conclusiones a partir de información obtenida en gráficos de barras simples y tablas de doble entrada.'],
                '5': ['Elabora tablas de frecuencia y gráficos de barras dobles para comparar dos conjuntos de datos referidos a una misma situación.'],
                '6': ['Calcula e interpreta la media aritmética y la moda, e identifica sucesos equiprobables en juegos de azar.']
              }
            }
          ]
        },
        {
          id: 'comunicacion',
          nombre: 'Comunicación',
          color: 'sky',
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
                'Ciclo III': 'Se comunica oralmente mediante diversos tipos de textos; identifica información explícita, infiere e interpreta hechos y temas, emite opinión sobre lo que escuchó y utiliza recursos no verbales para enfatizar lo que dice.',
                'Ciclo IV': 'Se comunica oralmente mediante diversos tipos de textos; deduce relaciones lógicas entre las ideas expresadas, organiza ideas en torno a un tema y opina sobre contenidos y posturas con argumentos pertinentes.',
                'Ciclo V': 'Se comunica oralmente mediante textos orales formales e informales; evalúa la adecuación del texto al propósito comunicativo, infiere intenciones del emisor y participa de debates y asambleas respetando turnos.'
              },
              desempenos: {
                '1': [
                  'Recupera información explícita de los textos orales que escucha (nombres de personas y personajes, hechos y lugares) seleccionando datos específicos.',
                  'Deduce características implícitas de personas, animales, objetos y lugares, así como relaciones lógicas de causa-efecto.',
                  'Participa en juegos de roles e intercambios orales formulando preguntas sobre lo que le interesa saber.'
                ],
                '2': [
                  'Recupera información explícita de los textos orales que escucha y relata con sus propias palabras sucesos importantes.',
                  'Explica acciones de personajes o personas a partir de lo que escucha y expresa sus gustos y preferencias.',
                  'Emplea recursos no verbales (gestos, movimientos corporales) y modula el volumen de su voz según la situación comunicativa.'
                ],
                '3': [
                  'Recupera información explícita de textos orales seleccionando datos específicos con vocabulario de uso frecuente.',
                  'Explica el tema, el propósito comunicativo y las relaciones de causa-efecto en textos narrativos e instructivos.',
                  'Expresa oralmente ideas y emociones en torno a un tema, evitando reiteraciones innecesarias.'
                ],
                '4': [
                  'Deduce relaciones lógicas (semejanza, diferencia, causa-efecto) entre las ideas del texto oral a partir de información explícita.',
                  'Adecúa su texto oral a la situación comunicativa y al propósito, utilizando un registro formal e informal según el interlocutor.',
                  'Participa en asambleas y debates aportando ideas pertinentes y fundamentadas.'
                ],
                '5': [
                  'Recupera información relevante de textos orales complejos y sintetiza los puntos clave del mensaje.',
                  'Infiere el sentido global del texto, intenciones del interlocutor y recursos estilísticos (ironías, metáforas cotidianas).',
                  'Evalúa la eficacia de los recursos verbales y no verbales empleados por el hablante.'
                ],
                '6': [
                  'Adecúa el texto oral a situaciones comunicativas formales e informales con precisión léxica y argumentos estructurados.',
                  'Evalúa la adecuación del texto oral al propósito y contrasta posturas de diferentes interlocutores en foros y exposiciones.'
                ]
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
                'Ciclo III': 'Lee diversos tipos de textos de estructura simple en los que predominan palabras conocidas e ilustraciones que apoyan las ideas centrales. Obtiene información poco evidente distinguiéndola de otra semejante y realiza inferencias locales a partir de información explícita.',
                'Ciclo IV': 'Lee diversos tipos de textos que presentan estructura simple con algunos elementos complejos y con vocabulario variado. Obtiene información e integra datos que están en distintas partes del texto. Realiza inferencias locales a partir de información explícita e implícita.',
                'Ciclo V': 'Lee diversos tipos de textos con varios elementos complejos en su estructura y con vocabulario variado. Sintetiza información relevante y deduce el tema central, subtemas, ideas principales y relaciones causa-efecto o semejanzas y diferencias.'
              },
              desempenos: {
                '1': [
                  'Identifica información explícita que es claramente distinguible de otra porque la relaciona con palabras conocidas o porque se encuentra en lugares evidentes como el título, subtítulo, inicio, final.',
                  'Deduce características de personajes, animales, objetos y lugares, así como relaciones de causa-efecto a partir de ilustraciones y texto.',
                  'Predice de qué tratará el texto y cuál es su propósito comunicativo, a partir de indicios como título, ilustraciones y formato.'
                ],
                '2': [
                  'Identifica información explícita que se encuentra en distintas partes del texto narrativo, descriptivo o instructivo.',
                  'Deduce la causa de un hecho y la acción de un personaje a partir del texto y las imágenes.',
                  'Explica el tema y el propósito de los textos que lee por sí mismo, así como las relaciones texto-ilustración.'
                ],
                '3': [
                  'Identifica información explícita que se encuentra en distintas partes del texto con vocabulario variado.',
                  'Deduce características implícitas de personajes, animales, objetos y lugares, y determina el significado de palabras según el contexto.',
                  'Opina sobre el contenido del texto a partir de su experiencia y del contexto sociocultural en el que se desenvuelve.'
                ],
                '4': [
                  'Identifica información explícita y complementaria ubicada en distintas partes del texto continuo y discontinuo.',
                  'Deduce la idea principal, conclusiones e intenciones del autor a partir de marcas textuales.',
                  'Contrasta información de dos textos que tratan sobre un mismo tema.'
                ],
                '5': [
                  'Identifica información relevante en textos con estructura compleja y vocabulario variado y especializado.',
                  'Deduce relaciones lógicas de causa-efecto, problema-solución e intención del autor a partir de elementos del texto.',
                  'Evalúa la función de elementos paratextuales (imágenes, gráficos, tablas) en el texto que lee.'
                ],
                '6': [
                  'Sintetiza la información relevante en textos con varios elementos complejos y distingue la idea principal de las secundarias.',
                  'Deduce el significado de palabras por contexto y analiza la postura ética o intencionalidad del autor.',
                  'Emite un juicio crítico sobre la validez de la información y la vigencia de los argumentos expuestos.'
                ]
              }
            },
            {
              id: 'escribe_diversos_textos',
              nombre: 'Escribe diversos tipos de textos en su lengua materna',
              capacidades: [
                'Adecúa el texto a la situación comunicativa.',
                'Organiza y desarrolla las ideas de forma coherente y cohesionada.',
                'Utiliza convenciones del lenguaje escrito de forma pertinente.',
                'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
              ],
              estandares: {
                'Ciclo III': 'Escribe diversos tipos de textos de forma reflexiva. Adecúa al propósito y el destinatario a partir de su experiencia previa. Organiza y desarrolla lógicamente las ideas en torno a un tema y utiliza conectores para relacionarlas.',
                'Ciclo IV': 'Escribe diversos tipos de textos de forma reflexiva. Adecúa su texto al destinatario, propósito y el registro a partir de su experiencia previa. Organiza y desarrolla lógicamente las ideas en párrafos coherentes y cohesionados.',
                'Ciclo V': 'Escribe diversos tipos de textos de forma reflexiva. Adecúa su texto a la situación comunicativa considerando el propósito, el destinatario y las características del tipo textual. Utiliza recursos gramaticales y ortográficos que contribuyen a dar claridad.'
              },
              desempenos: {
                '1': [
                  'Adecúa el texto a la situación comunicativa considerando el propósito comunicativo y el destinatario, recurriendo a su experiencia previa para escribir.',
                  'Escribe en nivel alfabético en torno a un tema, aunque en ocasiones puede salirse de este o reiterar información innecesariamente.',
                  'Revisa el texto con ayuda del docente para comprobar si se entiende y responde al propósito planteado.'
                ],
                '2': [
                  'Adecúa el texto a la situación comunicativa considerando el propósito comunicativo y el destinatario.',
                  'Escribe textos narrativos y descriptivos en torno a un tema, incorporando conectores cronológicos y de adición.',
                  'Utiliza las mayúsculas y el punto final para dar sentido y claridad a sus producciones escritas.'
                ],
                '3': [
                  'Adecúa el texto a la situación comunicativa considerando el propósito comunicativo, destinatario y tipo textual.',
                  'Escribe textos organizando sus ideas en párrafos y las desarrolla para ampliar la información sin digresiones.',
                  'Utiliza recursos ortográficos básicos (punto seguido, punto aparte, coma enumerativa) para separar expresiones.'
                ],
                '4': [
                  'Escribe textos explicativos y argumentativos breves utilizando vocabulario variado y conectores de causa y consecuencia.',
                  'Utiliza recursos gramaticales y ortográficos (acentuación gráfica, comillas, signos de interrogación) que dan sentido a su texto.',
                  'Revisa su texto para verificar si se ajusta a la situación comunicativa y si las ideas mantienen coherencia.'
                ],
                '5': [
                  'Adecúa el texto a la situación comunicativa determinando el registro formal o informal y las fuentes de información pertinentes.',
                  'Escribe textos con coherencia y cohesión, empleando variedad de conectores y referentes para evitar redundancias.',
                  'Evalúa de manera permanente el texto para determinar si las ideas son claras y si cumple con el propósito comunicativo.'
                ],
                '6': [
                  'Escribe textos argumentativos y expositivos con estructura definida (introducción, desarrollo y conclusión).',
                  'Aplica normas ortográficas y gramaticales complejas para enriquecer el estilo y precisión de su redacción.',
                  'Evalúa la eficacia de los recursos estilísticos y de cohesión textual empleados en su escrito final.'
                ]
              }
            }
          ]
        },
        {
          id: 'ciencia_tecnologia',
          nombre: 'Ciencia y Tecnología',
          color: 'emerald',
          competencias: [
            {
              id: 'indaga_metodos_cientificos',
              nombre: 'Indaga mediante métodos científicos para construir conocimientos',
              capacidades: [
                'Problematiza situaciones para hacer indagación.',
                'Diseña estrategias para hacer indagación.',
                'Genera y registra datos e información.',
                'Analiza datos e información.',
                'Evalúa y comunica el proceso y resultados de su indagación.'
              ],
              estandares: {
                'Ciclo III': 'Indaga al explorar objetos o fenómenos, hace preguntas, propone posibles respuestas y actividades para obtener información. Registra datos en dibujos y tablas y comunica lo que aprendió.',
                'Ciclo IV': 'Indaga al proponer preguntas de investigación sobre hechos y fenómenos naturales; propone un plan de acción para observar y medir variables; registra datos y los compara para formular conclusiones.',
                'Ciclo V': 'Indaga a partir de preguntas y plantea hipótesis con base en conocimientos científicos; diseña un plan de recojo de datos controlando variables; analiza tendencias y evalúa la fiabilidad del procedimiento.'
              },
              desempenos: {
                '1': ['Hace preguntas acerca de hechos o fenómenos que observa a su alrededor y propone posibles respuestas basadas en sus experiencias.'],
                '2': ['Propone acciones que le permiten responder a la pregunta de indagación y utiliza materiales sencillos para registrar datos.'],
                '3': ['Hace preguntas sobre hechos, fenómenos u objetos naturales o tecnológicos que explora y elabora una posible explicación.'],
                '4': ['Propone un plan donde describe las acciones y los procedimientos que utilizará para recoger información acerca de los factores relacionados con el problema.'],
                '5': ['Formula preguntas acerca de las variables que influyen en un hecho, fenómeno u objeto natural o tecnológico y selecciona aquella que puede ser indagada.'],
                '6': ['Compara los datos cuantitativos y cualitativos recogidos para establecer relaciones de causalidad y contrasta con su hipótesis inicial.']
              }
            }
          ]
        },
        {
          id: 'personal_social',
          nombre: 'Personal Social',
          color: 'amber',
          competencias: [
            {
              id: 'convive_participa',
              nombre: 'Convive y participa democráticamente en la búsqueda del bien común',
              capacidades: [
                'Interactúa con todas las personas.',
                'Construye normas y asume acuerdos y leyes.',
                'Maneja conflictos de manera constructiva.',
                'Delibera sobre asuntos públicos.',
                'Participa en acciones que promueven el bienestar común.'
              ],
              estandares: {
                'Ciclo III': 'Convive y participa democráticamente cuando se relaciona con los demás respetando las diferencias y cumpliendo con sus deberes. Participa en la elaboración y cumplimiento de normas del aula.',
                'Ciclo IV': 'Convive y participa democráticamente mostrando respeto por las costumbres y tradiciones de sus compañeros. Utiliza el diálogo para resolver conflictos y delibera sobre asuntos públicos de su escuela.',
                'Ciclo V': 'Convive y participa democráticamente respetando las normas y las leyes. Propone y evalúa acuerdos de convivencia para el bien común, y delibera sobre problemas de su comunidad proponiendo soluciones viables.'
              },
              desempenos: {
                '1': ['Comparte con sus compañeros las costumbres y actividades de su familia e institución educativa manifestando afecto y respeto.'],
                '2': ['Participa en la elaboración de acuerdos y normas que reflejen el buen trato entre compañeros, y los cumple de manera responsable.'],
                '3': ['Muestra un trato respetuoso e inclusivo con sus compañeros de aula y propone alternativas pacíficas para resolver desacuerdos.'],
                '4': ['Delibera sobre asuntos de interés público del aula y la escuela para proponer y participar en actividades colectivas orientadas al bien común.'],
                '5': ['Muestra interés por participar en acciones orientadas al cuidado del ambiente y el respeto por los derechos de todos.'],
                '6': ['Evalúa el cumplimiento de las normas de convivencia en la escuela y participa en iniciativas para la solución de problemáticas ciudadanas.']
              }
            }
          ]
        }
      ]
    },
    {
      id: 'Secundaria',
      nombre: 'Educación Secundaria',
      grados: gradosSecundaria,
      areas: areasSecundaria
    }
  ]
};

/**
 * 7 Enfoques Transversales oficiales del MINEDU (CNEB)
 */
export const enfoquesTransversales = [
  {
    id: 'derechos',
    nombre: 'Enfoque de Derechos',
    valores: 'Libertad y responsabilidad, Diálogo y concertación',
    actitud: 'Disposición a conversar con otras personas, intercambiando ideas o afectos de modo alternativo para construir juntos una postura común.'
  },
  {
    id: 'inclusivo',
    nombre: 'Enfoque Inclusivo o de Atención a la Diversidad',
    valores: 'Respeto por las diferencias, Equidad en la enseñanza, Confianza en la persona',
    actitud: 'Disposición a enseñar ofreciendo a los estudiantes las condiciones y oportunidades que cada uno necesita para lograr los mismos resultados.'
  },
  {
    id: 'intercultural',
    nombre: 'Enfoque Intercultural',
    valores: 'Respeto a la identidad cultural, Justicia, Diálogo intercultural',
    actitud: 'Reconocimiento al valor de las diversas identidades culturales y relaciones de pertenencia de los estudiantes.'
  },
  {
    id: 'igualdad_genero',
    nombre: 'Enfoque Igualdad de Género',
    valores: 'Igualdad y Dignidad, Justicia, Empatía',
    actitud: 'Reconocimiento al valor inherente de cada persona, por encima de cualquier diferencia de género.'
  },
  {
    id: 'ambiental',
    nombre: 'Enfoque Ambiental',
    valores: 'Solidaridad planetaria y equidad intergeneracional, Justicia y solidaridad, Respeto a toda forma de vida',
    actitud: 'Disposición para colaborar con el bienestar y la calidad de vida de las generaciones presentes y futuras, así como con la naturaleza.'
  },
  {
    id: 'orientacion_bien_comun',
    nombre: 'Enfoque Orientación al Bien Común',
    valores: 'Equidad y justicia, Solidaridad, Empatía, Responsabilidad',
    actitud: 'Disposición a valorar y proteger los bienes comunes y compartidos de un colectivo.'
  },
  {
    id: 'excelencia',
    nombre: 'Enfoque Búsqueda de la Excelencia',
    valores: 'Flexibilidad y apertura, Superación personal',
    actitud: 'Disposición para adaptarse a los cambios, modificando si fuera necesario la propia conducta para alcanzar determinados objetivos cuando surgen dificultades.'
  }
];

/**
 * Función oficial solicitada: obtenerCurriculo(nivel, grado, area, competenciaId)
 * Extrae automáticamente datos normativos para inyectarlos sin consumir API.
 */
export function obtenerCurriculo(
  nivelNombre: 'Primaria' | 'Secundaria',
  gradoId: string,
  areaId: string,
  competenciaId?: string
) {
  const nivelObj = cnebData.niveles.find((n) => n.id === nivelNombre);
  if (!nivelObj) return null;

  const gradoObj = nivelObj.grados.find((g) => g.id === gradoId);
  const ciclo = gradoObj?.ciclo || (nivelNombre === 'Primaria' ? 'Ciclo III' : 'Ciclo VI');

  const areaObj = nivelObj.areas.find((a) => a.id.toLowerCase() === areaId.toLowerCase());
  if (!areaObj) return null;

  if (competenciaId) {
    const comp = areaObj.competencias.find(
      (c) => c.id.toLowerCase() === competenciaId.toLowerCase()
    );
    if (!comp) return null;

    return {
      nivel: nivelNombre,
      grado: gradoObj?.nombre || gradoId,
      ciclo,
      area: areaObj.nombre,
      competencia: comp.nombre,
      capacidades: comp.capacidades,
      estandar: comp.estandares[ciclo] || Object.values(comp.estandares)[0] || '',
      desempenos: comp.desempenos[gradoId] || comp.desempenos['1'] || []
    };
  }

  // Devolver todas las competencias del área para este grado y ciclo
  return {
    nivel: nivelNombre,
    grado: gradoObj?.nombre || gradoId,
    ciclo,
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
