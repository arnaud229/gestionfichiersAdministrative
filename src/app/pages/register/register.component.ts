import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Inscription</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="nom">
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Prénoms</mat-label>
              <input matInput formControlName="prenoms">
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Service</mat-label>
              <mat-select formControlName="service">
                <mat-option value="RH">Ressources Humaines</mat-option>
                <mat-option value="IT">Informatique</mat-option>
                <mat-option value="FINANCE">Finance</mat-option>
                <mat-option value="MARKETING">Marketing</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="password" type="password">
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="!registerForm.valid">
              S'inscrire
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="goToLogin()">Déjà inscrit ? Se connecter</button>
        </mat-card-actions>


        <mat-card-title *ngIf="iserrorlog">
        <p class="smsError" >  {{erreur_message}} </p>
        </mat-card-title>
      </mat-card>

  
      
    </div>
  `,
  styles: [`
    .register-container {
      height: auto;
      padding-top: 20px;
      padding-bottom: 20px;
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

    .smsError
    {
      color: red;
      
    }
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
    .smsError
    {
      color: red;
      
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  erreur_message ='';
  iserrorlog = false;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {

      this.iserrorlog = false;
      
        const { password, ...userData } = this.registerForm.value;
        await this.auth.register(userData, password)
        .then(
          () => {
            this.router.navigate(['/login']);
          }
        )
        .catch(
          (error) => {
            
        
      var errorCode = error.code;
      var errorMessage = error.message
      this.erreur_message = errorMessage;

      if (errorCode = "auth/network-request-failed") {

        this.erreur_message = ' Verifiez votre connexion internet'
        
      } else if(errorCode = "auth/email-already-in-use") {
        this.erreur_message = ' Un compte existe déjà avec ce email.'
        
      }
        console.error('Erreur d\'inscription:', error);

          }
        )
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}