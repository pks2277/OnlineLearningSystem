// src/app/models/enrollment.model.ts
export interface EnrollmentRequest {
    courseId: string;
    paymentMethod: string;
  }
  
  export interface EnrollmentResponse {
    id: string;
    courseId: string;
    courseTitle: string;
    enrollmentDate: Date;
    completionStatus: 'NotStarted' | 'InProgress' | 'Completed';
    progressPercentage: number;
    isPaid: boolean;
    paymentStatus?: string;
    thumbnailURL?:string;
  }
  
  export interface CourseContent {
    id: string;
    courseId: string;
    title: string;
    contentType: string;
    fileUrl?: string;
    contentDescription: string;
    contentOrder: number;
    isDownloadable: boolean;
    duration?: string;
    createdAt: Date;
    updatedAt?: Date;
  }