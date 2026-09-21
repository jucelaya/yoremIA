export interface InstitucionData {
  docente: string;
  colegio: string;
  director: string;
  contextoDua: string;
}

export interface CursoTemaData {
  nivel: 'Primaria' | 'Secundaria';
  gradoId: string;
  areaId: string;
  tema: string;
  tituloUnidad: string;
  tituloSesion: string;
}

export interface CompetenciasData {
  competenciaIds: string[];
  competenciasTransversalesIds?: string[];
  sugeridaPorIA: boolean;
}

export interface EnfoquesRecursosData {
  enfoquesIds: string[];
  referencias: string;
  recursos: string;
  materiales: string;
}

export interface EvaluacionData {
  duracionMinutos: number;
  instrumento: 'Lista de cotejo' | 'Rúbrica de evaluación' | 'Escala de valoración';
  listaAlumnosRaw: string;
  adaptacionesNee: boolean;
}

export interface PlanificaFormData {
  institucion: InstitucionData;
  curso: CursoTemaData;
  competencias: CompetenciasData;
  enfoques: EnfoquesRecursosData;
  evaluacion: EvaluacionData;
}
