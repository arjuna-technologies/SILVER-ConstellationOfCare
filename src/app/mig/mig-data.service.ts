import { Injectable }               from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { MIGInformation }  from './mig-information';
import { MIGPatientTrace } from './mig-patienttrace';
import { MIGInformationIndexService } from './mig-information-index.service';
import { MIGPerson }       from './mig-person';
import { MIGPatient }      from './mig-patient';
import { MIGOrganisation } from './mig-organisation';
import { MIGLocation }     from './mig-location';
import { MIGUser }         from './mig-user';
import { MIGRole }         from './mig-role';
import { MIGUserInRole }   from './mig-userinrole';
import { MIGPatientMatch } from './mig-patientmatch';

import { MIGEncounter } from './mig-encounter';
import { MIGProblem }   from './mig-problem';
import { MIGEvent }     from './mig-event';
import { MIGDocument }  from './mig-document';

@Injectable()
export class MIGDataService
{
  public static readonly ALLGPDATA_REQUEST_NAME     = 'allgpdata';
  public static readonly SUMMARY_REQUEST_NAME       = 'summary';
  public static readonly PROBLEM_REQUEST_NAME       = 'problem';
  public static readonly DIAGNOSIS_REQUEST_NAME     = 'diagnosis';
  public static readonly MEDICATION_REQUEST_NAME    = 'medication';
  public static readonly RISKSWARNING_REQUEST_NAME  = 'riskswarning';
  public static readonly PROCEDURE_REQUEST_NAME     = 'procedure';
  public static readonly INVESTIGATION_REQUEST_NAME = 'investigation';
  public static readonly EXAMINATION_REQUEST_NAME   = 'examination';
  public static readonly EVENT_REQUEST_NAME         = 'event';
  public static readonly PATIENTDETAIL_REQUEST_NAME = 'patientdetail';

  constructor(private httpClient: HttpClient, private migInformationIndexService: MIGInformationIndexService)
  {
  }

  public loadMIGPatientTrace(patientTraceOptions: any): Promise<MIGPatientTrace>
  {
    let queryStringParts = [];

    if (patientTraceOptions.firstName) {
      queryStringParts.push(`givenname=${patientTraceOptions.firstName}`);
    }

    if (patientTraceOptions.surname) {
      queryStringParts.push(`familyname=${patientTraceOptions.surname}`);
    }

    if (patientTraceOptions.gender) {
      queryStringParts.push(`gender=${patientTraceOptions.gender}`);
    }

    if (patientTraceOptions.dateOfBirth) {
      let dateOfBirthParts = patientTraceOptions.dateOfBirth.split('/');
      if (dateOfBirthParts.length==3) {
        queryStringParts.push(`birthday=${dateOfBirthParts[0]}`);
        queryStringParts.push(`birthmonth=${dateOfBirthParts[1]}`);
        queryStringParts.push(`birthyear=${dateOfBirthParts[2]}`);
      }
    }

    if (patientTraceOptions.postcode) {
      queryStringParts.push(`postcode=${patientTraceOptions.postcode}`);
    }

    let queryString = queryStringParts.join('&');

    return this.httpClient.get(`http://dataservice-mig.silver.arjuna.com/data/ws/mig/extendedpatienttrace?${queryString}`)
      .toPromise()
      .then((response: any) => Promise.resolve(this.loadMIGPatientTraceSuccessHandler(response)))
      .catch((error) => Promise.resolve(this.loadMIGPatientTraceErrorHandler(error)));
  }

  public loadMIGInformation(nhsNumber: string, requestType?: string): Promise<MIGInformation>
  {
    if (requestType)
    {
      return this.httpClient.get('http://dataservice-mig.silver.arjuna.com/data/ws/mig/problems?nhs_number=' + nhsNumber + '&request_type=' + requestType)
        .toPromise()
        .then((response: any) => Promise.resolve(this.loadMIGInformationSuccessHandler(nhsNumber, response)))
        .catch((error) => Promise.resolve(this.loadMIGInformationErrorHandler(nhsNumber, error)));
    }
    else
    {
      return this.httpClient.get('http://dataservice-mig.silver.arjuna.com/data/ws/mig/problems?nhs_number=' + nhsNumber)
        .toPromise()
        .then((response: any) => Promise.resolve(this.loadMIGInformationSuccessHandler(nhsNumber, response)))
        .catch((error) => Promise.resolve(this.loadMIGInformationErrorHandler(nhsNumber, error)));
    }
  }

  private loadMIGPatientTraceSuccessHandler(body: any): MIGPatientTrace
  {
    //console.log('PatientTrace Response Body: ');
    //console.dir(body);

    let status:           string            = 'Failed';
    let migPatientMatchs: MIGPatientMatch[] = null;

    if (body && body.status)
    {
      status           = body.status;
      migPatientMatchs = [];

      if (body.patientMatchs)
        for (let patientMatch of body.patientMatchs)
          if (patientMatch.patient && patientMatch.patient.primaryIdentifier) {
            let matchResult = new MIGPatientMatch(patientMatch.patient);
            matchResult.setOrganisation(this.migInformationIndexService);
            migPatientMatchs.push(matchResult);
          }
    }

    return new MIGPatientTrace(status, migPatientMatchs);
  }

  private loadMIGPatientTraceErrorHandler(error: any): MIGPatientTrace
  {
    return new MIGPatientTrace('Failed', null);
  }

  private loadMIGInformationSuccessHandler(nhsNumber: string, body: any): MIGInformation
  {
    let status: string = body.status;

    let migPersons: MIGPerson[] = [];
    if (body.adminDomain && body.adminDomain.persons)
      for (let person of body.adminDomain.persons)
        migPersons.push(new MIGPerson(person.id, person.sex, person.forenames, person.surname, person.title));

    let migPatients: MIGPatient[] = [];
    if (body.adminDomain && body.adminDomain.patients)
      for (let patient of body.adminDomain.patients)
        migPatients.push(new MIGPatient(patient.id, patient.patientIdentifiers, patient.patientPerson, patient.spokenLanguage, patient.spokenLanguageIsoCode, patient.registeredGPUserInRole, patient.usualGPUserInRole, patient.caseloadPatients));

    let migOrganisations: MIGOrganisation[] = [];
    if (body.adminDomain && body.adminDomain.organisations)
      for (let organisation of body.adminDomain.organisations)
        migOrganisations.push(new MIGOrganisation(organisation.id, organisation.name, organisation.organisationType, organisation.nationalPracticeCode, organisation.mainLocation));

    let migLocations: MIGLocation[] = [];
    if (body.adminDomain && body.adminDomain.locations)
      for (let location of body.adminDomain.locations)
        migLocations.push(new MIGLocation(location.id, location.name, location.address));

    let migUsers: MIGUser[] = [];
    if (body.adminDomain && body.adminDomain.users)
      for (let user of body.adminDomain.users)
        migUsers.push(new MIGUser(user.id, user.userPerson, user.mnemonic));

    let migRoles: MIGRole[] = [];
    if (body.adminDomain && body.adminDomain.roles)
      for (let role of body.adminDomain.roles)
        migRoles.push(new MIGRole(role.id, role.name, role.userCategory, role.organisation, role.confidentialityPolicy));

    let migUserInRoles: MIGUserInRole[] = [];
    if (body.adminDomain && body.adminDomain.userInRoles)
      for (let userInRole of body.adminDomain.userInRoles)
        migUserInRoles.push(new MIGUserInRole(userInRole.id, userInRole.user, userInRole.role, userInRole.contractualRelationship, userInRole.contractStart, userInRole.contractEnd, userInRole.filingConfidentialityPolicy, userInRole.userIdentifiers));

    let migEncounters: MIGEncounter[] = [];
    if (body.healthDomain && body.healthDomain.encounters)
      for (let encounter of body.healthDomain.encounters)
        migEncounters.push(new MIGEncounter(encounter.id, encounter.patient, encounter.ffectiveTime, encounter.duration, encounter.authorisingUserInRole, encounter.enteredByUserInRole, encounter.organisations, encounter.location, encounter.components));

    let migProblems: MIGProblem[] = [];
    if (body.healthDomain && body.healthDomain.problems)
      for (let problem of body.healthDomain.problems)
        migProblems.push(new MIGProblem(problem.id, problem.status, problem.significance, problem.expectedDuration, problem.endTime));

    let migEvents: MIGEvent[] = [];
    if (body.healthDomain && body.healthDomain.events)
      for (let event of body.healthDomain.events)
        migEvents.push(new MIGEvent(event.id, event.patient, event.eventType, event.effectiveTime, event.availabilityTimeStamp, event.authorisingUserInRole, event.enteredByUserInRole, event.code, event.displayTerm, event.organisation, event.observation));

    let migDocuments: MIGDocument[] = [];
    if (body.healthDomain && body.healthDomain.documents)
      for (let document of body.healthDomain.documents)
        migDocuments.push(new MIGDocument(document.id, document.name, document.description, document.observations, document.code));

    return new MIGInformation(nhsNumber, status, migPersons, migPatients, migOrganisations, migLocations, migUsers, migRoles, migUserInRoles, migEncounters, migProblems, migEvents, migDocuments);
  }

  private loadMIGInformationErrorHandler(nhsNumber: string, error: any): MIGInformation
  {
    return new MIGInformation(nhsNumber, 'Failed', [], [], [], [], [], [], [], [], [], [], []);
  }
}
