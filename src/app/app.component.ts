import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CanjesClientesPage } from '../pages/canjes-clientes/canjes-clientes';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AspirantesPage } from '../pages/aspirantes/aspirantes';
import { AsignarInkpointsPage } from '../pages/asignar-inkpoints/asignar-inkpoints';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
//import { CalificacionIngresoPage } from '../../pages/calificacion-ingreso/calificacion-ingreso';
import { Storage } from '@ionic/storage';
import { ArtistasPage } from '../pages/artistas/artistas';
import { CitasPage } from '../pages/citas/citas';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AspirantesPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'Home', component: HomePage },
      { title: 'Escaner Usuario', component: AsignarInkpointsPage },
      { title: 'Canje Clientes', component: CanjesClientesPage },
      { title: 'Aspirantes', component: AspirantesPage },
      { title: 'Artistas', component: ArtistasPage }
      //{ title: 'Citas', component: CitasPage }
      
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
