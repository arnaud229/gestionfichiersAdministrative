import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyDnL-QNdkboktNBqgYTvYkRmLMba7twGgY",
  authDomain: "gestionfichiers-f88b5.firebaseapp.com",
  projectId: "gestionfichiers-f88b5",
  storageBucket: "gestionfichiers-f88b5.firebasestorage.app",
  messagingSenderId: "600623966303",
  appId: "1:600623966303:web:abc258c15e9c0c40c653ea"
};

export const appConfig = [
  provideRouter(routes), // Utilisation de forRoot ici, car c'est dans le module principal
  provideAnimations(),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),  // Fournisseur pour Firebase
  provideAuth(() => getAuth()),  // Fournisseur pour Firebase Auth
  provideFirestore(() => getFirestore()),  // Fournisseur pour Firestore
  provideStorage(() => getStorage())  // Fournisseur pour Firebase Storage
];





