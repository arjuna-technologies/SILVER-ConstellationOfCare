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

        persons.push(new Person('0', 'Amy', 'Smith', '20/12/70', 'female'));
        persons.push(new Person('1', 'Bill', 'Jones', '12/01/71', 'male'));
        persons.push(new Person('2', 'Clare', 'Smith', '13/03/95', 'female'));
        persons.push(new Person('3', 'David', 'Jones', '07/07/97', 'male'));

        return new Promise(resolve => setTimeout(() => resolve(new Family('0', persons)), 2000));
    }
}
