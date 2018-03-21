export class MIGEvent
{
    public id:            string;
    public displayTerm:   string;
    public eventType:     string;
    public effectiveTime: string;

    public constructor(id: string, displayTerm: string, eventType: string, effectiveTime: string)
    {
        this.id            = id;
        this.displayTerm   = displayTerm;
        this.eventType     = eventType;
        this.effectiveTime = effectiveTime;
    }
}
