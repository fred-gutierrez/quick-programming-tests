import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizOption {
  option: string;
  correct: boolean;
}

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
})
export class QuizResultsComponent {
  // Input properties to receive quiz data from parent component
  @Input() quizData: any[] = [];
  @Input() selectedAnswers: (number | undefined)[] = [];
  @Input() finalScore: number = 0;

  // Getter to calculate and return incorrect answers
  get incorrectAnswers() {
    return this.quizData
      .map((question, index) => {
        // Get the index of the user's selected answer for this question
        const selectedOptionIndex = this.selectedAnswers[index];

        // Determine if the answer is correct
        let isCorrect = false;
        if (selectedOptionIndex !== undefined) {
          isCorrect = question.options[selectedOptionIndex].correct;
        }

        // Get the user's answer text
        let userAnswer = 'Not answered';
        if (selectedOptionIndex !== undefined) {
          userAnswer = question.options[selectedOptionIndex].option;
        }

        // Find the correct answer from the options
        const correctOption = question.options.find(
          (opt: QuizOption) => opt.correct
        );
        const correctAnswer = correctOption ? correctOption.option : '';

        return {
          question: question.question,
          userAnswer,
          correctAnswer,
          isCorrect,
        };
      })
      .filter((q) => !q.isCorrect);
  }
}
