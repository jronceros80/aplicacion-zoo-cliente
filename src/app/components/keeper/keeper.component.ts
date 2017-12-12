import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import { User } from '../../models/user'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'keeper',
  templateUrl: './keeper.component.html',
  animations: [fadeIn],
  providers: [UserService]
})
export class KeeperComponent implements OnInit{

    public title: string;
    public url;
    public keepers:User[];
    constructor(
        private _userService: UserService
    ){
        this.title = 'Cuidadores';
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('keeper.component cargado');
        this.getKeepers();
    }

    getKeepers(){
        this._userService.getKeepers().subscribe(
          response => {
            if(response.users){
              this.keepers = response.users;
            }
          },
          error =>{
            console.log(<any>error);
          });
      }

}
