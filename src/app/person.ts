export class Person
{
    public id:          string;
    public firstName:   string;
    public surname:     string;
    public dateOfBirth: string;
    public gender:      string;
    public nhsNumber:   string;

    public constructor(id: string, firstName: string, surname: string, dateOfBirth: string, gender: string, nhsNumber: string)
    {
        this.id          = id;
        this.firstName   = firstName;
        this.surname     = surname;
        this.dateOfBirth = dateOfBirth;
        this.gender      = gender;
        this.nhsNumber   = nhsNumber;
    }
}
