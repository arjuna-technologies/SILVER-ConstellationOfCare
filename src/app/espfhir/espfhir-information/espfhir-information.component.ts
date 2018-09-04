import { Component, ViewChild }             from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { ESPFHIRDataService } from '../espfhir-data.service';

import { ESPFHIRInformation } from '../espfhir-information';

@Component
({
    selector:    'cnstll-espfhir-information',
    templateUrl: './espfhir-information.component.html',
    styleUrls:   ['./espfhir-information.component.scss']
})
export class ESPFHIRInformationComponent
{
    public information: ESPFHIRInformation;
    public loading:     boolean;

    public constructor(private espfhirDataService: ESPFHIRDataService)
    {
        this.information = null;
        this.loading     = false;
    }

    public doLoadInformation(nhsNumber: string)
    {
        console.log('doLoadInformation: ' + nhsNumber);
        if (nhsNumber != null)
        {
            this.loading     = true;
            this.information = null;
            this.espfhirDataService.loadESPFHIRResolverPatient(nhsNumber)
                .then((espfhirInformation: ESPFHIRInformation) => this.doLoadInformationSuccessHandler(espfhirInformation))
                .catch((error) => this.doLoadInformationErrorHandler(error));
        }
        else
        {
            this.loading     = false;
            this.information = null;
        }
    }

    private doLoadInformationSuccessHandler(espfhirInformation: ESPFHIRInformation)
    {
        this.information = espfhirInformation;
        this.loading     = false;
    }

    private doLoadInformationErrorHandler(error: any)
    {
        this.information = null;
        this.loading     = false;
    }
}
