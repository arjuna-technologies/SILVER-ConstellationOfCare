export class MIGDocument
{
    public id:           string;
    public name:         string;
    public description:  string;
    public observations: any;
    public code:         any;

    public constructor(id: string, name: string, description: string, observations: any, code: any)
    {
        this.id           = id;
        this.name         = name;
        this.description  = description;
        this.observations = observations;
        this.code         = code;
    }
}
