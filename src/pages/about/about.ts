import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  integrantes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public redditService: RedditDataProvider) {
    this.integrantes = null;
	  this.redditService.getAbout().then(
		  data => {
        this.integrantes = data.integrantes;
      },err => console.log(err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
