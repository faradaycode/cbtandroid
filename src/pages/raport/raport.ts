import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MethodeProvider } from '../../providers/methode/methode';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Screenshot } from '@ionic-native/screenshot';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the RaportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-raport',
  templateUrl: 'raport.html',
})
export class RaportPage {
  public arrN: any = [];
  kls: number;
  nama: String;
  totalN: number = 0;
  txkls;
  paket: String;
  whereis: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private serv: MethodeProvider, private sqlite: SQLite,
    private screenshot: Screenshot, private socialShare: SocialSharing,
    private loadingCtrl: LoadingController) {

    this.kls = this.navParams.get('kelas');
    this.paket = this.navParams.get('paket');

    if (this.paket != null) {

      if (this.kls == 6) {

        if (this.paket == "a") {
          this.txkls = "kelas 6 paket a";
          this.whereis = "" + this.kls + this.paket;
        }

        if (this.paket == "b") {
          this.txkls = "kelas 6 paket b";
          this.whereis = "" + this.kls + this.paket;
        }

      }
    }

    if (this.kls < 6) {
      this.txkls = "kelas " + this.kls;
      this.whereis = "" + this.kls;
    }
  }

  ngOnInit() {
    
    this.getData();

    this.serv.getKeyVal('nama').then(val => {
      this.nama = val;
    })
  }

  getData() {
    const jumapel = 5;
    let total = 0;
    let mp: String;

    this.sqlite.create({
      name: 'cbt.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT mapel,nilai FROM penilaian WHERE kelas = "' + this.whereis + '" ORDER BY kelas ASC', {})
        .then(res => {
          for (var i = 0; i < res.rows.length; i++) {
            if (res.rows.item(i).mapel === "mtk") {
              mp = "matematika";
            }
            if (res.rows.item(i).mapel === "bindo") {
              mp = "bahasa indonesia";
            }
            if (res.rows.item(i).mapel !== "mtk" && res.rows.item(i).mapel !== "bindo") {
              mp = res.rows.item(i).mapel;
            }

            this.arrN.push({ mapels: mp, nilais: res.rows.item(i).nilai })
          }
          console.log(res.rows.length);
        }).catch(e => this.serv.onToast(JSON.stringify(e)));

      db.executeSql('SELECT SUM(nilai) AS totaln FROM penilaian WHERE kelas= "' + this.whereis + '"', {})
        .then(res => {
          if (res.rows.length > 0) {
            total = parseInt(res.rows.item(0).totaln);
            this.totalN = total / jumapel;
          }
        })
    }).catch(e => console.log(e));
  }

  socialSharing() {

    let link: string = "https://play.google.com/store/apps/details?id=com.magentamedia.uasplususbn456";
    let subj = "Nilai USBN Saya";
    let btn = document.getElementById("btn-share");

    btn.style.visibility = "hidden";

    let loader = this.loadingCtrl.create();

    loader.present();

    setTimeout(() => {

      loader.dismiss();

    }, 3000);

    setTimeout(() => {

      this.screenshot.URI(80).then((data) => {

        this.socialShare.share(null, subj, data.URI, link)
          .then((res) => {
            btn.style.visibility = "visible";
          }).catch((err) => {
            this.serv.allertMethod("error", err);
          })
      });

    }, 4000);

  }

  private onCompleteSS() {
    console.log("sukses ss");
  }

  private onFailedSS() {
    console.log("gagal ss");
  }
}
