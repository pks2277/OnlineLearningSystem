// src/app/models/course.model.ts
export interface Course {
    id: string;
    title: string;
    description: string;
    instructorId: string;
    instructorName?: string;
    category: string;
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: number;
    status: 'Draft' | 'Published' | 'Archived';
    averageRating?: number;
    enrollmentCount?: number;
    thumbnailURL?: string; // Add this line
    createdAt: Date;
    updatedAt: Date;
}

  
  export interface CourseContent {
    id: string;
    courseId: string;
    contentType: 'Video' | 'PDF' | 'Text' | 'Quiz' | 'Assignment';
    title: string;
    contentDescription: string;
    fileUrl?: string;
    contentOrder: number;
    duration?: number;
    isRequired: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  