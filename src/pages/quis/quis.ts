import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  tabBarElement: any;

  datas: any = [];
  question: any = [];

  klas: any;
  mapel: any;
  totalArr: number;
  timeInSeconds: number;
  remainingSeconds: number;
  hasFinished: boolean;
  displayTime: string;

  limiter: number = 0;
  trueAns: number = 0;
  saveAns = {};
  cbForm: FormGroup;
  pos: number = 0;
  sticky: boolean = false;

  limitedVal: number = 40;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider,
    private form: FormBuilder) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.klas = this.navParams.get('kelas');
    this.mapel = this.navParams.get('pel');
  }
  ionViewDidLoad() {
    console.log(this.klas);
  }
  ngOnInit() {
    this.cbForm = this.form.group({
      listRadio: ['']
    });

    setTimeout(() => {
      this.startTimer();
    }, 1000);
    this.timeInSeconds = 5400;
    this.initTimer();

    //call out json quis
    this.serv.jsonCall('assets/cbtjson.json').subscribe(data => {
      this.totalArr = Object.keys(data).length;
      for (let a in data) {
        if (data[a].mapel === this.mapel && data[a].kls === this.klas) {
          this.datas.push(data[a]);
          this.datas.sort((a, b) => { return Math.random() - 0.5; });
        }
      }
      this.showQuestion();
    });
    this.onGo();
  }

  showQuestion() {
    if (this.limiter < this.limitedVal) {
      let url = "assets/soal/" + this.klas + "/" + this.mapel + "/";
      this.question = url + this.datas[this.limiter].soal + ".png";
      console.log(this.datas[this.limiter]);
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
        this.serv.playSound()
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
    console.log(this.saveAns);
    this.showQuestion();
  }
  prevq(val) {
    this.pos--;
    this.limiter--;
    this.answered(this.pos);
    console.log(this.saveAns);
    this.showQuestion();
  }
  //end method

  jawab(numQst, ansVal) {
    //save user answer into object each time they click the radio button
    this.saveAns[numQst] = ansVal;
    console.log(this.saveAns);
    var siden = document.getElementById('an-' + numQst);
    siden.innerHTML = ansVal;
  }

  // //hide tabs when this page shown
  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }

  // //show tabs when leave
  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

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
    }
    this.serv.getGo(null);

    this.navCtrl.push('HasilPage', { trueans: this.trueAns, totalar: this.limitedVal });
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
        this.answered(this.pos);
        this.showQuestion();
      }
    })
  }
}