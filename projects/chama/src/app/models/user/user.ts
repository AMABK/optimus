import { Chama } from '../chama/chama';

export class User {
         "id": null;
         "email": string;
         "email_verified_at": string;
         "first_name": string;
         "middle_name": string;
         "last_name": string;
         "phone": string;
         "address": string;
         "gender": string;
         "designation": string;
         "status": number;
         "chama_id": null;
         "created_by": string;
         "created_at": string;
         "updated_at": string;
         default_chama?: Chama;
         chamas?: Chama;
         payment_modes?: [];
       }
