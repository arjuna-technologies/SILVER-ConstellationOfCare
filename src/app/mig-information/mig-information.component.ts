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

    public constructor(private dataService: DataService)
    {
        this.information = null;
        this.loading     = false;
    }

    public ngDoCheck(): void
    {
    }

    public doLoadInformation(nhsNumber: string)
    {
        this.loading     = true;
        this.information = null;
        this.dataService.loadMIGInformation(nhsNumber)
            .then((migInformation: MIGInformation) => this.doLoadInformationSuccessHandler(migInformation))
            .catch((error) => this.doLoadInformationErrorHandler(error));
    }

    private doLoadInformationSuccessHandler(migInformation: MIGInformation)
    {
        this.information = migInformation;
        this.loading     = false;
/*
        if (this.encounterDataSource.paginator)
            this.encounterDataSource.paginator.firstPage();
        if (this.problemDataSource.paginator)
            this.problemDataSource.paginator.firstPage();
        if (this.eventDataSource.paginator)
            this.eventDataSource.paginator.firstPage();

        if (this.information)
        {
            if (this.information.encounters)
                this.encounterDataSource.data = this.information.encounters;
            else
                this.encounterDataSource.data = null;

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
            this.encounterDataSource.data = null;
            this.problemDataSource.data   = null;
            this.eventDataSource.data     = null;
        }
*/
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;
/*
        if (this.encounterDataSource.paginator)
            this.encounterDataSource.paginator.firstPage();
        if (this.problemDataSource.paginator)
            this.problemDataSource.paginator.firstPage();
        if (this.eventDataSource.paginator)
            this.eventDataSource.paginator.firstPage();

        this.encounterDataSource.data = null;
        this.problemDataSource.data   = null;
        this.eventDataSource.data     = null;
*/
    }
}
