import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FichierService } from '../../services/fichier.service';
import { Fichier } from '../../models/fichier.model';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary">
        <span>Gestion de Fichiers</span>
        <span class="spacer"></span>
        <button mat-icon-button (click)="logout()">
        <img  src="assets/logout.png" alt="" >
        </button>
      </mat-toolbar>

      <mat-sidenav-container>
        <mat-sidenav mode="side" opened>
          <mat-nav-list>
            <a mat-list-item (click)="showMyFiles()">
            <img class="zus" src="assets/icon_folder.png" alt="" >
               fichiers
            </a>
            <a mat-list-item  *ngFor="let item of services"  (click)="showServiceFiles(item)">
            <img class="zus" src="assets/icon_folder_shared.png" alt="" >
              service {{item}}
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content">
            <div class="actions">
           
              <mat-form-field>
                <mat-label>Rechercher</mat-label>
                <input matInput (keyup)="applyFilter($event)" placeholder="Ex. rapport">
              </mat-form-field>
            </div>

            <table mat-table [dataSource]="fichiers" class="mat-elevation-z8">
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let fichier">{{fichier.type}}</td>
              </ng-container>

              <ng-container matColumnDef="objet">
                <th mat-header-cell *matHeaderCellDef>Objet</th>
                <td mat-cell *matCellDef="let fichier">{{fichier.objet}}</td>
              </ng-container>

              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Date</th>
                <td mat-cell *matCellDef="let fichier">{{fichier.date | date}}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let fichier">
                  <button mat-icon-button (click)="downloadFile(fichier)">
                  <img src="assets/icon_down.jpg" alt="" >
                  </button>
                  <button mat-icon-button (click)="deleteFichier(fichier)" >
                  <img  src="assets/suprime.png" alt="" >
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .spacer {
      flex: 1 1 auto;
    }

    mat-sidenav-container {
      flex: 1;
    }

    .zus
  {
    width: 20px;
    height: 20px;
  }

    mat-sidenav {
      width: 250px;
    }

    .content {
      padding: 20px;
    }

    .actions {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }
  `]
})
export class DashboardComponent implements OnInit {
   currentUser: User | null = {
    uid: 'qfsqefgyzeyuirt',
    email: 'loko@gmail.com',
    nom: 'fofo',
    prenoms: 'roro',
    service: 'Ressources Humaines',
    role: 'user',
    createdAt: new Date(),

  };
  services = ['Ressources Humaines', 'Informatique', 'Finance', 'Marketing']
  fichiers: Fichier[] = [
    {
      id: 'ezfzejfvexdfgxdfrtgezrger',
      type: 'Rapport',
      date: new Date(),
      objet: 'tu es née',
      media: [
      {
        type: 'reer.pdf',
        url: 'fertgesryr'
      },
      {
        type: 'reer.pdf',
        url: 'fertgesryr'
      },
    ],
      serviceEmetteur: 'Ressources Humaines',
      serviceDestinataire: 'Informatique',
      createdAt: new Date(),
    },
    {
      id: 'ezfzejfvertgezrergssdger',
      type: 'Rapport',
      date: new Date(),
      objet: 'tu es née',
      media: [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Ressources Humaines',
      serviceDestinataire: 'Informatique',
      createdAt: new Date(),
    },
    {
      id: 'ezfzejfvertgezrger',
      type: 'Rapport',
      date: new Date(),
      objet: 'tu es née',
      media:  [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Ressources Humaines',
      serviceDestinataire: 'Finance',
      createdAt: new Date(),
    },
    {
      id: 'ezfzejfvehrtgellzrger',
      type: 'Facture',
      date: new Date(),
      objet: 'tu es née',
      media:  [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Finance',
      serviceDestinataire: 'Finance',
      createdAt: new Date(),
    },
    {
      id: 'ezfzejfvertgezhsdfgrger',
      type: 'Facture',
      date: new Date(),
      objet: 'tu es née',
      media: [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Ressources Humaines',
      serviceDestinataire: 'Marketing',
      createdAt: new Date(),
    },
    {
      id: 'ezfzejfvertgezlmirger',
      type: 'Rapport',
      date: new Date(),
      objet: 'tu es née',
      media:  [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Ressources Humaines',
      serviceDestinataire: 'Informatique',
      createdAt: new Date(),
    },
    {
      id: 'ezfzfghnejfvertmpiyhgezrger',
      type: 'Rapport',
      date: new Date(),
      objet: 'tu es née',
      media: [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Finance',
      serviceDestinataire: 'Marketing',
      createdAt: new Date(),
    },
    {
      id: 'ezfzejfhjkvertgezrgiier',
      type: 'Rapport',
      date: new Date(),
      objet: 'tu es née',
      media:  [
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
        {
          type: 'reer.pdf',
          url: 'fertgesryr'
        },
      ],
      serviceEmetteur: 'Marketing',
      serviceDestinataire: 'Finance',
      createdAt: new Date(),
    },


  ];
  displayedColumns: string[] = ['type', 'objet', 'date', 'actions'];
  
  constructor(
    private auth: AuthService,
    private fichierService: FichierService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = await this.auth.getCurrentUser();
    if (this.currentUser) {
      this.showMyFiles();
    }
  }

  async showMyFiles() {
    if (this.currentUser) {
      this.fichiers = await this.fichierService.getAllFichiers();
    }
  }

  async showServiceFiles(index: string) {
    if (this.currentUser) {
      this.fichiers = await this.fichierService.getFichiersForService(index);
    }
  }

  async refreshFiles() {
    await this.showMyFiles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.fichiers = this.fichiers.filter(fichier => 
      fichier.objet.toLowerCase().includes(filterValue) ||
      fichier.type.toLowerCase().includes(filterValue)
    );
  }

  downloadFile(fichier: Fichier) {
    // window.open(fichier.media.url, '_blank');
  }

  // canDelete(fichier: Fichier): boolean {
  //   return this.currentUser?.uid === fichier.emetteur;
  // }

  async deleteFichier(fichier: Fichier) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      await this.fichierService.deleteFichier(fichier);
      await this.refreshFiles();
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}