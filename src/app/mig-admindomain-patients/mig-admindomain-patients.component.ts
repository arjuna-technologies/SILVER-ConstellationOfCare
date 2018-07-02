import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGPatient }    from '../mig-patient';
import { MIGPerson }     from '../mig-person';
import { MIGUser }       from '../mig-user';
import { MIGRole }       from '../mig-role';
import { MIGUserInRole } from '../mig-userinrole';

@Component
({
    selector:    'cnstll-mig-admindomain-patients',
    templateUrl: './mig-admindomain-patients.component.html',
    styleUrls:   ['./mig-admindomain-patients.component.scss']
})
export class MIGAdminDomainPatientsComponent implements OnChanges, DoCheck
{
    public patientDisplayedColumns: string[];
    public patientDataSource: MatTableDataSource<MIGPatient>;

    @Input()
    public patients: MIGPatient[];
    @Input()
    public format: string;

    @ViewChild('patientPaginator')
    public patientPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.patientDisplayedColumns = ['id', 'patientIdentifiers', 'patientPerson', 'spokenLanguage', 'spokenLanguageIsoCode', 'registeredGPUserInRole', 'usualGPUserInRole', 'caseloadPatients'];
        this.patientDataSource       = new MatTableDataSource();
        this.patientDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.patientDisplayedColumns = ['id', 'patientIdentifiers', 'patientPerson', 'spokenLanguage', 'spokenLanguageIsoCode', 'registeredGPUserInRole', 'usualGPUserInRole', 'caseloadPatients'];
        else
            this.patientDisplayedColumns = ['patientIdentifiers', 'mappedPatientPerson', 'spokenLanguage', 'spokenLanguageIsoCode', 'mappedRegisteredGPUserInRole', 'mappedUsualGPUserInRole', 'caseloadPatients'];

        if (this.patients)
            this.patientDataSource.data = this.patients;
        else
            this.patientDataSource.data = null;

        if (this.patientDataSource.paginator)
            this.patientDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.patientDataSource.paginator != this.patientPaginator)
        {
            this.patientDataSource.paginator = this.patientPaginator;
            this.patientDataSource.paginator.firstPage();
        }
    }

    public personMapping(personId: string): string
    {
        return this.migInformationIndexService.basicPersonMapping(personId);
    }

    public userMapping(userId: string): string
    {
        return this.migInformationIndexService.basicUserMapping(userId);
    }

    public roleMapping(roleId: string): string
    {
        return this.migInformationIndexService.basicRoleMapping(roleId);
    }

    public userInRoleMapping(userInRoleId: string): string
    {
        return this.migInformationIndexService.basicUserInRoleMapping(userInRoleId);
    }
}
