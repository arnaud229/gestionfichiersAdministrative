import { Injectable } from "@angular/core";


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { finalize, map, take, takeWhile } from 'rxjs/operators';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    getBlob
  } from 'firebase/storage';






@Injectable({
    providedIn: 'root',
  })
  export class StorageService  {


      private isUploadingSubject = new BehaviorSubject<boolean>(false);
  isUploading$ = this.isUploadingSubject.asObservable();

    //   appServerUrl = environement.adminServerConfig.baseUrl;


    constructor() { }






    uploadFile(options: {
        folder?: string;
        filename: string;
        file: Blob | Uint8Array | ArrayBuffer;
      }): Promise<string> {
        return new Promise((resolve, reject) => {
          const { folder, filename, file } = options;
          const storage = getStorage();
          const storageRef = ref(storage, `${folder}/${filename}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL: string) => {
                  resolve(downloadURL);
                  console.log('File available at', downloadURL);
                }
              );
            }
          );
        });
      }

    //   deleteFileFromUrl(options: {
    //     folder?: string;
    //     url: string;
    //   }): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //       const { folder, url } = options;
    //       const storage = getStorage();
    //       const imagePath = getFilePathFromUrl(url);
    
    //       console.log('options', options);
    
    //       // Create a reference to the file to delete
    //       const imageRef = ref(storage, imagePath);
    //       // const imageRef = firebase.storage().refFromURL(url);
    //       console.log('imageRef', imageRef);
    //       // Delete the file
    //       deleteObject(imageRef)
    //         .then(() => {
    //           console.log('deleted', url);
    //           resolve(true);
    //           // File deleted successfully
    //         })
    //         .catch((error) => {
    //           // Uh-oh, an error occurred!
    //           console.log('error', error);
    //           reject(error);
    //         });
    //     });
    //   }
    
  }



//   function getFilePathFromUrl(url: string) {
//     const { storageBucket } = environement.firebaseConfig;
//     const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/`;
  
//     let imagePath: string = url.replace(baseUrl, '');
  
//     const indexOfEndPath = imagePath.indexOf('?');
  
//     imagePath = imagePath.substring(0, indexOfEndPath);
  
//     imagePath = imagePath.replace(/%2F/g, '/');
  
//     imagePath = imagePath.replace(/%20/g, ' ');
  
//     return imagePath;
//   }