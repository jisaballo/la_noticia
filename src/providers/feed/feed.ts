import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

export class FeedItem {
  agencia: string;
  seccion: string;
  description: string;
  link: string;
  title: string;
  pubDate: string;
  urlImg: string;
 
  constructor(agencia: string, seccion: string, description: string, link: string, title: string, pubDate: string, urlImg: string) {
    this.agencia = agencia;
    this.seccion = seccion;
    this.description = description;
    this.link = link;
    this.title = title;
    this.pubDate = pubDate;
    this.urlImg = urlImg;
  }
}

export class Feed {
  periodico: number;
  seccion: number;
  url: string;
 
  constructor(periodico: number, seccion: number,url: string) {
    this.periodico = periodico;
    this.seccion = seccion;
    this.url = url;
  }
}

/*
  Generated class for the FeedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FeedProvider {

  newspapaers: any;
  constructor(public http: Http, public redditService: RedditDataProvider, public storage: Storage) {

    this.newspapaers = null;
    this.redditService.getPeriodicos().then(
      data => {
        this.newspapaers = data.periodicos;
      },err => console.log(err));
  }

  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      let objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      } else {
        return [];
      }
    });
  }

  public addFeed(newFeed: Feed) {
    return this.getSavedFeeds().then(arrayOfFeeds => {
      arrayOfFeeds.push(newFeed)
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });
  }

  public DeleteFeed(url) {
    return this.getSavedFeeds().then(arrayOfFeeds => {

      var index = 0;
      arrayOfFeeds.forEach(element => {
        if(element["url"] == url)
          arrayOfFeeds.splice(index,5);
        index++;
      });
      
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });
  }

  public getArticlesForUrl(feedUrl: string[], periodico: number, seccion: number) {
    var order = encodeURI(' | sort(field="pubDate", descending="true")');
    var contador = 0;
    var linkFeed = "";
    feedUrl.forEach(element => {
      if(contador == 0)
        linkFeed += "\"" + element + "\"";
      else
        linkFeed += "," + "\"" + element + "\"";
      contador++;
    });
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%2CpubDate%2Cenclosure%20from%20rss%20where%20url%20in%28'+encodeURIComponent(linkFeed)+'%29%20%7C%20unique%28field%3D%22link%22%29'+order+'&format=json';
    
    let articles = [];
    return this.http.get(url)
    .map(data => data.json()['query']['results'])
    .map((res) => {
      if (res == null) {
        return articles;
      }
      let objects = res['item'];
 
      for (let i = 0; i < objects.length; i++) {
        let item = objects[i];

        //tiempo desde publicacion
        var date = new Date(item.pubDate);

        var objToday = new Date();
        var dias_de_diferencia = objToday.getDate() - date.getDate();
        
        item.pubDate = "Hace ";

        if (dias_de_diferencia > 0)
          if(dias_de_diferencia == 1)
            item.pubDate += " un día y ";
          else
            item.pubDate += dias_de_diferencia + " días y ";

        var timeFromPub = (24 - date.getHours());
          if(timeFromPub == 0)
            item.pubDate += " una hora";
          else  
            item.pubDate += timeFromPub + " horas";

        var urlImg;
        if(item.enclosure)
          urlImg = item.enclosure['url'];
        else
          {
            item.description = "";
            urlImg = this.newspapaers[periodico]['imgIcon'];
          }
        let newFeedItem = new FeedItem(this.newspapaers[periodico].nombre, this.newspapaers[periodico].secciones[seccion].nombre, 
          item.description, item.link, item.title, item.pubDate, urlImg);
        articles.push(newFeedItem);
      }
      return articles
    })
  }

}
