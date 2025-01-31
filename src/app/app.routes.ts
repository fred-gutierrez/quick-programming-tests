import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizpageComponent } from './pages/quizpage/quizpage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizpageComponent }
];
