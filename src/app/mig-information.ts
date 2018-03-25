import { MIGEvent } from './mig-event';

export class MIGInformation
{
    public nhsNumber: string;
    public status:    string;
    public events:    MIGEvent[];

    public constructor(nhsNumber: string, status: string, events: MIGEvent[])
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;
        this.events    = events;
    }
}
