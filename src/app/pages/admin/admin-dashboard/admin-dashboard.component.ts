// src/app/pages/admin/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error = '';
  courseStats = {
    total: 0,
    activeInstructors: 0,
    totalEnrollments: 0
  };

  constructor(
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.calculateStats(courses);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        this.loading = false;
        console.error('Error loading courses:', err);
      }
    });
  }

  private calculateStats(courses: Course[]) {
    this.courseStats.total = courses.length;
    
    // Calculate unique instructors
    console.log(courses)
    const uniqueInstructors = new Set(courses.map(course => course.instructorName));
    console.log(uniqueInstructors);
    this.courseStats.activeInstructors = uniqueInstructors.size;
    
    // Calculate total enrollments
    this.courseStats.totalEnrollments = courses.reduce(
      (total, course) => total + (course.enrollmentCount || 0), 0
    );
  }

  viewCourseDetails(courseId: string) {
    this.router.navigate(['/admin/courses', courseId]);
  }
  createLearningPath() {
    this.router.navigate(['/admin/learning-path/create']);
  }
}
