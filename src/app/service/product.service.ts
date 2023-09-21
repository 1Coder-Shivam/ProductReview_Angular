import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get(`http://localhost:8090/products`);
  }
  public getSearchResult(str: string) {
    return this.http.get(`http://localhost:8090/products/search/` + str);
  }
  public getProductById(str: string) {
    return this.http.get(`http://localhost:8090/products/` + str)
  }
  public saveProduct(product: any) {
    return this.http.post(`http://localhost:8090/products`, product);
  }

}
