export class Person
{
    public firstName:   string;
    public surname:     string;
    public dateOfBirth: string;
    public gender:      string;

    public constructor(firstName: string, surname: string, dateOfBirth: string, gender: string)
    {
        this.firstName   = firstName;
        this.surname     = surname;
        this.dateOfBirth = dateOfBirth;
        this.gender      = gender;
    }
}
