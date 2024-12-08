import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { LearningPathService } from '../../../services/learning-path.service';

@Component({
  selector: 'app-learning-path-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './learning-path-list.component.html',
  styleUrls: ['./learning-path-list.component.scss']
})
export class LearningPathListComponent implements OnInit {
  learningPaths: any[] = [];
  loading = false;
  error = '';

  constructor(private learningPathService: LearningPathService) {}

  ngOnInit() {
    this.loadLearningPaths();
  }

  loadLearningPaths() {
    this.loading = true;
    this.learningPathService.getAllPaths().subscribe({
      next: (paths) => {
        this.learningPaths = paths;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load learning paths';
        this.loading = false;
      }
    });
  }

  enrollInPath(pathId: string) {
    this.learningPathService.enrollInPath(pathId).subscribe({
      next: () => {
        // Handle successful enrollment
        console.log('Successfully enrolled in path');
      },
      error: (err) => {
        this.error = 'Failed to enroll in path';
      }
    });
  }
}