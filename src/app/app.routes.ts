import { Routes } from '@angular/router';
import { FormComponent } from './form/form';

export const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: '**',
    redirectTo: 'form',
  },
];
