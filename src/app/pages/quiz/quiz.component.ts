import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizResultsComponent } from '../../components/quiz-results/quiz-results.component';
import { QuestionsService } from '../../services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface QuizOption {
  option: string;
  correct: boolean;
}

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
  selectedAnswers: (number | undefined)[] = [];
  showScore: boolean = false;
  finalScore: number = 0;
  isLoading: boolean = true;

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  private sanitizeContent(content: string): SafeHtml {
    // First, escape all HTML tags except <code> and </code>
    let sanitized = content.replace(/<(?!\/?code)[^>]*>/g, (match) => {
      return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });

    // Then allow <code> and </code> tags to be rendered
    return this.sanitizer.bypassSecurityTrustHtml(sanitized);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const skill_id = params['skill_id'];
      const type = params['type'] || 'conceptual';
      const skill_name = decodeURIComponent(params['skill_name'] || '');

      this.questionsService
        .getQuestionsBySkillAndType(skill_id, type)
        .subscribe({
          next: (questions) => {
            this.quizData = this.randomizeAndLimitQuestions(questions).map(
              (question) => ({
                ...question,
                question: this.sanitizeContent(question.question),
                options: question.options.map((option: QuizOption) => ({
                  ...option,
                  option: this.sanitizeContent(option.option),
                })),
              })
            );
            this.quizSkillName =
              skill_name ||
              skill_id.charAt(0).toUpperCase() + skill_id.slice(1);
            this.selectedAnswers = new Array(this.quizData.length).fill(
              undefined
            );
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching questions:', error);
            this.isLoading = false;
          },
        });
    });
  }

  getCounterClass(): string {
    const progress = (this.selectedAnswersCount / this.quizData.length) * 100;
    if (progress >= 80) return 'counter-full';
    if (progress >= 42) return 'counter-halfway';
    return 'counter-starting';
  }

  randomizeAndLimitQuestions(questions: any[]): any[] {
    // Shuffle the questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    // Limit to 7 questions
    return shuffled.slice(0, 7);
  }

  // Getter to count non-null selected answer
  get selectedAnswersCount(): number {
    return this.selectedAnswers.filter((answer) => answer !== undefined).length;
  }

  selectOption(isCorrect: boolean, optionIndex: number): void {
    if (this.selectedAnswers[this.currentQuestionIndex] === optionIndex) {
      this.selectedAnswers[this.currentQuestionIndex] = undefined;
    } else {
      this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
    }
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
    const rawScore = this.quizData.reduce((score, question, index) => {
      const selectedOptionIndex = this.selectedAnswers[index];

      if (
        selectedOptionIndex !== undefined &&
        selectedOptionIndex !== -1 &&
        question.options[selectedOptionIndex] &&
        question.options[selectedOptionIndex].correct
      ) {
        return score + 1;
      }

      return score;
    }, 0);

    // Normalize score to be out of 10
    this.finalScore = Math.round((rawScore / this.quizData.length) * 100);
    this.showScore = true;
  }
  // SCORE/RESULT END
}
