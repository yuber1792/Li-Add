import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AsignarInkpointsPage } from '../pages/asignar-inkpoints/asignar-inkpoints';
import { CanjesClientesPage } from '../pages/canjes-clientes/canjes-clientes';
import { AspirantesPage } from '../pages/aspirantes/aspirantes';
import { ArtistasPage } from '../pages/artistas/artistas';
import { CitasPage } from '../pages/citas/citas';
import { DetalleSolicitudAspirantePage } from '../pages/detalle-solicitud-aspirante/detalle-solicitud-aspirante';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2/';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



export const firebaseConfig = {
   apiKey: "AIzaSyAFsavrm9jQAumqLWxDZgEQYeqkbvV6Ta8",
   authDomain: "ink360-b7047.firebaseapp.com",
   databaseURL: "https://ink360-b7047.firebaseio.com",
   storageBucket: "ink360-b7047.appspot.com",
   messagingSenderId: "399106165518"
 };
 firebase.initializeApp(firebaseConfig)
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AspirantesPage,
    DetalleSolicitudAspirantePage,
    AsignarInkpointsPage,
    CanjesClientesPage,
    ArtistasPage,
    CitasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AspirantesPage,
    DetalleSolicitudAspirantePage,
    AsignarInkpointsPage,
    CanjesClientesPage,
    ArtistasPage,
    CitasPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
  ]
})
export class AppModule {}
