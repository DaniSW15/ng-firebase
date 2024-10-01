import { Routes } from "@angular/router";

export default [
    {
        path: 'sign-in',
        loadComponent: () => import('./sign-in/sign-in.component').then(m => m.default)
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up.component').then(m => m.default)
    }
] as Routes;