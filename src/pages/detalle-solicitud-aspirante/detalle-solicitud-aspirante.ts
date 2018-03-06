import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
/**
 * Generated class for the DetalleSolicitudAspirantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-solicitud-aspirante',
  templateUrl: 'detalle-solicitud-aspirante.html',
})
export class DetalleSolicitudAspirantePage {
infoSolicitud :any ;

  calidadLinea : any = 0 ;
  calidadColor: any = 0;
  contraste :any = 0 ;
  definicion : any = 0 ;
  anatomia :any = 0  ;
  diseno :any = 0  ;
  uidCliente:any ;
  dataArtista:any;
  inkPointsArtista:any;
  calificaciones ;

  promedioCalidadLinea : any = 0 ;
  promedioCalidadColor: any = 0;
  promedioContraste :any = 0 ;
  promedioDefinicion : any = 0 ;
  promedioAnatomia :any = 0  ;
  promedioDiseno :any = 0  ;

  totalCalificaciones :any = 0 ; 
  promedioTotal :any = 0 ; 

  constructor(public navCtrl: NavController, public navParams: NavParams  ,public storage: Storage , public af : AngularFireDatabase  ) {
    this.infoSolicitud = navParams.data.solicitud;
    console.log("info solicitud ");
    console.log(this.infoSolicitud);
    console.log(JSON.stringify(this.infoSolicitud.calificaciones));
    
    this.calificaciones = JSON.parse(JSON.stringify(this.infoSolicitud.calificaciones));
    //validar tamaño de un objeto que se convierte a json 
    this.totalCalificaciones = Object.keys(this.calificaciones).length; 
    console.log("tamaño calificaciones " +length);


    for (var i = 0; i < this.totalCalificaciones; ++i) {
    	let temp  = this.getByIndex(this.calificaciones, i);
    	console.log("entra for" + JSON.stringify(temp));
    	this.anatomia = this.anatomia + temp.anatomia ; 
    	this.calidadColor = this.calidadColor + temp.calidadColor ; 
    	this.calidadLinea = this.calidadLinea + temp.calidadLinea ; 
    	this.contraste = this.contraste + temp.contraste ; 
    	this.definicion = this.definicion + temp.definicion ; 
    	this.diseno = this.diseno + temp.diseno ; 
    	//console.log(JSON.stringify(this.calificaciones[i]));
    	//this.anatomia = this.anatomia + this.infoSolicitud.calificaciones[i].anatomia ; 
    }
/*
    this.calificaciones.forEach((item, index) => {
	   console.log("entra " +item.anatomia  );
    	this.anatomia = this.anatomia + item.anatomia ; 
    });
*/

    console.log("anatomia = " + this.anatomia );
    console.log("calidadColor = " + this.calidadColor);
    console.log("calidadLinea = " + this.calidadLinea);
    console.log("contraste = " + this.contraste);
    console.log("diseno = " + this.diseno);
    console.log("definicion = " + this.definicion);

    this.promedioAnatomia = this.anatomia /this.totalCalificaciones;
    this.promedioCalidadColor = this.calidadColor /this.totalCalificaciones;
    this.promedioCalidadLinea = this.calidadLinea /this.totalCalificaciones;
    this.promedioDefinicion = this.definicion /this.totalCalificaciones;
    this.promedioContraste = this.contraste /this.totalCalificaciones;
    this.promedioDiseno = this.diseno /this.totalCalificaciones;

    let suma = this.promedioAnatomia + this.promedioCalidadColor + this.promedioCalidadLinea + this.promedioDefinicion + this.promedioContraste +this.promedioDiseno  ; 
    this.promedioTotal = suma / 6 ; 


    console.log("promedio anatomia = " + this.promedioAnatomia);
    console.log("promedio calidadColor = " + this.promedioCalidadColor);
    console.log("promedio calidadLinea = " + this.promedioCalidadLinea);
    console.log("promedio contraste = " + this.promedioDefinicion);
    console.log("promedio diseno = " + this.promedioDiseno);


  }


 getByIndex(obj, index) {
  return obj[Object.keys(obj)[index]];
}
  showConfirm() {
   /*let confirm = this.alertCtrl.create({
     title: 'Terminar calificación',
     message: '¿ Estas seguro que deseas terminar la calificación ?',
     buttons: [
       {
         text: 'Cancelar',
         handler: () => {
           console.log('Disagree clicked');
         }
       },
       {
         text: 'Calificar',
         handler: () => {
           console.log('Agree clicked');
           this.calificarSolicitud();
         }
       }
     ]
   });
   confirm.present();*/
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalificacionIngresoPagePage');
  }

  closeModal(){

    this.navCtrl.pop();

  }


  calificarSolicitud(){

    const itemObservable = this.af.object('/SolicitudesNuevosArtistas/'+this.infoSolicitud.uidTransaccion+"/calificaciones/"+this.uidCliente);
    itemObservable.set(
                          {
                            calidadLinea : this.calidadLinea,
                            calidadColor:  this.calidadColor,
                            contraste : this.contraste ,
                            definicion :  this.definicion,
                            anatomia : this.anatomia  ,
                            diseno : this.diseno  
                          }
                      );

     let nuevosPuntos = this.inkPointsArtista + 50 ;
        const itemObservableArtistad = this.af.object('/PerfilArtista/'+this.uidCliente );
        itemObservableArtistad.update({  inkPoints :nuevosPuntos });

    this.showAlert();


  }

  showAlert() {
   /*let alert = this.alertCtrl.create({
     title: 'Guardado',
     subTitle: 'Gracias por tu opinion, has recibido 50 InkPoints!!!',
     buttons: ['OK']
   });
   alert.present();*/
   this.navCtrl.pop();
 }


  zoom(url){
   // this.photoViewer.show(url);
  }

  onModelChange(e){
    console.log("seleccion");
  }

  swipeEvent(e) {
   this.closeModal();
 }

}
