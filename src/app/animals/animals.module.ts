import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { AnimalsPageRoutingModule } from './animals-routing.module';

import { AnimalsPage } from './animals.page';
import { RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { PipesModule } from "../pipes/pipes.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    NgPipesModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: AnimalsPage }])
  ],
  declarations: [AnimalsPage]
})
export class AnimalsPageModule {}
