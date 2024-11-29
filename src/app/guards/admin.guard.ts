import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.auth.getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}