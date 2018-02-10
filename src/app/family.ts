import { Person } from './person';

export class Family
{
    public id:      string;
    public persons: Person[];

    public constructor(id: string, persons: Person[])
    {
        this.id      = id;
        this.persons = persons;
    }
}
