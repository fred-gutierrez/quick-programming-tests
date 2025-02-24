import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSkillSearchComponent } from './home-skill-search.component';

describe('HeaderComponent', () => {
  let component: HomeSkillSearchComponent;
  let fixture: ComponentFixture<HomeSkillSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSkillSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeSkillSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
