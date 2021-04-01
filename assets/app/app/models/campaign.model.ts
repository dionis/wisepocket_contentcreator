import { User } from "./user.model";

export class Campaign{
    titulo: string;
    descripcion: string;
    contanctoTelefono: string
    colorPrincipal: string
    colorSecundario: string
    contactoEmail: string
    direccionPostal: string
    contactoTelegram: string
    contactoWhatsapp: string
    contactoFacebook: string
  
    //   logo: {
    //     model: 'imagen',
    //     //unique: true,
    //   },
  
    //   carrusel1:{
    //     model: 'imagen',
    //   },
  
    //   carrusel2:{
    //     model: 'imagen',
    //   },
  
    //   carrusel3:{
    //     model: 'imagen',
    //   },
  
    //   carrusel4:{
    //     model: 'imagen',
    //   },
      
    createdby : User
}