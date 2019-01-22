import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public identity;
    public token;
    public status: string;

    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Identificate';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('login.component cargado');
    }

    onSubmit() {
        // Logear al usuario y conseguir el objeto
        this._userService.signut(this.user).subscribe(
            response => {
               this.identity = response.user;

               if (!this.identity || !this.identity._id) {
                   alert('El usuario no se ha logeado correctamente');
                }else {
                    this.identity.password = '';
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    // Mostrar el identity
                    console.log(this.identity);

                    // Conseguir el token
                    this._userService.signut(this.user, 'true').subscribe(
                        response => {
                           this.token = response.token;
            
                           if (this.token.length <= 0) {
                               alert('El token no se ha generado');
                            }else {
                                // Mostrar el token
                                localStorage.setItem('token', this.token);
                                this.status = 'success';
                                this._router.navigate(['/']);
                            }
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );
                }
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    // let body = JSON.parse(error._body);
                    this.status = 'error';
                }
            }
        );
    }
}
