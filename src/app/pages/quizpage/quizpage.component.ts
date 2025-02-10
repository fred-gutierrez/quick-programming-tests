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
  quizData: any[] = quizData;
  currentQuestionIndex: number = 0;
  quizSkillName: string = "JavaScript";
  selectedAnswers: number[] = [];

  showScore: boolean = false;
  finalScore: number = 0;

  // Executes when initialized
  ngOnInit(): void {
    this.randomizeAndLimitQuestions()
  }

  randomizeAndLimitQuestions(): void {
    // Shuffle the questions
    const shuffled = quizData.sort(() => 0.5 - Math.random());
    // Limit to 10 questions
    this.quizData = shuffled.slice(0, 10);
    // Initialize selected answers array with null (no option selected)
    this.selectedAnswers = new Array(this.quizData.length).fill(null);
  }

  selectOption(isCorrect: boolean, optionIndex: number): void {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
  }

  // PAGINATION
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--
    }
  }
  selectQuestionIndex(selectedQuestionIndex: number): void {
    if (this.currentQuestionIndex >= 0 && selectedQuestionIndex < this.quizData.length) {
      this.currentQuestionIndex = selectedQuestionIndex;
    }
  }
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.quizData.length - 1) {
      this.currentQuestionIndex++;
    }
  }
  // PAGINATION END

  // SCORE/RESULT
  calculateScore(): void {
    this.finalScore = this.quizData.reduce((score, question, index) => {
      const selectedOptionIndex = this.selectedAnswers[index];

      if (selectedOptionIndex !== -1 && question.options[selectedOptionIndex].correct) {
        return score + 1
      }

      return score
    }, 0)
    this.showScore = true;
  }
  // SCORE/RESULT END
}
