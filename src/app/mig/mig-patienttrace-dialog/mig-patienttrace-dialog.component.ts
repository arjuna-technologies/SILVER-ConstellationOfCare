import { Component }    from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { MIGDataService } from '../mig-data.service';

@Component
({
    selector:    'cnstll-mig-patienttrace-dialog',
    templateUrl: './mig-patienttrace-dialog.component.html',
    styleUrls:   ['./mig-patienttrace-dialog.component.scss']
})
export class MIGPatientTraceDialogComponent
{
    public message: string;
    public loading: boolean;

    public constructor(public dialogRef: MatDialogRef<MIGPatientTraceDialogComponent>, private migDataService: MIGDataService)
    {
        this.message = null;
        this.loading = false;
    }

    public doLogin(givenname: string, familyname: string): void
    {
        this.loading = true;

        this.migDataService.loadMIGPatientTrace(givenname, familyname, null, null, null, null)
            .then(patientTrace => this.authenticationSuccess(patientTrace))
            .catch(error => this.authenticationFailed(error));
    }

    private authenticationSuccess(patientTrace: any): void
    {
        this.loading = false;

        if (patientTrace !== null)
            this.dialogRef.close();
        else
            this.message = 'Search failed.';
    }

    private authenticationFailed(error: any): void
    {
        this.loading  = false;

        this.message = error;
    }
}
