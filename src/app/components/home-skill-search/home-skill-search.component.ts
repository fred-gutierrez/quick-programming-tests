import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-skill-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-skill-search.component.html',
  styleUrl: './home-skill-search.component.scss',
})
export class HomeSkillSearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.searchChange.emit(this.searchTerm.toLowerCase());
  }
}
