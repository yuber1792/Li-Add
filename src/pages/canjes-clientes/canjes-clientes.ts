import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

/**
 * Generated class for the CanjesClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-canjes-clientes',
  templateUrl: 'canjes-clientes.html',
})
export class CanjesClientesPage {
  cantidad : any  = 0 ; 
  dataInfoApp:any ; 
  dataProducto:any = [];
  uidCliente :any ;
  uidTransaccion :any ; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public af : AngularFireDatabase ,private barcodeScanner: BarcodeScanner ) {
  	this.dataProducto.imagen  ="";
  	this.dataProducto.producto  ="";
  	this.dataProducto.descripcionProducto  ="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CanjesClientesPage');
  }


  
   scanSet(){
   	var thiss = this;
       this.barcodeScanner.scan().then((barcodeData ) => {
       // Success! Barcode data is here
       console.log("ok");
       console.log(JSON.stringify(barcodeData));
       var codigo = barcodeData ;
       console.log("codigo") ;
       var dataCodigo  = barcodeData.text.split("-");
       console.log(dataCodigo[0]);
       console.log(dataCodigo[1]);
       console.log(dataCodigo[2]);
       this.uidCliente =dataCodigo[0];
       this.uidTransaccion =dataCodigo[2];
        
         this.dataInfoApp =  this.af.object('/ComprasCliente/'+dataCodigo[0]+"/-"+dataCodigo[2], { preserveSnapshot: true });
            this.dataInfoApp.subscribe(snapshot => {
              console.log("********");
              console.log("**** INFO PRODUCTO ****");
              console.log(snapshot.key)
              console.log(snapshot.val());
              console.log(JSON.stringify(snapshot.val()));
              this.dataProducto = snapshot.val() ; 
              //this.dataProducto.uidTransaccion = snapshot.key;
              
            });

            /*if(this.dataCliente != null  ){
                console.log("********");
                console.log("Muestra info");
                let nuevosPuntos = parseInt(this.dataCliente.inkPoints) + parseInt(this.cantidad) ;                  
			    const itemObservableCliente = this.af.object('/PerfilCliente/'+barcodeData.text);
		        itemObservableCliente.update({ inkPoints: nuevosPuntos });
		        alert("transaccion exitosa ");			       
            }*/
       
      
      


      }, (err) => {
          // An error occurred
          console.log("error");
          console.log(JSON.stringify(err));
          alert("Error en transaccion  ");
      });
}

cambiarEstado(){
	  const itemObservableCliente = this.af.object('/ComprasCliente/'+this.uidCliente+"/-"+this.uidTransaccion);
      itemObservableCliente.update({ estado: "Recibido" });
      alert("transacción exitosa ");			       
}

}
