import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.page.html',
  styleUrls: ['./shelter.page.scss'],
})
export class ShelterPage implements OnInit {
  id;
  shelter: any;
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private modalController: ModalController) { }

  ngOnInit() {
    //this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.firebaseService.getShelter(this.id).subscribe(res => {
      this.shelter = res;
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
