import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, Subject, interval, takeUntil } from 'rxjs';

const INTERVAL: number = 300000; //300000 milliseconds = 5 minutes.

@Injectable({
	providedIn: 'root'
})
export class TokenUpdateService {
	private readonly keycloak = inject(KeycloakService);

	private _interval$?: Observable<number>;
	private _destroy$ : Subject<boolean> = new Subject<boolean>();

	start(): void {
		if(!this._interval$) {
      if(this.keycloak.isLoggedIn()) {
        this._interval$ = interval(INTERVAL).pipe(
          takeUntil(this._destroy$)
        );
      }			
		}
		
		if(this._interval$) {
			this._interval$.subscribe(() => {				
				if(this.keycloak.isTokenExpired()) {
					this.keycloak.updateToken().then((isRefreshed: boolean) => {
						if(!isRefreshed) {
							console.log('Cant refresh token.');
						}
					})
				}
			})
		}	
	}

  stop(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

}