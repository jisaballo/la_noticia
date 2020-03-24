import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

import { NoticiasPage } from '../noticias/noticias';

@Component({
  selector: 'page-el-universo',
  templateUrl: 'el-universo.html'
})
export class ElUniversoPage {
  loading: Boolean;
  periodico: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public redditService: RedditDataProvider) {

    this.loading = false;
    this.periodico = null;
    this.redditService.getPeriodicos().then(
      data => {
        this.periodico = data.periodicos[0];
        this.loading = true;
      },err => console.log(err));
  }

  viewFeeds(url_feeds){
    this.navCtrl.push(NoticiasPage , {
      url: url_feeds
    });
  }
}
