import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the MethodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MethodeProvider {

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello MethodeProvider Provider');
  }
  allertMethod(title,text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
