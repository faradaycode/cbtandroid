import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
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
      transition('* => *', [
        query('.item-list', style({ opacity: 0 }), {optional: true}),
        query('.item-list', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translate3d(-150%, 0, 0)', offset: 0.3}),
            style({opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class MainmenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    //this.visibleState = (this.visibleState == 'visible') ? 'visible bouncing' : 'invisible';
  }

  getAnswer(val) {

  }
}
