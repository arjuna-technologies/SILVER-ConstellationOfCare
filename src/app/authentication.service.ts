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
            const config = { 'url': 'http://localhost:8080/auth', 'realm': 'silver', 'clientId': 'coc' };
            this.keycloakAuth = new Keycloak(config);
            this.keycloakAuth.init({ onLoad: 'login-required' })
                .success(() => { resolve(); })
                .error(() => { reject(); });
        });
    }

    public getToken(): string
    {
        return this.keycloakAuth.token;
    }

    public authenticate(username: string, password: string): Promise<string>
    {
        if ((username !== '') && (password !== ''))
            return new Promise(resolve => setTimeout(() => resolve(username), 2000));
        else
            return new Promise(resolve => setTimeout(() => resolve(null), 2000));
    }
}
