import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { Animal } from '../../../models/animal';

import { fadeLateral } from '../../animation';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService, UserService],
  animations: [fadeLateral]
})
export class ListComponent implements OnInit{
  public title: string;
  public animals: Animal[];
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService
  ){
    this.title = 'Listado de animales';
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getAnimals();
  }

  getAnimals(){
    this._animalService.getAnimals().subscribe(
      response => {
        if(response.animals){
          this.animals = response.animals;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  deleteAnimal(id){
    $('#myModal-'+ id).modal('hide');
    this._animalService.deleteAnimal(this.token, id).subscribe(
      response => {
        if(!response.animal){
          console.log('Error en el servidor');
        }
        this.getAnimals();
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
}
