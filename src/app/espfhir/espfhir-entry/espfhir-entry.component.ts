import { Component, Input } from '@angular/core';

import { ESPFHIREntry } from '../espfhir-entry';

@Component
({
    selector:    'cnstll-espfhir-entry',
    templateUrl: './espfhir-entry.component.html',
    styleUrls:   ['./espfhir-entry.component.scss']
})
export class ESPFHIREntryComponent
{
    @Input()
    public entry: ESPFHIREntry;

    constructor()
    {
    }
}
