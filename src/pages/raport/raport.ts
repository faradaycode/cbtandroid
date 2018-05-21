import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MethodeProvider } from '../../providers/methode/methode';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
  kls: String;
  nama: String;
  totalN: number = 0;
  txkls;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider,
    private sqlite: SQLite) {
    this.kls = this.navParams.get('kelas');

    if (this.kls === '6A') {
      this.txkls = "kelas 6 paket a";
    }
    if (this.kls === '6B') {
      this.txkls = "kelas 6 paket b";
    }
    if (this.kls !== '6A' && this.kls !== '6B') {
      this.txkls = "kelas " + this.kls;
    }
  }

  ngOnInit() {
    this.serv.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getData();
        this.serv.getKeyVal('nama').then(val => {
          this.nama = val;
          console.log(val);
        })
      }
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
      db.executeSql('SELECT mapel,nilai FROM penilaian WHERE kelas = "' + this.kls.toLowerCase() + '" ORDER BY kelas ASC', {})
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

      db.executeSql('SELECT SUM(nilai) AS totaln FROM penilaian WHERE kelas= "' + this.kls.toLowerCase() + '"', {})
        .then(res => {
          if (res.rows.length > 0) {
            total = parseInt(res.rows.item(0).totaln);
            this.totalN = total / jumapel;
          }
        })
    }).catch(e => console.log(e));
  }
}
