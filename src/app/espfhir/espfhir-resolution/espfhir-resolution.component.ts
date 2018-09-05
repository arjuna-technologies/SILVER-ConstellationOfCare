import { Component, Output, EventEmitter} from '@angular/core';

import { ESPFHIRDataService } from '../espfhir-data.service';

import { ESPFHIRResolution } from '../espfhir-resolution';

@Component
({
    selector:    'cnstll-espfhir-resolution',
    templateUrl: './espfhir-resolution.component.html',
    styleUrls:   ['./espfhir-resolution.component.scss']
})
export class ESPFHIRResolutionComponent
{
    public resolution: ESPFHIRResolution;
    public loading:    boolean;

    @Output()
    public loadedIdentifier: EventEmitter<string>;

    public constructor(private espfhirDataService: ESPFHIRDataService)
    {
        this.resolution = null;
        this.loading    = false;

        this.loadedIdentifier = new EventEmitter<string>();
    }

    public doLoadResolution(nhsNumber: string)
    {
        if (nhsNumber != null)
        {
            this.loading    = true;
            this.resolution = null;
            this.espfhirDataService.loadESPFHIRResolverPatient(nhsNumber)
                .then((espfhirResolution: ESPFHIRResolution) => this.doLoadResolutionSuccessHandler(espfhirResolution))
                .catch((error) => this.doLoadResolutionErrorHandler(error));
        }
        else
        {
            this.loading    = false;
            this.resolution = null;

            this.loadedIdentifier.emit(null);
        }
    }

    private doLoadResolutionSuccessHandler(espfhirResolution: ESPFHIRResolution)
    {
        this.resolution = espfhirResolution;
        this.loading    = false;

        if (espfhirResolution && espfhirResolution.entries && espfhirResolution.entries[0] && espfhirResolution.entries[0].id)
            this.loadedIdentifier.emit(espfhirResolution.entries[0].id);
        else
            this.loadedIdentifier.emit(null);
    }

    private doLoadResolutionErrorHandler(error: any)
    {
        this.resolution = null;
        this.loading    = false;

        this.loadedIdentifier.emit(null);
    }
}
