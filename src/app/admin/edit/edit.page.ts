import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Animal } from "../../interfaces"
import { ImageService } from "../../services/image.service"
import { FirebaseService } from 'src/app/services/firebase.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id;
  editAnimalForm: FormGroup;
  animal: any;
  image: string;
  placeholder = "./assets/images/draugs.jpg"
  constructor(private modalController: ModalController, private imageService: ImageService, private firebaseService: FirebaseService, private translate: TranslateService, private alertController: AlertController) { }

  ngOnInit() {
    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
    this.editAnimalForm = new FormGroup({
      type: new FormControl(this.animal.type, [Validators.required]),
      sex: new FormControl(this.animal.sex, [Validators.required]),
      breed: new FormControl(this.animal.breed),
      born: new FormControl(this.animal.born),
      tag: new FormControl(this.animal.tag),
      name: new FormControl(this.animal.name, [Validators.required]),
      description: new FormControl(this.animal.description, [Validators.required]),
    });
    this.image = this.animal.image;
  }


  async selectImage(event) {
    const file = event.target.files[0];
    if (file) {
      const url = await this.imageService.getImageUrl(file, 1000);
      this.image = url;
    } else {
      this.image = this.animal.image;
    }

  }

  editAnimal() {
    this.editAnimalForm.value.image = this.image;
    this.editAnimalForm.value.date = Date.now();
    this.firebaseService.updateAnimal(this.animal.id, this.editAnimalForm.value).then(() => {
      this.closeModal();
    })
  }

  adopted(id) {
    this.firebaseService.adoptAnimal(id).then(() => {
      this.closeModal();
    })
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
            this.firebaseService.deleteAnimal(id);
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
