import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CamelManagerComponent } from './components/camel-manager/camel-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CamelManagerComponent],
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'camel-registry-ui';
}
