import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';

export interface StepItem {
  component: any;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private steps: StepItem[] = [
    { component: Step1Component, title: "Step 1" },
    { component: Step2Component, title: "Step 2" },
    { component: Step3Component, title: "Step 3" },
    { component: Step4Component, title: "Step 4" },
    { component: Step5Component, title: "Step 5" },
  ]
  get stepsList(): StepItem[] {
    return this.steps;
  }

  private selectedStepsList: StepItem[] = [this.steps[0]];
  private stepListSubject = new BehaviorSubject<StepItem[]>(this.selectedStepsList);
  stepList$ = this.stepListSubject.asObservable();

  private currentStep: StepItem = this.selectedStepsList[0];
  private currentStepSubject = new BehaviorSubject<StepItem>(this.currentStep);
  currentStep$ = this.currentStepSubject.asObservable();

  selectStep(index: number): void {
    this.currentStep = this.selectedStepsList[index];
    this.currentStepSubject.next(this.currentStep);
  }

  addStep(index: number): void {
    this.selectedStepsList.push(this.steps[index]);
    this.stepListSubject.next(this.selectedStepsList)
  }

  // Update content  
  // updateContent(updatedItem: StepItem): void {  
  //   const index = this.contentList.findIndex(item => item.id === updatedItem.id);  
  //   if (index !== -1) {  
  //     this.contentList[index] = updatedItem;  
  //     this.contentListSubject.next(this.contentList);  
  //   }  
  // }  

  removeStep(index: number): void {
    if(this.selectedStepsList.length > index && this.selectedStepsList.length > 1) {
      this.selectedStepsList.splice(index, 1);

      // if (this.currentStep >= this.steps.length) {
      //   this.currentStep = this.steps.length - 1;
      // }
      this.stepListSubject.next(this.selectedStepsList);
    }
  }

}
