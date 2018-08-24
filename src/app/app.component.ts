import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Accept': 'application/json' , 'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public user: User, private http: Http, private httpClient: HttpClient, private config: ConfigService) { };
  private baseUrl: string = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/';
  configUrl = 'config';
  title = 'Spelling Words!';
  values;
  onKey;

  refresh(): void {
    window.location.reload();
  }

  getData() {
    console.log('executing getData()');
    return this.httpClient.get('http://192.168.1.109:4000/api/cats').subscribe(data => {return data},
    err => console.error(err),
    () => console.log('done loading'));
  }
}
export interface Cat {
  name: string;
}