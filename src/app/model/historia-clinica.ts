
export interface HistoriaClinica {
  motivoConsulta: (string)[] ;
  antecedentes: (string|number|boolean)[],
  enfermedadActual: (string|number|boolean|SintomaPrincipal)[],
  examenFisico: (string|number|boolean)[],
  diagnostico: string,
  pruebasComplementarias: (string|number|boolean)[],
  tratamiento: (string|number|boolean)[],
}

export interface SintomaPrincipal {

}

