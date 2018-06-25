import { NavController, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flip', [
      state('flipX', style({
        transform: 'rotateX(360deg)',
      })),
      state('flipY', style({
        opacity: 1,
        transform: 'rotateY(360deg)'
      })),
      transition('* => flipX', animate('800ms ease')),
      transition('* => flipY', animate('2s ease'))
    ]),

    trigger('flyInOut', [
      transition('* => showing', [
        query('h1', style({ opacity: 0 }), { optional: true }),
        query('h1', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(-100%, -200%, 0)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
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
        opacity: 1,
        transform: 'rotateX(360deg)'
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('invisible <=> visible', animate('800ms ease-in'))
    ]),

    trigger('bounce', [
      //   state('bouncing', style({
      //     opacity: 0
      //   })),
      transition('* => bouncing', [
        animate('1000ms ease-in', keyframes([
          style({ transform: 'translate3d(0,-100%,0)', opacity: 0, offset: 0 }),
          style({ transform: 'translate3d(0,100%,0)', opacity: 1, offset: 0.5 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
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
  faded: String = '';
  flipy: String = '';
  flipx: String = '';
  apper: String = '';
  shown: String = '';
  flyL2: String = 'left';

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {

    this.flyL = 'left';
    this.flyR = 'right';
    this.shown = 'showing';
    this.flipx = 'flipX';

    setInterval(() => {
      this.flyL = 'default';
      this.flyR = 'default';
    }, 1000);

    this.bounceState = (this.bounceState === 'noBounce') ? 'bouncing' : 'noBounce';

    setTimeout(() => {
      this.b_status = (this.b_status === 'visible') ? 'invisible' : 'visible';
    }, 1000);

    setTimeout(() => {
      this.flyL2 = (this.flyL2 === 'left') ? 'default' : 'left';
    }, 200);



  }

  mulai() {
    document.getElementById('grade-div').style.display = "block";
    document.getElementById('home-div').style.display = "none";

    this.flyL = 'left';
    this.flyR = 'right';
    this.flipy = "flipY";
  }

  goTo(kelas) {
    this.flipy = "";
    this.navCtrl.push("MainmenuPage", { klas: kelas });
    setTimeout(() => {
      document.getElementById('grade-div').style.display = "none";
      document.getElementById('home-div').style.display = "block";
    }, 1000);
  }
}
