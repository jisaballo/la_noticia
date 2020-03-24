import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

import { FuenteDetallesPage } from '../fuente-detalles/fuente-detalles';

@Component({
  selector: 'page-fuentes',
  templateUrl: 'fuentes.html'
})
export class FuentesPage {

  periodicos: any;

  constructor(public navCtrl: NavController, private redditService: RedditDataProvider) {

    this.periodicos = null;

    this.redditService.getPeriodicos().then(
      data => {
        this.periodicos = data.periodicos;
      },err => console.log(err));
  }

  private viewDetail(periodico){
    this.navCtrl.push(FuenteDetallesPage , {
      periodico : periodico
    })
  }
}
