import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuisPage } from './quis';
import { ZoomAreaModule } from 'ionic2-zoom-area';

@NgModule({
  declarations: [
    QuisPage,
  ],
  imports: [
    IonicPageModule.forChild(QuisPage),
    ZoomAreaModule
  ],
})
export class QuisPageModule {}
