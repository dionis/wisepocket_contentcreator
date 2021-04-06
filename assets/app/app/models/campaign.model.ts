import { Imagen } from "./image.model";
import { User } from "./user.model";

export class Campaign{
    id:string;
    titulo: string;
    descripcion: string;
    contanctoTelefono: string;
    state: string;
    city: string;
    colorPrincipal: string
    colorSecundario: string
    contactoEmail: string
    direccionPostal: string
    contactoTelegram: string
    contactoWhatsapp: string
    contactoFacebook: string
    logo: string;
    carrusel1: string;
    carrusel2: string;
    carrusel3:string;
    carrusel4:string; 
    createdby : User
}