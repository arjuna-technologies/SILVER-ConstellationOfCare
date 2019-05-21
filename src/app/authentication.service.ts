import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class AuthenticationService
{
    private keycloakAuth: any;

    public constructor()
    {
    }

    public init(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const config = { 'url': 'https://auth-chc-silver.ncl.ac.uk/auth', 'realm': 'SILVER', 'clientId': 'health-data-interface' };
            this.keycloakAuth = new Keycloak(config);
            this.keycloakAuth.init({ onLoad: 'login-required', flow: 'implicit' })
                .success(() => { resolve(); })
                .error(() => { reject(); });
        });
    }

    public getToken(): string
    {
        return this.keycloakAuth.token;
    }
}
