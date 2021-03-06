import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
    public title: string;
    public status: string;
    public user: User;
    constructor(
        private _userService: UserService
    ) {
        this.title = 'Registro';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('register.component cargado');
    }

    onSubmit(registerForm) {
        this._userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    this.status = 'success';
                    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                    registerForm.reset();
                }else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
