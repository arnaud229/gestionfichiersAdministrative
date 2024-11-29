import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FichierService } from '../../services/fichier.service';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RecuFile } from '../../models/fichier.model';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {
  @ViewChild('fileInput')
  fileInput!: ElementRef; 
  @Output() fileUploaded = new EventEmitter<void>();
  
  uploadForm!: FormGroup;
  // selectedFile: File | null = null
  maxFileSize = 10;
  iserrorlog = false;
  message ='';
  les_url: any[] = [];
  multiple: boolean = false;
  change: EventEmitter<any[]> = new EventEmitter();
  ChoixImg: boolean = false;
  currentUser: User | null = null;
  userId!: any; 
  mediaFile!: RecuFile[];
  isUploading = false;


  

  constructor(
    private fb: FormBuilder,
    private fichierService: FichierService,
    private firebaseStorageService: StorageService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.init_form()
  }


  async ngOnInit() {
    this.currentUser = await this.auth.getCurrentUser();
    this.userId = this.currentUser?.uid
    this.init_form();
  }

  init_form() {
    this.uploadForm = this.fb.group({
      type: ['', Validators.required],
      serviceDestinataire: ['', Validators.required],
      objet: ['', Validators.required]
    });
  }


  async  onFileSelected(event : any) {
    console.log('event', event);
    let files = [...event.target.files];
    event.target.value = null;
    const invalidFile = files.find(
      (e) => e.size / 1024 / 1024 > this.maxFileSize
    );
    if (invalidFile) {
      this.iserrorlog = true;
  
      this.message = "La taille de votre fichier depasse 10MB, veuillez choisi un fichier moins de  10MB"

      return;
    }
    // .filter(e=>e.type.trim().length>0);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      element.file = element;
      element.previewUrl = await this.fileToBase64(element);
    }
    this.les_url = this.multiple
      ? [...this.les_url, ...files]
      : [...files];
    this.emitChangeEvent();
    // this.les_url = new Array(10).fill({}).map(e=>files[0])
    console.log('this.les_url', this.les_url);
    this.ChoixImg = true;

  }

  fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async emitChangeEvent() {
    // const isMobile = this.platform.is('mobile');

    if (this.multiple) {
      this.change.emit(this.les_url);
    }

    if (!this.multiple) {
      this.change.emit(this.les_url[0]);
    }
  }

async  onSubmit()
 {
  console.log("dossiers",this.uploadForm.value)
    
  if (this.uploadForm.invalid) {  } 
    console.log('tete0');
    const uploadPromises = this.les_url.map(async (image) => {
      this.isUploading = true; 

    const url = await this.firebaseStorageService.uploadFile({
      folder: 'dossiers',
      filename:
        'fichier-' +
        new Date().getTime() +
        this.userId +
        '.' +
        image.name?.split('.')?.[1],
      file: image.file,
     
    });
      console.log('tete1');
      
      image.downloadUrl = url;

      const fileF = {
        type: image.type,
        url: url
      }

      return fileF;

  });

  const uploadedUrls = await Promise.all(uploadPromises);
  // Filtrer les URLs null (échecs de téléchargement)
  const successfulUrls = uploadedUrls.filter(file => file.url !== null);
    this.mediaFile = successfulUrls;


    
       console.log('tete11');

       console.log('tete2');

       const infoFile = {

        type: this.uploadForm.value.type,
        date: new Date(),
        objet: this.uploadForm.value.objet,
        media: this.mediaFile,    
        serviceEmetteur: this.uploadForm.value.serviceEmetteur,
        serviceDestinataire: this.uploadForm.value.serviceDestinataire,
       }


       this.fichierService.CreateDossiers(infoFile)
       .then(
        (e) => {
        //  this.router.navigate(["home", {index: 0}])
        }
     
    )
    
   .catch(
     (error: { code: any; message: any }) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log('vous aviez une erreur ' + errorCode + ': ' + errorMessage);
     }
)



 }

 closeError() {
  this.iserrorlog = false;

 }

 getfils() {
 
    console.log('has click', this.fileInput);
  setTimeout(() => {
    this.fileInput.nativeElement.click();
  }, 500);

 }



  


}
