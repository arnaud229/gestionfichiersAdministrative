export interface Fichier {
  id?: string;
  type: string;
  date: Date;
  objet: string;
  media: RecuFile[];
  serviceEmetteur: string;
  serviceDestinataire: string;
  createdAt?: any;
}


export type RecuFile = {
  type: string;
  url: string;
};





