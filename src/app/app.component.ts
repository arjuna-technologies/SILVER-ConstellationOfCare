import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Family }               from './family';
import { Person }               from './person';

@Component
({
    selector:    'cnstll-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss']
})
export class AppComponent
{
    public username:    String;
    public showSideBar: boolean;

    public constructor(private dialog: MatDialog)
    {
        this.username    = '';
        this.showSideBar = false;
    }

    public doOpenLoginDialog(): void
    {
        if (this.username === '')
        {
            const loginDialogRef = this.dialog.open(LoginDialogComponent);
            loginDialogRef.afterClosed().subscribe((username) => this.processAfterClose(username));
        }
        else
            this.username = '';
    }

    private processAfterClose(username: string): void
    {
        if (username && (username !== ''))
            this.username = username;
        else
            this.username = '';
    }
}
