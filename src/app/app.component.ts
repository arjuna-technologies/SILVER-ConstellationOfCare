import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component
({
    selector:    'cnstll-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss']
})
export class AppComponent
{
    public username:     string;
    public org:          string;
    public group:        string;
    public showSideBar:  boolean;

    public constructor(private dialog: MatDialog)
    {
        this.username    = '';
        this.org         = '';
        this.group       = '';
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
        {
            this.username = '';
            this.org      = '';
            this.group    = '';
        }
    }

    private processAfterClose(username: string): void
    {
        if (username && (username !== ''))
        {
            this.username = username;
            this.org      = 'Newcastle City Council';
            this.group    = 'Family Early Help';
        }
        else
        {
            this.username = '';
            this.org      = '';
            this.group    = '';
        }
    }
}
