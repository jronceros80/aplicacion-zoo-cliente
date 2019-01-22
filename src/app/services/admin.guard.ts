import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _router: Router
    ) {
    }

    canActivate() {
        const identity = this._userService.getIdentity();
        if (identity && identity.role === 'ROLE_ADMIN') {
            return true;
        }else {
            this._router.navigate(['/']);
            return false;
        }

    }

}