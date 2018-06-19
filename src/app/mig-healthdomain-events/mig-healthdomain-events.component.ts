import { Component, DoCheck, ViewChild }    from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MIGEvent } from '../mig-event';

@Component
({
    selector:    'cnstll-mig-healthdomain-events',
    templateUrl: './mig-healthdomain-events.component.html',
    styleUrls:   ['./mig-healthdomain-events.component.scss']
})
export class MIGHealthDomainEventsComponent implements DoCheck
{
    public eventDisplayedColumns = ['id', 'patient', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'authorisingUserInRole', 'enteredByUserInRole', 'code', 'displayTerm', 'organisation', 'observation'];
    public eventDataSource: MatTableDataSource<MIGEvent>;

    @ViewChild('eventPaginator')
    public eventPaginator: MatPaginator;

    public constructor()
    {
        this.eventDataSource = new MatTableDataSource();
    }

    public ngDoCheck(): void
    {
        if (this.eventDataSource.paginator != this.eventPaginator)
            this.eventDataSource.paginator = this.eventPaginator;
    }
}
