import { Component }               from '@angular/core';
import { MatDialogRef }            from '@angular/material';

import { MIGPatientTrace } from '../mig-patienttrace';

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

    public givenName:   string;
    public familyName:  string;
    public gender:      string;
    public dateOfBirth: Date;

    public patientTrace: MIGPatientTrace;

    public constructor(public dialogRef: MatDialogRef<MIGPatientTraceDialogComponent>, private migDataService: MIGDataService)
    {
        this.message = null;
        this.loading = false;

        this.givenName   = '';
        this.familyName  = '';
        this.gender      = 'Unknown';
        this.dateOfBirth = new Date();

        this.patientTrace = null;
    }

    public doPatientTrace(): void
    {
        this.loading = true;

        this.migDataService.loadMIGPatientTrace(this.givenName, this.familyName, this.gender, String(this.dateOfBirth.getDate()), String(this.dateOfBirth.getMonth() + 1), String(this.dateOfBirth.getFullYear()))
                           .then(patientTrace => this.migPatientTraceSuccess(patientTrace))
                           .catch(error => this.migPatientTraceFailed(error));
    }

    private migPatientTraceSuccess(patientTrace: MIGPatientTrace): void
    {
        this.loading = false;

        if (patientTrace !== null)
            this.patientTrace = patientTrace;
        else
            this.message = patientTrace.status;
    }

    private migPatientTraceFailed(error: MIGPatientTrace): void
    {
        this.loading  = false;

        this.message = error.status;
    }
}
