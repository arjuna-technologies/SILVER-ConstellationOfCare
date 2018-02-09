import { Person } from './person';

export class Family
{
    public persons: Person[];

    public constructor(persons: Person[])
    {
        this.persons = persons;
    }
}
