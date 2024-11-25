import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';

export interface StepItem {
  id: number;
  component: any;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private steps: StepItem[] = [
    { id: 0, component: Step1Component, title: "Step 1" },
    { id: 1, component: Step2Component, title: "Step 2" },
    { id: 2, component: Step3Component, title: "Step 3" },
    { id: 3, component: Step4Component, title: "Step 4" },
    { id: 4, component: Step5Component, title: "Step 5" },
  ]
  private selectedStepsList: StepItem[] = [this.steps[0]];
  private stepListSubject = new BehaviorSubject<StepItem[]>(this.selectedStepsList);
  stepList$ = this.stepListSubject.asObservable();

  private currentStepSubject = new BehaviorSubject<StepItem>(this.selectedStepsList[0]);
  currentStep$ = this.currentStepSubject.asObservable();

  getSteps(): StepItem[] {
    return this.steps;
  }

  selectStep(id: number): void {
    const step = this.selectedStepsList.find((item) => item.id === id);
    if (step) {
      this.currentStepSubject.next(step);
    }
  }

  addStep(id: number): void {
    const foundedStep = this.selectedStepsList.find((item) => item.id === id);
    
    if (!foundedStep) {
      const step = this.steps.find((item) => item.id === id);
      if (step) {
        this.selectedStepsList.push(step);
        this.stepListSubject.next(this.selectedStepsList);
      }
    }
  }

  // Update content  
  // updateContent(updatedItem: StepItem): void {  
  //   const index = this.contentList.findIndex(item => item.id === updatedItem.id);  
  //   if (index !== -1) {  
  //     this.contentList[index] = updatedItem;  
  //     this.contentListSubject.next(this.contentList);  
  //   }  
  // }  

  removeStep(id: number): void {
    if(this.selectedStepsList.length > 1) {
      const index = this.selectedStepsList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const stepItem = this.currentStepSubject.getValue();

        if (stepItem.id === id) {
          const previusStep = this.selectedStepsList[(index - 1 + this.selectedStepsList.length) % this.selectedStepsList.length];
          this.selectStep(previusStep.id);
        }
        this.selectedStepsList = this.selectedStepsList.filter((item) => item.id !== id);
        this.stepListSubject.next(this.selectedStepsList);
      }
    }
  }

}
