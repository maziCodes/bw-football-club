import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {
  baseUrl = 'https://api.football-data.org/v2/';
  plan = '&plan=TIER_ONE';


  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': 'f76a97c0bad842ebaf7981a70d58355e'
    })
  };

  constructor(private _http: HttpClient) { }

  fecthData(params) {
    return this._http.get(`${this.baseUrl}${params}`, this.httpOptions);
  }

}
