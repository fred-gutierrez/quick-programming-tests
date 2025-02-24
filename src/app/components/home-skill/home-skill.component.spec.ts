import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSkillComponent } from './home-skill.component';

describe('SkillComponent', () => {
  let component: HomeSkillComponent;
  let fixture: ComponentFixture<HomeSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSkillComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
