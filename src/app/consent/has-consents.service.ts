import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HasConsentsService {

  constructor(private httpClient: HttpClient) {
  }

  public hasConsents(nhsNumber: string): Promise<any> {
    return this.httpClient.get('https://chc-silver.ncl.ac.uk/data/ws/mig/hasconsents?nhs_number=' + nhsNumber)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(nhsNumber, response)))
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  private successHandler(nhsNumber: string, response: any): any {
    return {
      nhsNumber: nhsNumber,
      status: response.status,
      hasConsents: response.hasConsents.toString()
    }
  }

  private errorHandler(nhsNumber: string, error: any): any {
    return {
      nhsNumber: nhsNumber,
      status: 'error',
      hasConsents: 'unknown',
      error: error
    }
  }

}
