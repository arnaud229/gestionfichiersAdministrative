export interface User {
  uid: string;
  email: string;
  nom: string;
  prenoms: string;
  service: string;
  role?: 'user' | 'admin';
  createdAt: Date;
}