export class MIGOrganisation
{
    public id:                   string;
    public name:                 string;
    public organisationType:     any;
    public nationalPracticeCode: string;
    public mainLocation:         string;

    public constructor(id: string, name: string, organisationType: any, nationalPracticeCode: string, mainLocation: string)
    {
        this.id                   = id;
        this.name                 = name;
        this.organisationType     = organisationType;
        this.nationalPracticeCode = nationalPracticeCode;
        this.mainLocation         = mainLocation;
    }
}
