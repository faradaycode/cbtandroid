import { MethodeProvider } from './../../providers/methode/methode';
import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, group, state } from '@angular/animations';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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
  private mapel: String;
  pk: any = "A";

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider,
    public modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.kls = this.navParams.get("klas");
  }

  ionViewWillLeave() {
    this.closeOverlay()
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

    this.mapel = mapel;

    this.serv.getKeyVal("trial_app").then((res) => {
      if (res === 1) {
        if (this.kls > 5) {

          this.accordionic();

        } else {
          this.toQuis();
        }
      } else {
        if (res === undefined || res === null) {
          if (this.kls > 5) {

            this.accordionic();

          } else {
            this.toQuis();
          }
        } else {
          this.promptRegister();
        }
      }
    })


  }

  private toQuis(paket = null) {

    this.navCtrl.push("QuisPage",
      {
        kelas: this.kls,
        mapel: this.mapel,
        paket: paket
      }).catch(err => console.log(err));

    this.serv.bgset(this.mapel);
  }

  private toRaport() {

    if (this.kls > 5) {

      this.mapel = "raport";
      this.accordionic();

    } else {
      this.navCtrl.push("RaportPage", {
        kelas: this.kls
      });
    }
  }

  private clkEvt(paket = null) {

    if (this.mapel == "raport") {
      this.navCtrl.push("RaportPage",
        {
          kelas: this.kls,
          paket: (paket != null) ? paket : null
        });
    } else {

      this.toQuis(paket);
    }
  }

  private accordionic() {

    let panels = document.getElementById("bottom-accordion");

    if (panels.style.maxHeight) {
      panels.style.maxHeight = null;
    } else {
      panels.style.maxHeight = 100 + "%";
      panels.style.height = 100 + "%";
    }
  }

  private closeOverlay() {
    let panels = document.getElementById("bottom-accordion");

    panels.style.maxHeight = null;
  }

  private presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Registrasi',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Registrasi',
          handler: data => {
            if (data.password === this.serv.kodes) {
              this.serv.setKey("trial_app", 1);
              this.serv.setKey('kode', data);

              let pesan = "Selamat, Aplikasi ini sudah aktif";
              let alr = this.serv.allertMethod("Registrasi Sukses", pesan);
            } else {
              let pesan = "Password Salah";
              let alr = this.serv.allertMethod("Registrasi Gagal", pesan);
            }
          }
        }
      ]
    });
    alert.present();
  }

  promptRegister() {

    let tex =  "Untuk mengerjakan soal lainnya harap mengisi password yang "+
    "tertulis di Buku Super Complete SD";

    let alert = this.alertCtrl.create({
      title: "Informasi",
      subTitle: tex,
      buttons: [{

        text: 'OK',
        handler: data => {
          this.presentPrompt();
        }
      }],
    });

    alert.present();

  }
}
