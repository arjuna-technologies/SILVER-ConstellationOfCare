import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService
{
    constructor()
    {
    }

    public authenticate(username: string, password: string): Promise<string>
    {
        if ((username !== '') && (password !== ''))
            return new Promise(resolve => setTimeout(() => resolve(username), 2000));
        else
            return new Promise(resolve => setTimeout(() => resolve(null), 2000));
    }
}
