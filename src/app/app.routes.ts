import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', 
       loadComponent: ()=> import('./administration/components/registro-social/registro-social.component')
    }
];
