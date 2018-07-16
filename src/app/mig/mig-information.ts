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

export class MIGInformation
{
    public nhsNumber: string;
    public status:    string;

    // Admin Domain
    public persons:       MIGPerson[];
    public patients:      MIGPatient[];
    public organisations: MIGOrganisation[];
    public locations:     MIGLocation[];
    public users:         MIGUser[];
    public roles:         MIGRole[];
    public userInRoles:   MIGUserInRole[];

    // Health Domain
    public encounters: MIGEncounter[];
    public problems:   MIGProblem[]
    public events:     MIGEvent[];

    public constructor(nhsNumber: string, status: string, persons: MIGPerson[], patients: MIGPatient[], organisations: MIGOrganisation[], locations: MIGLocation[], users: MIGUser[], roles: MIGRole[], userInRoles: MIGUserInRole[], encounters: MIGEncounter[], problems: MIGProblem[], events: MIGEvent[])
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;

        this.persons       = persons;
        this.patients      = patients;
        this.organisations = organisations;
        this.locations     = locations;
        this.users         = users;
        this.roles         = roles;
        this.userInRoles   = userInRoles;

        this.encounters = encounters;
        this.problems   = problems;
        this.events     = events;
    }
}
