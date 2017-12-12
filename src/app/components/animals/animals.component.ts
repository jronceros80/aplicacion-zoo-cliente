import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  providers: [AnimalService],
  animations: [fadeIn]
})
export class AnimalsComponent implements OnInit{
    public title:string;
    public animals: Animal[];
    public url:string;

    constructor(
        private _animalService: AnimalService
      ){
        this.title = 'Listado de animales';
        this.url = GLOBAL.url
      }

    ngOnInit(){
        console.log('animals.component cargado');
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
        });
    }
    

}
