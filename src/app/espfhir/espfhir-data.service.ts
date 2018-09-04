import { Injectable }               from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ESPFHIRInformation } from './espfhir-information';

@Injectable()
export class ESPFHIRDataService
{
    constructor(private httpClient: HttpClient)
    {
    }

    public loadESPFHIRResolverPatient(nhsNumber: string): Promise<ESPFHIRInformation>
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

    private loadESPFHIRResolverPatientSuccessHandler(nhsNumber: string, body: any): ESPFHIRInformation
    {
        let status: string = body.status;

        console.log('loadESPFHIRResolverPatientSuccessHandler - body: ' + JSON.stringify(body));

        return new ESPFHIRInformation(nhsNumber, status);
    }

    private loadESPFHIRResolverPatientErrorHandler(nhsNumber: string, error: any): ESPFHIRInformation
    {
        console.log('loadESPFHIRResolverPatientErrorHandler - error: ' + JSON.stringify(error));

        return new ESPFHIRInformation(nhsNumber, 'Failed');
    }

    private loadESPFHIRPatientInformationSuccessHandler(patientId: string, body: any): ESPFHIRInformation
    {
        let status: string = body.status;

        console.log('loadESPFHIRPatientInformationSuccessHandler - body: ' + JSON.stringify(body));

        return new ESPFHIRInformation(patientId, status);
    }

    private loadESPFHIRPatientInformationErrorHandler(patientId: string, error: any): ESPFHIRInformation
    {
        console.log('loadESPFHIRPatientInformationErrorHandler - error: ' + JSON.stringify(error));

        return new ESPFHIRInformation(patientId, 'Failed');
    }
}
