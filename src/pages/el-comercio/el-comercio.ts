import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

import { NoticiasPage } from '../noticias/noticias';

/**
 * Generated class for the ElComercioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-el-comercio',
  templateUrl: 'el-comercio.html',
})
export class ElComercioPage {
  loading: Boolean;
  periodico: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public redditService: RedditDataProvider) {
    
    this.loading = false;
    this.periodico = null;
    this.redditService.getPeriodicos().then(
      data => {
        this.periodico = data.periodicos[1];
        this.loading = true;
      },err => console.log(err));
  }

  viewFeeds(url_feeds){
    this.navCtrl.push(NoticiasPage , {
      url: url_feeds
    });
  }
}
