import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Animal } from "../../interfaces"
import { ImageService } from "../../services/image.service"
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addAnimalForm: FormGroup;
  animal: Animal;
  image: string;
  placeholder = "./assets/images/draugs.png"

  constructor(private modalController: ModalController, private imageService: ImageService, private firebaseService: FirebaseService) { }

  ngOnInit() {

    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }

    this.addAnimalForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      breed: new FormControl(''),
      born: new FormControl(''),
      tag: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.image = this.placeholder;
  }


  async selectImage(event) {
    const file = event.target.files[0];
    if (file) {
      const url = await this.imageService.getImageUrl(file, 1000);
      this.image = url;
    } else {
      this.image = this.placeholder;
    }
   
}

addAnimal() {
  this.addAnimalForm.value.image = this.image;
  this.addAnimalForm.value.date = Date.now();
  this.firebaseService.addAnimal(this.addAnimalForm.value).then(() => {
    this.closeModal();
  })

  
}

  closeModal() {
    this.modalController.dismiss();
  }
}
