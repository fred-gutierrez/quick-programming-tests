import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})

export class SkillComponent {
  skills: any[] = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.skillsService.getAll().subscribe({
      next: (data: any[]) => {
        this.skills = data
      },
      error: (error) => {
        console.error("Error fetching skills: ", error)
      }
    });
  }
}
