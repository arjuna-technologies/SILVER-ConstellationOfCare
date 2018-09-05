export class ESPFHIREntry
{
    public id:         string;
    public identifiers: any;
    public names:      any;
    public addresses:  any;
    public telecoms:   any;
    public gender:     any;
    public birthDate:  string;
    public updated:    string;

    public constructor(id: string, identifiers: any, names: any, addresses: any, telecoms: any, gender: any, birthDate: string, updated: string)
    {
        this.id          = id;
        this.identifiers = identifiers;
        this.names       = names;
        this.addresses   = addresses;
        this.telecoms    = telecoms;
        this.gender      = gender;
        this.birthDate   = birthDate;
        this.updated     = updated;
    }
}
