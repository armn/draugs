import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShelterPageRoutingModule } from './shelter-routing.module';

import { ShelterPage } from './shelter.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShelterPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShelterPage]
})
export class ShelterPageModule {}
