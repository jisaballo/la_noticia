import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RedditDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RedditDataProvider {

  periodicos: any;
  about: any;
  
  constructor(public http: Http) {
  }

  getPeriodicos(){
    if(this.periodicos){
  		return Promise.resolve(this.periodicos);
  	}
    return new Promise (resolve => this.http.get('assets/data/periodicos.json').map(res => res.json()).subscribe(data => {
      this.periodicos = data;
  		resolve(this.periodicos);
  	}));
  }

  getAbout(){
    if(this.about){
  		return Promise.resolve(this.about);
  	}
    return new Promise (resolve => this.http.get('assets/data/integrantes.json').map(res => res.json()).subscribe(data => {
      this.about = data;
  		resolve(this.about);
  	}));
  }

}
