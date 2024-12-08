// src/app/pages/learner/course-content/course-content.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CourseContent } from '../../../models/enrollment.model';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
// import { SafePipe } from '../../../pipes/safe.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, PdfViewerModule],
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {
  courseId!: string;
  contents: CourseContent[] = [];
  currentContent?: CourseContent;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.loadCourseContent();
  }

  loadCourseContent(): void {
    this.loading = true;
    this.enrollmentService.getCourseContent(this.courseId).subscribe({
      next: (contents) => {
        this.contents = contents.sort((a, b) => a.contentOrder - b.contentOrder);
        if (contents.length > 0) {
          this.selectContent(contents[0]);
        }
        this.loading = false;
      },
      error: (err:Error) => {
        this.error = 'Failed to load course content';
        this.loading = false;
      }
    });
  }

  selectContent(content: CourseContent): void {
    this.currentContent = content;
  }

  getContentUrl(content: CourseContent): string {
    return `https://wq5w12lw-7032.inc1.devtunnels.ms${content.fileUrl}`;
  }
}