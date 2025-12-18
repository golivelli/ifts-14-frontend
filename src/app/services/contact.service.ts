import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

export interface ContactRequest {
  nombre: string;
  email: string;
  telefono: string;
  motivo: string;
  mensaje: string;
}

export interface ContactMessage extends ContactRequest {
  id: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private contactBaseUrl = environment.contactApi;

  sendContact(payload: ContactRequest): Observable<any> {
    return this.http.post(`${this.contactBaseUrl}/create.php`, payload);
  }

  getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.contactBaseUrl}/index.php`);
  }
}
