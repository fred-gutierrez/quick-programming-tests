import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizData from "../../data/quizData.json"

@Component({
  selector: 'app-quizpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizpage.component.html',
  styleUrl: './quizpage.component.scss'
})
export class QuizpageComponent {
  quizData: any[] = quizData
}
