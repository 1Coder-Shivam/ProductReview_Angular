import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stats } from '../model/Stats';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  readonly url = "http://localhost:8090";
  constructor(private http: HttpClient) { }

  public getStatsFromRemote(): Observable<Stats> {
    return this.http.get<Stats>(this.url + '/stats');
  }

}
