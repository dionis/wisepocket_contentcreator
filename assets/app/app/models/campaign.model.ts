import { Imagen } from "./image.model";
import { User } from "./user.model";

export class Campaign{
    id:string;
    titulo: string;
    descripcion: string;
    phone: string;
    country: string;
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
    carrusel: string[];
}