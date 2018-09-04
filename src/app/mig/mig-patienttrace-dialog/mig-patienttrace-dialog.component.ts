import { Component }               from '@angular/core';
import { MatDialogRef }            from '@angular/material';

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

    public constructor(public dialogRef: MatDialogRef<MIGPatientTraceDialogComponent>, private migDataService: MIGDataService)
    {
        this.message = null;
        this.loading = false;

        this.givenName   = '';
        this.familyName  = '';
        this.gender      = 'Unknown';
        this.dateOfBirth = new Date();
    }

    public doPatientTrace(): void
    {
        this.loading = true;

        this.migDataService.loadMIGPatientTrace(this.givenName, this.familyName, this.gender, String(this.dateOfBirth.getDate()), String(this.dateOfBirth.getMonth() + 1), String(this.dateOfBirth.getFullYear()))
                           .then(patientTrace => this.migPatientTraceSuccess(patientTrace))
                           .catch(error => this.migPatientTraceFailed(error));
    }

    private migPatientTraceSuccess(patientTrace: any): void
    {
        this.loading = false;

        console.log();

        if (patientTrace !== null)
        {
        }
        else
            this.message = 'Search failed.';
    }

    private migPatientTraceFailed(error: any): void
    {
        this.loading  = false;

        this.message = error;
    }
}
