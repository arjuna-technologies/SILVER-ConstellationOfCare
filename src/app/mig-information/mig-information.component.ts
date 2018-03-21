import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DataService } from '../data.service';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-information',
    templateUrl: './mig-information.component.html',
    styleUrls:   ['./mig-information.component.scss']
})
export class MIGInformationComponent implements OnInit
{
    public information: MIGInformation;
    public loading:     boolean;

    public displayedColumns = ['displayTerm', 'eventType', 'effectiveTime'];
    public dataSource       = new MatTableDataSource();

    public length:          number;
    public pageIndex:       number;
    public pageSize:        number;
    public pageSizeOptions: number[]

    public constructor(private dataService: DataService)
    {
        this.information = null;
        this.loading     = false;

        this.dataSource = new MatTableDataSource();

        this.length          = 0;
        this.pageIndex       = 0;
        this.pageSize        = 10;
        this.pageSizeOptions = [5, 10, 20, 100];
    }

    public ngOnInit()
    {
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
        {
            this.dataSource = new MatTableDataSource(this.information.events);

            this.length    = 0;
            this.pageIndex = 0;
        }
        else
        {
            this.dataSource = new MatTableDataSource();

            this.length    = 0;
            this.pageIndex = 0;
        }
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;

        this.dataSource = new MatTableDataSource();

        this.length    = 0;
        this.pageIndex = 0;
    }
}
