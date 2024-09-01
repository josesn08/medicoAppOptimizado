export interface CuestionarioEDACS {
  diaforesis : boolean,
  puntajeDiaforesis: number,
  dolorIrradiado : boolean,
  puntajeDolorIrradiado: number,
  dolorInspiracion : boolean,
  puntajeDolorInspiracion: number,
  dolorDigitoPresion : boolean,
  puntajeDolorDigitoPresion: number,
  enfermedadCoronaria : boolean,
  antecedentesCV: boolean,
  puntajeCoronarioYFRCV: number,
  puntajeSexo: number,
  puntajeEdad: number,
  puntajeCuestionarioEDACS: number,
};

export interface CuestionarioEDACSFactoresdeRCV {
  antecedentesCoronarios : ['Ninguno', 'Infarto coronario previo', 'Bypass coronario', 'intervencion percutanea coronaria'],
  antecedentesCV : ['Dislipemia', 'Diabetes', 'Hipertensión', 'Fumador', 'Familiar con enfermedad coronaria prematura'],
  puntuacionCuestionarioRCV:number,
};

