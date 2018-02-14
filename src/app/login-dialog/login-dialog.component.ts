import { Component }    from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { AuthenticationService } from '../authentication.service';

@Component
({
    selector:    'cnstll-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls:   ['./login-dialog.component.scss']
})
export class LoginDialogComponent
{
    public message: string;
    public loading: boolean;

    public constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private authenticationService: AuthenticationService)
    {
        this.message = null;
        this.loading = false;
    }

    public doLogin(username: string, password: string): void
    {
        this.loading = true;

        this.authenticationService.authenticate(username, password)
            .then(username => this.authenticationSuccess(username))
            .catch(error => this.authenticationFailed(error));
    }

    private authenticationSuccess(username: string): void
    {
        this.loading = false;

        if (username !== null)
            this.dialogRef.close(username);
        else
            this.message = 'Authentication failed.';
    }

    private authenticationFailed(error: any): void
    {
        this.loading  = false;

        this.message = error;
    }
}
