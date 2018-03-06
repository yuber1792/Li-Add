import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Storage } from '@ionic/storage';
import { DetalleSolicitudAspirantePage } from '../../pages/detalle-solicitud-aspirante/detalle-solicitud-aspirante';
/**
 * Generated class for the AspirantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aspirantes',
  templateUrl: 'aspirantes.html',
})
export class AspirantesPage {

 items :any ;
  items2 :any ;
    listaSolicitudes  :any = [];
    uidCliente:any ;
  constructor(public navCtrl: NavController, public navParams: NavParams , public af : AngularFireDatabase ,public storage: Storage ) {

    this.storage.get('userData').then((userData) => {

        this.uidCliente = userData;
      });


    this.items = this.af.list('/SolicitudesNuevosArtistas', { preserveSnapshot: true });
    this.items
      .subscribe(snapshots => {
        this.listaSolicitudes  = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.key);
          console.log(snapshot.val());
          let data   =snapshot.val() ;
          data.uidTransaccion  =  snapshot.key ;
          data.calificado = false ;
          if(data.calificaciones != null ){
            console.log("entra  if  ");
               this.items2 = this.af.list('/SolicitudesNuevosArtistas/'+  data.uidTransaccion + "/calificaciones", { preserveSnapshot: true });
               this.items2
                 .subscribe(snapshots11 => {
                     snapshots11.forEach(snapshots1 => {
                       
                     //  console.log(snapshots1.key);
                      // console.log(JSON.stringify(snapshots1.val()));
                       for (var i = 0; i < snapshots1.val().calificaciones; ++i) {
                       	    console.log("entra for calificaciones ");
                       		 console.log(snapshots1.val().calificaciones[i]);
                       		 console.log(JSON.stringify(snapshots1.val().calificaciones[i]));
                       }

                       if(snapshots1.key === this.uidCliente){
                         data.calificado = true ;
                       }
                    });

                 });
          }

        /*  if(data.estado === 'SolicitudCreada'){
             data.estadoParaCliente  = "Visita pendiente";
          }
           if(data.estado === 'VisitaReprogramada'){
             data.estadoParaCliente  = "Visita reprogramada";
          }*/
          this.listaSolicitudes.push(data);
        });
      })
  }

  openSolicitud(solicitud){

    this.navCtrl.push(DetalleSolicitudAspirantePage , {solicitud :solicitud});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresoNuevosArtistasPagePage');
  }
}
