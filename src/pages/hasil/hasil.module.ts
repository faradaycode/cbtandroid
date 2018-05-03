import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HasilPage } from './hasil';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@NgModule({
  declarations: [
    HasilPage,
  ],
  imports: [
    IonicPageModule.forChild(HasilPage),
  ],
  providers: [
    File,
    PhotoViewer
  ]
})
export class HasilPageModule {}
