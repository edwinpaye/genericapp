import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepItem, StepService } from '../step.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  stepList$!: Observable<StepItem[]>;

  // @Output() itemSelected = new EventEmitter<string>();

  constructor(private stepService: StepService) {}

  ngOnInit(): void {
    this.stepList$ = this.stepService.stepList$;
  }

  selectItem(id: number) {
    this.stepService.selectStep(id);
  }

  // selectItem(content: string) {
  //   this.itemSelected.emit(content);
  // }

  closeComponent(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.stepService.removeStep(id);
  }

}
