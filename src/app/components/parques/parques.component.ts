import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, DoCheck, OnDestroy  } from '@angular/core';

@Component({
    selector: 'parques',
    templateUrl: './parques.component.html'
})
export class ParquesComponent implements OnChanges, OnInit, DoCheck, OnDestroy {
    @Input() nombre: string;
    @Input('metros_cuadrados') metros: number;
    public vegetacion: string;
    public abierto: boolean;

    @Output() pasameLosDatos = new EventEmitter();

    constructor() {
        this.nombre = 'Parque natural para caballos';
        this.metros = 600;
        this.vegetacion = 'Alta';
        this.abierto = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes);
        console.log('Existen cambios en las propiedades');
    }

    ngOnInit() {
        console.log('Metodo on init lanzado');
    }

    ngDoCheck() {
        console.log('El DoCheck se ha ejecutado');
    }

    ngOnDestroy() {
        console.log('Se va eliminar el componente');
    }
    emitirEvento() {
        this.pasameLosDatos.emit({
            'nombre': this.nombre,
            'metros': this.metros,
            'vegetacion': this.vegetacion,
            'abierto': this.abierto
        });
    }
}
