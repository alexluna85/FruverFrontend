export class UsuarioModel {
    constructor(
        public idUsuario: number,
        public email: string,
        public password: string,
        public nombres: string,
        public direccion: string,
        public rol: string
    ) {
    }
}

