export class MIGPerson
{
    public id:        string;
    public sex:       string;
    public forenames: string;
    public surname:   string;
    public title:     string;

    public constructor(id: string, sex: string, forenames: string, surname: string, title: string)
    {
        this.id        = id;
        this.sex       = sex;
        this.forenames = forenames;
        this.surname   = surname;
        this.title     = title;
    }
}
