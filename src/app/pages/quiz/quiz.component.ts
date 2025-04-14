import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizResultsComponent } from '../../components/quiz-results/quiz-results.component';
import { QuestionsService } from '../../services/questions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizResultsComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  quizData: any[] = [];
  currentQuestionIndex: number = 0;
  quizSkillName: string = '';
  selectedAnswers: number[] = [];
  showScore: boolean = false;
  finalScore: number = 0;
  isLoading: boolean = true;

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const skill_id = params['skill_id'];
      const type = params['type'] || 'conceptual';

      // console.log('Fetching questions for:', skill_id, type); // Debug log

      this.questionsService
        .getQuestionsBySkillAndType(skill_id, type)
        .subscribe({
          next: (questions) => {
            // console.log('Received questions:', questions); // Debug log
            this.quizData = this.randomizeAndLimitQuestions(questions);
            this.quizSkillName =
              skill_id === 'html'
                ? 'HTML'
                : skill_id === 'css'
                ? 'CSS'
                : skill_id === 'javascript'
                ? 'JavaScript'
                : skill_id.charAt(0).toUpperCase() + skill_id.slice(1);
            this.selectedAnswers = new Array(this.quizData.length).fill(null);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching questions:', error);
            this.isLoading = false;
          },
        });
    });
  }

  randomizeAndLimitQuestions(questions: any[]): any[] {
    // Shuffle the questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    // Limit to 10 questions
    return shuffled.slice(0, 10);
  }

  // Getter to count non-null selected answer
  get selectedAnswersCount(): number {
    return this.selectedAnswers.filter((answer) => answer !== null).length;
  }

  selectOption(isCorrect: boolean, optionIndex: number): void {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
  }

  // PAGINATION
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  // Question Specific
  selectQuestionIndex(selectedQuestionIndex: number): void {
    if (
      this.currentQuestionIndex >= 0 &&
      selectedQuestionIndex < this.quizData.length
    ) {
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

      if (
        selectedOptionIndex !== -1 &&
        question.options[selectedOptionIndex].correct
      ) {
        return score + 10;
      }

      return score;
    }, 0);
    this.showScore = true;
  }
  // SCORE/RESULT END
}
