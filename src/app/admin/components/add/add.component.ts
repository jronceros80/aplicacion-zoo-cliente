import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
 
import { GLOBAL } from '../../../services/global';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Animal } from '../../../models/animal';

import { fadeLateral } from '../../animation';

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  providers: [UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class AddComponent implements OnInit{
  public title = 'Añadir';
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService
  ){
    this.title = 'Añadir';
    this.animal = new Animal('','','',2017,'','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('animal-add componente se ha agregado correctamente');
  }
  
  onSubmit(){
    this._animalService.addAnimal(this.token, this.animal).subscribe(
      response =>{
          if(!response.animal){
              this.status = 'error';
          }else{
              this.status = 'success';
              this.animal = response.animal;

              //Subir imagen del animal
              if(!this.fileToUpload){
                this._router.navigate(['/admin-panel/listado']);
              }else{
                this._uploadService.makeFileRequest(this.url+ 'upload-image-animal/'+ this.animal._id, [], this.fileToUpload, this.token, 'image')
                  .then((result: any) => {
                      this.animal.image = result.image;
                      console.log(this.animal);
                      this._router.navigate(['/admin-panel/listado']);
                  });
              }
              
          }
      },
      error =>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            this.status = 'error';
          }
      }
  );
  }

  public fileToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.fileToUpload = <Array<File>>fileInput.target.files;
  }
}
