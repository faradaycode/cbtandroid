import { Component, OnInit, ElementRef, AfterViewInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private elementRef: ElementRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuisPage');
  }
  ngOnInit() {
        var callDuration = this.elementRef.nativeElement.querySelector('#time');
        this.startTimer(callDuration);
    }

    startTimer(display) {
        var timer = 7200;
        var minutes;
        var seconds;
        var hours;

        Observable.interval(1000).subscribe(x => {
            hours = Math.floor(timer / 3600);
            minutes = Math.floor((timer - (hours * 3600)) / 60); //Math.floor(timer / 60);
            seconds = timer - (hours * 3600) - (minutes * 60); //Math.floor(timer % 60);

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = hours + ":" + minutes + ":" + seconds;

            --timer;
            if (--timer < 0) {
                 console.log('timeup');
            }
        })
    }
}
