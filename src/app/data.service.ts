import { Injectable } from '@angular/core';

import { Person } from './person';
import { Family } from './family';

@Injectable()
export class DataService
{
    private persons:  Person[];
    private families: Family[];

    constructor()
    {
        this.persons  = [];

        const person00: Person = new Person('p0', 'Amy', 'Smith', '20/12/70', 'female');
        const person01: Person = new Person('p1', 'Bill', 'Jones', '12/01/71', 'male');
        const person02: Person = new Person('p2', 'Clare', 'Smith', '13/03/95', 'female');
        const person03: Person = new Person('p3', 'David', 'Jones', '07/07/97', 'male');

        const family00: Family = new Family('f0', [ person00, person01, person02, person03 ]);

        const person10: Person = new Person('p4', 'Amy', 'Brown', '20/12/70', 'female');
        const person11: Person = new Person('p5', 'Bill', 'Lee', '12/01/71', 'male');
        const person12: Person = new Person('p6', 'Clare', 'Brown', '13/03/95', 'female');
        const person13: Person = new Person('p3', 'David', 'Brown', '07/07/97', 'male');

        const family01: Family = new Family('f1', [ person10, person11, person12, person13 ]);

        this.families = [ family00, family01 ];
    }

    public loadFamilies(): Promise<Family[]>
    {
        return new Promise(resolve => setTimeout(() => resolve(this.families), 2000));
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
