// src/app/services/discussion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private apiUrl = 'https://wq5w12lw-7032.inc1.devtunnels.ms/api/discussions';

  constructor(private http: HttpClient) {}

  getDiscussions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDiscussionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDiscussion(discussion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, discussion);
  }

  getReplies(discussionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${discussionId}/replies`);
  }

  createReply(reply: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${reply.discussionId}/replies`, reply);
  }
}
