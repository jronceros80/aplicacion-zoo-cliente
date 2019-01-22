import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

    public title: string;
    public user: User;
    public identity;
    public token;
    public status;
    public url;
    public fileToUpload: Array<File>;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService
    ) {
        this.title = 'Actualizar mis datos';
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('user-edit cargado');
    }

    onSubmit() {
        this._userService.updateUser(this.user).subscribe(
            response => {
                    if (!response.user) {
                        this.status = 'error';
                    }else {
                        this.status = 'success';
                        localStorage.setItem('identity', JSON.stringify(this.user));
                    }

                    // Subida de la imagen
                    this._uploadService.makeFileRequest(
                        this.url + 'upload-image-user/' + this.user._id, [], this.fileToUpload, this.token, 'image')
                        .then((result: any) => {
                            this.user.image = result.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                            console.log(this.user);
                        });
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    fileChangeEvent(fileInput: any) {
        this.fileToUpload = <Array<File>>fileInput.target.files;
    }
}
