import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizResultsComponent } from './quiz-results.component';

describe('QuizResultsComponent', () => {
  let component: QuizResultsComponent;
  let fixture: ComponentFixture<QuizResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate incorrect answers correctly', () => {
    // Mock quiz data
    component.quizData = [
      {
        question: 'Test Question 1',
        options: [
          { option: 'Wrong Answer', correct: false },
          { option: 'Correct Answer', correct: true },
        ],
      },
    ];

    // User selected wrong answer
    component.selectedAnswers = [0];

    const incorrectAnswers = component.incorrectAnswers;

    expect(incorrectAnswers.length).toBe(1);
    expect(incorrectAnswers[0].question).toBe('Test Question 1');
    expect(incorrectAnswers[0].userAnswer).toBe('Wrong Answer');
    expect(incorrectAnswers[0].correctAnswer).toBe('Correct Answer');
  });

  it('should handle unanswered questions', () => {
    component.quizData = [
      {
        question: 'Test Question 1',
        options: [{ option: 'Correct Answer', correct: true }],
      },
    ];

    // User didn't answer (undefined)
    component.selectedAnswers = [undefined];

    const incorrectAnswers = component.incorrectAnswers;

    expect(incorrectAnswers.length).toBe(1);
    expect(incorrectAnswers[0].userAnswer).toBe('Not answered');
  });
});
