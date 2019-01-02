import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { MethodeProvider } from '../../providers/methode/methode';

/**
 * Generated class for the ModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html',
})
export class ModalsPage {
  modalTitle: String;
  pos: number;
  Vsoal: any;
  Vbhs: any;
  Isoal: any;
  Ibhs: any;
  scales: number = 10;
  @ViewChild(Content) content: Content;
  @ViewChild('zoomSoal') zooms: ElementRef;
  @ViewChild('zoomBahas') zoomb: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private serv: MethodeProvider) {
    this.Vsoal = this.navParams.get('soal');
    this.Vbhs = this.navParams.get('bahas');
    this.modalTitle = this.navParams.get('title');
  }

  ngOnInit() {
    let ext = ".png";
    this.Isoal = this.Vsoal + ext;
    this.Ibhs = this.Vbhs + ext;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  slideNzoom(element_name) {
    let scala = this.scales / 10;

    if (element_name === 'soal') {
      this.serv.nZoom(scala, this.zooms.nativeElement, this.content);
    }

    if (element_name === 'bahas') {
      this.serv.nZoom(scala, this.zoomb.nativeElement, this.content);
    }
  }

  private zoomIn() {
    this.scales = this.scales + 2.5;
  }

  private zoomOut() {

    if (this.scales > 10) {
      this.scales = this.scales - 2.5;
    }
  }

  unZoom() {
    this.scales = 10;
  }
}
