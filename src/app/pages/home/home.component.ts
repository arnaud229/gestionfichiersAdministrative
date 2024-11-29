import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { Fichier } from '../../models/fichier.model';
import { AuthService } from '../../services/auth.service';
import { FichierService } from '../../services/fichier.service';
import { Router, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-home',
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
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: User | null = {
    uid: 'qfsqefgyzeyuirt',
    email: 'loko@gmail.com',
    nom: 'fofo',
    prenoms: 'roro',
    service: 'Ressources Humaines',
    role: 'user',
    createdAt: new Date(),

  };
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
    console.log('avant');
    
    if (this.currentUser) {
      console.log('apres');
      this.fichiers = await this.fichierService.getFichiersForUser(this.currentUser.uid);
    }
  }

  async showServiceFiles() {
    if (this.currentUser) {
      this.fichiers = await this.fichierService.getFichiersForService(this.currentUser.service);
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

  editFichier(index: any) {

  }

}
