import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  base = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.base}/getAll`);
  }

  get(id: string) {
    return this.http.get(`${this.base}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.base, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.base}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
