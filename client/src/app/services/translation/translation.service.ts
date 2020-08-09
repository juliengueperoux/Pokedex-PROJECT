import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    private currentLanguage: string;

    constructor(
        private translateService: TranslateService,
        private titleService: Title,
    ) {
    }

    init() {
        // Add supported languages
        this.translateService.addLangs(['en', 'fr']);

        // Switch to the desired language (Old value or default one)
        const browserLang = this.translateService.getBrowserLang();
        this.currentLanguage = browserLang.match(/en|fr/) ? browserLang : 'fr';
        this.translateService.setDefaultLang(this.currentLanguage);
        this.translateService.use(
            this.currentLanguage
        );

        moment.locale(this.currentLanguage);

        // Change window title
        this.translateService
            .get('demo.title')
            .subscribe((translation: string) =>
                this.titleService.setTitle(translation)
            );
    }

    getLanguage() {
        return this.currentLanguage;
    }
}
