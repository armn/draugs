import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from "@capacitor/core";
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
const { SplashScreen } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: any;
  constructor(
    translate: TranslateService,
    public firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.initializeApp();
    translate.setDefaultLang('lv');
    translate.use('lv');
    this.firebaseService.user.subscribe(user => this.user = user)
  }

  async initializeApp() {
    await SplashScreen.hide();
  }

  logout() {
    this.firebaseService.signOut();
  }
}
