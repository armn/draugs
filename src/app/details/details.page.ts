import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { ShelterPage } from '../shelter/shelter.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id = null;
  animal: any;


  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private modalController: ModalController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.firebaseService.getAnimal(this.id).subscribe(res => {
      this.animal = res;
      if (res["born"]) {
        this.animal.born = new Date().getFullYear() - res["born"];
      }
    });

  }



  async displayShelter(shelterId) {
    const modal = await this.modalController.create({
      component: ShelterPage,
      componentProps: {
        id: shelterId
      }
    });
    await modal.present();
  }

}
