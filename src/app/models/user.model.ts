// export interface User {
//     username: string;
//     role: string;
//     token: string;
//   }
  
// src/app/models/course.model.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  category: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
}

// src/app/models/user.model.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'learner' | 'instructor' | 'admin';
  isActive: boolean;
}

// src/app/models/learning-path.model.ts

export interface LearningPath {
  id?: string;
  name: string;
  description: string;
  courses: string[];
  completionCriteria: string;
  certificationAwarded: boolean;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}