import { AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MethodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MethodeProvider {
  myAnswer: any = [];
  theAnswer: any = [];
  description: any = [];
  
  constructor(public http: HttpClient, private alertCtrl: AlertController, private toast: ToastController,
    private store: Storage) {
    console.log('Hello MethodeProvider Provider');
  }
  allertMethod(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  onToast(msg) {
    let tos = this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    tos.present();
  }

  setKey(keyname, value) {
    return this.store.set(keyname, value);
  }

  getKeyVal(keyname) {
    return this.store.get(keyname);
  }

  jsonCall(jsonfile) {
    return this.http.get(jsonfile);
  }
}
