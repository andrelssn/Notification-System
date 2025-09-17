import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NotificationService {
  private base = 'http://localhost:8000';
  constructor(private http: HttpClient) { }


  send(messageId: string, content: string): Observable<any> {
    return this.http.post(`${this.base}/api/notify`, { messageId, messageContent: content });
  }


  status(messageId: string) {
    return this.http.get(`${this.base}/api/notification/status/${messageId}`);
  }
}
