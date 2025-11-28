import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.base);
  }
  get(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }

  create(p: any) {
    return this.http.post(this.base, p);
  }

  update(id: string, p: any) {
    return this.http.put(`${this.base}/${id}`, p);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }

  nasaAPI(){
    return this.http.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
  }
}
