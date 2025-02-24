import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-home-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-skill.component.html',
  styleUrl: './home-skill.component.scss'
})

export class HomeSkillComponent {
  skills: any[] = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.skillsService.getAll().subscribe({
      next: (data: any[]) => {
        this.skills = data;
      },
      error: (error) => {
        console.error("Error fetching skills: ", error);
      }
    });
  }
}
