import { Component, HostListener, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { Platform, ToastController, AlertController } from "@ionic/angular";
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from "@capacitor/core";
import { FirebaseService } from "./services/firebase.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, NavigationStart } from "@angular/router";
import { OverlaysService } from "./services/overlays.service";
import { SwUpdate } from "@angular/service-worker";
import { CapacitorGoogleAnalytics } from 'capacitor-google-analytics';

const { SplashScreen } = Plugins;
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  user: any;
  @HostListener("window:popstate")
  onPopState() {
    this.overlaysService.trigger();
  }

  constructor(
    private translate: TranslateService,
    public firebaseService: FirebaseService,
    private router: Router,
    public overlaysService: OverlaysService,
    private toastController: ToastController,
    private swUpdate: SwUpdate,
    private alertController: AlertController,
  ) {
    this.initializeApp();
    translate.setDefaultLang("lv");
    translate.use("lv");
    this.firebaseService.user.subscribe(user => (this.user = user));

    this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === "popstate") {
          this.overlaysService.trigger();
        }
      }
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async event => {
        const alert = await this.alertController.create({
          header: this.translate.instant("UPDATE_AVAILABLE"),
          message: this.translate.instant("UPDATE_AVAILABLE_MESSAGE"),
          buttons: [
            {
              text: this.translate.instant("UPDATE_APP"),
              handler: () => {
                window.location.reload();
              }
            }
          ]
        });
        await alert.present();
      });
    }

    
  }

  async initializeApp() {
    await SplashScreen.hide();
  }

  async checkForUpdate() {
    const toast = await this.toastController.create({
      animated: true,
      color: "primary",
      cssClass: "toast-success",
      duration: 2000,
      keyboardClose: true,
      message: this.translate.instant("CHECKING_FOR_UPDATES"),
      mode: "md",
      position: "bottom",
      showCloseButton: false,
      translucent: true
    });
    toast.present();

    this.swUpdate.checkForUpdate();
  }

  logout() {
    this.firebaseService.signOut();
  }
}
