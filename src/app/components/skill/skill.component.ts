import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})

export class SkillComponent {
  skillsService = inject(SkillsService)

  skills: any[] = [];

  async ngOnInit() {
    this.skills = await this.skillsService.getAll();
  }
}
