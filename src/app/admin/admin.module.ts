import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { AddPageModule } from './add/add.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { EditPageModule } from './edit/edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    AddPageModule,
    EditPageModule,
    TranslateModule,
    NgPipesModule
    
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
