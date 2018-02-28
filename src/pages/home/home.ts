import { NavController, IonicPage } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(180deg)',
        backgroundColor: '#f50e80'
      })),
      transition('* => flipped', animate('400ms ease'))
    ]),

    //right and left flyin
    trigger('flyin', [
      state('default', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('right', style({
        transform: 'translate3d(250%, 0, 0)'
      })),
      state('left', style({
        transform: 'translate3d(-250%, 0, 0)'
      })),
      transition('right => default', animate('800ms ease-out')),
      transition('left => default', animate('800ms ease-out'))
    ]),

    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('invisible <=> visible', animate('800ms ease-in'))
    ]),

    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('1000ms ease-in', keyframes([
          style({transform: 'translate3d(0,-100%,0)', offset: 0}),
          style({transform: 'translate3d(0,100%,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class HomePage {
  flyL: String = 'default';
  flyR: String = 'default';
  b_status: String = 'invisible';
  bounceState: String = 'noBounce';

  constructor(public navCtrl: NavController) {
    this.flyL = 'left';
    this.flyR = 'right';

    setInterval(() => {
      this.flyL = 'default';
      this.flyR = 'default';
    }, 1000);
  }
  ionViewDidLoad() {
    this.bounceState = (this.bounceState == 'noBounce') ? 'bouncing' : 'noBounce';
    setTimeout(()=> {
      this.b_status = (this.b_status == 'visible') ? 'invisible' : 'visible';
    },1500);
  }
  goTo(page) {
    this.navCtrl.push("MainmenuPage");
  }
}
