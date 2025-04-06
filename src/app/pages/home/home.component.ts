import { Component } from '@angular/core';
import { HomeSkillComponent } from '../../components/home-skill/home-skill.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSkillComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
