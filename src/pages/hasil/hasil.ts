import { MethodeProvider } from './../../providers/methode/methode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the HasilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hasil',
  templateUrl: 'hasil.html',
})
export class HasilPage {

  trueans: any;
  totalar: any;
  kl: number;
  mapel: any;
  newArr: any = [];
  empAss: number;
  tabBarElement: any;
  divShow: boolean = false;
  bahasVal: any;
  paket: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private serv: MethodeProvider, private modalCtrl: ModalController) {
    this.trueans = this.navParams.get('trueans');
    this.totalar = this.navParams.get('totalar');
    this.kl = this.navParams.get('kelass');
    this.paket = this.navParams.get('paket');
    this.mapel = this.navParams.get('mapel');
    this.empAss = this.navParams.get('notAns');
  }

  ngOnInit() {
    for (let i = 0; i < this.serv.theAnswer.length; i++) {
      this.newArr.push({
        myans: this.serv.myAnswer[i],
        answ: this.serv.theAnswer[i],
        bahas: this.serv.description[i]
      });
    }
  }

  bahas(val, position:number) {
    let urlA;
    let urlB;
    let pelajaran;

    if (this.mapel === "mtk") {
      pelajaran = "matematika";
    }

    if (this.mapel === "bindo") {
      pelajaran = "bahasa indonesia";
    }

    if (this.mapel === "bindo" && this.mapel === "mtk") {
      pelajaran = this.mapel;
    }

    if (this.kl > 5 && this.paket === 'a') {
      urlA = "assets/bahas/6/a/" + this.mapel + "/" + val;
      urlB = "assets/soal/6/a/" + this.mapel + "/" + val;
    }
    if (this.kl > 5 && this.paket === 'b') {
      urlA = "assets/bahas/6/b/" + this.mapel + "/" + val;
      urlB = "assets/soal/6/b/" + this.mapel + "/" + val;
    }
    if (this.kl < 6) {
      urlA = "assets/bahas/" + this.kl + "/" + this.mapel + "/" + val;
      urlB = "assets/soal/" + this.kl + "/" + this.mapel + "/" + val;
    }

    position+=1;

    let profileModal = this.modalCtrl.create("ModalsPage", {
      soal: urlB,
      bahas: urlA,
      title: pelajaran + " nomor " + position,
    });
    profileModal.present();
  }

  onShow() {
    this.divShow = !this.divShow;
  }
}
