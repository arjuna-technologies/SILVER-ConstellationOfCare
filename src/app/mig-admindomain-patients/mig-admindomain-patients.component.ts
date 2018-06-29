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
        let person: MIGPerson = this.migInformationIndexService.personMap.get(personId);

        if (person)
            return person.title + ' ' + person.forenames + ' ' + person.surname;
        else
            return '';
    }

    public userMapping(userId: string): string
    {
        let user: MIGUser = this.migInformationIndexService.userMap.get(userId);

        if (user)
            return this.personMapping(user.userPerson);
        else
            return '';
    }

    public roleMapping(roleId: string): string
    {
        let role: MIGRole = this.migInformationIndexService.roleMap.get(roleId);

        if (role)
            return role.name;
        else
            return '';
    }

    public userInRoleMapping(userInRoleId: string): string
    {
        let userInRole: MIGUserInRole = this.migInformationIndexService.userInRoleMap.get(userInRoleId);

        if (userInRole)
            return this.userMapping(userInRole.user) + ' - ' + this.roleMapping(userInRole.role);
        else
            return '';
    }
}
