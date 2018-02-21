import { MethodeProvider } from './../../providers/methode/methode';
import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
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
    trigger('flyInOut', [
      transition('* => anim-a', [
        query('.item-list', style({ opacity: 0 }), { optional: true }),
        query('.item-list', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, -100px, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ]),
      transition('* => anim-b', [
        query('.item-list', style({ opacity: 0 }), { optional: true }),
        query('.item-list', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, 100px, 0)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})
export class MainmenuPage {
  animVar = 'anim-a';
  paket: String = 'pka';
  kls: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: MethodeProvider) {
    // this.paket = "pka";
    // this.animVar = "anim-a";
  }
  ngOnInit() {
    this.serv.getKeyVal('kelas').then(data => {
      this.kls = data;
    });
  }
  pka() {
    this.animVar = 'anim-a';
  }
  pkb() {
    this.animVar = 'anim-b';
  }
  goto(page, mapel) {
    this.navCtrl.push(page, { kelas: this.kls, pel: mapel });
  }
}
