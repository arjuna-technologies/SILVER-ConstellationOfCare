import { ESPFHIREntry } from './espfhir-entry';

export class ESPFHIRResolution
{
    public nhsNumber: string;
    public status:    string;

    public entries: ESPFHIREntry[];

    public constructor(nhsNumber: string, status: string, entries: ESPFHIREntry[])
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;

        this.entries = entries;
    }
}
