import { Usuario } from './usuario.model';
import { Hospital } from './hospital.model';

export class Medico {

    constructor(
        public name: string,
        public usuario?: Usuario,
        public hospital?: Hospital,
        public img?: string,
        public _id?: string
    ) { }
}
