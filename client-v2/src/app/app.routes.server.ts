import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';
import { ApiService } from './services/api.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'list/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const apiService = inject(ApiService);
      const limit = 20;
      
      const response = await firstValueFrom(apiService.fetchListResource('pokemon', 1, 0));
      const count = response.count;
      const totalPages = Math.ceil(count / limit);
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      
      return pages.map(page => ({ page: page.toString() }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
