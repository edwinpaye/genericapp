import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepService } from '../step.service';

@Component({
  selector: 'app-step-selector',
  standalone: true,
  imports: [NgFor],
  templateUrl: './step-selector.component.html',
  styleUrl: './step-selector.component.css'
})
export class StepSelectorComponent implements OnInit {
  @Output() stepSelected = new EventEmitter<number>();
  stepList$: any = null;

  constructor(private stepService: StepService) {}

  ngOnInit(): void {
    this.stepList$ = this.stepService.stepList$;
  }

  steps = [
    { name: 'Step 1' , index: 0 },
    { name: 'Step 2' , index: 1 },
    { name: 'Step 3' , index: 2 },
  ]

  selectStep(index: number) {
    this.stepSelected.emit(index);
    this.stepService.selectStep(index);
  }

}
