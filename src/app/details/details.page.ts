import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";
import { ActivatedRoute } from "@angular/router";
import { ShelterPage } from "../shelter/shelter.page";
import { ModalController, AlertController } from "@ionic/angular";
import { Plugins } from "@capacitor/core";
import { Animal } from "../interfaces";
import { TranslateService } from "@ngx-translate/core";
const { Share } = Plugins;

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  id = null;
  animal: any;
  loader: string;
  loading: Boolean;
  subscription: any;
  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private modalController: ModalController,
    private translate: TranslateService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loader = "./assets/images/draugs.png";
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get("id");
    this.subscription = this.firebaseService
      .getAnimal(this.id)
      .subscribe(res => {
        this.loading = false;
        this.animal = res;
        if (res["born"]) {
          this.animal.born = new Date().getFullYear() - res["born"];
          if (this.animal.born == 0) {
            this.animal.born = "<1";
          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  shareAnimal() {
    Share.share({
      title: this.animal.name,
      text: this.animal.description,
      url: window.location.href,
      dialogTitle: this.translate.instant("SHARE")
    })
      .then(() => {} )
      .catch(async error => {
        // Probably on desktop
        
        const alert = await this.alertController.create({
          header: this.translate.instant("SHARE"),
          inputs: [
            {
              name: 'url',
              value: window.location.href
            }
          ],
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: data => {
              }
            }]
        });
    
        await alert.present();

      } );
  }
}
