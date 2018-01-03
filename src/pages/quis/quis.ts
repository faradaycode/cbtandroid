import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  opVal: number = 1;
  imgSoal = [];
  tabBarElement: any;

  timeInSeconds: number;
  remainingSeconds: number;
  hasFinished: boolean;
  displayTime: string;

  trueAns: number = 0;
  falseAns: number = 0;
  tCount: number; //to count true answer is checked 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private audio: NativeAudio, private alertCtrl: AlertController) {
    for (var i = 1; i <= 9; i++) {
      this.imgSoal.push(i);
    }
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tCount = 0; //set to 0 when page selected
    this.audio.preloadComplex('track1', 'assets/alarm.mp3', 1, 1, 0);
  }

  ngOnInit() {
    setTimeout(() => {
      this.startTimer();
    }, 1000);
    this.timeInSeconds = 5400;
    this.initTimer();
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
    let num = val + 1;
    this.tCount = 0; //set to 0 again for next question
    var divShow = document.getElementById('question-' + num);
    var divHide = document.getElementById('question-' + val);

    divShow.style.display = 'block';
    divHide.style.display = 'none';
  }
  prevq(val) {
    let num = val - 1;
    var divShow = document.getElementById('question-' + num);
    var divHide = document.getElementById('question-' + val);
    divShow.style.display = 'block';
    divHide.style.display = 'none';
    this.tCount = 1; //set to 1 because go to previous page
  }
  //end method

  jawab(trueVal, ansVal) {
    if (trueVal == ansVal) {
      this.tCount += 1; //see, if true then counter will + 1
      if (this.tCount == 1) {
        this.trueAns += 1;
      }
    } else {
      if(this.tCount == 1) {
        this.trueAns -= 1; 
        this.tCount = 0; //if not, reset to 0
      }
    }
    console.log(this.trueAns);
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
}