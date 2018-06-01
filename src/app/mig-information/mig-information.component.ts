import { Component, DoCheck, ViewChild }    from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { DataService } from '../data.service';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-information',
    templateUrl: './mig-information.component.html',
    styleUrls:   ['./mig-information.component.scss']
})
export class MIGInformationComponent implements DoCheck
{
    public information: MIGInformation;
    public loading:     boolean;

    public problemDisplayedColumns = ['id', 'status', 'significance', 'expectedDuration', 'endTime'];
    public problemDataSource       = new MatTableDataSource();

    @ViewChild('problemPaginator')
    public problemPaginator: MatPaginator;

    public eventDisplayedColumns = ['id', 'patient', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'authorisingUserInRole', 'enteredByUserInRole', 'code', 'displayTerm', 'organisation', 'observation'];
    public eventDataSource       = new MatTableDataSource();

    @ViewChild('eventPaginator')
    public eventPaginator: MatPaginator;

    public constructor(private dataService: DataService)
    {
        this.information = null;
        this.loading     = false;

        this.problemDataSource = new MatTableDataSource();
        this.eventDataSource   = new MatTableDataSource();
    }

    public ngDoCheck(): void
    {
        if (this.problemDataSource.paginator != this.problemPaginator)
            this.problemDataSource.paginator = this.problemPaginator;

        if (this.eventDataSource.paginator != this.eventPaginator)
            this.eventDataSource.paginator = this.eventPaginator;
    }

    public doLoadInformation(nhsNumber: string)
    {
        this.loading = true;
        this.dataService.loadMIGInformation(nhsNumber)
            .then((migInformation: MIGInformation) => this.doLoadInformationSuccessHandler(migInformation))
            .catch((error) => this.doLoadInformationErrorHandler(error));
    }

    private doLoadInformationSuccessHandler(migInformation: MIGInformation)
    {
        this.information = migInformation;
        this.loading     = false;

        if (this.problemDataSource.paginator)
            this.problemDataSource.paginator.firstPage();
        if (this.eventDataSource.paginator)
            this.eventDataSource.paginator.firstPage();

        if (this.information)
        {
            if (this.information.problems)
                this.problemDataSource.data = this.information.problems;
            else
                this.problemDataSource.data = null;

            if (this.information.events)
                this.eventDataSource.data = this.information.events;
            else
                this.eventDataSource.data = null;
        }
        else
        {
            this.problemDataSource.data = null;
            this.eventDataSource.data   = null;
        }
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;

        if (this.problemDataSource.paginator)
            this.problemDataSource.paginator.firstPage();
        if (this.eventDataSource.paginator)
            this.eventDataSource.paginator.firstPage();

        this.problemDataSource.data = null;
        this.eventDataSource.data   = null;
    }
}
