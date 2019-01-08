import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

const CONSENT_TYPE_MIG_DEMO = "351ece5c-0e37-4c3f-bf17-3620a4bc71f9";
const CONSTRAINT_ID_ORGANISATION = "0079f42a-cae6-4e8e-baf2-a8029fbade8e";
const CONSTRAINT_ID_PURPOSE = "f1eb0b9d-ecce-41ee-abef-451eb6813d56";
const CONSTRAINT_VALUE_NEWCASTLE = "f723fe82-b086-4cc7-86ab-9973c43a1a34";
const CONSTRAINT_VALUE_GATESHEAD = "40e9fe7b-70d9-419a-beba-ff8dec8d4667";
const CONSTRAINT_VALUE_PURPOSE_OF_CARE = "4b35a9ac-5599-4487-b50a-daac60e0442a";

// This is where the organisation, purpose and consent type can be configured:
const ORGANISATION_TO_USE = CONSTRAINT_VALUE_NEWCASTLE;
const PURPOSE_TO_USE = CONSTRAINT_VALUE_PURPOSE_OF_CARE;
const CONSENT_TYPE_TO_USE = CONSENT_TYPE_MIG_DEMO;
const CONSENT_NAME_TO_USE = "SILVER Family Data Interface Consent";

@Injectable({
  providedIn: 'root'
})

export class ConsentsService {

  constructor(private httpClient: HttpClient) { }

  private generatePseudoUniqueId(): string {
    return (1000000000 *  Math.random()).toString(16);
  }

  private createConsentContextPayload(nhsNumber:string, consentName:string, consentContextId:string, consentId: string): any {
    let now = (new Date()).toISOString();
    let payload = {
      consent_id: consentId,
      consenter_id: nhsNumber,
      created_date: now,
      id: consentContextId,
      last_modified_date: now,
      name: consentName
    };
    return payload;
  }

  private createConsentPayload(consentId: string): any {
    let payload = {
      constraints: [
            {id: CONSTRAINT_ID_ORGANISATION, value: ORGANISATION_TO_USE},
            {id: CONSTRAINT_ID_PURPOSE, value: PURPOSE_TO_USE}],
      id: consentId,
      type_id: CONSENT_TYPE_TO_USE
    };
    return payload;
  }

  // creates both the consent context and the consent
  public createConsentRecord(nhsNumber: string): Promise<any> {
    let consentName = CONSENT_NAME_TO_USE;
    let consentId = this.generatePseudoUniqueId();
    let consentContextId = this.generatePseudoUniqueId();
    console.log('about to create consent for',nhsNumber,' with id ',consentId);
    let parentThis = this;
    return this.createConsent(nhsNumber,consentId).then(
      (consentResponse) =>
        return this.createConsentContext(nhsNumber,consentName,consentContextId,consentId).then(
          (consentContextResponse) => {
            console.log('successfully created context');
            console.log(consentContextResponse);
          }));
  }

  private createConsentContext(nhsNumber: string, consentName: string, consentContextId:string, consentId:string): Promise<any>
  {
    let payload = this.createConsentContextPayload(nhsNumber,consentName,consentContextId,consentId);
    return this.httpClient.post('http://consentservice.silver.arjuna.com/consentengine/ws/consentcontextdef/consentcontext/' + consentContextId, payload)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(nhsNumber, response)))
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  private createConsent(nhsNumber: string, consentId: string): Promise<any>
  {
    console.log('debug consent create');
    let payload = this.createConsentPayload(consentId);
    return this.httpClient.post('http://consentservice.silver.arjuna.com/consentengine/ws/consentdef/consent/' + consentId, payload)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(nhsNumber, response)))
      .then(() => Promise.resolve(this.successHandler(nhsNumber, 'no response')))
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  public listConsentContexts(nhsNumber: string): Promise<any>
  {
    return this.httpClient.get('http://consentservice.silver.arjuna.com/consentengine/ws/consentcontextdef/consentcontexts?consenterid=' + nhsNumber)
      .toPromise()
      .then((listOfConsentContexts: any) => {
        console.log(listOfConsentContexts);
      })
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  private successHandler(nhsNumber: string, response: any): any {
    return {
      nhsNumber: nhsNumber,
      response: response
    }
  }

  private errorHandler(nhsNumber: string, error: any): any
  {
    return {
      nhsNumber: nhsNumber,
      response: error
    }
  }

}

