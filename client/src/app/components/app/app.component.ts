import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'client';
  constructor(private translationService: TranslationService) {
    this.translationService.init();
}
}
