import { Component, OnInit } from '@angular/core';
import { Step1Component } from '../step1/step1.component';
import { Step2Component } from '../step2/step2.component';
import { Step3Component } from '../step3/step3.component';
import { CommonModule, NgComponentOutlet, NgFor } from '@angular/common';
import { StepSelectorComponent } from '../step-selector/step-selector.component';
import { StepService, StepItem } from '../step.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    NgFor,
    StepSelectorComponent
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements OnInit {
  currentStep = 0
  currentStep$!: Observable<StepItem>;
  stepList$:any = null; 
  steps = [
    { component: Step1Component },
    { component: Step2Component },
    { component: Step3Component },
  ]

  constructor(public stepService: StepService) {}

  ngOnInit(): void {
    this.stepList$ = this.stepService.stepList$;
    this.currentStep$ = this.stepService.currentStep$;
  }

  nextStep() {
    if(this.currentStep < this.steps.length -1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if(this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // addStep() {
  //   const newStep = { component: Step1Component };
  //   this.steps.push(newStep);
  // }

  // removeStep() {
  //   if(this.steps.length > 0) {
  //     this.steps.splice(this.currentStep, 1);

  //     if (this.currentStep >= this.steps.length) {
  //       this.currentStep = this.steps.length - 1;
  //     }
  //   }
  // }

  onStepSelect(index: number) {
    this.currentStep = index;
  }

  selectStep(index: number) {
    this.stepService.selectStep(index);
  }

  addStep(index: number) {
    this.stepService.addStep(index);
  }

  removeStep(index: number) {
    this.stepService.removeStep(index);
  }

}
