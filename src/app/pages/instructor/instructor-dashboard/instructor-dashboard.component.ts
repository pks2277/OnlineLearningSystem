// src/app/pages/instructor/instructor-dashboard/instructor-dashboard.component.ts
import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  providers: [CourseService],
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {
  courses: any[] = [];
  discussions: any[] = [];
  loading = false;
  error = '';
  courseStats = {
    total: 0,
    published: 0,
    draft: 0,
    students: 0
  };

  constructor(
    private router: Router,
    private courseService: CourseService,
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.loading = true;
    // Load courses and stats
    this.courseService.getInstructorCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.calculateStats(courses);
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        console.error(err);
      }
    });

  }

  private calculateStats(courses: any[]) {
    this.courseStats.total = courses.length;
    this.courseStats.published = courses.filter(c => c.status === 'Published').length;
    this.courseStats.draft = courses.filter(c => c.status === 'Draft').length;
    this.courseStats.students = courses.reduce((acc, curr) => acc + (curr.enrolledCount || 0), 0);
  }

  createCourse() {
    this.router.navigate(['/instructor/courses/create']);
  }
}
