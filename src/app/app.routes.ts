import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/feature/auth.routes').then(m => m.default),
        canActivateChild: [publicGuard()]
    },
    {
        path: 'tasks',
        loadChildren: () => import('./task/features/task.routes').then(m => m.default),
        canActivateChild: [privateGuard()]
    },
    {
        path: '**',
        redirectTo: '/tasks'
    }
];
