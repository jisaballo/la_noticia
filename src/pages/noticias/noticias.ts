import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';

/**
 * Generated class for the NoticiasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {

  cargando: Boolean;
  articles: FeedItem[];

  url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private feedProvider: FeedProvider, 
    private alertCtrl: AlertController, private iab: InAppBrowser, public loadingCtrl: LoadingController) {
    this.url = navParams.get('url');

    let loading = this.loadingCtrl.create({
      content: 'Actualizando...'
    });

    loading.present();
    this.doRefresh(0);
    loading.dismiss();
  }

  doRefresh(refresher){

    this.cargando = true;
    
    this.feedProvider.getArticlesForUrl(this.url).subscribe(res => {
      this.articles = res;
      this.cargando = false;
      if (this.articles.length == 0)
        this.doRefresh(0);
      if (refresher != 0)
        refresher.complete();
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error de conexión',
      subTitle: 'El periódico esta temporalmente fuera de línea',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  openArticle(url: string){
    this.iab.create(url, '_blank');
    // window.open(url, '_blank');
  }

}
