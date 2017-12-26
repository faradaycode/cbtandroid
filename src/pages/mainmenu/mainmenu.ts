import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainmenu',
  templateUrl: 'mainmenu.html',
  animations: [
    trigger('bounce', [
      state('bouncing1', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing1', [
        animate('800ms ease-in', keyframes([
          style({transform: 'translate3d(0,-100px,0)', offset: 0}),
          //style({transform: 'translate3d(0,-20px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ]),
      state('bouncing2', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing2', [
        animate('800ms ease-in', keyframes([
          style({transform: 'translate3d(0,-150px,0)', offset: 0}),
          //style({transform: 'translate3d(0,-20px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ]),
      state('bouncing3', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing3', [
        animate('800ms ease-in', keyframes([
          style({transform: 'translate3d(0,-250px,0)', offset: 0}),
          //style({transform: 'translate3d(0,-20px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ]),
      state('bouncing4', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing4', [
        animate('800ms ease-in', keyframes([
          style({transform: 'translate3d(0,-350px,0)', offset: 0}),
          //style({transform: 'translate3d(0,-20px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])

  ]
})
export class MainmenuPage {
  bounceState1 = "noBounce"
  bounceState2 = "noBounce"
  bounceState3 = "noBounce"
  bounceState4 = "noBounce"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.bounceState1 = (this.bounceState1 == 'noBounce') ? 'bouncing1' : 'noBounce';
    this.bounceState2 = (this.bounceState2 == 'noBounce') ? 'bouncing2' : 'noBounce';
    this.bounceState3 = (this.bounceState3 == 'noBounce') ? 'bouncing3' : 'noBounce';
    this.bounceState4 = (this.bounceState4 == 'noBounce') ? 'bouncing4' : 'noBounce';
    console.log('ionViewDidLoad MainmenuPage');
  }

  getAnswer(val) {

  }
}
