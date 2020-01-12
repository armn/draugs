import { Component, HostListener } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from "@capacitor/core";
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationStart } from '@angular/router';
import { OverlaysService } from "./services/overlays.service";

const { SplashScreen } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: any;
  @HostListener("window:popstate")
  onPopState() {
    this.overlaysService.trigger();
  }

  constructor(
    translate: TranslateService,
    public firebaseService: FirebaseService,
    private router: Router,
    public overlaysService: OverlaysService
  ) {
    this.initializeApp();
    translate.setDefaultLang('lv');
    translate.use('lv');
    this.firebaseService.user.subscribe(user => this.user = user);

    this.router.events.subscribe((event: any): void => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === "popstate") {
          this.overlaysService.trigger();
        }
      }
    });

  }

  async initializeApp() {
    await SplashScreen.hide();
  }

  logout() {
    this.firebaseService.signOut();
  }
}
