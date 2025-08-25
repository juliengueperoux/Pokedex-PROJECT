// mobile-detection.service.ts - Version compatible SSR
import { Injectable, signal, computed, inject, DestroyRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MobileDetectionService {
    private destroyRef = inject(DestroyRef);
    private platformId = inject(PLATFORM_ID);
    private document = inject(DOCUMENT);

    // Vérifier si on est côté navigateur
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    // Signals avec valeurs par défaut pour le SSR
    private screenWidth = signal(this.getScreenWidth());
    private orientation = signal(this.getOrientation());
    private isTouchDevice = signal(this.getTouchCapability());

    // Signal principal compatible SSR
    readonly isMobile = computed(() => {
        if (!this.isBrowser) {
            // Côté serveur : assumons desktop par défaut
            // Vous pouvez aussi utiliser les headers User-Agent si disponibles
            return false;
        }

        const width = this.screenWidth();
        const touch = this.isTouchDevice();

        // Logique de détection mobile
        return width <= 768 || (width <= 1024 && touch);
    });

    // Signals additionnels avec protection SSR
    readonly isTablet = computed(() => {
        if (!this.isBrowser) return false;

        const width = this.screenWidth();
        const touch = this.isTouchDevice();
        return width > 768 && width <= 1024 && touch;
    });

    readonly isDesktop = computed(() => {
        if (!this.isBrowser) return true; // Par défaut côté serveur
        return !this.isMobile() && !this.isTablet();
    });

    readonly deviceType = computed(() => {
        if (!this.isBrowser) return 'desktop';

        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    });

    readonly isLandscape = computed(() => {
        if (!this.isBrowser) return true;
        return this.orientation() === 'landscape';
    });

    readonly isPortrait = computed(() => {
        if (!this.isBrowser) return false;
        return this.orientation() === 'portrait';
    });

    constructor() {
        // Initialiser les listeners seulement côté navigateur
        if (this.isBrowser) {
            this.initializeBrowserListeners();
        }
    }

    private initializeBrowserListeners() {
        const window = this.document.defaultView;
        if (!window) return;

        // Écouter les changements de taille d'écran
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(100),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                this.screenWidth.set(this.getScreenWidth());
                this.orientation.set(this.getOrientation());
            });

        // Écouter les changements d'orientation
        fromEvent(window, 'orientationchange')
            .pipe(
                debounceTime(100),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                setTimeout(() => {
                    this.screenWidth.set(this.getScreenWidth());
                    this.orientation.set(this.getOrientation());
                }, 100);
            });
    }

    private getScreenWidth(): number {
        if (!this.isBrowser) {
            return 1920; // Valeur par défaut côté serveur
        }
        return this.document.defaultView?.innerWidth || 1920;
    }

    private getOrientation(): 'portrait' | 'landscape' {
        if (!this.isBrowser) {
            return 'landscape'; // Par défaut côté serveur
        }

        const window = this.document.defaultView;
        if (!window) return 'landscape';

        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }

    private getTouchCapability(): boolean {
        if (!this.isBrowser) {
            return false; // Pas de touch côté serveur
        }

        const window = this.document.defaultView;
        if (!window) return false;

        return 'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0;
    }

    // Méthode pour obtenir des informations depuis les headers (côté serveur)
    getCurrentBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
        const width = this.screenWidth();
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        return 'xl';
    }
}