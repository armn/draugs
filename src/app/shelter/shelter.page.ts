import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  map: google.maps.Map;
  subscription: any;

  @ViewChild('map', {static: false}) mapElement: ElementRef;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private modalController: ModalController) { }

  ngOnInit() {
    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
    
    this.subscription = this.firebaseService.getShelter(this.id).subscribe(res => {
      this.shelter = res;
      this.loadMap(this.shelter.location)
    })
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }

  loadMap(address) {
    let geo = new google.maps.Geocoder;
    let that = this;
    geo.geocode({
      "address": address,
    }, function(results, status) {
      if (status == 'OK') {

        let mapOptions = {
          zoom: 15,
          center: results[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        that.map = new google.maps.Map(that.mapElement.nativeElement, mapOptions)

        let marker = new google.maps.Marker({
          map: that.map,
          position: results[0].geometry.location
      });

      }
    });

 

  }
  closeModal() {
    this.modalController.dismiss();
  }

}
