import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

/**
 * Generated class for the KelasmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kelasmenu',
  templateUrl: 'kelasmenu.html',
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

    //right and left flyin
    trigger('flyin', [
      state('default', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      state('right', style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0)'
      })),
      state('left', style({
        opacity: 0,
        transform: 'translate3d(-100%, 0, 0)'
      })),
      state('bottom', style({
        opacity: 0,
        transform: 'translate3d(0, 100%, 0)'
      })),
      transition('right => default', animate('800ms ease-out')),
      transition('left => default', animate('800ms ease-out')),
      transition('bottom => default', animate('800ms ease-out'))
    ]),

  ]
})
export class KelasmenuPage {

  flyL = 'left';
  flyR = 'right';
  flyB = 'bottom';
  flipy: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KelasmenuPage');
  }

  ngOnInit() {

    this.flipy = "flipY";

    setInterval(() => {
      this.flyL = 'default';
      this.flyR = 'default';
      this.flyB = 'default';
    }, 1000);

  }

  goTo(kelas) {
    this.navCtrl.push("MainmenuPage",{
      klas: kelas
    });
  }
}
