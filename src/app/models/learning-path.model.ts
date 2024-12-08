export interface LearningPath {
    id: string;
    name: string;
    description: string;
    courseCount: number;
    duration: number;
    certificationAwarded: boolean;
    completionCriteria: string;
    courses: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PathEnrollment {
    id: string;
    userId: string;
    pathId: string;
    progress: number;
    startDate: Date;
    completionDate?: Date;
    status: 'InProgress' | 'Completed' | 'Abandoned';
  }
  
  export interface PathCertification {
    id: string;
    pathId: string;
    userId: string;
    issueDate: Date;
    certificateNumber: string;
    validUntil?: Date;
  }