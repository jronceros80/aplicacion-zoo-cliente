//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importar componentes
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchPipe } from './components/pipes/search.pipe';

//Servicios
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../services/user.service';

@NgModule({
    declarations: [
      MainComponent,
      ListComponent,
      EditComponent,
      AddComponent,
      SearchPipe
    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpModule,
      AdminRoutingModule,
      BrowserAnimationsModule
    ],
    exports: [
        MainComponent,
        ListComponent,
        EditComponent,
        AddComponent
    ],
    providers: [
      AdminGuard,
      UserService
    ]
  })
  export class AdminModule { }