// src/app/pages/public/course-details/course-details.component.ts
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EnrollmentService } from '../../../services/enrollment.service';
import {EnrollmentRequest} from "../../../models/enrollment.model"
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseId!: string;
  course?: Course;
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.loadCourseDetails();
  }

  loadCourseDetails() {
    this.loading = true;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load course details';
        this.loading = false;
      }
    });
  }

  enrollInCourse() {
    let enrolReq = {
      courseId:this.courseId,
      paymentMethod:"gpay"
    }
    this.enrollmentService.enrollInCourse(enrolReq).subscribe({
      next: () => this.router.navigate(["/learner/my-courses"]),
      error: (err) => this.error = 'Failed to enroll'
    });
  }
}