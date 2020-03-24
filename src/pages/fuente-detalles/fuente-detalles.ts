import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

import { NoticiasPage } from '../noticias/noticias';

/**
 * Generated class for the FuenteDetallesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-fuente-detalles',
  templateUrl: 'fuente-detalles.html',
})
export class FuenteDetallesPage {

  feeds: Feed[]
  periodico: any;
  descPeriodico: any;
  boolFuente: boolean[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private feedProvider: FeedProvider, private redditService: RedditDataProvider) {
    this.periodico = navParams.get('periodico');
    this.descPeriodico = "";
    
    this.feeds = [];
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
        var contadorFeeds = this.feeds.length;
    
        this.redditService.getPeriodicos().then(
          data => {
            this.descPeriodico = data.periodicos[this.periodico];
            var indexSeccion;
            this.boolFuente = [];
    
            this.descPeriodico.secciones.forEach((seccion, index) => {
            indexSeccion = index;
    
            var contador = contadorFeeds;
            if(contadorFeeds != 0){
              do{
                var arrayFeeds = this.feeds[contador-1];
                if(arrayFeeds["url"] == seccion.url){
                  this.boolFuente[indexSeccion] = true;
                  break;
                }
                else{
                  this.boolFuente[indexSeccion] = false;
                }
                contador--;
              }
              while(contador != 0)
            }
            else
              this.boolFuente[indexSeccion] = false;
                    
            });
          },err => console.log(err));
      });
  }

  updateFuente(indexSeccion,url){
    if(this.boolFuente[indexSeccion]){
      this.addFeed(this.periodico, indexSeccion, url);
    }
    else{
      this.deleteFeeds(url);
    }
  }

  private loadFeeds() {
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
      });
  }

  private addFeed(id_periodico, id_seccion, url_feeds){
    let newFeed = new Feed(id_periodico,id_seccion, url_feeds);
    this.feedProvider.addFeed(newFeed).then(
      res => {
        this.loadFeeds();
      }
    );
  }

  private deleteFeeds(url) {
    this.feedProvider.DeleteFeed(url).then(
      res => {
        this.loadFeeds();
      });
  }

  private goRoot(){
    this.navCtrl.setRoot(NoticiasPage);
    this.navCtrl.popToRoot()
  }

}
