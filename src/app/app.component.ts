import { Storage } from '@ionic/storage';
import { MethodeProvider } from './../providers/methode/methode';
import { Component } from '@angular/core';
import { Platform, App, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';
  mapel: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    app: App, private serv: MethodeProvider, private store: Storage, alertCtrl: AlertController,
    private menuctrl: MenuController, private screenOrientation: ScreenOrientation) {

    this.serv.bgget().subscribe(data => {
      if (data !== null) {
        this.mapel = data;
      }
    });

    platform.ready().then(() => {
      
      this.store.ready().then(() => {
        this.serv.getKeyVal('kode').then(data => {
          if (data == null || data == undefined) {
            this.rootPage = 'RegisterPage';
          } else {
            this.rootPage = 'HomePage';
          }
        });
      });

      //back button
      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();

        if (activeView.id === "HomePage") {
          if (document.getElementById('home-div').style.display !== "none") {
            let alert = alertCtrl.create({
              title: "Peringatan",
              message: "Keluar Aplikasi?",
              buttons: [
                {
                  text: 'No',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    platform.exitApp();
                  }
                }
              ]
            });
            alert.present();
          } else {
            document.getElementById('home-div').style.display = 'block';
            document.getElementById('grade-div').style.display = 'none';
          }
        }
        if(activeView.id === "RegisterPage") {
          platform.exitApp();
        }
        if (activeView.id === "QuisPage") {
          this.serv.allertMethod('Informasi', 'Tidak Bisa Kembali Saat Sedang Ujian');
        }

        if (activeView.id === "RaportPage") {
          nav.pop();
        }

        if (activeView.id === "MainmenuPage") {
          nav.pop();
        }

        if (activeView.id === "KelasmenuPage") {
          nav.pop();
        }

        if (activeView.id === "HasilPage") {
          nav.popToRoot();
          this.serv.myAnswer = [];
          this.serv.theAnswer = [];
          this.serv.description = [];
        }
      });

      //statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      if (platform.is('android')) {
        statusBar.hide();
        // statusBar.styleLightContent();
        // statusBar.backgroundColorByHexString('#c42626');
      }
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      splashScreen.hide();
    });
  }

  onGo(val) {
    this.serv.getGo(val);
    this.menuctrl.close();
  }

}
