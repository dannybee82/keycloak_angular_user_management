import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AutoRefreshTokenService, createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition, includeBearerTokenInterceptor, KeycloakService, provideKeycloak, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
 
//Settings for Bearer token interceptor
const bearerTokenInterceptor = createInterceptorCondition<IncludeBearerTokenCondition>({
	//Note: to allow calls to a Webserver/WebAPI, use the line below:
	//urlPattern: new RegExp(`^${environment.userEndpoint}(.*)?$|^${environment.keycloakServer}(.*)?$`, "i"),
	urlPattern: new RegExp(`^${environment.keycloakServer}(.*)?$`, "i"),
	bearerPrefix: 'Bearer'
  });

export const appConfig: ApplicationConfig = {
  providers: [
		provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
		provideHttpClient(
			withInterceptors([includeBearerTokenInterceptor]),
			withInterceptorsFromDi()
		),
		provideAnimations(), 
		importProvidersFrom(ToastrModule.forRoot({ positionClass: 'toast-bottom-center' })),
		provideKeycloak({
			config: {
			  url: `${environment.keycloakServer}`,
			  realm: `${environment.keycloakRealm}`,
			  clientId: `${environment.keycloakCLientId}`,
			},
			initOptions: {
			  onLoad: 'check-sso',
			  checkLoginIframe: false
			},
		providers: [AutoRefreshTokenService, UserActivityService],
			features: [
			  withAutoRefreshToken({
				onInactivityTimeout: 'login',
				sessionTimeout: 300000
			  })
			]
	   }),
	   {
		 provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
		 useValue: [bearerTokenInterceptor]
	   },
	]
};