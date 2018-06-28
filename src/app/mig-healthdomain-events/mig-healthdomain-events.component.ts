import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }     from '@angular/material';

import { MIGEvent } from '../mig-event';

@Component
({
    selector:    'cnstll-mig-healthdomain-events',
    templateUrl: './mig-healthdomain-events.component.html',
    styleUrls:   ['./mig-healthdomain-events.component.scss']
})
export class MIGHealthDomainEventsComponent implements OnChanges, DoCheck
{
    public eventDisplayedColumns = ['id', 'patient', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'authorisingUserInRole', 'enteredByUserInRole', 'code', 'displayTerm', 'organisation', 'observation'];
    public eventDataSource: MatTableDataSource<MIGEvent>;

    @Input()
    public events: MIGEvent[];
    @Input()
    public format: string;

    @ViewChild('eventPaginator')
    public eventPaginator: MatPaginator;

    public constructor()
    {
        this.eventDataSource      = new MatTableDataSource();
        this.eventDataSource.data = null;
    }

    public ngOnChanges(): void
    {
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
}
