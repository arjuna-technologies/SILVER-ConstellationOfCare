import { Component, ViewChild }             from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MIGDataService }             from '../mig-data.service';
import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-information',
    templateUrl: './mig-information.component.html',
    styleUrls:   ['./mig-information.component.scss']
})
export class MIGInformationComponent
{
    public information: MIGInformation;
    public format:      string;
    public loading:     boolean;

    public constructor(private migDataService: MIGDataService, private migInformationIndexService: MIGInformationIndexService)
    {
        this.information = null;
        this.format      = 'friendlier';
        this.loading     = false;
    }

    public doLoadInformation(nhsNumber: string)
    {
        if (nhsNumber != null)
        {
            this.loading     = true;
            this.information = null;
            this.migDataService.loadMIGInformation(nhsNumber)
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

        this.migInformationIndexService.createIndexes(migInformation);
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;

        this.migInformationIndexService.createIndexes(null);
    }
}
