import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Family }               from './family';
import { Person }               from './person';

import { DataService } from './data.service';

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

    public family:        Family;
    public familyLoading: boolean;

    public constructor(private dataService: DataService, private dialog: MatDialog)
    {
        this.username    = '';
        this.showSideBar = false;

        this.family        = new Family([]);
        this.familyLoading = false;
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
        }
    }

    public doLoadFamily(familyId: string): void
    {
        this.family        = new Family([]);
        this.familyLoading = true;

        this.dataService.loadFamily(familyId)
            .then(family => this.loadFamilySuccess(family))
            .catch(error => this.loadFamilyFailed(error));
    }

    private processAfterClose(username: string): void
    {
        if (username && (username !== ''))
        {
            this.username = username;
        }
        else
        {
            this.username = '';
        }
    }

    private loadFamilySuccess(family: Family): void
    {
        this.family        = family;
        this.familyLoading = false;
    }

    private loadFamilyFailed(error: any): void
    {
         this.family        = new Family([]);
         this.familyLoading = false;
    }
}
