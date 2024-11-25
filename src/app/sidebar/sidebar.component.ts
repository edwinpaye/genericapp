import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataItem, DataService } from '../data.service';
import { NgFor } from '@angular/common';
import { StepItem, StepService } from '../step.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  // items: DataItem[] = [];
  steps: StepItem[] = [];

  @Output() itemSelected = new EventEmitter<string>();

  constructor(private dataService: DataService, private stepService: StepService) {}

  ngOnInit(): void {
    // this.items = this.dataService.getItems();
    this.steps = this.stepService.getSteps();
  }

  selectItem(id: number) {
    // this.itemSelected.emit(content);
    this.stepService.addStep(id);
    this.stepService.selectStep(id);
  }
  // selectItem(content: string) {
  //   // this.itemSelected.emit(content);
  //   this.stepService.addStep()
  // }

  // isOpen = true;
  // menuItems = [
  //   { path: '/home', label: 'Home' },
  //   { path: '/about', label: 'About' },
  //   { path: '/contact', label: 'Contact' }
  // ];

  // toggleSidebar() {
  //   this.isOpen = !this.isOpen;
  //   setTimeout(() => {
  //     document.body.classList.toggle('sidebar-open', this.isOpen);
  //   }, 0);
  // }

  // // @HostListener('document:click', ['$event'])
  // closeSidebar() {
  //   // if (!event.target.closest('.sidebar')) {
  //     this.isOpen = false;
  //   // }
  // }

}
