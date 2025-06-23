import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface QuizQuestion {
  question: SafeHtml;
  options: {
    option: SafeHtml;
    correct: boolean;
  }[];
}

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss',
})
export class QuizResultsComponent implements OnChanges {
  // Input properties to receive quiz data from parent component
  @Input() quizData: QuizQuestion[] = [];
  @Input() selectedAnswers: (number | undefined)[] = [];
  @Input() finalScore: number = 0;

  animatedScore = 0;
  animationInterval: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['finalScore']) {
      this.animateScore();
    }
  }

  animateScore() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.animatedScore = 0;
    const target = this.finalScore;
    const duration = 1200; // ms
    const stepTime = 20;
    const steps = Math.ceil(duration / stepTime);
    let currentStep = 0;
    this.animationInterval = setInterval(() => {
      currentStep++;
      this.animatedScore = Math.round((target * currentStep) / steps);
      if (currentStep >= steps) {
        this.animatedScore = target;
        clearInterval(this.animationInterval);
      }
    }, stepTime);
  }

  private sanitizeContent(content: string | null | undefined): SafeHtml {
    if (!content) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }

    try {
      // First, escape all HTML tags except <code> and </code>
      let sanitized = content.replace(/<(?!\/?code)[^>]*>/g, (match) => {
        return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      });

      // Then allow <code> and </code> tags to be rendered
      return this.sanitizer.bypassSecurityTrustHtml(sanitized);
    } catch (error) {
      console.error('Error sanitizing content:', error);
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
  }

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
        let userAnswer: SafeHtml =
          this.sanitizer.bypassSecurityTrustHtml('Not answered');
        if (selectedOptionIndex !== undefined) {
          userAnswer = question.options[selectedOptionIndex].option;
        }

        // Find the correct answer from the options
        const correctOption = question.options.find((opt) => opt.correct);
        const correctAnswer = correctOption
          ? correctOption.option
          : this.sanitizer.bypassSecurityTrustHtml('');

        return {
          question: question.question,
          userAnswer,
          correctAnswer,
          isCorrect,
        };
      })
      .filter((q) => !q.isCorrect);
  }

  get scoreRingColorClass(): string {
    if (this.animatedScore >= 80) {
      return 'score-green';
    } else if (this.animatedScore >= 50) {
      return 'score-yellow';
    } else {
      return 'score-red';
    }
  }
}
