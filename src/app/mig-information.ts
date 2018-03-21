import { MIGEvent } from './mig-event';

export class MIGInformation
{
    public events: MIGEvent[];

    public constructor(events: MIGEvent[])
    {
        this.events = events;
    }
}
