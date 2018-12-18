import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RaportPage } from './raport';
import { Screenshot } from '@ionic-native/screenshot';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    RaportPage,
  ],
  imports: [

    IonicPageModule.forChild(RaportPage),
  ],
  providers: [
    Screenshot,
    SocialSharing
  ]
})
export class RaportPageModule {}
