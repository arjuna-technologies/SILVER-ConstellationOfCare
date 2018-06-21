import { MIGPerson }    from './mig-person';
import { MIGEncounter } from './mig-encounter';
import { MIGProblem }   from './mig-problem';
import { MIGEvent }     from './mig-event';

export class MIGInformation
{
    public nhsNumber: string;
    public status:    string;

    // Admin Domain
    public persons: MIGPerson[];

    // Health Domain
    public encounters: MIGEncounter[];
    public problems:   MIGProblem[]
    public events:     MIGEvent[];

    public constructor(nhsNumber: string, status: string, persons: MIGPerson[], encounters: MIGEncounter[], problems: MIGProblem[], events: MIGEvent[])
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;

        this.persons   = persons;

        this.encounters = encounters;
        this.problems   = problems;
        this.events     = events;
    }
}
