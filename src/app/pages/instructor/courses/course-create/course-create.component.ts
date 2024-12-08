// src/app/pages/instructor/courses/course-create/course-create.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../../services/course.service';

interface CourseContent {
  id?: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'assignment';
  contentUrl?: string;
  contentDescription?: string;
  duration?: number;
  isDownloadable: boolean;
  order: number;
}

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup;
  contentForm!: FormGroup;
  loading = false;
  error = '';
  thumbnail: File | null = null;
  thumbnailPreview: string | null = null;
  contentFiles: Map<number, File> = new Map();
  contents: CourseContent[] = [];

  categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Data Science',
    'AI/ML'
  ];

  difficultyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  contentTypes = [
    'video',
    'pdf',
    'quiz',
    'assignment'
  ];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    // Any additional initialization if needed
  }

  private initializeForms() {
    // Main course form
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      thumbnail: [File]
    });

    // Content form
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      type: ['video', Validators.required],
      contentDescription: [''],
      duration: [0],
      isDownloadable: [false],
      order: [1],
      file: [null]
    });
  }

  // Handle thumbnail selection
  onThumbnailSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.thumbnail = file;
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle content file selection
  onContentFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.contentForm.patchValue({ file: file });
    }
  }

  // Add content to the course
  addContent() {
    if (this.contentForm.valid) {
      const contentIndex = this.contents.length;
      const contentFormValue = this.contentForm.value;
      
      // Store the file separately
      if (contentFormValue.file) {
        this.contentFiles.set(contentIndex, contentFormValue.file);
      }

      // Add content to contents array
      this.contents.push({
        ...contentFormValue,
        order: contentIndex + 1
      });

      // Reset form for next content
      this.contentForm.reset({
        type: 'video',
        isDownloadable: false,
        order: this.contents.length + 1
      });
    }
  }

  // Remove content from the course
  removeContent(index: number) {
    this.contents.splice(index, 1);
    this.contentFiles.delete(index);
    // Reorder remaining contents
    this.contents.forEach((content, idx) => {
      content.order = idx + 1;
    });
  }

  // Submit the course
  async onSubmit() {
    if (this.courseForm.valid) {
      try {
        this.loading = true;
        this.error = '';

        // Create FormData object
        const formData = new FormData();
        
        // Add course details
        Object.keys(this.courseForm.value).forEach(key => {
          if (key !== 'thumbnail') {
            formData.append(key, this.courseForm.value[key]);
          }
        });

        // Add thumbnail if exists
        if (this.thumbnail) {
          formData.append('thumbnail', this.thumbnail);
        }

        // Create course and get ID
        const course = await this.courseService.createCourse(formData).toPromise();

        // Upload content if course creation was successful
        if (course && course.id) {
          // Upload each content
          for (let content of this.contents) {
            const contentFormData = new FormData();
            contentFormData.append('title', content.title);
            contentFormData.append('contentType', content.type);
            contentFormData.append('contentDescription', content.contentDescription || 'null');
            contentFormData.append('duration', content.duration?.toString() || '0');
            contentFormData.append('isDownloadable', content.isDownloadable.toString());
            contentFormData.append('order', content.order.toString());

            const contentFile = this.contentFiles.get(content.order - 1);
            if (contentFile) {
              contentFormData.append('file', contentFile);
            }

            await this.courseService.addCourseContent(course.id, contentFormData).toPromise();
          }
        }

        this.router.navigate(['/instructor/courses']);
      } catch (err: any) {
        this.error = err.message || 'Failed to create course';
        console.error('Error creating course:', err);
      } finally {
        this.loading = false;
      }
    } else {
      this.markFormGroupTouched(this.courseForm);
    }
  }

  // Cancel course creation
  cancel() {
    this.router.navigate(['/instructor/courses']);
  }

  // Utility function to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
