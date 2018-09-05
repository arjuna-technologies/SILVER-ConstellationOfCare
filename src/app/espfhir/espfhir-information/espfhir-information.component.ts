import { Component } from '@angular/core';

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

    public doLoadInformation(identifier: string): void
    {
        console.log('doLoadInformation: ' + identifier);
        if (identifier != null)
        {
            this.loading     = true;
            this.information = null;
            this.espfhirDataService.loadESPFHIRPatientInformation(identifier)
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
