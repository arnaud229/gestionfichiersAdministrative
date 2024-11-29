import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Fichier } from '../models/fichier.model';
import { AuthService } from './auth.service';
import { serverTimestamp } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FichierService {
  constructor(
  
    private firestore: Firestore,
    private storage: Storage,
    private auth: AuthService
  ) {}


 async CreateDossiers(newItem: Fichier) {
    const dossiersCollection = collection(this.firestore, 'dossiers');
    return await addDoc(dossiersCollection, {
      createdAt: serverTimestamp(),
      ...newItem,
    });
  }

async getAllFichiers(){
  const q = query(
    collection(this.firestore, 'fichiers'),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Fichier);

}



  async getFichiersForUser(userId: string) {
    const q = query(
      collection(this.firestore, 'fichiers'),
      where('emetteur', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Fichier);
  }

  async getFichiersForService(service: string) {
    const q = query(
      collection(this.firestore, 'fichiers'),
      where('serviceDestinataire', '==', service)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Fichier);
  }

  async updateFichier(id: string, updates: Partial<Fichier>) {
    const docRef = doc(this.firestore, 'fichiers', id);
    await updateDoc(docRef, { ...updates, updatedAt: new Date() });
  }

  async deleteFichier(fichier: Fichier) {

    fichier.media.forEach( 
     async (file) => { 

       // Delete from Storage
        const storageRef = ref(this.storage, file.url);
        await deleteObject(storageRef);
    
      }
    )

      // Delete from Firestore
      const docRef = doc(this.firestore, `fichiers/${fichier.id}`);
      await deleteDoc(docRef);

  }
}