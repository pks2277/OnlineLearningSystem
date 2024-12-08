// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './pages/public/login-form/login-form.component';
import { SignupFormComponent } from './pages/public/signup-form/signup-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
// import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { InstructorDashboardComponent } from './pages/instructor/instructor-dashboard/instructor-dashboard.component';
import { LearnerDashboardComponent } from './pages/learner-dashboard/learner-dashboard.component';
// import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
// import { CourseCatalogComponent } from './pages/course-catalog/course-catalog.component';
// import { CourseCreationComponent } from './pages/course-creation/course-creation.component';
// import { CourseManagementComponent } from './pages/course-management/course-management.component';
// import { LearningPathManagementComponent } from './pages/learning-paths/learning-path-management/learning-path-management.component';
import { HomeComponent } from './pages/public/home/home.component';
import { AboutComponent } from './pages/public/about/about.component';
import { ContactComponent } from './pages/public/contact/contact.component';
// import { DiscussionDetailComponent } from './pages/discussion/discussion-detail/discussion-detail.component';
// import { DiscussionListComponent } from './pages/discussion/discussion-list/discussion-list.component';
import { CourseComponent } from './pages/public/course/course.component';
import { CourseCreateComponent } from './pages/instructor/courses/course-create/course-create.component';
import { CourseDetailsComponent } from './pages/public/course-details/course-details.component';
import { LearningPathListComponent } from './pages/learning-path/learning-path-list/learning-path-list.component';
import {LearningPathCreateComponent} from './pages/instructor/learning-paths/learning-path-create/learning-path-create.component';
// import {LearningPathEditComponent} from './pages/instructor/learning-paths/learning-path-edit/learning-path-edit.component';
import {AdminDashboardComponent} from './pages/admin/admin-dashboard/admin-dashboard.component';
import {SupportDashboardComponent} from './pages/support/support-dashboard/support-dashboard.component';
import {CourseContentComponent} from './pages/learner/course-content/course-content.component'
import {EnrolledCoursesComponent} from './pages/learner/enrolled-courses/enrolled-courses.component'

export const routes: Routes = [
  // Public Routes
  { 
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  { 
    path: 'about', 
    component: AboutComponent 
  },
  { 
    path: 'contact', 
    component: ContactComponent
  },
  { 
    path: 'login', 
    component: LoginFormComponent 
  },
  { 
    path: 'signup', 
    component: SignupFormComponent 
  },
  {
    path:'course',
    component:CourseComponent
  },
  {
    path: 'course/:courseId',
    component: CourseDetailsComponent
  },
  {
    path:'learning-path',
    component:LearningPathListComponent
  },


//   Learner Routes
  { 
    path: 'learner', 
    canActivate: [AuthGuard],
    data: { roles: ['learner'] },
    children: [
      { path: 'dashboard', component: EnrolledCoursesComponent  },
      { path: 'my-courses', component: EnrolledCoursesComponent },
      { path: 'course/:courseId/learn', component: CourseContentComponent },
      
      // { path: 'dashboard', component: LearnerDashboardComponent },
      // { path: 'courses', component: CourseCatalogComponent },
      // { path: 'courses/:id', component: CourseDetailComponent },
      // {path:'learning-path',component:LearningPathListComponent},
      // { path: 'my-courses', component: EnrolledCoursesComponent },
      // { path: 'assignments', component: AssignmentsComponent },
      // { path: 'quizzes', component: QuizzesComponent },
      // { path: 'certificates', component: CertificatesComponent },
      // { path: 'discussion', component: DiscussionListComponent },
      // {path:'discussions/:id',component:DiscussionDetailComponent}
    ]
  },

  // Instructor Routes
  {
    path: 'instructor', 
    canActivate: [AuthGuard],
    data: { roles: ['instructor'] },
    children: [
      { path: 'dashboard', component: InstructorDashboardComponent },
      // { path: 'courses', component: CourseManagementComponent },
      { path: 'courses/create', component: CourseCreateComponent },
    
      // {path:'learning-path/edit/:id',component:LearningPathEditComponent},
      // { path: 'courses/:id/edit', component: CourseEditComponent },
//       // { path: 'assignments', component: AssignmentManagementComponent },
//       // { path: 'quizzes', component: QuizManagementComponent },
//       // { path: 'students', component: StudentManagementComponent },
//       // { path: 'analytics', component: InstructorAnalyticsComponent }
    ]
  },

//   // Admin Routes
  {
    path: 'admin', 
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      {path:'learning-path/create',component:LearningPathCreateComponent},
      // { path: 'users', component: UserManagementComponent },
      // { path: 'courses', component: CourseAdminComponent },
      // { path: 'reports', component: ReportsComponent },
      // { path: 'settings', component: SystemSettingsComponent },
      // { path: 'analytics', component: SystemAnalyticsComponent }
    ]
  },
  {
    path: 'support',
    canActivate: [AuthGuard],
    data: { roles: ['support'] },
    children: [
      { path: 'dashboard', component: SupportDashboardComponent },
      // ... other support routes
    ]
  },

//   // Common Protected Routes
//   {
//     path: 'profile',
//     canActivate: [AuthGuard],
//     data: { roles: ['Learner', 'Instructor', 'Admin'] },
//     component: UserProfileComponent
//   },

//   // Error Routes
//   // { 
//   //   path: 'not-found', 
//   //   component: NotFoundComponent 
//   // },
//   // { 
//   //   path: 'access-denied', 
//   //   component: AccessDeniedComponent 
//   // },

  // Fallback route - must be last
  { 
    path: '**', 
    redirectTo: 'login'
  }
];
