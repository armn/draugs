import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { LostPageRoutingModule } from './lost-routing.module';

import { LostPage } from './lost.page';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: LostPage }])

  ],
  declarations: [LostPage]
})
export class LostPageModule {}
