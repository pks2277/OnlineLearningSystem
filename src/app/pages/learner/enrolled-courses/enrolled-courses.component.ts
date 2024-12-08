import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { EnrollmentResponse } from '../../../models/enrollment.model';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import {Course} from '../../../models/course.model'
@Component({
  selector: 'app-enrolled-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.scss']
})
export class EnrolledCoursesComponent implements OnInit {
  enrolledCourses: EnrollmentResponse[] = [];
  loading = false;
  error = '';

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrolledCourses();
  }

  loadEnrolledCourses(): void {
    this.loading = true;
    this.enrollmentService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCourses = courses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load enrolled courses';
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'InProgress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }
}