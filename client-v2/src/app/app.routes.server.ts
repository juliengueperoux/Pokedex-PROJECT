import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { ApiService } from './services/api.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'list/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const apiService = inject(ApiService);
      const limit = 20;
      
      const { count } = await firstValueFrom(apiService.getPokemonDetailsList(1, limit));
      const totalPages = Math.ceil(count / limit);
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      
      return pages.map(page => ({ page: page.toString() }));
    }
  },
  {
    path: 'pokemon/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const apiService = inject(ApiService);
      const pokemons = await firstValueFrom(apiService.getAllPokemons());
      return pokemons.map(p => ({ name: p.name_en }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
