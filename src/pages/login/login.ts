import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire } from 'angularfire2';

import { CreateAccountPage } from '../create-account/create-account';
import { AuthService } from '../../providers/auth.service';
import { UtilService } from '../../providers/util.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private userForm : FormGroup;
  public loader;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public af: AngularFire,
    public auth: AuthService,
    public util: UtilService) {
      this.userForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: [''],
      });
    }
    
  ionViewDidLoad() {}

  onLogin() {
    this.util.initLoader();
    this.util.presentLoader();
    this.auth.signin(this.userForm.value)
      .then(()=> {
        this.util.dismissLoader();
        console.log('loggedIn');
      }, 
      err => { 
        this.util.dismissLoader();
        this.presentToast(err.message, "error");
      });
  }
  
  presentToast(msg, msgClass) {
     this.util.getToast(msg, msgClass).present();
  }

  createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }
}
