export interface CuestionarioEDACS {
  diaforesis : boolean,
  dolorIrradiado : boolean,
  dolorInspiración : boolean,
  dolorDigitoPresion : boolean,
  enfermedadCoronaria : (string)[],
  puntajeCuestionarioEDACS: number,
};

export interface CuestionarioEDACSFactoresdeRCV {
  antecedentesCoronarios : ['Ninguno', 'Infarto coronario previo', 'Bypass coronario', 'intervencion percutanea coronaria'],
  antecedentesCV : ['Dislipemia', 'Diabetes', 'Hipertensión', 'Fumador', 'Familiar con enfermedad coronaria prematura'],
  puntuacionCuestionarioRCV:number,
};

