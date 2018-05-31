import { Component, DoCheck, ViewChild }     from '@angular/core';
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

    public displayedColumns = ['id', 'patient', 'eventType', 'effectiveTime', 'availabilityTimeStamp', 'availabilityUserInRole', 'enteredByUserInRole', 'code', 'displayTerm', 'organisation', 'observation'];
    public dataSource       = new MatTableDataSource();

    @ViewChild('paginator')
    public paginator: MatPaginator;

    public constructor(private dataService: DataService)
    {
        this.information = null;
        this.loading     = false;

        this.dataSource = new MatTableDataSource();
    }

    public ngDoCheck(): void
    {
        if (this.dataSource.paginator != this.paginator)
            this.dataSource.paginator = this.paginator;
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

        if (this.information && this.information.events)
            this.dataSource.data = this.information.events;
        else
            this.dataSource.data = null;
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;

        this.dataSource.data = null;
    }
}
