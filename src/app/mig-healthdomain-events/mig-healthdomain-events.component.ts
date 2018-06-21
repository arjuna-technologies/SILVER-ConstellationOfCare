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

    @ViewChild('eventPaginator')
    public eventPaginator: MatPaginator;

    public constructor()
    {
        console.log('MIG_HD-Events - constructor');

        this.eventDataSource      = new MatTableDataSource();
        this.eventDataSource.data = [];
    }

    public ngOnChanges(): void
    {
        console.log('MIG_HD-Events - onChanges');

        if (this.events)
        {
            console.log('MIG_HD-Events - update data ' + JSON.stringify(this.events));

            if (this.eventDataSource.paginator)
                this.eventDataSource.paginator.firstPage();

            this.eventDataSource.data = this.events;
        }
        else
        {
            console.log('MIG_HD-Events - clear data');
            this.eventDataSource.data = [];
        }
    }

    public ngDoCheck(): void
    {
        console.log('MIG_HD-Events - doCheck');

        if (this.eventDataSource.paginator != this.eventPaginator)
        {
            console.log('MIG_HD-Events - set paginator');
            this.eventDataSource.paginator = this.eventPaginator;
        }
    }
}
