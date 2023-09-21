import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private url = "http://localhost:8090";
  constructor(private http: HttpClient) { }

  getReviews():Observable<any> {
    return this.http.get(this.url + '/reviews');
  }

  public getReviewById(id:number){
    return this.http.get(this.url + '/reviews/'+id);
  }

  public addReview(review:any){
    return this.http.post(this.url + '/reviews',review);
  }

  public updateReview(review:any){
    return this.http.put(this.url + '/reviews',review);
  }

  setReviewStatus(id:number,status:any, data:any):Observable<any> {
    return this.http.post(this.url+ '/reviews/'+id+'/'+status,data);
  }
}
