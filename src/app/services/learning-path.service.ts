// src/app/services/learning-path.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LearningPath } from '../models/learning-path.model';

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {
  private apiUrl = 'https://wq5w12lw-7032.inc1.devtunnels.ms/api/LearningPath';

  constructor(private http: HttpClient) {}

  createLearningPath(pathData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pathData);
  }

  getLearningPath(id: string): Observable<LearningPath> {
    return this.http.get<LearningPath>(`${this.apiUrl}/${id}`);
  }

  updateLearningPath(id: string, pathData: Partial<LearningPath>): Observable<LearningPath> {
    return this.http.put<LearningPath>(`${this.apiUrl}/${id}`, pathData);
  }

  deleteLearningPath(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllPaths(): Observable<LearningPath[]> {
    return this.http.get<LearningPath[]>(this.apiUrl);
  }

  getInstructorPaths(): Observable<LearningPath[]> {
    return this.http.get<LearningPath[]>(`${this.apiUrl}/instructor`);
  }
  enrollInPath(pathId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${pathId}/enroll`, {});
  }
}
