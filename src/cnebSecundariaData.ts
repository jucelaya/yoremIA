import { AreaCNEB, CompetenciaCNEB } from './cnebData';

/**
 * Matriz Maestra de Competencias - Educación Secundaria (1.° a 5.° | Ciclos VI y VII)
 * Currículo Nacional de la Educación Básica (CNEB - RM N.° 281-2016-MINEDU y RM N.° 159-2017-MINEDU)
 * 
 * 11 Áreas curriculares oficiales + 29 competencias de área
 * 2 Competencias transversales
 * Total: 31 competencias
 */

export const gradosSecundaria = [
  { id: '1', nombre: '1° de Secundaria', ciclo: 'Ciclo VI' },
  { id: '2', nombre: '2° de Secundaria', ciclo: 'Ciclo VI' },
  { id: '3', nombre: '3° de Secundaria', ciclo: 'Ciclo VII' },
  { id: '4', nombre: '4° de Secundaria', ciclo: 'Ciclo VII' },
  { id: '5', nombre: '5° de Secundaria', ciclo: 'Ciclo VII' }
];

export const areasSecundaria: AreaCNEB[] = [
  // 1. Desarrollo Personal, Ciudadanía y Cívica
  {
    id: 'dpcc',
    nombre: 'Desarrollo Personal, Ciudadanía y Cívica',
    color: 'rose',
    competencias: [
      {
        id: 'dpcc_identidad',
        nombre: 'Construye su identidad',
        capacidades: [
          'Se valora a sí mismo.',
          'Autorregula sus emociones.',
          'Reflexiona y argumenta éticamente.',
          'Vive su sexualidad de manera integral y responsable de acuerdo a su etapa de desarrollo y madurez.'
        ],
        estandares: {
          'Ciclo VI': 'Construye su identidad al tomar conciencia de los aspectos que lo hacen único, cuando se reconoce a sí mismo a partir de sus características personales, culturales y sociales, y de sus logros, valorando el aporte de una familia en su formación. Emplea estrategias de autorregulación emocional y reflexiona sobre principios éticos.',
          'Ciclo VII': 'Construye su identidad al tomar conciencia de los aspectos que lo hacen único, evaluando sus características, aspiraciones y potencialidades con sentido de autonomía y pertenencia a una comunidad. Argumenta su postura ética frente a dilemas morales y autorregula sus emociones para una convivencia armoniosa.'
        },
        desempenos: {
          '1': [
            'Explica los cambios propios de su etapa de desarrollo y cómo influyen en la construcción de su identidad y autoestima.',
            'Describe sus potencialidades y limitaciones personales proponiendo pautas de superación constante.',
            'Emplea estrategias de autorregulación emocional (respiración, relajación, distanciamiento) en situaciones de tensión escolar.'
          ],
          '2': [
            'Manifiesta sus emociones y utiliza estrategias asertivas para expresar desacuerdos constructivamente.',
            'Valora su pertenencia a una familia y a una comunidad cultural reconociendo tradiciones y costumbres formativas.',
            'Sustenta sus decisiones éticas frente a dilemas de la vida cotidiana apelando a principios de justicia y equidad.'
          ],
          '3': [
            'Sustenta con argumentos éticos sus decisiones ante dilemas morales cotidianos y rechaza toda forma de discriminación o violencia.',
            'Evalúa las consecuencias de sus actos sobre sí mismo y sobre los demás, actuando con responsabilidad e integridad.',
            'Expresa sus puntos de vista sobre la sexualidad responsable y el cuidado integral de su salud física y emocional.'
          ],
          '4': [
            'Evalúa la influencia del entorno social, los pares y los medios de comunicación en la construcción de su proyecto de vida.',
            'Examina críticamente prejuicios y estereotipos de género presentes en la sociedad y defiende la igualdad de oportunidades.',
            'Muestra apertura al diálogo intercultural y respeto hacia diversas formas de expresión de la identidad personal.'
          ],
          '5': [
            'Manifiesta convicciones éticas sólidas y defiende los derechos humanos en el ejercicio pleno de su autonomía personal y ciudadana.',
            'Formula un proyecto de vida coherente con sus metas vocacionales, valores éticos y el bienestar de su comunidad.',
            'Autorregula sus emociones y comportamientos en situaciones de alta exigencia, mostrando resiliencia y liderazgo empático.'
          ]
        }
      },
      {
        id: 'dpcc_convive',
        nombre: 'Convive y participa democráticamente en la búsqueda del bien común',
        capacidades: [
          'Interactúa con todas las personas.',
          'Construye normas y asume acuerdos y leyes.',
          'Maneja conflictos de manera constructiva.',
          'Delibera sobre asuntos públicos.',
          'Participa en acciones que promueven el bienestar común.'
        ],
        estandares: {
          'Ciclo VI': 'Convive y participa democráticamente cuando se relaciona con las demás personas, respetando las diferencias y los derechos de cada uno, cumpliendo sus deberes y buscando que otros también los cumplan. Propone y evalúa normas de convivencia y delibera sobre asuntos públicos con argumentos.',
          'Ciclo VII': 'Convive y participa democráticamente con base en principios democráticos y de derechos humanos. Evalúa las normas y leyes de la sociedad, utiliza el diálogo y la mediación para resolver conflictos y lidera acciones participativas orientadas al bien común y la justicia social.'
        },
        desempenos: {
          '1': [
            'Establece relaciones de respeto e igualdad con sus compañeros, promoviendo la inclusión y el cumplimiento de los acuerdos de convivencia en el aula.',
            'Interviene en la formulación de normas de aula basadas en el bien común y en el reconocimiento de deberes y derechos.',
            'Explica las causas de conflictos cotidianos en la escuela y recurre al diálogo para alcanzar acuerdos pacíficos.'
          ],
          '2': [
            'Aplica mecanismos de diálogo y mediación para transformar conflictos escolares en oportunidades de aprendizaje constructivo.',
            'Delibera sobre asuntos públicos locales (seguridad vial, cuidado de espacios públicos) utilizando fuentes confiables de información.',
            'Participa cooperativamente en proyectos orientados a mejorar el clima institucional y la solidaridad escolar.'
          ],
          '3': [
            'Delibera sobre asuntos públicos de su comunidad fundamentando su postura en la Constitución Política del Perú y los derechos humanos.',
            'Evalúa la vigencia de las normas y leyes que rigen en su entorno y propone reformas que favorezcan la justicia y la no discriminación.',
            'Promueve campañas escolares contra el acoso escolar (bullying) y toda forma de violencia física o psicológica.'
          ],
          '4': [
            'Propone y ejecuta iniciativas colectivas en favor de los sectores más vulnerables de su entorno escolar y local.',
            'Maneja conflictos complejos mediante la negociación y la mediación pacífica, priorizando el restablecimiento de la confianza mutua.',
            'Sustenta su opinión sobre el rol de las instituciones del Estado en la preservación de la institucionalidad democrática.'
          ],
          '5': [
            'Ejerce una ciudadanía activa evaluando críticamente las políticas públicas y las instituciones del Estado democrático de derecho.',
            'Lidera proyectos de participación comunitaria en defensa del patrimonio cultural, el medio ambiente y los derechos fundamentales.',
            'Promueve una cultura de paz y legalidad rechazando la corrupción y la impunidad en todos los niveles sociales.'
          ]
        }
      }
    ]
  },

  // 2. Ciencias Sociales
  {
    id: 'ciencias_sociales',
    nombre: 'Ciencias Sociales',
    color: 'amber',
    competencias: [
      {
        id: 'cs_historicas',
        nombre: 'Construye interpretaciones históricas',
        capacidades: [
          'Interpreta críticamente fuentes diversas.',
          'Comprende el tiempo histórico.',
          'Elabora explicaciones sobre procesos históricos.'
        ],
        estandares: {
          'Ciclo VI': 'Construye interpretaciones históricas sobre hechos o procesos del Perú y el mundo desde el origen de la humanidad hasta la caída del Tahuantinsuyo; analiza diversas fuentes y reconoce la simultaneidad de procesos históricos.',
          'Ciclo VII': 'Construye interpretaciones históricas sobre procesos del siglo XIX y XX en el Perú y el mundo; contrasta fuentes historiográficas reconociendo intencionalidades y explica las causas y consecuencias estructurales.'
        },
        desempenos: {
          '1': [
            'Utiliza fuentes históricas primarias y secundarias para obtener información sobre el poblamiento de América y las sociedades andinas prehispánicas.',
            'Explica las causas y consecuencias de hechos o procesos históricos desde el origen de la humanidad hasta las primeras civilizaciones andinas.',
            'Sitúa en orden cronológico civilizaciones preincas utilizando líneas de tiempo y conceptos de periodificación.'
          ],
          '2': [
            'Explica las causas y consecuencias de la expansión europea en América y la caída del Tahuantinsuyo identificando cambios y continuidades.',
            'Contrasta diversas interpretaciones sobre el impacto de la conquista y el virreinato en las poblaciones originarias.',
            'Establece relaciones entre procesos simultáneos ocurridos en Europa y en el espacio andino virreinal.'
          ],
          '3': [
            'Contrasta interpretaciones sobre el proceso de Independencia del Perú y el establecimiento de la República reconociendo posturas divergentes.',
            'Explica los cambios políticos, sociales y económicos ocurridos tras la emancipación y en la época del guano y el salitre.',
            'Evalúa el rol de distintos actores sociales (indígenas, afrodescendientes, criollos y mujeres) en la gesta de la Independencia.'
          ],
          '4': [
            'Explica los factores económicos y geopolíticos que desencadenaron la Guerra del Pacífico y su impacto en la sociedad peruana contemporánea.',
            'Analiza fuentes historiográficas primarias sobre la República Aristocrática y las transformaciones sociales del siglo XX.',
            'Compara las consecuencias de la Primera y Segunda Guerra Mundial en el ordenamiento geopolítico internacional y en América Latina.'
          ],
          '5': [
            'Elabora explicaciones complejas sobre el conflicto armado interno en el Perú y el retorno a la democracia, integrando testimonios y fuentes oficiales.',
            'Analiza las causas estructurales y los impactos de las reformas agrarias y políticas populistas en el Perú del siglo XX.',
            'Sustenta una postura crítica sobre los desafíos de la memoria histórica y la consolidación de la democracia en el siglo XXI.'
          ]
        }
      },
      {
        id: 'cs_espacio_ambiente',
        nombre: 'Gestiona responsablemente el espacio y el ambiente',
        capacidades: [
          'Comprende las relaciones entre los elementos naturales y sociales.',
          'Maneja fuentes de información para comprender el espacio geográfico y el ambiente.',
          'Genera acciones para conservar el ambiente local y global.'
        ],
        estandares: {
          'Ciclo VI': 'Gestiona responsablemente el espacio y el ambiente al realizar actividades orientadas al cuidado de su localidad; explica los factores de vulnerabilidad ante desastres naturales y utiliza mapas para ubicar elementos geográficos.',
          'Ciclo VII': 'Gestiona responsablemente el espacio y el ambiente al proponer acciones sustentables frente al cambio climático y la deforestación; analiza problemáticas territoriales complejas y la gestión de cuencas hidrográficas.'
        },
        desempenos: {
          '1': [
            'Describe las características de las ocho regiones naturales del Perú y la influencia de las actividades humanas en la transformación del relieve.',
            'Identifica zonas de riesgo y vulnerabilidad ante sismos o inundaciones en su localidad y participa en planes de contingencia escolar.',
            'Utiliza planos, mapas y coordenadas para ubicar elementos naturales y sociales en su espacio geográfico inmediato.'
          ],
          '2': [
            'Explica cómo las actividades económicas transforman los ecosistemas y cómo influye el relieve en la vida de las poblaciones peruanas.',
            'Propone medidas de prevención y mitigación de desastres frente al Fenómeno El Niño y heladas en zonas vulnerables.',
            'Analiza el uso responsable del agua y la gestión de residuos sólidos en su institución educativa y hogar.'
          ],
          '3': [
            'Utiliza coordenadas geográficas, mapas temáticos e imágenes satelitales para analizar problemáticas ambientales y territoriales locales.',
            'Explica las causas y efectos de la deforestación y la contaminación minera en las cuencas hidrográficas del Perú.',
            'Promueve proyectos comunitarios de arborización, reciclaje y uso eficiente de los recursos naturales.'
          ],
          '4': [
            'Explica los impactos del calentamiento global y la pérdida de biodiversidad en los ecosistemas peruanos y propone alternativas de mitigación.',
            'Analiza el crecimiento desordenado de las ciudades y la vulnerabilidad urbana ante eventos climatológicos extremos.',
            'Evalúa la eficacia de las áreas naturales protegidas (ANP) en la conservación de la flora y fauna endémica.'
          ],
          '5': [
            'Diseña y sustenta un plan de gestión ambiental y ordenamiento territorial para la conservación sostenible de una cuenca hidrográfica.',
            'Analiza conflictos socioambientales vinculados a la minería, hidrocarburos y agricultura intensiva proponiendo soluciones de consenso.',
            'Promueve la adopción de los Objetivos de Desarrollo Sostenible (ODS) y energías limpias en su comunidad y región.'
          ]
        }
      },
      {
        id: 'cs_recursos_economicos',
        nombre: 'Gestiona responsablemente los recursos económicos',
        capacidades: [
          'Comprende las relaciones entre los elementos del sistema económico y financiero.',
          'Toma decisiones económicas y financieras.'
        ],
        estandares: {
          'Ciclo VI': 'Gestiona responsablemente los recursos económicos al promover el ahorro y el consumo informado; reconoce que los recursos son escasos y explica el rol del dinero y de los bancos en la economía familiar.',
          'Ciclo VII': 'Gestiona responsablemente los recursos económicos al formular presupuestos considerando variables macroeconómicas; evalúa productos financieros y comprende los derechos del consumidor y el sistema tributario.'
        },
        desempenos: {
          '1': [
            'Explica cómo la escasez de recursos influye en las decisiones de consumo de las familias y elabora un presupuesto mensual básico.',
            'Reconoce la importancia del ahorro familiar y diferencia entre necesidades primarias y deseos o gastos superfluos.',
            'Identifica las funciones del dinero y el papel del Banco Central de Reserva en la estabilidad económica.'
          ],
          '2': [
            'Analiza las funciones de los agentes económicos (familias, empresas y Estado) y el impacto del pago de tributos en los servicios públicos.',
            'Explica cómo el pago de impuestos ante la SUNAT financia hospitales, colegios e infraestructura pública esencial.',
            'Diferencia entre compras al contado y al crédito, evaluando las tasas de interés y los riesgos del sobreendeudamiento.'
          ],
          '3': [
            'Evalúa críticamente la publicidad y promociones comerciales antes de tomar decisiones de compra responsable.',
            'Analiza los derechos del consumidor protegidos por INDECOPI y formula reclamos fundamentados ante cobros indebidos.',
            'Formula un plan de ahorro e inversión familiar considerando metas de corto y mediano plazo.'
          ],
          '4': [
            'Analiza las ventajas y riesgos de los instrumentos financieros de crédito y ahorro formal frente a los informales.',
            'Explica cómo la inflación y el tipo de cambio afectan el poder adquisitivo de los salarios y el costo de vida.',
            'Evalúa los costos financieros totales (TCEA) en préstamos bancarios y tarjetas de crédito antes de contratar un servicio.'
          ],
          '5': [
            'Propone estrategias de inversión y ahorro responsable a largo plazo evaluando la inflación y las políticas macroeconómicas.',
            'Analiza los desafíos del mercado laboral juvenil y los beneficios de la formalización empresarial y tributaria.',
            'Sustenta un plan de negocios sostenible considerando costos de producción, rentabilidad y responsabilidad social.'
          ]
        }
      }
    ]
  },

  // 3. Educación Religiosa
  {
    id: 'educacion_religiosa',
    nombre: 'Educación Religiosa',
    color: 'purple',
    competencias: [
      {
        id: 'rel_identidad',
        nombre: 'Construye su identidad como persona humana, amada por Dios, digna, libre y trascendente, comprendiendo la doctrina de su propia religión, abierto al diálogo con las que le son cercanas',
        capacidades: [
          'Conoce a Dios y asume su identidad religiosa y espiritual como persona digna, libre y trascendente.',
          'Cultiva y valora las manifestaciones religiosas de su entorno argumentando su fe de manera comprensible y respetuosa.'
        ],
        estandares: {
          'Ciclo VI': 'Fundamenta su fe reconociendo el plan de salvación de Dios en Jesucristo; valora su dignidad de hijo de Dios y promueve el respeto interreligioso y la fraternidad en su entorno escolar.',
          'Ciclo VII': 'Fundamenta la presencia viva de Dios en la historia y en el magisterio de la Iglesia; asume un compromiso ético y moral defendiendo la vida humana y la dignidad en todas sus dimensiones.'
        },
        desempenos: {
          '1': [
            'Reconoce en los pasajes bíblicos la manifestación del amor de Dios en la Creación y en la historia de salvación.',
            'Explica el valor inalienable de la persona humana creada a imagen y semejanza de Dios.',
            'Participa con respeto en expresiones de fe y devoción religiosa de su comunidad escolar y local.'
          ],
          '2': [
            'Explica el mensaje evangélico de las Bienaventuranzas como camino de plenitud humana y solidaridad con los más necesitados.',
            'Reconoce la presencia de Jesucristo en los sacramentos de iniciación cristiana y su llamada a la santidad cotidiana.',
            'Promueve el diálogo respetuoso y fraterno con compañeros que profesan credos o creencias diferentes.'
          ],
          '3': [
            'Acoge las enseñanzas de Jesús y reflexiona sobre el sentido del perdón y la reconciliación en su vida comunitaria.',
            'Fundamenta la importancia de la oración personal y litúrgica como encuentro íntimo con Dios Padre.',
            'Valora la tradición profética del Antiguo Testamento que clama por la justicia social y la defensa del oprimido.'
          ],
          '4': [
            'Dialoga con respeto con personas de distintas confesiones religiosas identificando valores universales compartidos.',
            'Analiza el Magisterio de la Iglesia sobre dilemas bioéticos y la defensa de la vida desde la concepción hasta su fin natural.',
            'Reconoce el testimonio de santos y mártires que dieron su vida por la fe y la justicia en el Perú y el mundo.'
          ],
          '5': [
            'Fundamenta su proyecto de vida en los valores del Evangelio y la Doctrina Social de la Iglesia frente a los desafíos contemporáneos.',
            'Asume una postura crítica y solidaria ante la pobreza, la exclusión y la degradación ecológica guiado por la fe.',
            'Testimonia su fe con madurez espiritual y compromiso comunitario en la construcción del Reino de Dios.'
          ]
        }
      },
      {
        id: 'rel_experiencia',
        nombre: 'Asume la experiencia del encuentro personal y comunitario con Dios en su proyecto de vida en coherencia con su creencia religiosa',
        capacidades: [
          'Transforma su entorno desde el encuentro personal y comunitario con Dios y desde la fe que profesa.',
          'Actúa coherentemente en razón de su fe según los principios de su conciencia moral en situaciones concretas de la vida.'
        ],
        estandares: {
          'Ciclo VI': 'Expresa su amor a Dios y al prójimo participando en la vida litúrgica y comunitaria; promueve la paz, la justicia y el cuidado de la creación inspirándose en las parábolas evangélicas.',
          'Ciclo VII': 'Demuestra coherencia entre su fe y sus actos en su proyecto de vida; promueve iniciativas de voluntariado y solidaridad activa orientadas a la transformación de la sociedad.'
        },
        desempenos: {
          '1': [
            'Participa con devoción y respeto en momentos de oración personal y comunitaria valorando la Eucaristía y la reconciliación.',
            'Demuestra con actitudes cotidianas de veracidad, gratitud y compañerismo la vivencia de los mandamientos.',
            'Propone acciones solidarias sencillas en beneficio de compañeros que atraviesan dificultades emocionales o materiales.'
          ],
          '2': [
            'Propone acciones de caridad y acompañamiento fraterno en beneficio de personas enfermas o necesitadas de su entorno.',
            'Reflexiona sobre las enseñanzas de las parábolas de la misericordia aplicándolas a sus relaciones interpersonales.',
            'Cuida la naturaleza como obra divina participando en campañas ecológicas de su parroquia o colegio.'
          ],
          '3': [
            'Manifiesta su fe mediante actitudes de empatía, veracidad y solidaridad activa en el trabajo en equipo y la vida familiar.',
            'Asume responsabilidades en la liturgia escolar o en la pastoral juvenil mostrando liderazgo de servicio.',
            'Enfrenta situaciones de presión social apoyándose en principios evangélicos y en el discernimiento moral.'
          ],
          '4': [
            'Se compromete con el cuidado de la casa común promoviendo la encíclica Laudato Si\' en proyectos comunitarios sostenibles.',
            'Organiza campañas de voluntariado juvenil para llevar alimentos, abrigo y consuelo a sectores marginados.',
            'Estructura su proyecto de vida integrando la vocación de servicio cristiano y el compromiso ético profesional.'
          ],
          '5': [
            'Lidera acciones de pastoral juvenil o voluntariado social que promuevan la justicia, la paz y la dignidad humana.',
            'Demuestra coherencia integral entre su fe profesada y sus actos en los ámbitos académico, familiar y ciudadano.',
            'Promueve la reconciliación y el diálogo social ante situaciones de polarización o injusticia comunitaria.'
          ]
        }
      }
    ]
  },

  // 4. Educación para el Trabajo
  {
    id: 'educacion_trabajo',
    nombre: 'Educación para el Trabajo',
    color: 'orange',
    competencias: [
      {
        id: 'ept_emprendimiento',
        nombre: 'Gestiona proyectos de emprendimiento económico o social',
        capacidades: [
          'Crea propuestas de valor.',
          'Aplica habilidades técnicas.',
          'Trabaja cooperativamente para lograr objetivos y metas.',
          'Evalúa los resultados del proyecto de emprendimiento.'
        ],
        estandares: {
          'Ciclo VI': 'Gestiona proyectos de emprendimiento económico o social cuando integra activamente información sobre una necesidad insatisfecha en su comunidad; diseña prototipos aplicando habilidades técnicas y evalúa la viabilidad del proyecto.',
          'Ciclo VII': 'Gestiona proyectos de emprendimiento económico o social integrando metodologías ágiles (Design Thinking, Lean Canvas); formula planes de negocio, valida prototipos con usuarios reales y evalúa el impacto financiero y ambiental.'
        },
        desempenos: {
          '1': [
            'Identifica necesidades y problemas de un grupo de usuarios en su localidad y formula ideas de solución utilizando la metodología Design Thinking.',
            'Diseña bocetos de prototipos sencillos seleccionando materiales reciclables o de bajo costo de su entorno.',
            'Aplica normas básicas de seguridad e higiene al manipular herramientas manuales y equipos de taller.'
          ],
          '2': [
            'Elabora prototipos de productos o servicios aplicando habilidades técnicas específicas y seleccionando herramientas y materiales adecuados.',
            'Planifica las actividades de su equipo asignando roles claros y cronogramas de trabajo cooperativo.',
            'Evalúa la aceptación del prototipo con usuarios potenciales mediante entrevistas y fichas de retroalimentación.'
          ],
          '3': [
            'Aplica el modelo de negocios Lean Canvas para estructurar la propuesta de valor, los canales de distribución y las fuentes de ingreso.',
            'Determina los costos directos e indirectos de producción y calcula el precio de venta unitario competitivo.',
            'Ejecuta procesos de fabricación o prestación de servicios optimizando tiempos y reduciendo mermas de materia prima.'
          ],
          '4': [
            'Organiza y lidera equipos de trabajo colaborativo asignando roles y metas específicas para la producción y comercialización del prototipo.',
            'Diseña campañas de marketing digital utilizando redes sociales y herramientas de diseño gráfico para promocionar su propuesta.',
            'Evalúa la viabilidad económica y ambiental del proyecto mediante pruebas de campo y validación de hipótesis.'
          ],
          '5': [
            'Evalúa los resultados financieros (punto de equilibrio, costos fijos y variables, flujo de caja) y el impacto socioambiental del proyecto.',
            'Propone mejoras de innovación tecnológica y escalabilidad en el modelo de negocio para asegurar su sostenibilidad.',
            'Presenta un pitch de negocios efectivo ante potenciales clientes o evaluadores comunicando con convicción la propuesta de valor.'
          ]
        }
      }
    ]
  },

  // 5. Educación Física
  {
    id: 'educacion_fisica',
    nombre: 'Educación Física',
    color: 'lime',
    competencias: [
      {
        id: 'ef_motricidad',
        nombre: 'Se desenvuelve de manera autónoma a través de su motricidad',
        capacidades: [
          'Comprende su cuerpo.',
          'Se expresa corporalmente.'
        ],
        estandares: {
          'Ciclo VI': 'Se desenvuelve de manera autónoma a través de su motricidad al coordinar sus movimientos con seguridad y confianza; utiliza el lenguaje corporal para comunicar ideas y estados de ánimo en danzas y actividades rítmicas.',
          'Ciclo VII': 'Se desenvuelve de manera autónoma demostrando dominio y fluidez motriz en situaciones deportivas y artísticas complejas; adapta sus patrones motores a diferentes superficies y espacios.'
        },
        desempenos: {
          '1': [
            'Regula su tono muscular, postura y equilibrio al ejecutar habilidades motrices básicas y específicas en actividades predeportivas.',
            'Expresa emociones y estados de ánimo a través de secuencias rítmicas sencillas combinando música y desplazamientos corporales.',
            'Identifica su lateralidad y afianza la coordinación óculo-manual y óculo-podal en ejercicios de destreza con balón.'
          ],
          '2': [
            'Crea secuencias rítmicas individuales y colectivas utilizando elementos corporales y musicales representativos de su cultura.',
            'Adapta sus movimientos corporales al espacio, tiempo y a los objetos durante juegos y circuitos motores.',
            'Controla su cuerpo en situaciones de suspensión, giro y traslación manteniendo el equilibrio dinámico.'
          ],
          '3': [
            'Coordina movimientos corporales complejos con precisión y fluidez en la ejecución de fundamentos técnicos deportivos.',
            'Demuestra dominio técnico en saltos, carreras y lanzamientos atléticos adaptando la fuerza y velocidad.',
            'Utiliza el lenguaje gestual y coreográfico para transmitir mensajes sobre el cuidado del cuerpo y la convivencia pacífica.'
          ],
          '4': [
            'Diseña coreografías expresivas que integran gestos, miradas y desplazamientos espaciales con intencionalidad estética.',
            'Aplica técnicas de respiración diafragmática y relajación neuromuscular para optimizar su rendimiento motriz.',
            'Adapta patrones motores ante condiciones variables de terreno (arena, césped, pista sintética) con seguridad.'
          ],
          '5': [
            'Demuestra solvencia motriz y toma de decisiones tácticas instantáneas durante la práctica de deportes individuales y colectivos.',
            'Perfecciona la técnica y biomecánica de movimientos especializados para maximizar la eficacia deportiva.',
            'Lidera puestas en escena de expresión corporal y danza contemporánea con alto rigor coreográfico y expresivo.'
          ]
        }
      },
      {
        id: 'ef_vida_saludable',
        nombre: 'Asume una vida saludable',
        capacidades: [
          'Comprende las relaciones entre la actividad física, alimentación, postura e higiene personal y del ambiente, y la salud.',
          'Incorpora prácticas que mejoran su calidad de vida.'
        ],
        estandares: {
          'Ciclo VI': 'Asume una vida saludable al comprender los beneficios de la práctica habitual de actividad física y de una alimentación balanceada; mide su frecuencia cardíaca e índice de masa corporal.',
          'Ciclo VII': 'Asume una vida saludable al diseñar y ejecutar planes de entrenamiento físico y nutrición acordes con sus requerimientos biológicos; previene riesgos y promueve hábitos saludables en su comunidad.'
        },
        desempenos: {
          '1': [
            'Explica la importancia de la hidratación y de una alimentación rica en nutrientes locales antes, durante y después del ejercicio.',
            'Aplica hábitos de higiene personal y del entorno deportivo para prevenir infecciones y enfermedades comunes.',
            'Reconoce los signos de fatiga muscular y realiza descansos activos para recuperar energía durante el esfuerzo físico.'
          ],
          '2': [
            'Monitorea su frecuencia cardíaca en reposo y en esfuerzo para regular la intensidad de la actividad física aeróbica y anaeróbica.',
            'Calcula su Índice de Masa Corporal (IMC) e identifica alimentos procesados perjudiciales para su salud cardiovascular.',
            'Adopta posturas corporales ergonómicas adecuadas al levantar pesos, sentarse en clase y descansar.'
          ],
          '3': [
            'Aplica rutinas de calentamiento general y específico, elongación y vuelta a la calma para prevenir lesiones musculares y articulares.',
            'Elabora una dieta balanceada basada en requerimientos calóricos diarios considerando su gasto metabólico por actividad deportiva.',
            'Promueve en su familia el consumo de agua natural y la reducción de azúcares y grasas saturadas.'
          ],
          '4': [
            'Evalúa su condición física mediante pruebas antropométricas (IMC, test de Cooper, fuerza y flexibilidad) y elabora un plan de mejora personal.',
            'Analiza los riesgos para la salud del consumo de tabaco, alcohol y bebidas energizantes en los adolescentes.',
            'Diseña circuitos de entrenamiento funcional (fuerza, resistencia, agilidad) acordes con su nivel de aptitud biológica.'
          ],
          '5': [
            'Diseña y sustenta un programa integral de acondicionamiento físico y hábitos saludables adaptado a su edad y estilo de vida.',
            'Promueve campañas escolares y comunitarias para combatir el sedentarismo y la obesidad infantil.',
            'Aplica protocolos de primeros auxilios deportivos ante esguinces, desgarros, calambres o deshidratación aguda.'
          ]
        }
      },
      {
        id: 'ef_sociomotrices',
        nombre: 'Interactúa a través de sus habilidades sociomotrices',
        capacidades: [
          'Se relaciona utilizando sus habilidades sociomotrices.',
          'Crea y aplica estrategias y tácticas de juego.'
        ],
        estandares: {
          'Ciclo VI': 'Interactúa a través de sus habilidades sociomotrices al cooperar y competir sanamente en juegos deportivos; respeta las reglas y propone tácticas de juego inclusivas.',
          'Ciclo VII': 'Interactúa a través de sus habilidades sociomotrices al demostrar liderazgo, juego limpio y empatía en competencias deportivas formales; adapta estrategias tácticas ante situaciones cambiantes.'
        },
        desempenos: {
          '1': [
            'Participa en juegos colectivos respetando las reglas acordadas y mostrando solidaridad y juego limpio con sus compañeros.',
            'Propone variantes a las reglas de juegos tradicionales y predeportivos para facilitar la integración de todos.',
            'Acepta las decisiones arbitrales y asume roles rotativos con entusiasmo dentro del equipo.'
          ],
          '2': [
            'Propone y adapta estrategias de ataque y defensa en juegos cooperativos y predeportivos para alcanzar el objetivo común.',
            'Comunica ideas y orientaciones a sus compañeros durante el juego con lenguaje positivo y motivador.',
            'Demuestra empatía apoyando a quienes presentan dificultades motrices para lograr una participación equitativa.'
          ],
          '3': [
            'Demuestra actitudes de respeto y tolerancia ante la victoria o la derrota reconociendo el esfuerzo de los rivales.',
            'Aplica sistemas tácticos básicos en deportes colectivos (vóleibol, futsal, básquetbol) respondiendo al planteamiento del oponente.',
            'Resuelve desacuerdos deportivos mediante el diálogo sereno evitando actitudes antideportivas o agresivas.'
          ],
          '4': [
            'Lidera la organización de torneos deportivos escolares aplicando principios de inclusión, equidad de género y arbitraje imparcial.',
            'Diseña jugadas preparadas de táctica fija en equipo y evalúa su efectividad durante el partido.',
            'Promueve el juego limpio y el compañerismo como valores formativos superiores a la obtención del triunfo deportivo.'
          ],
          '5': [
            'Analiza y modifica sistemas tácticos de juego en tiempo real durante partidos deportivos colectivos oficiales.',
            'Demuestra madurez competitiva y templanza en momentos de alta tensión deportiva, inspirando confianza en su equipo.',
            'Coordina actividades recreativas masivas inclusivas dirigidas a toda la comunidad educativa escolar.'
          ]
        }
      }
    ]
  },

  // 6. Comunicación
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
          'Ciclo VI': 'Se comunica oralmente mediante diversos tipos de textos; infiere el tema, propósito, hechos y conclusiones a partir de información explícita e implícita; organiza sus ideas con conectores y referentes pertinentes y modula su voz y gestos de acuerdo a la situación comunicativa formal.',
          'Ciclo VII': 'Se comunica oralmente mediante diversos tipos de textos formales; evalúa la validez de los argumentos, los sesgos y falacias en discursos públicos; expresa sus ideas con fluidez, variedad léxica y recursos retóricos en debates y mesas redondas.'
        },
        desempenos: {
          '1': [
            'Recupera información explícita de los textos orales que escucha seleccionando datos específicos y vocabulario técnico o especializado.',
            'Deduce diversas relaciones lógicas entre las ideas del texto oral (causa-efecto, oposición, contradicción) y la intención comunicativa.',
            'Adecúa el texto oral a situaciones comunicativas formales e informales utilizando un registro variado y adecuado a la audiencia.'
          ],
          '2': [
            'Explica el tema y el propósito comunicativo del texto oral, distinguiendo lo relevante de lo complementario.',
            'Emplea estratégicamente recursos no verbales (contacto visual, postura) y paraverbales (entonación, ritmo y pausas) para convencer al oyente.',
            'Participa en diálogos estructurados respetando los puntos de vista ajenos y rebatiendo con argumentos lógicos.'
          ],
          '3': [
            'Explica diferentes puntos de vista, sesgos, falacias y la intencionalidad del emisor en textos orales persuasivos y discursos.',
            'Adecúa y organiza discursos argumentativos con una estructura lógica clara (tesis, argumentos sólidos y conclusión convincente).',
            'Evalúa la eficacia de los recursos no verbales y el impacto del discurso en el auditorio.'
          ],
          '4': [
            'Analiza críticamente discursos orales formales identificando contradicciones, digresiones y ambigüedades.',
            'Utiliza figuras retóricas (metáforas, hipérboles, analogías) para dar mayor fuerza expresiva a su comunicación oral.',
            'Interviene activamente en debates de controversia ética o social asumiendo posturas razonadas.'
          ],
          '5': [
            'Evalúa la validez de los argumentos, el rigor conceptual y las implicancias ideológicas de discursos políticos y académicos.',
            'Sustenta ponencias y defensas orales con dominio escénico, modulando el discurso en función de las reacciones de la audiencia.',
            'Sintetiza acuerdos y consensos en asambleas y paneles deliberativos de nivel preuniversitario y ciudadano.'
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
          'Ciclo VI': 'Lee diversos tipos de textos con estructuras complejas y vocabulario especializado. Integra información contrapuesta o ambigua que está en distintas partes del texto. Interpreta el texto considerando información relevante y complementaria para construir su sentido global.',
          'Ciclo VII': 'Lee diversos tipos de textos con estructuras complejas, vocabulario técnico y figuras literarias. Evalúa la eficacia y validez de los argumentos, identifica la ideología subyacente y reflexiona sobre el impacto del texto en su comunidad y la sociedad.'
        },
        desempenos: {
          '1': [
            'Identifica información explícita, relevante y complementaria seleccionando datos específicos y detalles en textos narrativos, expositivos y argumentativos con varios elementos complejos en su estructura.',
            'Deduce diversas relaciones lógicas entre las ideas del texto escrito a partir de información contrapuesta o al realizar una lectura intertextual.',
            'Explica el tema, los subtemas y el propósito comunicativo del texto, distinguiendo lo sustancial de lo accesorio.'
          ],
          '2': [
            'Integra información explícita cuando se encuentra en distintas partes del texto o en distintos textos al realizar una lectura comparativa.',
            'Deduce el significado de palabras en contexto, locuciones y figuras retóricas a partir de marcas contextuales.',
            'Opina sobre el contenido, la organización textual y la intención del autor, evaluando la eficacia de los argumentos planteados.'
          ],
          '3': [
            'Sintetiza la información de textos argumentativos y ensayos científicos, deduciendo la tesis principal y los argumentos de respaldo.',
            'Analiza las contradicciones, ambigüedades y la postura ideológica del autor en artículos de opinión y editoriales.',
            'Emite un juicio crítico sobre el estilo del autor y la pertinencia de las fuentes bibliográficas citadas.'
          ],
          '4': [
            'Contrasta textos de diferentes autores sobre una misma temática para identificar divergencias conceptuales y enfoques metodológicos.',
            'Evalúa el uso del lenguaje figurado y los recursos estilísticos en obras literarias universales y peruanas.',
            'Fundamenta su posición personal frente a dilemas éticos y sociales planteados en las lecturas.'
          ],
          '5': [
            'Interpreta textos filosóficos, ensayísticos y científicos complejos evaluando la solidez de las premisas y las conclusiones derivadas.',
            'Analiza la intertextualidad y el contexto sociocultural e histórico de producción de las obras literarias maestras.',
            'Evalúa la validez, relevancia y credibilidad de la información procedente de fuentes impresas y digitales indexadas.'
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
          'Ciclo VI': 'Escribe diversos tipos de textos de forma reflexiva. Adecúa su texto al destinatario, propósito y el registro a partir de diversas fuentes de información. Organiza y desarrolla lógicamente las ideas en torno a un tema, estructurándolas en párrafos con conectores y referentes.',
          'Ciclo VII': 'Escribe diversos tipos de textos argumentativos y académicos de forma reflexiva. Adecúa su texto al destinatario y propósito con rigor léxico. Desarrolla sus ideas con profundidad, utilizando mecanismos de cohesión avanzados y normas ortográficas de la RAE.'
        },
        desempenos: {
          '1': [
            'Adecúa el texto a la situación comunicativa considerando el propósito comunicativo, el tipo textual y algunas características del género discursivo.',
            'Escribe textos de forma coherente y cohesionada, ordenando las ideas en torno a un tema y desarrollándolas para ampliar o precisar la información.',
            'Utiliza recursos gramaticales y ortográficos (por ejemplo, tildación diacrítica, coma hiperbática) que contribuyen a dar sentido a su texto.'
          ],
          '2': [
            'Escribe textos narrativos, descriptivos y expositivos utilizando conectores lógicos de causa, consecuencia, contraste y equivalencia.',
            'Aplica estrategias de corrección de textos eliminando redundancias, digresiones y vacíos de información.',
            'Evalúa de manera continua si su texto responde a la intención comunicativa y si el registro lingüístico es adecuado.'
          ],
          '3': [
            'Escribe ensayos breves y artículos de opinión estructurando una tesis clara y argumentos respaldados por evidencias comprobables.',
            'Emplea mecanismos de referencia léxica y gramatical (anáforas, catáforas, elipsis, sustitución por sinónimos) para asegurar la fluidez del texto.',
            'Revisa el uso de citas textuales y paráfrasis aplicando criterios básicos de honestidad académica.'
          ],
          '4': [
            'Adecúa monografías e informes de investigación al formato académico formal respetando pautas de citación bibliográfica.',
            'Utiliza un vocabulario preciso, técnico y variado para transmitir conceptos abstractos con claridad.',
            'Evalúa el impacto persuasivo y la coherencia global de su texto antes de la publicación final.'
          ],
          '5': [
            'Redacta textos académicos y ensayísticos de nivel preuniversitario con estilo propio, coherencia impecable y solidez lógica.',
            'Domina el uso de signos de puntuación complejos (punto y coma, dos puntos explicativos, guiones y paréntesis aclaratorios) para jerarquizar ideas.',
            'Reflexiona críticamente sobre el impacto de su producción escrita en el debate público y la construcción de ciudadanía.'
          ]
        }
      }
    ]
  },

  // 7. Arte y Cultura
  {
    id: 'arte_cultura',
    nombre: 'Arte y Cultura',
    color: 'pink',
    competencias: [
      {
        id: 'arte_aprecia',
        nombre: 'Aprecia de manera crítica manifestaciones artístico-culturales',
        capacidades: [
          'Percibe manifestaciones artístico-culturales.',
          'Contextualiza manifestaciones artístico-culturales.',
          'Reflexiona creativa y críticamente sobre manifestaciones artístico-culturales.'
        ],
        estandares: {
          'Ciclo VI': 'Aprecia de manera crítica manifestaciones artístico-culturales al describir sus cualidades estéticas y el mensaje del artista; investiga el contexto histórico en que fueron creadas y opina sobre su valor cultural.',
          'Ciclo VII': 'Aprecia de manera crítica manifestaciones artístico-culturales al analizar los lenguajes visuales, sonoros o escénicos; interpreta su simbolismo y dialoga sobre el impacto del arte en la transformación social.'
        },
        desempenos: {
          '1': [
            'Describe las características visuales, sonoras o coreográficas de obras de arte tradicional y contemporáneo de su región.',
            'Identifica los elementos del lenguaje visual (línea, color, forma, textura) en pinturas y esculturas peruanas.',
            'Explica las emociones y reflexiones que le genera el contacto con obras artísticas locales.'
          ],
          '2': [
            'Investiga el contexto histórico y social de danzas, piezas musicales o pinturas peruanas reconociendo su significado cultural.',
            'Compara manifestaciones artísticas de diferentes épocas y regiones del Perú valorando la diversidad cultural.',
            'Emite juicios de valor sobre el mensaje y propósito comunicativo de los artistas de su comunidad.'
          ],
          '3': [
            'Emite juicios estéticos fundamentados sobre el uso del color, la armonía musical o la composición dramática en obras artísticas.',
            'Analiza cómo los artistas emplean símbolos y metáforas visuales para denunciar injusticias o celebrar la vida.',
            'Participa en foros y conversatorios escolares argumentando su apreciación sobre el arte contemporáneo.'
          ],
          '4': [
            'Compara cómo distintos artistas abordan problemáticas sociales universales a través de diversos lenguajes plásticos y escénicos.',
            'Evalúa la influencia de los medios audiovisuales e internet en la difusión y transformación de las artes tradicionales.',
            'Interpreta las corrientes de vanguardia artística (impresionismo, cubismo, surrealismo) y su aporte a la historia humana.'
          ],
          '5': [
            'Argumenta una postura crítica sobre el papel del arte como vehículo de memoria histórica, identidad y transformación social.',
            'Analiza el valor patrimonial de monumentos y piezas artísticas del Perú proponiendo acciones de conservación.',
            'Sustenta un ensayo crítico sobre una obra maestra de la pintura o literatura dramática peruana o universal.'
          ]
        }
      },
      {
        id: 'arte_crea',
        nombre: 'Crea proyectos desde los lenguajes artísticos',
        capacidades: [
          'Explora y experimenta los lenguajes artísticos.',
          'Aplica procesos creativos.',
          'Evalúa y comunica sus procesos y proyectos.'
        ],
        estandares: {
          'Ciclo VI': 'Crea proyectos artísticos individuales o colectivos utilizando técnicas de dibujo, pintura, música o teatro; planifica su proceso creativo basándose en una intención comunicativa y comparte su obra.',
          'Ciclo VII': 'Crea proyectos artísticos innovadores integrando tecnologías digitales y múltiples lenguajes artísticos; experimenta con nuevos soportes y evalúa el impacto de su propuesta en el público.'
        },
        desempenos: {
          '1': [
            'Experimenta con técnicas mixtas de dibujo, pintura o modelado con materiales reciclados para transmitir un mensaje ecológico o personal.',
            'Elabora bocetos previos y planifica las etapas de creación de un collage o pintura temática escolar.',
            'Presenta su trabajo artístico a sus compañeros explicando las decisiones técnicas y los materiales utilizados.'
          ],
          '2': [
            'Diseña un guion teatral corto o una secuencia musical utilizando instrumentos convencionales o cotidiáfonos.',
            'Aplica técnicas de claroscuro, teoría del color y perspectiva básica en la elaboración de ilustraciones y carteles.',
            'Recoge comentarios y sugerencias del público para enriquecer y perfeccionar su propuesta artística.'
          ],
          '3': [
            'Planifica y ejecuta una producción artística comunitaria (mural, comparsa, cortometraje escolar) asignando responsabilidades al equipo.',
            'Explora recursos sonoros y visuales innovadores para generar atmósferas y emociones específicas en el espectador.',
            'Evalúa las dificultades técnicas afrontadas durante el proceso de creación y cómo fueron superadas creativamente.'
          ],
          '4': [
            'Integra recursos audiovisuales y programas de diseño digital en la elaboración de una muestra de arte interactiva.',
            'Desarrolla proyectos escénicos o plásticos multidisciplinarios que aborden temas de derechos humanos o medio ambiente.',
            'Registra en un cuaderno de artista el proceso evolutivo de sus ideas, borradores y pruebas de materiales.'
          ],
          '5': [
            'Presenta su portafolio artístico sustentando el concepto, los bocetos preliminares y el proceso de maduración de su obra final.',
            'Diseña una curaduría y montaje de exposición artística escolar aplicando criterios de iluminación y distribución espacial.',
            'Evalúa el impacto emotivo y reflexivo logrado en el público receptor mediante encuestas y debates posteriores.'
          ]
        }
      }
    ]
  },

  // 8. Castellano como segunda lengua
  {
    id: 'castellano_segunda_lengua',
    nombre: 'Castellano como segunda lengua',
    color: 'teal',
    competencias: [
      {
        id: 'castellano_oral',
        nombre: 'Se comunica oralmente en castellano como segunda lengua',
        capacidades: [
          'Obtiene información del texto oral.',
          'Infiere e interpreta información del texto oral.',
          'Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada.',
          'Utiliza recursos no verbales y paraverbales de forma estratégica.',
          'Interactúa estratégicamente con distintos interlocutores.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto oral.'
        ],
        estandares: {
          'Ciclo VI': 'Se comunica oralmente mediante textos orales en castellano en situaciones cotidianas y académicas; expresa sus ideas combinando vocabulario aprendido y recursos no verbales.',
          'Ciclo VII': 'Se comunica oralmente con fluidez en castellano en debates y exposiciones formales; adapta su registro y argumentos según el contexto sociocultural.'
        },
        desempenos: {
          '1': [
            'Identifica información básica y vocabulario frecuente en textos orales de la vida escolar en castellano.',
            'Expresa necesidades, opiniones e ideas cotidianas en castellano empleando una pronunciación y entonación comprensibles.',
            'Participa en diálogos sencillos con compañeros y docentes respetando los turnos de intervención.'
          ],
          '2': [
            'Deduce información implícita e intenciones del hablante en conversaciones y narraciones en castellano.',
            'Organiza sus ideas en exposiciones breves utilizando conectores de secuencia temporal y causa.',
            'Emplea gestos y entonación apropiada para reforzar la claridad de su mensaje en castellano.'
          ],
          '3': [
            'Participa en intercambios orales formales e informales formulando y respondiendo preguntas con pertinencia.',
            'Adecúa su lenguaje oral en castellano a situaciones formales como presentaciones de trabajos escolares.',
            'Identifica contradicciones y vacíos en los argumentos de textos orales expositivos.'
          ],
          '4': [
            'Expone temas académicos estructurados utilizando conectores temporales y causales en castellano estándar.',
            'Modula el volumen, ritmo y entonación de su voz para mantener el interés de la audiencia.',
            'Sintetiza la información relevante de exposiciones de compañeros y docentes tomando notas estructuradas.'
          ],
          '5': [
            'Argumenta su postura en debates escolares con fluidez léxica y adecuación sociocultural precisa.',
            'Evalúa la eficacia persuasiva de discursos y ponencias orales en castellano estándar.',
            'Defiende proyectos comunitarios con solvencia lingüística y seguridad escénica ante públicos diversos.'
          ]
        }
      },
      {
        id: 'castellano_lee',
        nombre: 'Lee textos escritos en castellano como segunda lengua',
        capacidades: [
          'Obtiene información del texto escrito.',
          'Infiere e interpreta información del texto.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto.'
        ],
        estandares: {
          'Ciclo VI': 'Lee textos diversos en castellano; identifica datos explícitos, deduce el tema central y la relación causa-efecto en textos narrativos e informativos.',
          'Ciclo VII': 'Lee críticamente textos de diversa complejidad en castellano; evalúa argumentos, la intención comunicativa y el contexto cultural del autor.'
        },
        desempenos: {
          '1': [
            'Localiza datos explícitos en textos escritos en castellano con vocabulario conocido e ilustraciones de apoyo.',
            'Deduce el significado de palabras desconocidas a partir del contexto y la estructura oracional en castellano.',
            'Explica el tema principal y los personajes de relatos breves y textos descriptivos.'
          ],
          '2': [
            'Integra información explícita e implícita ubicada en distintas partes de un texto informativo en castellano.',
            'Deduce la relación lógica de causa-efecto y secuencia temporal en textos narrativos e instructivos.',
            'Opina sobre las acciones de los personajes y el mensaje central del texto leído.'
          ],
          '3': [
            'Explica el tema principal y el propósito de textos expositivos e instructivos de mediana extensión.',
            'Identifica la estructura de textos discontinuos (tablas, infografías, esquemas) en castellano.',
            'Reconoce la intención del autor y el tipo de destinatario al que va dirigido el texto.'
          ],
          '4': [
            'Contrasta información explícita e implícita en textos argumentativos y artículos de divulgación en castellano.',
            'Deduce el significado de frases idiomáticas y figuras literarias simples por el contexto.',
            'Evalúa la coherencia y solidez de las afirmaciones presentadas en lecturas escolares.'
          ],
          '5': [
            'Opina de manera fundamentada sobre las ideas centrales y el estilo del autor en textos literarios y ensayos en castellano.',
            'Interpreta textos complejos de carácter científico y social evaluando la validez de las fuentes citadas.',
            'Reflexiona críticamente sobre el tratamiento de la diversidad cultural y lingüística en los textos leídos.'
          ]
        }
      },
      {
        id: 'castellano_escribe',
        nombre: 'Escribe diversos tipos de textos en castellano como segunda lengua',
        capacidades: [
          'Adecúa el texto a la situación comunicativa.',
          'Organiza y desarrolla las ideas de forma coherente y cohesionada.',
          'Utiliza convenciones del lenguaje escrito de forma pertinente.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
        ],
        estandares: {
          'Ciclo VI': 'Escribe textos sencillos en castellano adaptándose al destinatario y tema; organiza oraciones en párrafos breves con signos de puntuación básicos.',
          'Ciclo VII': 'Escribe textos complejos y argumentativos en castellano con cohesión, conectores lógicos y ortografía correcta según las normas de la lengua.'
        },
        desempenos: {
          '1': [
            'Escribe textos breves en castellano con propósitos definidos (avisos, descripciones, notas) cuidando la concordancia de género y número.',
            'Organiza sus ideas en oraciones simples en torno a un tema de su interés.',
            'Utiliza mayúsculas iniciales y puntos finales para delimitar las oraciones de su texto.'
          ],
          '2': [
            'Redacta párrafos ordenados usando conectores de adición y secuencia temporal en castellano.',
            'Aplica reglas básicas de acentuación y puntuación (coma enumerativa, punto y seguido).',
            'Revisa su escrito con ayuda del docente para mejorar la claridad y evitar repeticiones innecesarias.'
          ],
          '3': [
            'Revisa su texto para corregir errores ortográficos elementales y verificar la coherencia con el tema planteado.',
            'Escribe textos narrativos y descriptivos empleando un vocabulario variado y pertinente al contexto.',
            'Estructura sus escritos en introducción, desarrollo y conclusión utilizando párrafos bien diferenciados.'
          ],
          '4': [
            'Produce textos narrativos y explicativos con vocabulario técnico básico y estructuras oracionales compuestas.',
            'Emplea conectores de causa, consecuencia y contraste para articular fluidamente sus argumentos.',
            'Evalúa la adecuación de su texto al registro formal o informal requerido por la situación comunicativa.'
          ],
          '5': [
            'Redacta ensayos y cartas formales en castellano con precisión semántica y corrección ortográfica y gramatical.',
            'Utiliza mecanismos de cohesión avanzados (anáforas, elipsis, conectores concesivos) en escritos extensos.',
            'Revisa y pule autónomamente sus producciones escritas antes de su publicación o entrega final.'
          ]
        }
      }
    ]
  },

  // 9. Inglés
  {
    id: 'ingles',
    nombre: 'Inglés',
    color: 'cyan',
    competencias: [
      {
        id: 'ingles_oral',
        nombre: 'Se comunica oralmente en inglés como lengua extranjera',
        capacidades: [
          'Obtiene información de textos orales.',
          'Infiere e interpreta información de textos orales.',
          'Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada.',
          'Utiliza recursos no verbales y paraverbales de forma estratégica.',
          'Interactúa estratégicamente con distintos interlocutores.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto oral.'
        ],
        estandares: {
          'Ciclo VI': 'Se comunica oralmente en inglés en situaciones cotidianas de nivel elemental (A1/A2); intercambia información sobre temas personales y escolares con pronunciación adecuada.',
          'Ciclo VII': 'Se comunica oralmente en inglés con mayor autonomía y fluidez (nivel B1); participa en conversaciones espontáneas y exposiciones breves sobre temas de interés global.'
        },
        desempenos: {
          '1': [
            'Identifica vocabulario y expresiones cotidianas en audios y conversaciones sencillas en inglés (saludos, gustos, familia).',
            'Participa en diálogos breves saludando, presentándose y pidiendo información personal básica en inglés.',
            'Pronuncia con claridad palabras de uso frecuente adaptando la entonación en oraciones afirmativas e interrogativas.'
          ],
          '2': [
            'Participa en diálogos estructurados en inglés formulando y respondiendo preguntas sobre rutinas y actividades diarias.',
            'Deduce información clave y el propósito de diálogos y canciones sencillas en inglés.',
            'Utiliza recursos paraverbales (gestos, contacto visual) para apoyar la comunicación oral básica en inglés.'
          ],
          '3': [
            'Expresa opiniones breves y preferencias personales en inglés utilizando conectores simples (and, but, because).',
            'Relata experiencias pasadas y planes futuros en inglés empleando tiempos verbales adecuados (Simple Past, Going to).',
            'Interactúa con compañeros en dramatizaciones y presentaciones cortas en inglés con pronunciación comprensible.'
          ],
          '4': [
            'Realiza presentaciones orales en inglés sobre temas de actualidad escolar utilizando material visual de apoyo.',
            'Comprende las ideas centrales de conferencias cortas o videos educativos en inglés estándar.',
            'Participa en debates sencillos en inglés expresando acuerdos y desacuerdos con respeto.'
          ],
          '5': [
            'Debate y sustenta puntos de vista en inglés sobre problemáticas ambientales y culturales globales con pronunciación y entonación fluidas.',
            'Sintetiza información de podcasts y entrevistas en inglés expresando conclusiones personales.',
            'Adecúa su discurso oral en inglés a auditorios formales con naturalidad y riqueza de vocabulario.'
          ]
        }
      },
      {
        id: 'ingles_lee',
        nombre: 'Lee diversos tipos de textos escritos en inglés como lengua extranjera',
        capacidades: [
          'Obtiene información del texto escrito.',
          'Infiere e interpreta información del texto.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto.'
        ],
        estandares: {
          'Ciclo VI': 'Lee textos en inglés con vocabulario de uso frecuente y estructuras gramaticales básicas (Simple Present, Past Simple); localiza datos explícitos y deduce el tema principal.',
          'Ciclo VII': 'Lee comprensivamente textos descriptivos, narrativos y argumentativos en inglés (nivel B1); reconoce ideas principales y la actitud del autor.'
        },
        desempenos: {
          '1': [
            'Localiza información específica en textos cortos en inglés acompañados de imágenes (posters, menús, folletos).',
            'Identifica palabras transparentes (cognados) y vocabulario temático escolar en lecturas graduadas.',
            'Deduce el tema de un texto simple a partir del título y las imágenes de apoyo en inglés.'
          ],
          '2': [
            'Deduce el significado de palabras y frases idiomáticas por contexto en lecturas graduadas en inglés.',
            'Identifica relaciones de causa y efecto en textos narrativos sencillos en inglés.',
            'Opina sobre las ilustraciones y el contenido general de historias breves en inglés.'
          ],
          '3': [
            'Identifica la secuencia de eventos y las relaciones causa-efecto en textos narrativos e históricos breves en inglés.',
            'Distingue información principal de ejemplos complementarios en artículos de revistas juveniles en inglés.',
            'Reconoce la intención del autor (informar, entretener, persuadir) en textos descriptivos e informativos.'
          ],
          '4': [
            'Distingue la idea principal de los detalles secundarios en artículos de blogs o noticias en inglés.',
            'Infiere el significado de vocabulario especializado y phrasal verbs en lecturas de nivel pre-intermedio.',
            'Compara puntos de vista en textos sobre tecnología, medio ambiente y cultura en inglés.'
          ],
          '5': [
            'Emite una opinión crítica en inglés sobre el mensaje y propósito de un texto argumentativo o literario adaptado.',
            'Interpreta lecturas auténticas en inglés (artículos científicos divulgativos, reseñas críticas) evaluando la solidez de las afirmaciones.',
            'Sintetiza la información de múltiples textos en inglés para elaborar cuadros comparativos o resúmenes.'
          ]
        }
      },
      {
        id: 'ingles_escribe',
        nombre: 'Escribe diversos tipos de textos en inglés como lengua extranjera',
        capacidades: [
          'Adecúa el texto a la situación comunicativa.',
          'Organiza y desarrolla las ideas de forma coherente y cohesionada.',
          'Utiliza convenciones del lenguaje escrito de forma pertinente.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
        ],
        estandares: {
          'Ciclo VI': 'Escribe textos breves en inglés sobre temas conocidos; utiliza oraciones coordinadas y reglas ortográficas básicas (mayúsculas, puntos y comas).',
          'Ciclo VII': 'Escribe textos coherentes de mediana extensión en inglés (emails formales, ensayos cortos); emplea tiempos verbales variados y conectores discursivos.'
        },
        desempenos: {
          '1': [
            'Escribe oraciones y párrafos simples en inglés describiendo personas, lugares y actividades favoritas.',
            'Utiliza adecuadamente pronombres personales, adjetivos posesivos y verbos en presente simple en inglés.',
            'Aplica reglas ortográficas básicas de mayúsculas, comas y signos de puntuación en oraciones en inglés.'
          ],
          '2': [
            'Redacta correos electrónicos informales y postales en inglés respetando la estructura epistolar estándar.',
            'Organiza sus ideas en párrafos breves utilizando conectores de adición y contraste (and, but, so).',
            'Revisa la ortografía de palabras frecuentes y la concordancia sujeto-verbo en sus escritos en inglés.'
          ],
          '3': [
            'Utiliza conectores lógicos (first, then, after, finally) para narrar anécdotas o redactar recetas sencillas en inglés.',
            'Escribe textos descriptivos sobre lugares turísticos de su región utilizando vocabulario variado y tiempos pasados.',
            'Corrige sus propios errores de gramática y vocabulario siguiendo una pauta de autoevaluación guiada.'
          ],
          '4': [
            'Escribe reseñas breves de películas o libros en inglés justificando sus impresiones con vocabulario específico.',
            'Redacta cartas de presentación o solicitudes sencillas en inglés respetando convenciones de cortesía formal.',
            'Combina oraciones simples y compuestas usando cláusulas relativas (who, which, that) en sus redacciones.'
          ],
          '5': [
            'Redacta ensayos cortos de opinión en inglés estructurados con introducción, argumentos de soporte y conclusión.',
            'Emplea una amplia variedad de vocabulario temático y conectores discursivos avanzados (however, furthermore, therefore).',
            'Pule de manera autónoma el estilo, coherencia y corrección gramatical de sus escritos en inglés académico.'
          ]
        }
      }
    ]
  },

  // 10. Matemática
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
          'Ciclo VI': 'Resuelve problemas referidos a las relaciones entre cantidades o magnitudes, traduciéndolas a expresiones numéricas y operativas con números enteros y racionales, aumentos y descuentos porcentuales sucesivos. Expresa su comprensión de los órdenes del sistema decimal con potencias de base 10 y notación científica. Emplea estrategias y procedimientos de cálculo para estimar y operar.',
          'Ciclo VII': 'Resuelve problemas referidos a las relaciones entre cantidades muy grandes o muy pequeñas, magnitudes o intercambios financieros; traduciéndolas a expresiones numéricas y operativas con números racionales e irracionales, notación científica, interés simple y compuesto. Evalúa si las expresiones numéricas planteadas reproducen las condiciones de la situación.'
        },
        desempenos: {
          '1': [
            'Establece relaciones entre datos y acciones de ganar, perder, comparar e igualar cantidades, o una combinación de acciones. Las transforma a expresiones numéricas que incluyen operaciones de adición, sustracción, multiplicación y división con números enteros y racionales.',
            'Expresa con diversas representaciones y lenguaje numérico su comprensión de los órdenes del sistema de numeración decimal y el significado del signo positivo y negativo en números enteros.',
            'Selecciona y emplea estrategias de cálculo, estimación y procedimientos diversos para realizar operaciones con números enteros, fracciones y decimales.'
          ],
          '2': [
            'Establece relaciones entre datos y las transforma a expresiones numéricas que incluyen aumentos y descuentos porcentuales sucesivos, potencias de base 10 y operaciones combinadas con racionales.',
            'Expresa con representaciones y lenguaje numérico su comprensión de las propiedades de las operaciones con números enteros y racionales.',
            'Selecciona y usa unidades e instrumentos de medida convencionales y estrategias heurísticas para resolver problemas financieros cotidianos.'
          ],
          '3': [
            'Establece relaciones entre datos y las transforma a expresiones numéricas con números racionales e irracionales, notación científica y tasas de interés simple.',
            'Expresa con representaciones gráficas y simbólicas su comprensión de la densidad de los números racionales y las operaciones con intervalos.',
            'Selecciona y combina estrategias de cálculo, estimación y simplificación para operar con raíces inexactas y tasas porcentuales.'
          ],
          '4': [
            'Establece relaciones entre datos y las transforma a expresiones numéricas con números reales, notación científica e interés compuesto.',
            'Expresa el significado de la equivalencia entre números racionales, irracionales y su representación en la recta real.',
            'Plantea y justifica afirmaciones sobre las propiedades de los números reales y el valor del dinero en el tiempo.'
          ],
          '5': [
            'Evalúa si las expresiones numéricas planteadas (números reales, notación científica, interés simple y compuesto) modelan con fidelidad las condiciones del problema financiero o científico.',
            'Expresa en forma gráfica, tabular y simbólica la comprensión del sistema de números reales y sus aplicaciones avanzadas.',
            'Justifica con rigor matemático afirmaciones sobre relaciones numéricas y resuelve problemas de optimización de costos y presupuestos.'
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
          'Ciclo VI': 'Resuelve problemas de equivalencias, relaciones de cambio y regularidades entre magnitudes; traduciéndolas a ecuaciones lineales, desigualdades lineales y funciones lineales afines. Emplea recursos y procedimientos para resolver ecuaciones e interpretar la solución en el contexto del problema.',
          'Ciclo VII': 'Resuelve problemas referidos a regularidades entre variables, valores desconocidos o condiciones de desigualdad; traduciéndolas a sistemas de ecuaciones lineales, ecuaciones cuadráticas, funciones exponenciales o trigonométricas. Modela situaciones del contexto real.'
        },
        desempenos: {
          '1': [
            'Establece relaciones entre datos, regularidades, valores desconocidos o relaciones de equivalencia y las transforma a ecuaciones lineales de la forma ax + b = c y a funciones lineales.',
            'Interpreta el significado del conjunto solución de una ecuación lineal y representa gráficamente una función en el plano cartesiano.',
            'Emplea métodos algebraicos y propiedades de las igualdades para resolver ecuaciones e inecuaciones de primer grado.'
          ],
          '2': [
            'Establece relaciones entre datos y las transforma a sistemas de dos ecuaciones lineales con dos incógnitas y a funciones lineales y afines.',
            'Describe las características de una función afín a partir de su pendiente y su punto de corte con el eje de ordenadas.',
            'Combina métodos algebraicos (reducción, igualación, sustitución) y gráficos para determinar el conjunto solución de un sistema de ecuaciones.'
          ],
          '3': [
            'Establece relaciones entre datos y las transforma a ecuaciones cuadráticas de la forma ax² + bx + c = 0 y a funciones cuadráticas.',
            'Expresa con representaciones gráficas, tabulares y simbólicas su comprensión de la parábola, vértice y raíces de la función cuadrática.',
            'Emplea la fórmula general y la factorización para resolver ecuaciones cuadráticas en situaciones reales.'
          ],
          '4': [
            'Establece relaciones entre datos y las transforma a sistemas de ecuaciones lineales con tres variables, desigualdades cuadráticas y funciones polinómicas.',
            'Interpreta el comportamiento asintótico y dominio/rango de funciones racionales y exponenciales.',
            'Determina las soluciones óptimas utilizando sistemas de inecuaciones en la programación lineal básica.'
          ],
          '5': [
            'Modela situaciones complejas de la ciencia y la economía mediante funciones trigonométricas, logarítmicas o modelos exponenciales de crecimiento y decaimiento.',
            'Analiza la concavidad, máximos y mínimos de funciones para fundamentar la toma de decisiones.',
            'Justifica la validez de modelos algebraicos ante cambios en las condiciones iniciales del problema.'
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
          'Ciclo VI': 'Resuelve problemas en los que modela características de objetos mediante prismas, pirámides, polígonos y círculos; calcula perímetros, áreas y volúmenes, y describe transformaciones geométricas en el plano cartesiano.',
          'Ciclo VII': 'Resuelve problemas geométricos aplicando razones trigonométricas, propiedades de cuerpos de revolución, geometría analítica de la recta y la circunferencia, y optimización de espacios.'
        },
        desempenos: {
          '1': [
            'Modela objetos con prismas rectos, triángulos y cuadriláteros, y determina su área y volumen usando fórmulas apropiadas.',
            'Describe las propiedades de los ángulos y polígonos regulares e irregulares en construcciones cotidianas.',
            'Representa transformaciones geométricas (traslación, rotación, reflexión) en cuadrículas y planos.'
          ],
          '2': [
            'Aplica el Teorema de Pitágoras y las propiedades de semejanza de triángulos para resolver problemas de distancias inaccesibles.',
            'Calcula el área lateral, total y volumen de pirámides y cilindros rectos en maquetas y diseños.',
            'Interpreta planos y mapas a escala para calcular distancias reales y planificar rutas de desplazamiento.'
          ],
          '3': [
            'Aplica razones trigonométricas en triángulos rectángulos para calcular ángulos de elevación y depresión en problemas de contexto real.',
            'Modela figuras tridimensionales compuestas y calcula áreas superficiales y capacidades de almacenamiento.',
            'Justifica afirmaciones geométricas aplicando propiedades de las cuerdas, secantes y tangentes a una circunferencia.'
          ],
          '4': [
            'Modela cuerpos de revolución (cono, cilindro, esfera) y calcula sus áreas laterales, totales y volúmenes en diseños arquitectónicos y recipientes.',
            'Aplica la ley de senos y cosenos en triángulos oblicuángulos para resolver problemas de topografía y navegación.',
            'Analiza la homotecia y transformaciones afines en el diseño de planos arquitectónicos.'
          ],
          '5': [
            'Aplica la ecuación de la recta y la circunferencia en el plano cartesiano para resolver problemas de localización y trayectorias óptimas.',
            'Resuelve problemas de optimización de áreas y volúmenes en proyectos de ingeniería y diseño industrial.',
            'Demuestra teoremas geométricos y justifica rigurosamente relaciones métricas en el espacio euclidiano.'
          ]
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
          'Ciclo VI': 'Resuelve problemas de muestreo estadístico, organizando datos agrupados en tablas de frecuencias e histogramas; determina medidas de tendencia central (media, mediana, moda) y probabilidad de sucesos.',
          'Ciclo VII': 'Resuelve problemas infiriendo características de una población a partir de muestras; calcula medidas de dispersión (desviación estándar, varianza) y probabilidad condicional, sustentando conclusiones críticas.'
        },
        desempenos: {
          '1': [
            'Organiza datos cuantitativos discretos en tablas de frecuencias y gráficos circulares, y determina la media, mediana y moda.',
            'Determina las condiciones y el espacio muestral de sucesos aleatorios calculando su probabilidad clásica mediante la regla de Laplace.',
            'Recolecta datos mediante encuestas sencillas seleccionando una muestra representativa de la población escolar.'
          ],
          '2': [
            'Analiza datos agrupados en intervalos mediante histogramas y polígonos de frecuencia e interpreta el significado de las medidas de tendencia central.',
            'Calcula la probabilidad de sucesos equiprobables y no equiprobables en juegos de azar y situaciones cotidianas.',
            'Plantea conclusiones sobre tendencias estadísticas identificadas en reportes demográficos y económicos locales.'
          ],
          '3': [
            'Determina e interpreta las medidas de dispersión (rango, varianza y desviación estándar) para comparar la homogeneidad de dos poblaciones.',
            'Representa datos bidimensionales mediante diagramas de dispersión e interpreta el coeficiente de correlación lineal.',
            'Calcula la probabilidad de eventos independientes y dependientes aplicando diagramas de árbol.'
          ],
          '4': [
            'Calcula la probabilidad de eventos compuestos independientes y dependientes aplicando la regla de Laplace y diagramas de árbol.',
            'Determina medidas de posición (cuartiles, deciles y percentiles) en distribuciones de sueldos o calificaciones.',
            'Evalúa la confiabilidad de encuestas de opinión analizando el tamaño de muestra y el margen de error declarado.'
          ],
          '5': [
            'Plantea conclusiones e hipótesis estadísticas sustentadas en distribuciones normales y evalúa críticamente encuestas y reportes de investigación.',
            'Aplica pruebas de correlación y regresión lineal simple para predecir comportamientos de variables socioeconómicas.',
            'Toma decisiones informadas ante situaciones de incertidumbre fundamentadas en probabilidades condicionales y teorema de Bayes.'
          ]
        }
      }
    ]
  },

  // 11. Ciencia y Tecnología
  {
    id: 'ciencia_tecnologia',
    nombre: 'Ciencia y Tecnología',
    color: 'emerald',
    competencias: [
      {
        id: 'ct_indaga',
        nombre: 'Indaga mediante métodos científicos para construir sus conocimientos',
        capacidades: [
          'Problematiza situaciones para hacer indagación.',
          'Diseña estrategias para hacer indagación.',
          'Genera y registra datos e información.',
          'Analiza datos e información.',
          'Evalúa y comunica el proceso y resultados de su indagación.'
        ],
        estandares: {
          'Ciclo VI': 'Indaga a partir de preguntas científicas y formula hipótesis en las que establece relaciones de causalidad; diseña planes de observación o experimentación controlando variables independientes y dependientes; registra datos y los analiza para formular conclusiones.',
          'Ciclo VII': 'Indaga a partir de preguntas complejas sobre el comportamiento de variables; formula hipótesis respaldadas en teorías científicas; diseña procedimientos rigurosos de medición y analiza datos con rigor estadístico contrastando sus resultados.'
        },
        desempenos: {
          '1': [
            'Formula preguntas sobre el hecho o fenómeno observado y plantea hipótesis que relacionan variables independiente y dependiente.',
            'Propone un procedimiento de observación o experimentación seleccionando materiales e instrumentos seguros para comprobar su hipótesis.',
            'Registra datos cualitativos y cuantitativos en tablas organizadas y representa los resultados mediante gráficos de barras.'
          ],
          '2': [
            'Propone un procedimiento de experimentación controlando variables intervinientes y seleccionando materiales e instrumentos de medición seguros.',
            'Obtiene datos cuantitativos repetidos y calcula el promedio para reducir el margen de error experimental.',
            'Contrasta los resultados obtenidos con su hipótesis inicial y con fuentes de información científica para elaborar conclusiones válidas.'
          ],
          '3': [
            'Obtiene datos cualitativos y cuantitativos a partir de la manipulación de la variable independiente y mediciones repetidas de la variable dependiente.',
            'Analiza tendencias en gráficos de dispersión y calcula la incertidumbre en las mediciones realizadas en el laboratorio escolar.',
            'Comunica las conclusiones de su indagación en un informe estructurado reconociendo limitaciones y proponiendo mejoras al diseño experimental.'
          ],
          '4': [
            'Formula hipótesis basadas en modelos teóricos sobre fenómenos biológicos, químicos o físicos que requieren muestreo sistemático.',
            'Diseña protocolos de bioseguridad y gestión de reactivos químicos para garantizar una indagación experimental confiable y limpia.',
            'Aplica herramientas estadísticas para validar la correlación entre variables y formula generalizaciones científicas sustentadas.'
          ],
          '5': [
            'Compara los datos obtenidos con la hipótesis formulada e información científica para confirmar o refutar la hipótesis y formular conclusiones.',
            'Sustenta si las conclusiones responden a la pregunta de indagación y comunica su informe científico en formatos formales ante la comunidad.',
            'Evalúa el alcance y las implicancias éticas del método experimental empleado y el impacto de los hallazgos en la sociedad.'
          ]
        }
      },
      {
        id: 'explica_mundo_fisico',
        nombre: 'Explica el mundo físico basándose en conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo',
        capacidades: [
          'Comprende y usa conocimientos sobre los seres vivos, materia y energía, biodiversidad, Tierra y universo.',
          'Evalúa las implicancias del saber y del quehacer científico y tecnológico.'
        ],
        estandares: {
          'Ciclo VI': 'Explica, con base en evidencia con respaldo científico, las relaciones cualitativas y las cuantificables entre: el campo eléctrico con la estructura del átomo, la energía con el trabajo, o las funciones de la célula con sus requerimientos energéticos.',
          'Ciclo VII': 'Explica, con base en evidencias con respaldo científico, las relaciones cualitativas y las cuantificables entre: la estructura microscópica de un material y su reactividad, la evolución biológica y la genética molecular; y evalúa el impacto bioético y ambiental.'
        },
        desempenos: {
          '1': [
            'Explica cómo la célula a través de reacciones químicas transforma los nutrientes en energía que permite el funcionamiento celular.',
            'Describe la estructura atómica y clasifica los elementos químicos en la tabla periódica según sus propiedades periódicas.',
            'Justifica la importancia de los ciclos biogeoquímicos (carbono, nitrógeno, agua) en el equilibrio de la biosfera.'
          ],
          '2': [
            'Explica cualitativa y cuantitativamente que el movimiento de un cuerpo depende de la fuerza resultante que actúa sobre él (Leyes de Newton).',
            'Explica las formas de propagación del calor y la conservación de la energía en transformaciones mecánicas y térmicas.',
            'Fundamenta la importancia de la conservación de la biodiversidad de los ecosistemas peruanos ante el cambio climático.'
          ],
          '3': [
            'Explica la formación de enlaces químicos (iónico, covalente, metálico) a partir de la configuración electrónica y las fuerzas intermoleculares.',
            'Sustenta cómo las reacciones químicas exotérmicas y endotérmicas obedecen a la ley de conservación de la masa y la energía.',
            'Explica las funciones de los sistemas endocrino, nervioso e inmunológico en el mantenimiento de la homeostasis corporal.'
          ],
          '4': [
            'Explica la relación entre la estructura del ADN, la síntesis de proteínas y la transmisión de caracteres hereditarios (Leyes de Mendel).',
            'Sustenta las teorías de la evolución biológica (selección natural) a partir de evidencias fósiles, anatómicas y moleculares.',
            'Evalúa el impacto de la radiación electromagnética y la fisión nuclear en la salud humana y la generación de energía limpia.'
          ],
          '5': [
            'Fundamenta una postura ética y científica frente a tecnologías emergentes como la edición genética CRISPR y las energías renovables.',
            'Explica el origen y evolución del universo a partir de la teoría del Big Bang y el comportamiento de las ondas gravitacionales.',
            'Analiza las implicancias socioambientales de la nanotecnología y la explotación de minerales críticos para la transición ecológica.'
          ]
        }
      },
      {
        id: 'ct_disena',
        nombre: 'Diseña y construye soluciones tecnológicas para resolver problemas de su entorno',
        capacidades: [
          'Determina una alternativa de solución tecnológica.',
          'Diseña la alternativa de solución tecnológica.',
          'Implementa y valida la alternativa de solución tecnológica.',
          'Evalúa y comunica el funcionamiento y los impactos de su alternativa de solución tecnológica.'
        ],
        estandares: {
          'Ciclo VI': 'Diseña y construye soluciones tecnológicas al delimitar el alcance del problema tecnológico y justificar su propuesta de solución; representa su diseño con bocetos a escala y selecciona materiales por sus propiedades; construye el prototipo y valida su funcionamiento.',
          'Ciclo VII': 'Diseña y construye soluciones tecnológicas integrando principios científicos y de ingeniería; optimiza recursos y reduce el impacto ambiental de su diseño; verifica el cumplimiento de los requerimientos técnicos y evalúa la eficiencia global de la solución.'
        },
        desempenos: {
          '1': [
            'Describe el problema tecnológico, sus causas y los requisitos que debe cumplir la solución propuesta en su comunidad.',
            'Representa la solución tecnológica mediante dibujos estructurados a escala señalando dimensiones, componentes y fases de construcción.',
            'Selecciona materiales locales e instrumentos de trabajo considerando costos, disponibilidad y normas de seguridad.'
          ],
          '2': [
            'Construye el prototipo manipulando herramientas y materiales con medidas de bioseguridad y ejecuta pruebas de funcionamiento.',
            'Realiza mediciones de las variables de control y compara el rendimiento del prototipo con las especificaciones previstas.',
            'Explica las dificultades encontradas en la fase de armado y propone modificaciones en los materiales para mejorar su durabilidad.'
          ],
          '3': [
            'Diseña la alternativa de solución tecnológica integrando circuitos eléctricos básicos o mecanismos de poleas y engranajes.',
            'Calcula los costos de fabricación del prototipo y el tiempo estimado de vida útil de sus componentes.',
            'Evalúa la eficiencia técnica y el ahorro de agua o energía alcanzado con la implementación de la solución.'
          ],
          '4': [
            'Realiza ajustes y calibraciones al prototipo para mejorar su eficiencia ante fallas detectadas en la fase de validación.',
            'Integra sensores electrónicos o placas programables (Arduino, micro:bit) para automatizar la solución tecnológica.',
            'Evalúa el impacto ecológico de los materiales residuales generados durante la construcción del prototipo.'
          ],
          '5': [
            'Sustenta el impacto ambiental y social de la solución tecnológica implementada y propone mejoras de optimización energética.',
            'Comunica los resultados de la validación técnica mediante un informe de ingeniería y planos normalizados.',
            'Promueve la replicabilidad y transferencia de la solución tecnológica en favor del desarrollo sostenible de su comunidad.'
          ]
        }
      }
    ]
  }
];

export const competenciasTransversales: CompetenciaCNEB[] = [
  {
    id: 'trans_tic',
    nombre: 'Se desenvuelve en los entornos virtuales generados por las TIC',
    capacidades: [
      'Personaliza entornos virtuales.',
      'Gestiona información del entorno virtual.',
      'Interactúa en entornos virtuales.',
      'Crea objetos virtuales en diversos formatos.'
    ],
    estandares: {
      'Ciclo VI': 'Se desenvuelve en los entornos virtuales cuando integra distintas actividades, actitudes y conocimientos de diversos contextos socioculturales en su entorno virtual personal. Crea materiales digitales (presentaciones, videos, documentos, diseños) que responden a necesidades concretas.',
      'Ciclo VII': 'Se desenvuelve en los entornos virtuales cuando interactúa en diversos espacios de manera ética y segura. Diseña y personaliza su identidad digital, optimiza estrategias de búsqueda y filtraje crítico, y desarrolla proyectos colaborativos mediante plataformas digitales.'
    },
    desempenos: {
      '1': [
        'Navega en diversos entornos virtuales recomendados adaptando funcionalidades básicas de acuerdo con sus necesidades de aprendizaje.',
        'Organiza información de diferentes formatos en carpetas digitales y elabora materiales interactivos básicos.',
        'Aplica pautas de seguridad y respeto en la comunicación por correo electrónico y plataformas escolares.'
      ],
      '2': [
        'Contrasta información recopilada de diversas fuentes digitales evaluando su fiabilidad, actualidad y autoría.',
        'Produce infografías, audios y presentaciones multimedia utilizando herramientas en la nube colaborativa.',
        'Participa en foros y chats educativos compartiendo recursos y debatiendo con cordialidad digital.'
      ],
      '3': [
        'Diseña y personaliza entornos virtuales de aprendizaje seleccionando aplicaciones que potencian su rendimiento académico.',
        'Publica contenidos digitales en blogs o páginas web escolares respetando las licencias Creative Commons y derechos de autor.',
        'Aplica protocolos de ciberseguridad protegiendo sus datos personales y contraseñas en internet.'
      ],
      '4': [
        'Aplica normas de comportamiento y seguridad en redes de colaboración virtual gestionando proyectos grupales en línea.',
        'Edita videos y podcasts educativos con software especializado aplicando criterios de ritmo y calidad audiovisual.',
        'Evalúa la veracidad de contenidos digitales identificando noticias falsas (fake news) y sesgos algorítmicos.'
      ],
      '5': [
        'Desarrolla proyectos y soluciones innovadoras mediante programación, diseño 3D o plataformas virtuales colaborativas.',
        'Administra comunidades virtuales de aprendizaje orientadas a la investigación escolar y el debate ciudadano.',
        'Optimiza flujos de trabajo académico utilizando herramientas avanzadas de inteligencia artificial y análisis de datos de manera ética.'
      ]
    }
  },
  {
    id: 'trans_autonomo',
    nombre: 'Gestiona su aprendizaje de manera autónoma',
    capacidades: [
      'Define metas de aprendizaje.',
      'Organiza acciones estratégicas para alcanzar sus metas de aprendizaje.',
      'Monitorea y ajusta su desempeño durante el proceso de aprendizaje.'
    ],
    estandares: {
      'Ciclo VI': 'Gestiona su aprendizaje de manera autónoma al darse cuenta lo que debe aprender al distinguir lo sencillo o complejo de una tarea, y por ende define metas personales respaldándose en sus potencialidades. Comprende que debe organizarse lo más específicamente posible.',
      'Ciclo VII': 'Gestiona su aprendizaje de manera autónoma al evaluar los resultados y los aportes que le brindan los demás para decidir si realizará o no cambios en las estrategias para el éxito de la meta de aprendizaje. Formula metas complejas y viables considerando el tiempo y los recursos.'
    },
    desempenos: {
      '1': [
        'Determina metas de aprendizaje viables asociadas a sus conocimientos, estilos de aprendizaje, habilidades y actitudes para el logro de la tarea.',
        'Organiza un conjunto de acciones y secuencias para alcanzar sus objetivos escolares en los plazos previstos.',
        'Revisa con ayuda del docente si las estrategias empleadas le permiten avanzar hacia la meta de aprendizaje.'
      ],
      '2': [
        'Organiza un conjunto de estrategias y procedimientos en función del tiempo y de los recursos de que dispone para lograr las metas.',
        'Monitorea de manera permanente sus avances contrastando su trabajo con los criterios de evaluación establecidos.',
        'Realiza ajustes oportunos en sus tareas ante dificultades detectadas durante el proceso de aprendizaje.'
      ],
      '3': [
        'Revisa la aplicación de las estrategias, los procedimientos y los recursos utilizados en función del nivel de avance de las metas de aprendizaje.',
        'Explica con claridad qué aprendió, qué dificultades se presentaron y qué pasos siguió para superarlas con éxito.',
        'Demuestra perseverancia y motivación intrínseca para culminar proyectos académicos exigentes.'
      ],
      '4': [
        'Explica las dificultades que se presentaron en el desarrollo de sus actividades y las adaptaciones que realizó para llegar a la meta.',
        'Evalúa de manera crítica los aportes de sus pares en actividades colaborativas para enriquecer su propio trabajo.',
        'Establece metas de superación académica a mediano plazo orientadas a sus aspiraciones de estudios superiores.'
      ],
      '5': [
        'Evalúa de manera permanente el avance de sus metas de aprendizaje al comparar el resultado obtenido con lo planificado.',
        'Modifica de manera flexible sus estrategias de estudio incorporando nuevas metodologías de aprendizaje autónomo y continuo.',
        'Sustenta su proceso metacognitivo demostrando autorregulación, rigor intelectual y compromiso con el aprendizaje para toda la vida.'
      ]
    }
  }
];
