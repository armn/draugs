import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { EditPage } from './edit/edit.page';

import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  animals: Array<any>;
  activeAnimals: Array<any>;
  inactiveAnimals: Array<any>;
  user: any;
  constructor( private modalController: ModalController, private firebaseService: FirebaseService, private alertController: AlertController, private translate: TranslateService) {}

  ngOnInit() {
   this.firebaseService.getMyAnimals().subscribe(res => {
      this.animals = res;
    });

    this.firebaseService.user.subscribe(res => {
      this.user = res;
    })
  }

  async addAnimal() {
    const modal = await this.modalController.create({
      component: AddPage
    });
    await modal.present();
  }

  async editAnimal(animal) {
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: {
        animal: animal
      }
    });
    await modal.present();
  }

  async adopt(id) {
    this.firebaseService.adoptAnimal(id);
  }

  async delete(id) {
    const alert = await this.alertController.create({
      header: this.translate.instant('CONFIRM_DELETION'),
      buttons: [
        {
          text: this.translate.instant('CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: this.translate.instant('DELETE'),
          cssClass: 'danger',
          handler: () => {
            this.firebaseService.deleteAnimal(id)
          }
        }
      ]
    });

    await alert.present();
  }


}
