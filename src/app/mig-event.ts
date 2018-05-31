export class MIGEvent
{
    public id:                     string;
    public patient:                string;
    public eventType:              string;
    public effectiveTime:          string;
    public availabilityTimeStamp:  string;
    public availabilityUserInRole: string;
    public enteredByUserInRole:    string;
    public code:                   string;
    public displayTerm:            string;
    public organisation:           string;
    public observation:            string;

    public constructor(id: string, patient: string, eventType: string, effectiveTime: string, availabilityTimeStamp: string, availabilityUserInRole: string, enteredByUserInRole: string, code: string, displayTerm: string, organisation: string, observation: string)
    {
        this.id                     = id;
        this.patient                = patient;
        this.eventType              = eventType;
        this.effectiveTime          = effectiveTime;
        this.availabilityTimeStamp  = availabilityTimeStamp;
        this.availabilityUserInRole = availabilityUserInRole;
        this.enteredByUserInRole    = enteredByUserInRole;
        this.code                   = code;
        this.displayTerm            = displayTerm;
        this.organisation           = organisation;
        this.observation            = observation;
    }
}
