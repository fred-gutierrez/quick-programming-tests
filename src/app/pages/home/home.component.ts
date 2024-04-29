import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SkillComponent } from '../../components/skill/skill.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SkillComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
