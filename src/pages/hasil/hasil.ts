import { MethodeProvider } from './../../providers/methode/methode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  newArr: any = [];
  tabBarElement: any;
  divShow: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider) {
    this.trueans = this.navParams.get('trueans');
    this.totalar = this.navParams.get('totalar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HasilPage');
  }

  ngOnInit() {

    for (let i = 0; i < this.serv.theAnswer.length; i++) {
      this.newArr.push({
        myans: this.serv.myAnswer[i],
        answ: this.serv.theAnswer[i],
        bahas: this.serv.description[i]
      });
    }
    let skor = (this.trueans / (this.totalar / 10)) * 10;
    if (skor)
      console.log(this.trueans);
  }
  bahas(val) {
    console.log(val);
  }
  onShow() {
    this.divShow = !this.divShow;
  }
}
