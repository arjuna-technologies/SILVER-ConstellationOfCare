import { Component, ViewChild } from '@angular/core';
import { MatDrawer }            from '@angular/material/sidenav';
import { MatDialog }            from '@angular/material';

import { LoginDialogComponent }           from './login-dialog/login-dialog.component';
import { MIGPatientTraceDialogComponent } from './mig/mig-patienttrace-dialog/mig-patienttrace-dialog.component';
import { FamilyComponent }                from './family/family/family.component';
import { MIGInformationComponent }        from './mig/mig-information/mig-information.component';

import { MIGDataService } from './mig/mig-data.service';

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

    public requestTypes:    any[];
    public requestTypeCode: string;

    public constructor(private dialog: MatDialog)
    {
        this.username    = '';
        this.org         = '';
        this.group       = '';
        this.showSideBar = false;

        this.requestTypeCode = MIGDataService.ALLGPDATA_REQUEST_NAME;
        this.requestTypes    =
        [
            { code: MIGDataService.ALLGPDATA_REQUEST_NAME, label: 'All' },
            { code: MIGDataService.SUMMARY_REQUEST_NAME, label: 'Summarys' },
            { code: MIGDataService.PROBLEM_REQUEST_NAME, label: 'Problems' },
            { code: MIGDataService.DIAGNOSIS_REQUEST_NAME, label: 'Diagnoses' },
            { code: MIGDataService.MEDICATION_REQUEST_NAME, label: 'Medications' },
            { code: MIGDataService.RISKSWARNING_REQUEST_NAME, label: 'Risk Warnings' },
            { code: MIGDataService.PROCEDURE_REQUEST_NAME, label: 'Procedures' },
            { code: MIGDataService.INVESTIGATION_REQUEST_NAME, label: 'Investigations' },
            { code: MIGDataService.EXAMINATION_REQUEST_NAME, label: 'Examinations' },
            { code: MIGDataService.EVENT_REQUEST_NAME, label: 'Events' },
            { code: MIGDataService.PATIENTDETAIL_REQUEST_NAME, label: 'Patient Details' }
        ];
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
            this.migInformation.doLoadInformation(null, this.requestTypeCode);
        }
    }

    public doPatientSearch(): void
    {
        console.log('PatientSearch');
        const loginDialogRef = this.dialog.open(MIGPatientTraceDialogComponent);
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
