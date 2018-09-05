import { Injectable }               from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ESPFHIRResolution }  from './espfhir-resolution';
import { ESPFHIRInformation } from './espfhir-information';

import { ESPFHIREntry } from './espfhir-entry';

@Injectable()
export class ESPFHIRDataService
{
    constructor(private httpClient: HttpClient)
    {
    }

    public loadESPFHIRResolverPatient(nhsNumber: string): Promise<ESPFHIRResolution>
    {
        let nhsNumberURL = 'http:%2F%2Fwww.datadictionary.nhs.uk%2Fdata_dictionary%2Fattributes%2Fn%2Fnhs%2Fnhs_number_de.asp%7C' + nhsNumber;

        return this.httpClient.get('http://dataservice-mig.silver.arjuna.com/fhir/ws/espfhir/patientresolver?patientID=' + nhsNumberURL)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.loadESPFHIRResolverPatientSuccessHandler(nhsNumber, response)))
                   .catch((error) => Promise.resolve(this.loadESPFHIRResolverPatientErrorHandler(nhsNumber, error)));
    }

    public loadESPFHIRPatientInformation(patientId: string): Promise<ESPFHIRInformation>
    {
        return this.httpClient.get('http://dataservice-mig.silver.arjuna.com/fhir/ws/espfhir/obtainpatientinfo?nhs_number=' + patientId)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.loadESPFHIRPatientInformationSuccessHandler(patientId, response)))
                   .catch((error) => Promise.resolve(this.loadESPFHIRPatientInformationErrorHandler(patientId, error)));
    }

    private loadESPFHIRResolverPatientSuccessHandler(nhsNumber: string, body: any): ESPFHIRResolution
    {
        if (body.entry && (body.entry.length != 0))
        {
            let espfhirEntries: ESPFHIREntry[] = [];
            if (body.entry)
                for (let entry of body.entry)
                    espfhirEntries.push(new ESPFHIREntry(entry.id, entry.content.identifier, entry.content.name, entry.content.address, entry.content.telecom, entry.content.gender, entry.content.birthDate, entry.updated));

            return new ESPFHIRResolution(nhsNumber, 'Success', espfhirEntries);
        }
        else
            return new ESPFHIRResolution(nhsNumber, 'Empty', []);
    }

    private loadESPFHIRResolverPatientErrorHandler(nhsNumber: string, error: any): ESPFHIRResolution
    {
//        console.log('loadESPFHIRResolverPatientErrorHandler - error: ' + JSON.stringify(error));

        return new ESPFHIRResolution(nhsNumber, 'Failed', []);
    }

    private loadESPFHIRPatientInformationSuccessHandler(patientId: string, body: any): ESPFHIRInformation
    {
//        console.log('loadESPFHIRPatientInformationSuccessHandler - body: ' + JSON.stringify(body));

        return new ESPFHIRInformation(patientId, 'Success', JSON.stringify(body));
    }

    private loadESPFHIRPatientInformationErrorHandler(patientId: string, error: any): ESPFHIRInformation
    {
//        console.log('loadESPFHIRPatientInformationErrorHandler - error: ' + JSON.stringify(error));

        return new ESPFHIRInformation(patientId, 'Failed', '');
    }
}
