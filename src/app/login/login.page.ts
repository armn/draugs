import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;

  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  constructor(private fb: FormBuilder, private fireBaseService: FirebaseService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router, private translate: TranslateService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required]),
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  navigateByRole(role) {
    if (role == 'ADMIN') {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/app');
    }
  }

  async login() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant('LOADING')
    });
    await loading.present();

    this.fireBaseService.signIn(this.loginForm.value).subscribe(user => {
      loading.dismiss();
      console.log('after login: ', user);
      this.navigateByRole(user['role']);
    },
    async err => {
      loading.dismiss();

      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    })
  }

  async register() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant('LOADING')
    });
    await loading.present();

    this.fireBaseService.signUp(this.registerForm.value).then(async res => {
      await loading.dismiss();

      let toast = await this.toastCtrl.create({
        duration: 3000,
        message: this.translate.instant('CREATED_NEW_ACCOUNT')
      });
      toast.present();
      this.navigateByRole(this.registerForm.value['role']);

    }, async err => {
      await loading.dismiss();

      let alert = await this.alertCtrl.create({
        header: this.translate.instant('ERROR'),
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  toggleRegister() {
    this.flipcontainer.nativeElement.classList.toggle('flip');
  }

}
