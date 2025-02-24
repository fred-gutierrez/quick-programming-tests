import { Component } from '@angular/core';
import { HomeSkillSearchComponent } from '../../components/home-skill-search/home-skill-search.component';
import { HomeSkillComponent } from '../../components/home-skill/home-skill.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSkillSearchComponent, HomeSkillComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
