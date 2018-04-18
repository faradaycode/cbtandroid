import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  users: any = {};
  formReg: FormGroup;
  submitState: boolean = false;
  kelas: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private form: FormBuilder, private serv: MethodeProvider, private loading: LoadingController) {
    this.formReg = this.form.group({
      username: this.form.control('', Validators.compose([Validators.minLength(1), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      kelas: this.form.control('', Validators.required)
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
    if (this.kelas == 0) {
      console.log('kelas 0');
      errNo.push('Pilih Kelasnya.');
    }

    if (errNo.length > 0) {
      this.serv.allertMethod('Error', errNo.join("<br>"));
    } else {
      this.serv.setKey('nama', val.username);
      this.serv.setKey('kelas', val.kelas);

      let loader = this.loading.create({
        content: 'Please wait...'
      });
      loader.present();

      setTimeout(() => {
        loader.dismiss();
        this.navCtrl.push('HomePage');
      }, 3000);
    }
  }
}
