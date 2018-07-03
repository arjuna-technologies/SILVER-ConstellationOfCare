import { Injectable } from '@angular/core';

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

@Injectable
({
    providedIn: 'root'
})
export class MIGInformationIndexService
{
    public personMap:       Map<string, MIGPerson>;
    public patientMap:      Map<string, MIGPatient>;
    public organisationMap: Map<string, MIGOrganisation>;
    public locationMap:     Map<string, MIGLocation>;
    public userMap:         Map<string, MIGUser>;
    public roleMap:         Map<string, MIGRole>;
    public userInRoleMap:   Map<string, MIGUserInRole>;

    public encounterMap: Map<string, MIGEncounter>;
    public problemMap:   Map<string, MIGProblem>;
    public eventMap:     Map<string, MIGEvent>;

    constructor()
    {
        this.personMap       = new Map<string, MIGPerson>();
        this.patientMap      = new Map<string, MIGPatient>();
        this.organisationMap = new Map<string, MIGOrganisation>();
        this.locationMap     = new Map<string, MIGLocation>();
        this.userMap         = new Map<string, MIGUser>();
        this.roleMap         = new Map<string, MIGRole>();
        this.userInRoleMap   = new Map<string, MIGUserInRole>();

        this.encounterMap = new Map<string, MIGEncounter>();
        this.problemMap   = new Map<string, MIGProblem>();
        this.eventMap     = new Map<string, MIGEvent>();
    }

    public createIndexes(migInformation: MIGInformation)
    {
        this.personMap.clear();
        this.patientMap.clear();
        this.organisationMap.clear();
        this.locationMap.clear();
        this.userMap.clear();
        this.roleMap.clear();
        this.userInRoleMap.clear();

        this.encounterMap.clear();
        this.problemMap.clear();
        this.eventMap.clear();

        if (migInformation)
        {
            for (let person of migInformation.persons)
                this.personMap.set(person.id, person);

            for (let patient of migInformation.patients)
                this.patientMap.set(patient.id, patient);

            for (let organisation of migInformation.organisations)
                this.organisationMap.set(organisation.id, organisation);

            for (let location of migInformation.locations)
                this.locationMap.set(location.id, location);

            for (let user of migInformation.users)
                this.userMap.set(user.id, user);

            for (let role of migInformation.roles)
                this.roleMap.set(role.id, role);

            for (let userInRole of migInformation.userInRoles)
                this.userInRoleMap.set(userInRole.id, userInRole);

            for (let encounter of migInformation.encounters)
                this.encounterMap.set(encounter.id, encounter);

            for (let problem of migInformation.problems)
                this.problemMap.set(problem.id, problem);

            for (let event of migInformation.events)
                this.eventMap.set(event.id, event);
        }
    }

    public basicPersonMapping(personId: string): string
    {
        let person: MIGPerson = this.personMap.get(personId);

        if (person)
            return person.title + ' ' + person.forenames + ' ' + person.surname;
        else
            return '';
    }

    public basicPatientMapping(patientId: string): string
    {
        let patient: MIGPatient = this.patientMap.get(patientId);

        if (patient)
            return this.basicPersonMapping(patient.patientPerson);
        else
            return '';
    }

    public basicOrganisationMapping(organisationId: string): string
    {
        let organisation: MIGOrganisation = this.organisationMap.get(organisationId);

        if (organisation)
            return organisation.name;
        else
            return '';
    }

    public basicLocationMapping(locationId: string): string
    {
        let location: MIGLocation = this.locationMap.get(locationId);

        if (location)
            return location.name;
        else
            return '';
    }

    public basicUserMapping(userId: string): string
    {
        let user: MIGUser = this.userMap.get(userId);

        if (user)
            return this.basicPersonMapping(user.userPerson);
        else
            return '';
    }

    public basicRoleMapping(roleId: string): string
    {
        let role: MIGRole = this.roleMap.get(roleId);

        if (role)
            return role.name;
        else
            return '';
    }

    public basicUserInRoleMapping(userInRoleId: string): string
    {
        let userInRole: MIGUserInRole = this.userInRoleMap.get(userInRoleId);

        if (userInRole)
            return this.basicUserMapping(userInRole.user) + ' - ' + this.basicRoleMapping(userInRole.role);
        else
            return '';
    }
}
