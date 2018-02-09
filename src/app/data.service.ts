import { Injectable } from '@angular/core';

import { Person } from './person';
import { Family } from './family';

@Injectable()
export class DataService
{
    constructor()
    {
    }

    public loadFamily(familyId: string): Promise<Family>
    {
        let persons: Person[] = [];

        persons.push(new Person('Amy', 'Smith', '20/12/70', 'female'));
        persons.push(new Person('Bill', 'Jones', '12/01/71', 'male'));
        persons.push(new Person('Clare', 'Smith', '13/03/95', 'female'));
        persons.push(new Person('David', 'Jones', '07/07/97', 'male'));

        return new Promise(resolve => setTimeout(() => resolve(new Family(persons)), 5000));
    }
}
