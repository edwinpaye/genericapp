import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepItem, StepService } from '../step.service';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  steps: StepItem[] = [];

  // @Output() itemSelected = new EventEmitter<string>();

  constructor(private stepService: StepService) {}

  ngOnInit(): void {
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
