import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;

  constructor() {}

  public onQueryChanged(query: string = '') {
    if(this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      console.log('Mandar este query:', query);
    }, 500);
  }
}
