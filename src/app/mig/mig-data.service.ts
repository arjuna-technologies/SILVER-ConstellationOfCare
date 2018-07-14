import { Injectable }               from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { MIGInformation } from './mig-information';

import { MIGPerson }       from './mig-person';
import { MIGPatient }      from './mig-patient';
import { MIGOrganisation } from './mig-organisation';
import { MIGLocation }     from './mig-location';
import { MIGUser }         from './mig-user';
import { MIGRole }         from './mig-role';
import { MIGUserInRole }   from './mig-userinrole';

import { MIGEncounter } from './mig-encounter';
import { MIGProblem }   from './mig-problem';
import { MIGEvent }     from './mig-event';

@Injectable()
export class MIGDataService
{
    constructor(private httpClient: HttpClient)
    {
    }

    public loadMIGInformation(nhsNumber: string): Promise<MIGInformation>
    {
        return this.httpClient.get("http://dataservice-mig.silver.arjuna.com/data/ws/mig/problems?nhs_number=" + nhsNumber)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.loadMIGInformationSuccessHandler(nhsNumber, response)))
                   .catch((error) => Promise.resolve(this.loadMIGInformationErrorHandler(nhsNumber, error)));
    }

    private loadMIGInformationSuccessHandler(nhsNumber: string, body: any): MIGInformation
    {
        console.log('Body = ' + JSON.stringify(body));

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
                migEncounters.push(new MIGEncounter(encounter.id));

        let migProblems: MIGProblem[] = [];
        if (body.healthDomain && body.healthDomain.problems)
            for (let problem of body.healthDomain.problems)
                migProblems.push(new MIGProblem(problem.id, problem.status, problem.significance, problem.expectedDuration, problem.endTime));

        let migEvents: MIGEvent[] = [];
        if (body.healthDomain && body.healthDomain.events)
            for (let event of body.healthDomain.events)
                migEvents.push(new MIGEvent(event.id, event.patient, event.eventType, event.effectiveTime, event.availabilityTimeStamp, event.authorisingUserInRole, event.enteredByUserInRole, event.code, event.displayTerm, event.organisation, event.observation));

        return new MIGInformation(nhsNumber, status, migPersons, migPatients, migOrganisations, migLocations, migUsers, migRoles, migUserInRoles, migEncounters, migProblems, migEvents);
    }

    private loadMIGInformationErrorHandler(nhsNumber: string, error: any): MIGInformation
    {
        console.log('MIG-Information Error Handler: ' + JSON.stringify(error));

        return new MIGInformation(nhsNumber, 'Failed', [], [], [], [], [], [], [], [], [], []);
    }
}
