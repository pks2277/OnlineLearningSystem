// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://wq5w12lw-7032.inc1.devtunnels.ms/api/contact';

  constructor(private http: HttpClient) {}

  sendMessage(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}