import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConsentsService} from './consents.service';

@Injectable({
  providedIn: 'root'
})

export class HasConsentsService {

  constructor(private httpClient: HttpClient,private consentsService:ConsentsService) {
  }

  public hasConsents(nhsNumber: string): Promise<any> {
    return this.httpClient.get('http://dataservice-mig.silver.arjuna.com/data/ws/mig/hasconsents?nhs_number=' + nhsNumber)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(nhsNumber, response)))
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  public hasConsentForThisCase(nhsNumber: string, caseID: string) : Promise<any> {
    return this.consentsService.checkIfConsentedForThisCase(nhsNumber, caseID)
      .then((response: boolean) => Promise.resolve(this.successHandlerForCaseCheck(nhsNumber,caseID,response)))
      .catch((error) => Promise.resolve(this.errorHandlerForCaseCheck(nhsNumber, caseID, error)));
  }

  private successHandler(nhsNumber: string, response: any): any {
    return {
      nhsNumber: nhsNumber,
      status: response.status,
      hasConsents: response.hasConsents.toString()
    }
  }

  private successHandlerForCaseCheck(nhsNumber: string, caseID: string, response: any): any {
    return {
      nhsNumber: nhsNumber,
      caseID: caseID,
      status: 'success',
      hasConsents: response.toString()
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

  private errorHandlerForCaseCheck(nhsNumber: string, caseID:string, error: any): any {
    return {
      nhsNumber: nhsNumber,
      caseID: caseID,
      status: 'error',
      hasConsents: 'unknown',
      error: error
    }
  }

}
