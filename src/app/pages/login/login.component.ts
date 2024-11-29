import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Connexion</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="password" type="password">
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">
              Se connecter
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="goToRegister()">Créer un compte</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }
    mat-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    mat-card-title {
    margin-bottom: 10px;
  }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      
        const { email, password } = this.loginForm.value;
        await this.auth.login(email, password).then(
        async  () => {
              
         await this.auth.getCurrentUser()
            .then(
              (res)=> {

                this.currentUser = res;
                

                if(this.currentUser?.role == 'user' ) {
                  this.router.navigate(['/home']);
                } 
                else {
                  this.router.navigate(['/dashboard']);
                }
              }
            )
          }
        )
      .catch (
        (error) => {
            
          console.error('Erreur de connexion:', error.message);
        }
      )
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}