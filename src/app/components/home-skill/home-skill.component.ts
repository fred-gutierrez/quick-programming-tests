import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkillsService } from '../../services/skills.service';
import { HomeSkillSearchComponent } from '../home-skill-search/home-skill-search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-skill',
  standalone: true,
  imports: [CommonModule, HomeSkillSearchComponent, RouterModule],
  templateUrl: './home-skill.component.html',
  styleUrl: './home-skill.component.scss',
})
export class HomeSkillComponent {
  skills: any[] = [];
  filteredSkills: any[] = [];
  searchTerm: string = '';

  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.skillsService.getAllSkills().subscribe({
      next: (data: any[]) => {
        this.skills = data;
        this.filteredSkills = [...this.skills];
      },
      error: (error) => {
        console.error('Error fetching skills: ', error);
      },
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    if (!searchTerm) {
      this.filteredSkills = [...this.skills];
      return;
    }
    this.filteredSkills = this.skills.filter((skill) =>
      skill.skill_name.toLowerCase().includes(searchTerm)
    );
  }
}
