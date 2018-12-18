import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { MethodeProvider } from '../../providers/methode/methode';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NativeAudio } from '@ionic-native/native-audio';

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
  @ViewChild(Content) content: Content;
  @ViewChild('zoom') zoom: ElementRef;

  tabBarElement: any;

  datas: any = [];
  question: any = [];

  klas: number;
  paket: String;
  mapel: any;
  totalArr: number;
  timeInSeconds: number;
  remainingSeconds: number;
  hasFinished: boolean;
  displayTime: string;

  limiter: number = 0;
  trueAns: number = 0;
  saveAns = {};
  savedRagu = {};
  nullAns: number = 0;
  cbForm: FormGroup;
  pos: number = 0;
  ragu_nt: number = 0;

  _ragu: boolean = false;
  limitedVal: number = 40; //become dynamic with navparams
  scales: number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider,
    private form: FormBuilder, private alertCtrl: AlertController,
    private audio: NativeAudio) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.klas = this.navParams.get('kelas');
    this.mapel = this.navParams.get('mapel');
    this.paket = this.navParams.get('paket');
  }

  ngOnInit() {
    this.cbForm = this.form.group({
      listRadio: ['']
    });

    setTimeout(() => {
      this.startTimer();
    }, 1000);
    // this.timeInSeconds = 5400;
    this.timeInSeconds = 15;
    this.initTimer();

    //call out json quis
    this.serv.jsonCall('assets/cbtjson.json').subscribe(data => {
      this.totalArr = Object.keys(data).length;
      for (let a in data) {

        if (this.klas < 6) {

          if (data[a].mapel === this.mapel && data[a].kls === this.klas) {
            this.datas.push(data[a]);
            this.datas.sort((a, b) => { return Math.random() - 0.5; });
          }

        } else {

          let kp: String = "" + this.klas + this.paket;

          if (data[a].mapel === this.mapel && data[a].kls === kp) {
            this.datas.push(data[a]);
            this.datas.sort((a, b) => { return Math.random() - 0.5; });
          }
        }
      }
      this.showQuestion();
    });

    this.onGo();

    for (let z = 0; z < this.limitedVal; z++) {
      this.saveAns[z] = null;
      this.savedRagu[z] = 0;
    }
  }

  showQuestion() {

    let url;
    let s: String = "" + this.klas + this.paket;

    if (this.limiter < this.limitedVal) {
      if (this.klas < 6) {
        url = "assets/soal/" + this.klas + "/" + this.mapel + "/";
      } else {
        if (s === "6a") {
          url = "assets/soal/" + this.klas + "/" + "a/" + this.mapel + "/";
        }
        if (s === "6b") {
          url = "assets/soal/" + this.klas + "/" + "b/" + this.mapel + "/";
        }
      }
      this.question = url + this.datas[this.limiter].soal + ".png";
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

        if (this.remainingSeconds < 11 && this.remainingSeconds > 1) {

          let intervales = setInterval(() => {
            this.playBeep();

            if (this.remainingSeconds == 1) {
              clearInterval(intervales);
            }
          }, 1000);
        }
      }

      if (this.remainingSeconds == 0) {
        this.playSound()
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
    this.pos++;
    this.limiter++;
    this.answered(this.pos);
    this.raguHandler(this.pos);
    this.showQuestion();
    this.unZoom();
  }
  prevq(val) {
    this.pos--;
    this.limiter--;
    this.answered(this.pos);
    this.raguHandler(this.pos);
    this.showQuestion();
    this.unZoom();
  }
  //end method

  jawab(numQst, ansVal) {
    //save user answer into object each time they click the radio button
    this.saveAns[numQst] = ansVal;
    var siden = document.getElementById('an-' + numQst);
    siden.innerHTML = ansVal;

  }

  finishAlt() {

    let notanswer = new Array();
    let ragu = new Array();

    for (let i = 0; i < this.limitedVal; i++) {

      if (this.saveAns[i] == null) {
        notanswer.push(parseInt(Object.keys(this.saveAns)[i], 10) + 1);
      }

      if (this.savedRagu[i] == 1) {
        ragu.push(parseInt(Object.keys(this.savedRagu)[i], 10) + 1);
      }

    }

    let ms = "";

    if (ragu.length > 0) {
      ms += "<p text-capitalize>ada jawaban yang kamu ragukan di soal nomor: " + ragu.join(", ") + "</p>";
    }

    if (notanswer.length > 0) {
      ms += "<p text-capitalize>ada soal yang belum dikerjakan di nomor: " + notanswer.join(", ") + "</p>";
    }

    if (ragu.length < 1 && notanswer.length < 1) {
      ms += "<p text-capitalize>sudah yakin dengan semua jawaban kamu ?</p>";
    }

    let alert = this.alertCtrl.create({
      title: "Peringatan",
      message: ms,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.nullAns = 0;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.finishing();
          }
        }
      ]
    });

    alert.present();
  }

  //methode if you reach 40 and click flag
  finishing() {

    let answer: any = [];
    answer = this.saveAns;

    for (let i = 0; i < this.limitedVal; i++) {
      //if user answer same with the answer key, true answer variable will increase 1pt
      if (answer[i] === this.datas[i].jawaban) {
        this.trueAns += 1;
      }

      this.serv.myAnswer.push(answer[i]);
      this.serv.theAnswer.push(this.datas[i].jawaban);
      this.serv.description.push(this.datas[i].bahasan);

      var siden = document.getElementById('an-' + i);

      siden.innerHTML = "";
    }

    this._processN();
  }

  private _processN() {
    this.serv.getGo(null);

    // database

    if (this.klas < 6) {
      this.serv.updateNilai(this.mapel, this.klas, (this.trueAns / (this.limitedVal / 10)) * 10);
    } else {
      this.serv.updateNilai(this.mapel, "" + this.klas + this.paket, (this.trueAns / (this.limitedVal / 10)) * 10);
    }

    this.navCtrl.push('HasilPage', {
      trueans: this.trueAns,
      totalar: this.limitedVal,
      kelass: this.klas,
      mapel: this.mapel,
      notAns: this.nullAns
    });
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

  onGo() {
    this.serv.setGo().subscribe(res => {
      if (res === null) {
        console.log(".....");
      } else {
        this.pos = res;
        this.limiter = res;
        this.unZoom();
        this.answered(this.pos);
        this.showQuestion();
        this._ragu = (this._ragu) ? !this._ragu : this._ragu;
      }
    })
  }

  ragu(numQst) {

    let rsc = document.getElementById('bsc-' + numQst);
    let el_toolbar = document.getElementsByClassName('toolbar-background-md');
    let ragu = document.getElementById("ragu-btn");

    if (this.savedRagu[numQst] == 0 || this.savedRagu[numQst] == null) {
      this.savedRagu[numQst] = 1;
      rsc.classList.add("warning");
      el_toolbar.item(0).classList.add("warning");
      ragu.classList.remove("warning");
      ragu.classList.add("light");

    } else {
      this.savedRagu[numQst] = 0;
      rsc.classList.remove("warning");
      el_toolbar.item(0).classList.remove("warning");
      ragu.classList.add("warning");
      ragu.classList.remove("light");

    }

    console.log(this.savedRagu);
  }

  private raguHandler(numQst) {

    let rsc = document.getElementById('bsc-' + numQst);
    let el_toolbar = document.getElementsByClassName('toolbar-background-md');
    let ragu = document.getElementById("ragu-btn");

    if (this.savedRagu[numQst] == null || this.savedRagu[numQst] == 0) {
      rsc.classList.remove("warning");
      el_toolbar.item(0).classList.remove("warning");
      ragu.classList.add("warning");
      ragu.classList.remove("light");
    } else {
      rsc.classList.add("warning");
      el_toolbar.item(0).classList.add("warning");
      ragu.classList.remove("warning");
      ragu.classList.add("light");
    }
  }

  slideNzoom() {
    let scala = this.scales / 10;
    this.serv.nZoom(scala, this.zoom.nativeElement, this.content);
  }

  private zoomIn() {
    this.scales = this.scales + 2.5;
  }

  private zoomOut() {

    if (this.scales > 10) {
      this.scales = this.scales - 2.5;
    }
  }

  unZoom() {
    this.scales = 10;
  }

  //sound
  playSound() {
    this.audio.preloadComplex('alarm', 'assets/old_clock_alert.mp3', 1, 1, 0).then(() => {
      this.audio.play("alarm", () => this.audio.unload("alarm"));

      let alert = this.alertCtrl.create({
        title: "Time Up....!",
        subTitle: "Waktu Habis",
        buttons: ["OK"]
      });
      
      alert.present();

      setTimeout(() => {
        this.finishing();
      }, 1000);

    });
  }

  playBeep() {
    this.audio.preloadComplex('beep', 'assets/timer.mp3', 1, 1, 0).then(() => {
      this.audio.play("beep", () => this.audio.unload("beep"));
    });
  }
}