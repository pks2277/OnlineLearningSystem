// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';



interface CourseContent {
  id: string;
  courseId: string;
  contentType: string;
  fileUrl: string;
  contentDescription: string;
  contentOrder: number;
}

interface CourseFilters {
  category?: string;
  difficultyLevel?: string;
  searchTerm?: string;
}
@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private apiUrl = 'https://wq5w12lw-7032.inc1.devtunnels.ms/api/Courses';

  constructor(private http: HttpClient) {}

  // Update the createCourse method to accept FormData
  createCourse(formData: FormData): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, formData);
  }

  getInstructorCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/instructor/courses`);
  }

  // Course CRUD Operations
  getCourses(filters?: CourseFilters): Observable<Course[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.category) params = params.set('category', filters.category);
      if (filters.difficultyLevel) params = params.set('difficultyLevel', filters.difficultyLevel);
      if (filters.searchTerm) params = params.set('searchTerm', filters.searchTerm);
    }
    return this.http.get<Course[]>(this.apiUrl, { params });
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  updateCourse(id: string, courseData: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, courseData);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Course Content Operations
  getCourseContent(courseId: string): Observable<CourseContent[]> {
    return this.http.get<CourseContent[]>(`${this.apiUrl}/${courseId}/content`);
  }

  addCourseContent(courseId: string, content: FormData): Observable<CourseContent> {
    return this.http.post<CourseContent>(`${this.apiUrl}/${courseId}/content`, content);
  }

  updateCourseContent(courseId: string, contentId: string, content: Partial<CourseContent>): Observable<CourseContent> {
    return this.http.put<CourseContent>(`${this.apiUrl}/${courseId}/content/${contentId}`, content);
  }

  deleteCourseContent(courseId: string, contentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}/content/${contentId}`);
  }

  // Enrollment Related Operations
  checkEnrollmentStatus(courseId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${courseId}/enrollment-status`);
  }

  enrollInCourse(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, {});
  }

  // Course Rating Operations
  getRatings(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/ratings`);
  }

  addRating(courseId: string, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/ratings`, { rating, comment });
  }

  // Course Progress
  updateProgress(courseId: string, progress: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${courseId}/progress`, { progress });
  }
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/admin/all`);
  }

  // File Upload Helper
  uploadContentFile(courseId: string, file: File, contentType: string, description: string): Observable<CourseContent> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contentType', contentType);
    formData.append('description', description);
    
    return this.http.post<CourseContent>(`${this.apiUrl}/${courseId}/content/upload`, formData);
  }

  
}
