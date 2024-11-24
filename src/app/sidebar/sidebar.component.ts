import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataItem, DataService } from '../data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: DataItem[] = [];

  @Output() itemSelected = new EventEmitter<string>();  

  constructor(private dataService: DataService) {}  

  ngOnInit(): void {  
    this.items = this.dataService.getItems();  
  }  

  selectItem(content: string) {  
    this.itemSelected.emit(content);  
  }

  isOpen = true;
  menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      document.body.classList.toggle('sidebar-open', this.isOpen);
    }, 0);
  }

  // @HostListener('document:click', ['$event'])
  closeSidebar() {
    // if (!event.target.closest('.sidebar')) {
      this.isOpen = false;
    // }
  }
}
