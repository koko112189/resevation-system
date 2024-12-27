import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/reservations/presentation/pages/reservations.component').then(
                (m) => m.ReservationsComponent
            )
        // path: '',
        // loadComponent: () =>
        //     import('./features/reservations/form/form.component').then(
        //         (m) => m.ReservationFormComponent
        //     )
    },
    {
        path: 'reservations/new',
        loadComponent: () =>
            import('./features/reservations/form/form.component').then(
                (m) => m.ReservationFormComponent
            )
    },
    {
        path: 'spaces/new',
        loadComponent: () =>
            import('./features/spaces/presentation/pages/manage-spaces/manage-spaces.component').then(
                (m) => m.ManageSpacesComponent
            )
    },
];
