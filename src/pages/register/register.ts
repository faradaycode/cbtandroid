import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MethodeProvider } from '../../providers/methode/methode';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  rootPage: any = '';
  users: any = {};
  formReg: FormGroup;
  submitState: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private form: FormBuilder, private serv: MethodeProvider, private loading: LoadingController, private app: App) {
    this.formReg = this.form.group({
      username: this.form.control('', Validators.compose([Validators.minLength(1), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      kodebuku: this.form.control('', Validators.required)
    });

  }

  ionViewDidLoad() {

  }
  regForm(val) {
    let errNo = [];
    if (this.formReg.controls.username.touched) {
      if (this.formReg.controls.username.hasError('pattern')) {
        console.log('pattern');
        errNo.push("Hanya Huruf Saja Untuk Isi Nama.");
      }
      if (this.formReg.controls.username.hasError('maxlength')) {
        console.log('too long');
        errNo.push('Teks Nama Terlalu Panjang (Max 25 Karakter).');
      }
      if (this.formReg.controls.username.hasError('required')) {
        console.log('null');
        errNo.push('Nama Tidak Boleh Kosong.');
      }
    }

    if (this.formReg.controls.kodebuku.touched) {
      if (this.formReg.controls.kodebuku.hasError('required')) {
        errNo.push('Kode Buku Tidak Boleh Kosong.');
      }
      if(this.formReg.controls.kodebuku.value !== this.serv.kodes && !this.formReg.controls.kodebuku.hasError('required')) {
        errNo.push("Kode Buku Salah");
      }
    }

    if (errNo.length > 0) {
      this.serv.allertMethod('Error', errNo.join("<br>"));
    } else {
      this.serv.setKey('nama', val.username);
      this.serv.setKey('kode', val.kodebuku);

      let loader = this.loading.create({
        content: 'Please wait...'
      });

      loader.present();

      setTimeout(() => {
        loader.dismiss();
        this.app.getRootNav().setRoot("HomePage");
      }, 3000);
    }
  }
}
