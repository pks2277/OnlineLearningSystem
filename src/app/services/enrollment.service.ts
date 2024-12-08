// src/app/services/enrollment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrollmentRequest, EnrollmentResponse, CourseContent } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'https://wq5w12lw-7032.inc1.devtunnels.ms/api/Enrollment';

  constructor(private http: HttpClient) {}

  enrollInCourse(request: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(`${this.apiUrl}/enroll`, request);
  }

  getEnrolledCourses(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/enrolledCourses`);
  }
  getCourseContent(courseId: string): Observable<CourseContent[]> {
    return this.http.get<CourseContent[]>(`${this.apiUrl}/course/${courseId}/content`);
  }
  updateProgress(courseId: string, progress: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/course/${courseId}/progress`, { progress });
  }
}