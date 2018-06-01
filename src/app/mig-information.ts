import { MIGPerson } from './mig-person';
import { MIGProblem } from './mig-problem';
import { MIGEvent }   from './mig-event';

export class MIGInformation
{
    public nhsNumber: string;
    public status:    string;

    public persons: MIGPerson[];

    public problems: MIGProblem[]
    public events:   MIGEvent[];

    public constructor(nhsNumber: string, status: string, persons: MIGPerson[], problems: MIGProblem[], events: MIGEvent[])
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;

        this.persons   = persons;

        this.problems  = problems;
        this.events    = events;
    }
}
