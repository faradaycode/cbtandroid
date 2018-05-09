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
  private mapel: any = ['mtk', 'ipa', 'ips', 'bindo', 'pkn'];
  kls;
  totalN: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider,
    private sqlite: SQLite) {
    this.kls = this.navParams.get('kelas');
  }

  ngOnInit() {
    this.serv.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getData();
      }
    })
  }

  getData() {
    const jumapel = 5;
    let total = 0;

    this.sqlite.create({
      name: 'cbt.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT mapel,nilai FROM penilaian WHERE kelas = ' + this.kls + ' ORDER BY kelas ASC', {})
        .then(res => {
          for (var i = 0; i < res.rows.length; i++) {
            this.arrN.push({ mapels: res.rows.item(i).mapel, nilais: res.rows.item(i).nilai })
          }
          console.log(res.rows.length);
        }).catch(e => console.log(e));

      db.executeSql('SELECT SUM(nilai) AS totaln FROM penilaian WHERE kelas= "' + this.kls + '"', {})
        .then(res => {
          if (res.rows.length > 0) {
            total = parseInt(res.rows.item(0).totaln);
            this.totalN = total / jumapel;
          }
        })
    }).catch(e => console.log(e));
  }
}
