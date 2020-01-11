import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { TranslateModule } from '@ngx-translate/core';
import { ShelterPageModule } from '../shelter/shelter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    TranslateModule,
    ShelterPageModule
  ],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
