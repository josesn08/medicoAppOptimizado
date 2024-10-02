export interface Medicamento {
  nregistro: string;
  nombre: string;
  labtitular: string;
  cpresc: string;
}

export interface MedicamentoResponse {
  totalFilas: number;
  pagina: number;
  tamanioPagina: number;
  resultados: Medicamento[];
}
