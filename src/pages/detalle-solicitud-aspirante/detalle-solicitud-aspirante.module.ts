import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleSolicitudAspirantePage } from './detalle-solicitud-aspirante';

@NgModule({
  declarations: [
    DetalleSolicitudAspirantePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleSolicitudAspirantePage),
  ],
})
export class DetalleSolicitudAspirantePageModule {}
