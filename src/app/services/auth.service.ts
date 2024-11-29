import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result;
  }

  async register(user: Omit<User, 'uid' | 'createdAt'>, password: string) {
    const result = await createUserWithEmailAndPassword(this.auth, user.email, password);
    const newUser: User = {
      uid: result.user.uid,
      ...user,
      role: 'user',
      createdAt: new Date()
    };
    await setDoc(doc(this.firestore, 'users', result.user.uid), newUser);
    return result;
  }

  logout() {
    return signOut(this.auth);
  }

  async getCurrentUser(): Promise<User | null> {
    const user = this.auth.currentUser;
    if (!user) return null;
    
    const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
    return userDoc.data() as User;
  }
  
}