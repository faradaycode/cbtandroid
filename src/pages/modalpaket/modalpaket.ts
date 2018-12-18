import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { MethodeProvider } from '../../providers/methode/methode';
import { timestamp } from 'rxjs/operator/timestamp';

/**
 * Generated class for the ModalpaketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalpaket',
  templateUrl: 'modalpaket.html',
})
export class ModalpaketPage {

  private kelas: number;
  private paket: any;
  private mapel: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private serv: MethodeProvider,
    public appCtrl: App) {
  }

  ionViewDidLoad() {

    this.kelas = this.navParams.get("kelas");
    this.mapel = this.navParams.get("mapel");
  }

  private dismissme() {

    this.viewCtrl.dismiss();

  }

  toQuis(paket) {

    this.dismissme();

    this.appCtrl.getRootNav().push("QuisPage",
      {
        kelas: this.kelas,
        mapel: this.mapel,
        paket: paket
      });

    this.serv.bgset(this.mapel);

  }

  clkEvt(paket = null) {
    if (this.mapel == "raport") {
      this.appCtrl.getRootNav().push("RaportPage",
        {
          kelas: this.kelas,
          paket: (paket != null) ? paket : null
        });
    } else {
      this.toQuis(paket);
    }

    this.dismissme();
  }
}
