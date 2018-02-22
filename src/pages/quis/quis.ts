import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { MethodeProvider } from '../../providers/methode/methode';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the QuisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quis',
  templateUrl: 'quis.html',
})
export class QuisPage {
  shuffle: any = [];

  nomor_urut: number = 0;
  tabBarElement: any;

  totalArr: number = 0;
  nc: number;
  datas: any = [];
  klas: any;
  mapel: any;

  timeInSeconds: number;
  remainingSeconds: number;
  hasFinished: boolean;
  displayTime: string;

  imageURL: any;
  trueAns: number = 0;
  saveAns = {};
  rbchk: any = {};
  cbForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private audio: NativeAudio, private alertCtrl: AlertController, private serv: MethodeProvider,
    private form: FormBuilder) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.audio.preloadComplex('track1', 'assets/alarm.mp3', 1, 1, 0);
    this.klas = this.navParams.get('kelas');
    this.mapel = this.navParams.get('pel');
    this.nc = 0;
  }

  ngOnInit() {
    this.cbForm = this.form.group({
      listRadio: ['']
    });

    this.serv.jsonCall('assets/cbtjson.json').subscribe(data => {
      for (let a in data) {
        if (data[a].kls === this.klas) {
          this.datas = data;
        }
      }
      //this.showQuestion();
    });

    setTimeout(() => {
      this.startTimer();
    }, 1000);
    this.timeInSeconds = 5400;
    this.initTimer();
  }

  //show question one by one
  showQuestion() {
    let diff = [];
    for (let i = 0; i < this.shuffle.length; i++) {
      if (this.klas == this.shuffle[i].kls) {
        diff.push(this.shuffle[i]);
        this.totalArr = diff.length;
      }
    }
    if (this.nc < diff.length) {
      this.datas = diff[this.nc].soal;
    }
  }

  //timer countdown
  initTimer() {
    if (!this.timeInSeconds) {
      this.timeInSeconds = 0;
    }

    this.remainingSeconds = this.timeInSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingSeconds);
  }
  startTimer() {
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
      this.remainingSeconds--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingSeconds);

      //check wheter remainingSeconds value is not zero then run method 
      if (this.remainingSeconds > 0) {
        this.timerTick();
      }
      if (this.remainingSeconds == 0) {
        this.audio.play('track1', () => this.endAlert());
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    var hoursString = '';
    var minutesString = '';
    var secondsString = '';

    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
  // end method

  //next and previous button 
  nextq(val) {
    // this.nc++;
    // this.nomor_urut++;
    // this.answered(this.nomor_urut);
    // this.showQuestion();
    // console.log(this.saveAns);

    let ups = val + 1;
    var divShow = document.getElementById('soal-' + ups);
    var divHide = document.getElementById('soal-' + val);

    divShow.style.display = 'block';
    divHide.style.display = 'none';
  }
  prevq(val) {
    // this.nc--;
    // this.nomor_urut--;
    // this.answered(this.nomor_urut);
    // this.showQuestion();
    // console.log(this.saveAns);

    let downs = val - 1;
    var divShow = document.getElementById('soal-' + downs);
    var divHide = document.getElementById('soal-' + val);
    divShow.style.display = 'block';
    divHide.style.display = 'none';
  }
  //end method

  jawab(numQst, ansVal) {
    //save user answer into object each time they click the radio button
    this.saveAns[numQst] = ansVal;
    console.log(this.saveAns);
  }

  endAlert() {
    let alert = this.alertCtrl.create({
      title: 'Time Up',
      subTitle: 'Waktu Mengerjakan Habis',
      buttons: ['OK']
    });
    alert.present();
  }

  //hide tabs when this page shown
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  //show tabs when leave
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  finishing() {
    let answer: any = [];
    answer = this.saveAns;

    for (let i = 0; i < this.datas.length; i++) {
      //if user answer same with the answer key, true answer variable will increase 1pt
      if (answer[i] === this.datas[i].jawaban) {
        this.trueAns += 1;
      }
      this.serv.myAnswer.push(answer[i]);
      this.serv.theAnswer.push(this.datas[i].jawaban);
      this.serv.description.push(this.datas[i].bahasan);
    }
    this.navCtrl.push('HasilPage', { trueans: this.trueAns });
  }

  reseting() {
    this.cbForm.controls.listRadio.reset(); //clear checked ion-radio 
  }

  //this methode for get previous and next answered question 
  answered(pos) {
    if (this.saveAns[pos] !== undefined) {
      if (this.saveAns[pos] === "a") {
        this.cbForm.controls.listRadio.setValue(this.saveAns[pos]);
      }
      if (this.saveAns[pos] === "b") {
        this.cbForm.controls.listRadio.setValue(this.saveAns[pos]);
      }
      if (this.saveAns[pos] === "c") {
        this.cbForm.controls.listRadio.setValue(this.saveAns[pos]);
      }
      if (this.saveAns[pos] === "d") {
        this.cbForm.controls.listRadio.setValue(this.saveAns[pos]);
      }
    }
    if (this.saveAns[pos] === undefined || this.saveAns[pos] === null) {
      this.reseting();
    }
  }
}