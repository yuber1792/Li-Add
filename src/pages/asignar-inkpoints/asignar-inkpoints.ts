import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
/**
 * Generated class for the AsignarInkpointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignar-inkpoints',
  templateUrl: 'asignar-inkpoints.html',
})
export class AsignarInkpointsPage {
  cantidad : any  = 0 ; 
  dataInfoApp:any ; 
  dataCliente:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams , public af : AngularFireDatabase ,private barcodeScanner: BarcodeScanner ) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsignarInkpointsPage');
  }

    scanSet(){
       this.barcodeScanner.scan().then((barcodeData) => {
       // Success! Barcode data is here
       console.log("ok");
       console.log(JSON.stringify(barcodeData));
       let  codigo = barcodeData ;
       console.log("codigo") ;

         this.dataInfoApp =  this.af.object('/PerfilCliente/'+barcodeData.text, { preserveSnapshot: true });
            this.dataInfoApp.subscribe(snapshot => {
              console.log("********");
              console.log("**** PERFL CLIENTE****");
              console.log(snapshot.key);
              console.log(JSON.stringify(snapshot.val()));
              this.dataCliente = snapshot.val() ;
              this.dataCliente.key =  snapshot.key;
              console.log("JURADO  = " +this.dataCliente.jurado);
              if(this.dataCliente.jurado){
                this.dataCliente.jurado =true;
              }else{
                this.dataCliente.jurado =false;
              }


              
            });

      
      


      }, (err) => {
          // An error occurred
          console.log("error");
          console.log(JSON.stringify(err));
          alert("Error en transaccion  ");
      });
}

setJurado(){
  console.log("cambio" + this.dataCliente.jurado);
  if(this.dataCliente.jurado){
    const itemObservableCliente = this.af.object('/PerfilCliente/'+this.dataCliente.key);
                  itemObservableCliente.update({ jurado: true });
  }else{
    const itemObservableCliente = this.af.object('/PerfilCliente/'+this.dataCliente.key);
                  itemObservableCliente.update({ jurado: false });
  }
  
}

asignarInkpoints(){


            if(this.dataCliente != null  ){
                console.log("********");
                console.log("Muestra info");
                let nuevosPuntos = parseInt(this.dataCliente.inkPoints) + parseInt(this.cantidad) ;                  
                const itemObservableCliente = this.af.object('/PerfilCliente/'+this.dataCliente.key);
                  itemObservableCliente.update({ inkPoints: nuevosPuntos });
                  alert("transaccion exitosa ");             
            }
      

}


}
