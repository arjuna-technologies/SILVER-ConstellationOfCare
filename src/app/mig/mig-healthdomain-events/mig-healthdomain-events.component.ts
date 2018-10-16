import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }     from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGEvent } from '../mig-event';

@Component
({
    selector:    'cnstll-mig-healthdomain-events',
    templateUrl: './mig-healthdomain-events.component.html',
    styleUrls:   ['./mig-healthdomain-events.component.scss']
})
export class MIGHealthDomainEventsComponent implements OnChanges, DoCheck
{
    public eventDisplayedColumns: string[];
    public eventDataSource: MatTableDataSource<MIGEvent>;

    @Input()
    public events: MIGEvent[];
    @Input()
    public format: string;

    @ViewChild('eventPaginator')
    public eventPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.eventDisplayedColumns = ['id', 'patient', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'authorisingUserInRole', 'enteredByUserInRole', 'code', 'displayTerm', 'organisation', 'observation'];
        this.eventDataSource       = new MatTableDataSource();
        this.eventDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
          this.eventDisplayedColumns = ['id', 'patient', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'authorisingUserInRole', 'enteredByUserInRole', 'code', 'displayTerm', 'organisation', 'observation'];
        else
            this.eventDisplayedColumns = [/*'mappedPatient',*/ 'displayTerm', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'mappedAuthorisingUserInRole', 'mappedEnteredByUserInRole',  'mappedOrganisation'];

        if (this.events)
            this.eventDataSource.data = this.events;
        else
            this.eventDataSource.data = null;

        if (this.eventDataSource.paginator)
            this.eventDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.eventDataSource.paginator != this.eventPaginator)
        {
            this.eventDataSource.paginator = this.eventPaginator;
            this.eventDataSource.paginator.firstPage();
        }
    }

    public patientMapping(patientId: string): string
    {
        return this.migInformationIndexService.basicPatientMapping(patientId);
    }

    public organisationMapping(organisationId: string): string
    {
        return this.migInformationIndexService.basicOrganisationMapping(organisationId);
    }

    public userInRoleMapping(userInRoleId: string): string
    {
        return this.migInformationIndexService.basicUserInRoleMapping(userInRoleId);
    }
}
