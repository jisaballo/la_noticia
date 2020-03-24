import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NoticiaDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-noticia-detalle',
  templateUrl: 'noticia-detalle.html',
})
export class NoticiaDetallePage {

  agencia : string;
  seccion : string;
  title: string;
  description: string;
  pubDate: string;
  url: string;
  urlImg: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.agencia = navParams.get('agencia');
    this.seccion = navParams.get('seccion');
    this.title = navParams.get('titulo');
    this.description = navParams.get('descipcion');
    this.pubDate = navParams.get('fecha');
    this.url = navParams.get('url');
    this.urlImg = navParams.get('urlImg');
  }

  openArticle(url: string){
    this.iab.create(url, '_blank');
    // window.open(url, '_blank');
  }

}
