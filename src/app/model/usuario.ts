export interface Usuario {
  username:string,
  password:string,
  email:string,
  nombre:string,
  apellidos:string,
  numColegiado:number,
  calle:string,
  numDireccion:string,
  especialidad:string,
  lugNacimiento:string,
  sexo:['Hombre','Mujer'],
  fechaNac:number,
  paisResidencia:string,
  telefono:number,
  sitioTrabajo:string,
}

export let usuarioRegistrado: Usuario[] = [
  { username:'jsuarezn', password:'12345', email:'', nombre:'', apellidos:'', numColegiado: 0, calle:'', numDireccion:'', especialidad:'', lugNacimiento:'', sexo:['Hombre','Mujer'], fechaNac:0 , paisResidencia:'', telefono:0 , sitioTrabajo:''},
];
