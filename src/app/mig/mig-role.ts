export class MIGRole
{
    public id:                    string;
    public name:                  string;
    public userCategory:          any;
    public organisation:          string;
    public confidentialityPolicy: string;

    public constructor(id: string, name: string, userCategory: any, organisation: string, confidentialityPolicy: string)
    {
        this.id                    = id;
        this.name                  = name;
        this.userCategory          = userCategory;
        this.organisation          = organisation;
        this.confidentialityPolicy = confidentialityPolicy;
    }
}
