import { Routes } from '@angular/router';
import { ListComponent } from './list.component';

export const LIST_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '1',
  },
  {
    path: ':page',
    component: ListComponent,
  },
];
