import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { InitializerComponent } from './components/initializer/initializer.component';
import { AppInitializerService } from './services/app-initializer.service';

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.load().toPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    { provide: InitializerComponent },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true,
    },
  ]
};
