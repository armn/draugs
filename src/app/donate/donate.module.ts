import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { DonatePageRoutingModule } from './donate-routing.module';

import { DonatePage } from './donate.page';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: DonatePage }])

  ],
  declarations: [DonatePage]
})
export class DonatePageModule {}
