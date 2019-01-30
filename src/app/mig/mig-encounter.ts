export class MIGEncounter
{
    public id:                    string;
    public patient:               string;
    public effectiveTime:         string;
    public duration:              string;
    public authorisingUserInRole: string;
    public enteredByUserInRole:   string;
    public organisations:         any;
    public location:              string;
    public components:            any;

    public constructor(id: string, patient: string, effectiveTime: string, duration: string, authorisingUserInRole: string, enteredByUserInRole: string, organisations: any, location: string, components: any)
    {
        this.id                    = id;
        this.patient               = patient;
        this.effectiveTime         = effectiveTime;
        this.duration              = duration;
        this.authorisingUserInRole = authorisingUserInRole;
        this.enteredByUserInRole   = enteredByUserInRole;
        this.organisations         = organisations;
        this.location              = location;
        this.components            = components;
    }
}
