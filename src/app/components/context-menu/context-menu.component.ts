import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {

  isVisible: boolean = false;
  position = { x: 0, y: 0 };

  @HostListener('document:click', ['$event'])  
  onClick(event: MouseEvent) {  
    this.isVisible = false;  // Hide menu on click outside  
  }  

  @HostListener('document:contextmenu', ['$event'])  
  onRightClick(event: MouseEvent) {  
    event.preventDefault();  
  }  

  showMenu(event: MouseEvent) {  
    this.position.x = event.clientX;  
    this.position.y = event.clientY;  
    this.isVisible = true;  
  }  

  preventContextMenu(event: MouseEvent) {  
    event.preventDefault();  
  }  

  doAction1() {  
    console.log('Action 1 clicked!');  
    this.isVisible = false;  
  }  

  doAction2() {  
    console.log('Action 2 clicked!');  
    this.isVisible = false;  
  }

  doAction3() {
    console.log('Action 3 clicked!');
    this.isVisible = false;
  }

}
