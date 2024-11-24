import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DisplayComponent } from './display/display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    StepperComponent,
    SidebarComponent,
    ToolbarComponent,
    DisplayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedContent: string = '';  

  onItemSelected(content: string) {  
    this.selectedContent = content;  
  }
}
