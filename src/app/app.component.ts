import { Storage } from '@ionic/storage';
import { MethodeProvider } from './../providers/methode/methode';
import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    app: App, private serv: MethodeProvider, private store: Storage) {
    platform.ready().then(() => {

      this.store.ready().then(() => {
        this.serv.getKeyVal('nama').then(data => {
          if(data == null || data == undefined) {
            this.rootPage = 'RegisterPage';
          } else {
            this.rootPage = 'TabsPage';
          }
        });
      });

      //back button
      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();
        if (activeView.name === "QuisPage") {
          this.serv.allertMethod('Information', 'Tidak Bisa Kembali Saat Mengerjakan Soal');
        }
        if (activeView.name === "HomePage") {
          platform.exitApp();
        }
        nav.pop();
      });

      //statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      if (platform.is('android')) {
        statusBar.styleLightContent();
        statusBar.backgroundColorByHexString('#c42626');
      }
      splashScreen.hide();
    });
  }
}
