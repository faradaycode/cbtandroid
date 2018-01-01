import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import {TimerObservable} from "rxjs/observable/TimerObservable";
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
  ansVal = {};

  timeInSeconds: number;
  remainingSeconds: number;
  hasFinished: boolean;
  displayTime: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private elementRef: ElementRef) {
    let nSoal = 12;
    for (var i = 1; i <= 9; i++) {
      this.imgSoal.push(i);
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.startTimer();
    }, 1000);
    this.timeInSeconds = 7200;
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
  }
  //end method
}
