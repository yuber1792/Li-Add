import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
//import {AngularFireDatabase, AngularFireAction} from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the ArtistasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artistas',
  templateUrl: 'artistas.html',
})
export class ArtistasPage {
filtro:any = [];
resultado:any = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams , public af : AngularFireDatabase) {


       firebase.database().ref('PerfilArtista')
                 //.orderByChild('icCliente')                 
                 .orderByChild('inkPoints')
                 //.limitToLast(20)
                 //.equalTo(this.globalClienteId.toString())
                 //.equalTo('-L8HwzhLJ27r8N9rKoar')                 
                 .once('value')

                // .on("child_added", function(snapshot) {
                 .then((snapshot ) => {
                    
                          let thisInterno = this ; 
                          //console.log("entra consulta  = " + JSON.stringify(snapshot.val()));                                                                                        
                          snapshot.forEach(function(item ,index) {    
                           console.log("entra consulta");                                                                                        
                              
                               let data = item.val();
                               data.uidTatuaje = item.key;

                              // let fecha = new Date(item.fecha);
                              // data.fechaNormal = fecha.getDate() + "/" + (fecha.getMonth()+1) +"/" +fecha.getFullYear() + " " + fecha.getHours()+":"+fecha.getMinutes();
                               console.log("uid tatuaje " +item.key);
                               console.log("inkpoints " +data.inkPoints);
                            //   console.log("item tatuajes  data" +JSON.stringify(data));
                          
                               thisInterno.resultado.push(data);

                           
                                                            
                           });
                          this.resultado.reverse();
                         
                  })
                 .catch((error) => {
                   console.log("error  firebase  nativo " + error);
                  } );
      



  	//this.resultado =  this.af.list('PerfilArtista',ref => ref.orderByChild('inkPoints'));
  	
  	/*  const  queryObservable = this.af.list('PerfilArtista', {
        query: {
          orderByChild: 'inkPoints'          
        }
      });

      //manjo de respuesta 
      // subscribe to changes
     queryObservable.subscribe(queriedItems => {
        console.log(JSON.stringify(queriedItems));
        //alamaenca resultado del filtro en arreglo 
        this.filtro = queriedItems;
        //recorre arreglo para setelartl en la lista 
        this.filtro.forEach((item, index) => {
                   console.log("item artista = " + JSON.stringify(item));

          let dataI = item;
          //let fecha = new Date(item.fecha);
          //dataI.fechaNormal = fecha.getDate() + "/" + (fecha.getMonth()+1) +"/" +fecha.getFullYear() + " " + fecha.getHours()+":"+fecha.getMinutes();

          this.resultado.push(dataI);
        });
        this.resultado.reverse();
        
      });*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistasPage');
  }

}
