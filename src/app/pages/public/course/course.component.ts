// src/app/pages/public/course/course.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,NavbarComponent, FooterComponent],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  loading = false;
  error = '';
  
  // Filter options
  categories = ['Programming', 'Design', 'Business', 'Marketing', 'Science'];
  difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
  contentTypes = ['Video', 'PDF', 'Text', 'Quiz', 'Assignment'];
  
  filters = {
    category: '',
    difficultyLevel: '',
    contentType: '',
    searchTerm: ''
  };

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.courseService.getCourses(this.filters).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        this.loading = false;
        console.error('Error loading courses:', err);
      }
    });
  }

  applyFilters() {
    this.loadCourses();
  }

  resetFilters() {
    this.filters = {
      category: '',
      difficultyLevel: '',
      contentType: '',
      searchTerm: ''
    };
    this.loadCourses();
  }
}
