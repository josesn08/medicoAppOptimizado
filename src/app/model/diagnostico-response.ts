export interface DiagnosticoResponse {
  count: number;
    next: string | null;
    previous: string | null;
    results: Array<{ codigo: string; descripcion: string }>;
}
