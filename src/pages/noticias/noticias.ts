import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';

import { NoticiaDetallePage } from '../noticia-detalle/noticia-detalle';

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
  totalArticles: FeedItem[];

  url: string[];
  periodico: number;
  seccion: number;
  feeds: Feed[];
  emptyFeed: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private feedProvider: FeedProvider, 
    public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.periodico = 0;
    this.seccion = 0;

    this.doRefresh(0,true);
  }
 
  private loadFeeds() {
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
        this.articles = [];
        
        if(this.feeds.length > 0)
          this.emptyFeed = false;
        else
          this.emptyFeed = true;

        this.url = [];
        this.feeds.forEach(element => {
          this.periodico = element["periodico"];
          this.seccion = element["seccion"];
          this.url.push(element["url"]);
        });
        this.feedProvider.getArticlesForUrl(this.url, this.periodico, this.seccion).subscribe(res => {
          res.forEach(element => {
            this.articles.push(element);
          });
        });
      });
  }

  doRefresh(refresher, loadingShow){
    
    this.cargando = true;
    let loading = this.loadingCtrl.create({
      content: 'Actualizando...'
    });

    if(loadingShow == true)
      loading.present();

    this.loadFeeds();
    this.cargando = false;

    setTimeout(() => {
      if(refresher != 0)
        refresher.complete();
      loading.dismiss();
    }, 1000);
  }

  viewDetail(agencia, seccion, title, description, pubDate, url_feeds, urlImg){
    this.navCtrl.push(NoticiaDetallePage , {
      agencia : agencia,
      seccion : seccion,
      titulo : title,
      descipcion : description,
      fecha : pubDate,
      url : url_feeds,
      urlImg : urlImg 
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Fuentes',
      subTitle: 'No tiene fuentes configuradas. Por favor seleccione alguna en el menú izquierdo.',
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
