import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
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

    @ViewChild('family')
    public family: FamilyComponent;
    @ViewChild('miginformation')
    public migInformation: MIGInformationComponent;

    public constructor(private dialog: MatDialog)
    {
        this.username    = '';
        this.org         = '';
        this.group       = '';
        this.doOpenLoginDialog();
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
        }
        else
        {
            this.username = '';
            this.org      = '';
            this.group    = '';
        }
    }
}
