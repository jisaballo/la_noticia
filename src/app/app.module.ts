import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { FuentesPage } from '../pages/fuentes/fuentes';
import { FuenteDetallesPage } from '../pages/fuente-detalles/fuente-detalles';
import { NoticiasPage } from '../pages/noticias/noticias';
import { NoticiaDetallePage } from '../pages/noticia-detalle/noticia-detalle';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedProvider } from '../providers/feed/feed';
import { RedditDataProvider } from '../providers/reddit-data/reddit-data';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    FuentesPage,
    FuenteDetallesPage,
    NoticiasPage,
    NoticiaDetallePage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FuentesPage,
    FuenteDetallesPage,
    NoticiasPage,
    NoticiaDetallePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FeedProvider,
    InAppBrowser,
    RedditDataProvider
  ]
})
export class AppModule {}
