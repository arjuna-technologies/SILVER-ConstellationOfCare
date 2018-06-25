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
        if (nhsNumber != null)
        {
             this.loading     = true;
             this.information = null;
             this.dataService.loadMIGInformation(nhsNumber)
                .then((migInformation: MIGInformation) => this.doLoadInformationSuccessHandler(migInformation))
                .catch((error) => this.doLoadInformationErrorHandler(error));
        }
        else
        {
            this.loading     = false;
            this.information = null;
        }
    }

    private doLoadInformationSuccessHandler(migInformation: MIGInformation)
    {
        this.information = migInformation;
        this.loading     = false;
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;
    }
}
