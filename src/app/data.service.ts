import { Injectable }               from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Family }        from './family';
import { FamilyMember }  from './family-member';

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
export class DataService
{
    private families:      Family[];
    private familyMembers: FamilyMember[];

    constructor(private httpClient: HttpClient)
    {
        this.familyMembers  = [];

        const familyMember00: FamilyMember = new FamilyMember('p00', 'Amy', 'Smith', '20/12/70', 'female', '4853379371');
        const familyMember01: FamilyMember = new FamilyMember('p01', 'Bill', 'Jones', '12/01/71', 'male', '6424561811');
        const familyMember02: FamilyMember = new FamilyMember('p02', 'Clare', 'Smith', '13/03/95', 'female', '9051292074');
        const familyMember03: FamilyMember = new FamilyMember('p03', 'David', 'Jones', '07/07/97', 'male', '5700200716');

        const family0: Family = new Family('f00', [ familyMember00, familyMember01, familyMember02, familyMember03 ]);

        const familyMember10: FamilyMember = new FamilyMember('p04', 'Amy', 'Brown', '20/12/70', 'female', '8225676149');
        const familyMember11: FamilyMember = new FamilyMember('p05', 'Bill', 'Lee', '12/01/71', 'male', '9620344472');
        const familyMember12: FamilyMember = new FamilyMember('p06', 'Clare', 'Brown', '13/03/95', 'female', '4160066348');
        const familyMember13: FamilyMember = new FamilyMember('p07', 'David', 'Brown', '07/07/97', 'male', '5894678846');

        const family1: Family = new Family('f01', [ familyMember10, familyMember11, familyMember12, familyMember13 ]);

        const familyMember20: FamilyMember = new FamilyMember('p08', 'Amy', 'James', '20/12/70', 'female', '8880028669');
        const familyMember21: FamilyMember = new FamilyMember('p09', 'Bill', 'James', '12/01/71', 'male', '6068998983');
        const familyMember22: FamilyMember = new FamilyMember('p10', 'Clare', 'James', '13/03/95', 'female', '4198838577');

        const family2: Family = new Family('f02', [ familyMember20, familyMember21, familyMember22 ]);

        this.families = [ family0, family1, family2 ];
    }

    public loadFamilies(): Promise<Family[]>
    {
        return new Promise(resolve => setTimeout(() => resolve(this.families), 4000));
    }

    public loadFamily(familyId: string): Promise<Family>
    {
        let family: Family = null;

        for (let current of this.families)
            if (familyId === current.id)
                family = current;

        return new Promise(resolve => setTimeout(() => resolve(family), 1000));
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
