import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FamilyComponent } from './family/family/family.component';
import { MIGInformationComponent } from './mig/mig-information/mig-information.component';

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

    @ViewChild('familiesdrawer')
    public familiesDrawer: MatDrawer;
    @ViewChild('family')
    public family: FamilyComponent;
    @ViewChild('miginformation')
    public migInformation: MIGInformationComponent;

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

            this.familiesDrawer.close();
            this.family.doShowFamily(null);
            this.migInformation.doLoadInformation(null);
        }
    }

    private processAfterClose(username: string): void
    {
        if (username && (username !== ''))
        {
            this.username = username;
            this.org      = 'Newcastle City Council';
            this.group    = 'Family Early Help';
            this.showSideBar = true;
            this.familiesDrawer.toggle();
        }
        else
        {
            this.username = '';
            this.org      = '';
            this.group    = '';
            this.showSideBar = false;
        }
    }
}
