import { Injectable }                            from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { StorageInformation } from './storage-information';

const httpOptions =
{
    headers: new HttpHeaders
    ({
       'Content-Type': 'application/json'
    })
};

@Injectable()
export class StorageService
{
    constructor(private httpClient: HttpClient)
    {
    }

    public createInformation(id: string, value: any): Promise<StorageInformation>
    {
        return this.httpClient.post('https://chc-silver.ncl.ac.uk/storage/ws/storage/' + id, JSON.stringify(value), httpOptions)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.storageInformationSuccessHandler(response)))
                   .catch((error) => Promise.resolve(this.storageInformationErrorHandler(error)));
    }

    public readInformation(id: string): Promise<StorageInformation>
    {
        return this.httpClient.get('https://chc-silver.ncl.ac.uk/storage/ws/storage/' + id)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.storageInformationSuccessHandler(response)))
                   .catch((error) => Promise.resolve(this.storageInformationErrorHandler(error)));
    }

    public updateInformation(id: string, value: any): Promise<StorageInformation>
    {
        return this.httpClient.put('https://chc-silver.ncl.ac.uk/storage/ws/storage/' + id, JSON.stringify(value), httpOptions)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.storageInformationSuccessHandler(response)))
                   .catch((error) => Promise.resolve(this.storageInformationErrorHandler(error)));
    }

    public deleteInformation(id: string): Promise<StorageInformation>
    {
        return this.httpClient.delete('https://chc-silver.ncl.ac.uk/storage/ws/storage/' + id)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.storageInformationSuccessHandler(response)))
                   .catch((error) => Promise.resolve(this.storageInformationErrorHandler(error)));
    }

    private storageInformationSuccessHandler(body: any): StorageInformation
    {
        //console.log('body: ' + JSON.stringify(body));

        let outcome: string = body.outcome;
        let message: string = body.message;
        let content: any    = body.content;

        return new StorageInformation(outcome, message, content);
    }

    private storageInformationErrorHandler(error: any): StorageInformation
    {
        //console.log('Storage-Information Error Handler: ' + JSON.stringify(error));

        return new StorageInformation('Failed', 'Communication problem', null);
    }
}
