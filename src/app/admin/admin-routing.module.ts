import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

// Guards
import { AdminGuard } from '../services/admin.guard';

const adminRoutes: Routes = [
    {
        path: 'admin-panel', component: MainComponent, canActivate: [AdminGuard], // Ruta Padre
        children: [ // Rutas hijas
            { path: '', redirectTo: 'listado' , pathMatch: 'full'},
            { path: 'listado', component: ListComponent},
            { path: 'crear', component: AddComponent},
            { path: 'editar/:id', component: EditComponent}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {}
