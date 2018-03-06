import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AspirantesPage } from './aspirantes';

@NgModule({
  declarations: [
    AspirantesPage,
  ],
  imports: [
    IonicPageModule.forChild(AspirantesPage),
  ],
})
export class AspirantesPageModule {}
