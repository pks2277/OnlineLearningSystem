// src/app/pages/instructor/learning-paths/learning-path-create/learning-path-create.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { LearningPathService } from '../../../../services/learning-path.service';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';

@Component({
  selector: 'app-learning-path-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './learning-path-create.component.html',
  styleUrls: ['./learning-path-create.component.scss']
})
export class LearningPathCreateComponent implements OnInit {
  pathForm!: FormGroup;
  availableCourses: any[] = [];
  selectedCourseIds: string[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private learningPathService: LearningPathService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadAvailableCourses();
  }

  private initForm() {
    this.pathForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['beginner', Validators.required],
      estimatedDuration: [null, [Validators.required, Validators.min(1)]],
      completionCriteria: ['', Validators.required],
      certificationAwarded: [false]
    });
  }

  loadAvailableCourses() {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.availableCourses = courses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    });
  }

  onCourseSelect(event: Event, courseId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCourseIds.push(courseId);
    } else {
      const index = this.selectedCourseIds.indexOf(courseId);
      if (index > -1) {
        this.selectedCourseIds.splice(index, 1);
      }
    }
  }

  isCourseSelected(courseId: string): boolean {
    return this.selectedCourseIds.includes(courseId);
  }

  onSubmit() {
    if (this.pathForm.valid && this.selectedCourseIds.length > 0) {
      this.loading = true;
      const pathData = {
        ...this.pathForm.value,
        courseIds: this.selectedCourseIds
      };

      this.learningPathService.createLearningPath(pathData).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.error = 'Failed to create learning path';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }
}
