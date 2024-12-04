import { Routes } from '@angular/router';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { LearnerDashboardComponent } from './pages/learner-dashboard/learner-dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { InstructorDashboardComponent } from './pages/instructor-dashboard/instructor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'signup', pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupFormComponent
    },
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'learner-dashboard',
        component: LearnerDashboardComponent,
        canActivate: [AuthGuard],  // Protect route
        data: { roles: ['learner'] }  // Restrict to learner role
    },
    {
        path: 'instructor-dashboard',
        component: InstructorDashboardComponent,
        canActivate: [AuthGuard],  // Protect route
        data: { roles: ['instructor'] }  // Restrict to instructor role
    }
];


// // src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';

// export const routes: Routes = [
//   // Public Routes
//   { 
//     path: '', 
//     component: LandingPageComponent 
//   },
//   { 
//     path: 'login', 
//     component: LoginComponent 
//   },
//   { 
//     path: 'signup', 
//     component: SignupComponent 
//   },

//   // Learner Routes
//   { 
//     path: 'learner', 
//     canActivate: [AuthGuard],
//     data: { roles: ['Learner'] },
//     children: [
//       { path: 'dashboard', component: LearnerDashboardComponent },
//       { path: 'courses', component: CourseCatalogComponent },
//       { path: 'courses/:id', component: CourseDetailComponent },
//       { path: 'learning-paths', component: LearningPathsComponent },
//       { path: 'my-courses', component: EnrolledCoursesComponent },
//       { path: 'certificates', component: CertificatesComponent },
//       { path: 'discussions', component: DiscussionsComponent }
//     ]
//   },

//   // Instructor Routes
//   {
//     path: 'instructor',
//     canActivate: [AuthGuard], roles: ['Instructor'] },
//     children: [
//       { path: 'dashboard', component: InstructorDashboardComponent },
//       { path: 'courses/manage', component: CourseManagementComponent },
//       { path: 'courses/create', component: CourseCreationComponent },
//       { path: 'courses/:id/edit', component: CourseEditComponent },
//       { path: 'assignments', component: AssignmentManagementComponent },
//       { path: 'quizzes', component: QuizManagementComponent },
//       { path: 'students', component: StudentManagementComponent },
//       { path: 'analytics', component: InstructorAnalyticsComponent }
//     ]
//   },

//   // Admin Routes
//   {
//     path: 'admin',
//     canActivate: [AuthGuard], roles: ['Admin'] },
//     children: [
//       { path: 'dashboard', component: AdminDashboardComponent },
//       { path: 'users', component: UserManagementComponent },
//       { path: 'courses', component: CourseAdminComponent },
//       { path: 'reports', component: ReportsComponent },
//       { path: 'settings', component: PlatformSettingsComponent },
//       { path: 'analytics', component: PlatformAnalyticsComponent }
//     ]
//   },

//   // Support Routes
//   {
//     path: 'support',
//     canActivate: [Auth roles: ['Support'] },
//     children: [
//       { path: 'dashboard', component: SupportDashboardComponent },
//       { path: 'tickets', component: TicketManagementComponent },
//       { path: 'user-support', component: UserSupportComponent }
//     ]
//   },

//   // Common Protected Routes
//   {
//     path: 'profile',
//     canActivate: [Auth roles: ['Learner', 'Instructor', 'Admin', 'Support'] },
//     component: UserProfileComponent
//   },
//   {
//     path: 'notifications',
//     canActivate: [AuthGuard],Learner', 'Instructor', 'Admin', 'Support'] },
//     component: NotificationsComponent
//   },

//   // Fallback route
//   { 
//     path: '**', 
//     redirectTo: '' 
//   }
// ];
