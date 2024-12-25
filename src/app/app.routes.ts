import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'step1',
    },
    {
        path: 'step1',
        component: Step1Component,
    },
    {
        path: 'step2',
        loadComponent: () =>
            import('./step2/step2.component').then((m) => m.Step2Component),
    },
    {
        path: 'step3',
        loadComponent: () =>
            import('./step3/step3.component').then((m) => m.Step3Component),
    },
    {
        path: 'step4',
        loadComponent: () =>
            import('./step4/step4.component').then((m) => m.Step4Component),
    },
    {
        path: 'step5',
        loadComponent: () =>
            import('./step5/step5.component').then((m) => m.Step5Component),
    },
    {
        path: 'secciones',
        loadComponent: () =>
            import('./components/seccion/seccion.component').then((m) => m.SeccionComponent),
    },
    // {
    //     path: 'dashboard',
    //     loadChildren: () =>
    //         import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
    // },
    {
        path: '**',
        redirectTo: 'step1',
        // loadComponent: () =>
        //     import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
];
