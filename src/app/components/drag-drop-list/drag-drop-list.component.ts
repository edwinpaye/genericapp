import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-drop-list.component.html',
  styleUrl: './drag-drop-list.component.css'
})
export class DragDropListComponent {

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];  
  draggedItemIndex: number | null = null;  

  onDragStart(event: DragEvent, index: number) {  
    this.draggedItemIndex = index;  
    event.dataTransfer?.setData('text/plain', String(index));  
  }  

  onDragOver(event: DragEvent) {  
    event.preventDefault(); // Necessary to allow dropping  
  }  

  onDrop(event: DragEvent, targetIndex: number) {
    if (this.draggedItemIndex !== null) {
      const draggedItem = this.items[this.draggedItemIndex];  
      this.items.splice(this.draggedItemIndex, 1);  
      this.items.splice(targetIndex, 0, draggedItem);  
      this.draggedItemIndex = null; // Reset the dragged item index  
    }
  }

  printList() {
    console.log(this.items);
  }

}
