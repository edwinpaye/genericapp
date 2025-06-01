import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Step1Component } from './step1/step1.component';
// import { Step2Component } from './step2/step2.component';
// import { Step3Component } from './step3/step3.component';
// import { Step4Component } from './step4/step4.component';
// import { Step5Component } from './step5/step5.component';
// import { SeccionComponent } from './components/seccion/seccion.component';
import { Router } from '@angular/router';
// import { DisplayComponent } from './display/display.component';

export interface StepItem {
  id: number;
  // component: any;
  title: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private steps: StepItem[] = [
    // { id: 0, title: "Step 1", path: "/step1" },
    // { id: 1, title: "Step 2", path: "/step2" },
    // { id: 2, title: "Step 3", path: "/step3" },
    { id: 3, title: "Step 4", path: "/step4" },
    // { id: 4, title: "Step 5", path: "/step5" },
    // { id: 5, title: "Secciones", path: "/secciones" },
  ]
  // private selectedStepsList: StepItem[] = [this.steps[0]];
  private selectedStepsList: StepItem[] = [];
  private stepListSubject = new BehaviorSubject<StepItem[]>(this.selectedStepsList);
  stepList$ = this.stepListSubject.asObservable();

  private currentStepSubject = new BehaviorSubject<StepItem>(this.selectedStepsList[0]);
  currentStep$ = this.currentStepSubject.asObservable();

  // private selectedStepsList: StepItem[];
  // private stepListSubject: BehaviorSubject<StepItem[]>;
  // stepList$: Observable<StepItem[]>;

  // private currentStepSubject: BehaviorSubject<StepItem>;
  // currentStep$: Observable<StepItem>;

  constructor(private router: Router) {
    // this.stepListSubject.next(this.getStepByRoute());

    // this.selectedStepsList = this.getStepByRoute();
    // this.stepListSubject = new BehaviorSubject<StepItem[]>(this.selectedStepsList);
    // this.stepList$ = this.stepListSubject.asObservable();
    // this.currentStepSubject = new BehaviorSubject<StepItem>(this.selectedStepsList[0]);
    // this.currentStep$ = this.currentStepSubject.asObservable();
  }

  getSteps(): StepItem[] {
    return this.steps;
  }

  getStepsByPath(path: string): StepItem[] {
    console.log(path);
    const steps = this.steps.find((item) => item.path == path);
    return steps ? [steps] : [];
  }

  setSteps(steps: StepItem[]) {
    this.selectedStepsList = steps;
    this.stepListSubject.next(this.selectedStepsList);
  }

  initStepsByCurrentPath() {
    this.setSteps(this.getStepsByPath(this.router.url));
  }

  initFirstStep() {
    this.addStep(0);
    this.selectStep(0);
  }

  getStepByRoute(): StepItem[] {
    const path = this.router.url;// ? this.router.url : "/step1";
    console.log(path);
    const step = this.steps.find((item) => item.path == path);
    this.router.navigate([path]);
    return [step? step: this.steps[0]];
  }

  selectStep(id: number): void {
    const step = this.selectedStepsList.find((item) => item.id === id);
    if (step) {
      this.currentStepSubject.next(step);
      if (step.path) this.router.navigate([step.path]);
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
