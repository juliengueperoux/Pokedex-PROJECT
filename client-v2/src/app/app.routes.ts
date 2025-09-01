import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, },
    {
        path: 'list',
        loadChildren: () => import(`./features/list/routes`)
            .then(routes => routes.LIST_ROUTES)
    },
    {
        path: 'pokemon',
        loadChildren: () => import(`./features/pokemon/routes`)
            .then(routes => routes.POKEMON_ROUTES)
    },
];
