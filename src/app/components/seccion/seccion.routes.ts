import { Routes } from '@angular/router';
import { SeccionListComponent } from './seccion-list/seccion-list.component';

export const routes: Routes = [
    {
        path: '',
        component: SeccionListComponent
    },
    // {
    //     path: 'edit/new',
    //     loadComponent: () =>
    //         import('./seccion-form/seccion-form.component').then((m) => m.SeccionFormComponent),
    // },
    {
        path: 'edit/:id',
        loadComponent: () =>
            import('./seccion-form/seccion-form.component').then((m) => m.SeccionFormComponent),
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./seccion-detail/seccion-detail.component').then((m) => m.SeccionDetailComponent),
    },
];
