import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

const CONSENT_TYPE_MIG_DEMO = "351ece5c-0e37-4c3f-bf17-3620a4bc71f9";
const CONSTRAINT_ID_ORGANISATION = "0079f42a-cae6-4e8e-baf2-a8029fbade8e";
const CONSTRAINT_ID_PURPOSE = "f1eb0b9d-ecce-41ee-abef-451eb6813d56";
const CONSTRAINT_VALUE_NEWCASTLE = "f723fe82-b086-4cc7-86ab-9973c43a1a34";
const CONSTRAINT_VALUE_GATESHEAD = "40e9fe7b-70d9-419a-beba-ff8dec8d4667";
const CONSTRAINT_VALUE_PURPOSE_OF_CARE = "4b35a9ac-5599-4487-b50a-daac60e0442a";

// Changing this will make it impossible (within this interface) to revoke consents entered under the old name.
const CONSENT_NAME_TO_USE = "SILVER Family Data Interface Consent";

// This is where the organisation, purpose and consent type can be configured:
const ORGANISATION_TO_USE = CONSTRAINT_VALUE_NEWCASTLE;
const PURPOSE_TO_USE = CONSTRAINT_VALUE_PURPOSE_OF_CARE;
const CONSENT_TYPE_TO_USE = CONSENT_TYPE_MIG_DEMO;

@Injectable({
  providedIn: 'root'
})

export class ConsentsService {

  private getConsentNameWithCaseID(caseID:string) {
    return `[${caseID}] ${CONSENT_NAME_TO_USE}`;
  }

  constructor(private httpClient: HttpClient) {
  }

  private generatePseudoUniqueId(): string {
    return (1000000000 * Math.random()).toString(16);
  }

  private createConsentContextPayload(nhsNumber: string, consentName: string, consentContextId: string, consentId: string): any {
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
  public createConsentRecord(nhsNumber: string,caseID: string): Promise<any> {
    let consentName = this.getConsentNameWithCaseID(caseID);
    let consentId = this.generatePseudoUniqueId();
    let consentContextId = this.generatePseudoUniqueId();
    let parentThis = this;
    return this.createConsent(nhsNumber, consentId).then(
      (consentResponse) => {
        return this.createConsentContext(nhsNumber, consentName, consentContextId, consentId).then(
          (consentContextResponse) => {
            //console.log('successfully created consent context');
          });
      });
  }

  // creates both the consent context and the consent
  public revokeConsentRecord(nhsNumber: string,caseID: string): Promise<any> {
    let consentName = this.getConsentNameWithCaseID(caseID);
    return this.listConsentContexts(nhsNumber).then(
      (listOfConsentContexts: any) => {
        if (listOfConsentContexts) {
          for (let consentContext of listOfConsentContexts) {
            let consentID = consentContext.consent_id;
            let consentContextID = consentContext.id;
            // delete consent context
            return this.deleteConsentContext(consentContextID).then(
              (deleteConsentContextResponse) => {
                return this.deleteConsent(consentID).then(
                  (deleteConsentResponse) => {
                    //console.log('successfully deleted consent');
                  }
                )
              }
            );
          }
        }
      }
    );
  }

  private createConsentContext(nhsNumber: string, consentName: string, consentContextId: string, consentId: string): Promise<any> {
    let payload = this.createConsentContextPayload(nhsNumber, consentName, consentContextId, consentId);
    return this.httpClient.post('http://consentservice.silver.arjuna.com/consentengine/ws/consentcontextdef/consentcontext/' + consentContextId, payload)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(nhsNumber, response)))
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  private createConsent(nhsNumber: string, consentId: string): Promise<any> {
    let payload = this.createConsentPayload(consentId);
    return this.httpClient.post('http://consentservice.silver.arjuna.com/consentengine/ws/consentdef/consent/' + consentId, payload)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(nhsNumber, response)))
      .then(() => Promise.resolve(this.successHandler(nhsNumber, 'no response')))
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  private deleteConsentContext(consentContextId: string): Promise<any> {
    return this.httpClient.delete('http://consentservice.silver.arjuna.com/consentengine/ws/consentcontextdef/consentcontext/' + consentContextId)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(consentContextId, response)))
      .then(() => Promise.resolve(this.successHandler(consentContextId, 'no response')))
      .catch((error) => Promise.resolve(this.errorHandler(consentContextId, error)));
  }

  private deleteConsent(consentId: string): Promise<any> {
    return this.httpClient.delete('http://consentservice.silver.arjuna.com/consentengine/ws/consentdef/consent/' + consentId)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandler(consentId, response)))
      .then(() => Promise.resolve(this.successHandler(consentId, 'no response')))
      .catch((error) => Promise.resolve(this.errorHandler(consentId, error)));
  }

  public listConsentContexts(nhsNumber: string): Promise<any> {
    return this.httpClient.get('http://consentservice.silver.arjuna.com/consentengine/ws/consentcontextdef/consentcontexts?consenterid=' + nhsNumber)
      .toPromise()
      .then((listOfConsentContexts: any) => {
        return Promise.resolve(listOfConsentContexts);
      })
      .catch((error) => Promise.resolve(this.errorHandler(nhsNumber, error)));
  }

  public checkIfConsentedForThisCase(nhsNumber: string,caseID:string): Promise<any> {
    return this.httpClient.get('http://consentservice.silver.arjuna.com/consentengine/ws/consentcontextdef/consentcontexts?consenterid=' + nhsNumber)
      .toPromise()
      .then((listOfConsentContexts: any) => {
        let found = false;
        if (listOfConsentContexts.length>0) {
          for (let context of listOfConsentContexts) {
            let startString = `[${caseID}]`;
            if (context.name.toString().startsWith(startString)) {
              found = true;
            }
          }
        }
        return Promise.resolve(found);
      })
      .catch((error) => Promise.resolve(this.errorHandlerCase(nhsNumber, caseID, error)));
  }

  public getConsentHistory(nhsNumber:string,caseID:string): Promise<any> {
    return this.httpClient.get('http://consentservice.silver.arjuna.com/consentengine/ws/consenterhistorydef/consenterhistory/' + nhsNumber)
      .toPromise()
      .then((response: any) => Promise.resolve(this.successHandlerCase(nhsNumber, caseID, response)))
      .catch((error) => Promise.resolve(this.errorHandlerCase(nhsNumber, caseID, error)));
  }

  private successHandler(nhsNumber: string, response: any): any {
    return {
      nhsNumber: nhsNumber,
      response: response
    }
  }

  private errorHandler(nhsNumber: string, error: any): any {
    return {
      nhsNumber: nhsNumber,
      response: error
    }
  }

  private successHandlerCase(nhsNumber: string, caseID:string, response: any): any {
    return {
      nhsNumber: nhsNumber,
      caseID: caseID,
      response: response
    }
  }

  private errorHandlerCase(nhsNumber: string, caseID:string, error: any): any {
    return {
      nhsNumber: nhsNumber,
      caseID: caseID,
      response: error
    }
  }

}

