import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataItem, DataService } from '../data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  items: DataItem[] = [];  

  @Output() itemSelected = new EventEmitter<string>();  

  constructor(private dataService: DataService) {}  

  ngOnInit(): void {  
    this.items = this.dataService.getItems();  
  }  

  selectItem(content: string) {  
    this.itemSelected.emit(content);
    console.log("select button");
  } 

  closeComponent(event: MouseEvent) {
    console.log("close button");
    event.stopPropagation(); // This prevents the parent's click event from firing  
  }
}
