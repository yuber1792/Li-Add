import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanjesClientesPage } from './canjes-clientes';

@NgModule({
  declarations: [
    CanjesClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(CanjesClientesPage),
  ],
})
export class CanjesClientesPageModule {}
