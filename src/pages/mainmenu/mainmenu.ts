import { MethodeProvider } from './../../providers/methode/methode';
import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, group, state } from '@angular/animations';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { timestamp } from 'rxjs/operator/timestamp';

/**
 * Generated class for the MainmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainmenu',
  templateUrl: 'mainmenu.html',
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('invisible <=> visible', animate('800ms ease-out'))
    ]),

    trigger('flyInOut', [

      transition('* => anim-a', [
        query('.col', style({ opacity: 0 }), { optional: true }),
        query('.col', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ]),

      transition('* => anim-b', [
        query('.col', style({ opacity: 0 }), { optional: true }),
        query('.col', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(-100%, 0, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ]),

      transition('* => anim-c', [
        query('.col', style({ opacity: 0 }), { optional: true }),
        query('.col', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, 100%, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})

export class MainmenuPage {

  leftOut = '';
  rightOut = '';
  bottomOut = '';
  faded = 'invisible';
  paket: String = 'pka';
  kls: number;
  pk: any = "A";

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider,
    public modalCtrl: ModalController) {
    this.kls = this.navParams.get("klas");
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.leftOut = 'anim-a';
    this.rightOut = 'anim-b';
    this.bottomOut = 'anim-c';

    setTimeout(() => {
      this.faded = (this.faded === 'invisible') ? 'visible' : 'invisible';
    }, 1000);
  }

  clickMapel(mapel) {

    if (this.kls > 5) {
      let myModal = this.modalCtrl.create("ModalpaketPage",
        {
          kelas: this.kls,
          mapel: mapel
        },
        {
          cssClass: "paket-modal"
        });

      myModal.present();

    } else {
      this.toQuis(mapel);
    }
  }

  private toQuis(mapel) {

    this.navCtrl.push("QuisPage",
      {
        kelas: this.kls,
        mapel: mapel
      }).catch(err => console.log(err));

    this.serv.bgset(mapel);
  }

  private toRaport() {

    if (this.kls > 5) {
      let myModal = this.modalCtrl.create("ModalpaketPage",
        {
          kelas: this.kls,
          mapel: 'raport'
        },
        {
          cssClass: "paket-modal"
        });

      myModal.present();

    } else {
      this.navCtrl.push("RaportPage", {
        kelas: this.kls
      });
    }
  }
}
