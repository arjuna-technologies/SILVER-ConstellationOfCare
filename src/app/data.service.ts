import { Injectable } from '@angular/core';

import { Person }       from './person';
import { Family }       from './family';
import { Organization } from './organization';

@Injectable()
export class DataService
{
    private persons:       Person[];
    private families:      Family[];
    private organizations: Organization[];

    constructor()
    {
        this.persons  = [];

        const person00: Person = new Person('p0', 'Amy', 'Smith', '20/12/70', 'female');
        const person01: Person = new Person('p1', 'Bill', 'Jones', '12/01/71', 'male');
        const person02: Person = new Person('p2', 'Clare', 'Smith', '13/03/95', 'female');
        const person03: Person = new Person('p3', 'David', 'Jones', '07/07/97', 'male');

        const family0: Family = new Family('f0', [ person00, person01, person02, person03 ]);

        const person10: Person = new Person('p4', 'Amy', 'Brown', '20/12/70', 'female');
        const person11: Person = new Person('p5', 'Bill', 'Lee', '12/01/71', 'male');
        const person12: Person = new Person('p6', 'Clare', 'Brown', '13/03/95', 'female');
        const person13: Person = new Person('p3', 'David', 'Brown', '07/07/97', 'male');

        const family1: Family = new Family('f1', [ person10, person11, person12, person13 ]);

        this.families = [ family0, family1 ];

        const organization0: Organization = new Organization('o0', 'Northumberland Tyne and Wear NHS Trust', []);
        const organization1: Organization = new Organization('o1', 'ChildView Unit', []);
        const organization2: Organization = new Organization('o2', 'Newcastle Hospital Trust NHS Trust', []);

        this.organizations = [ organization0, organization1, organization2 ];
    }

    public loadFamilies(): Promise<Family[]>
    {
        return new Promise(resolve => setTimeout(() => resolve(this.families), 4000));
    }

    public loadFamily(familyId: string): Promise<Family>
    {
        let family: Family = null;

        for (let current of this.families)
            if (familyId === current.id)
                family = current;

        return new Promise(resolve => setTimeout(() => resolve(family), 4000));
    }

    public loadOrganizations(): Promise<Organization[]>
    {
        return new Promise(resolve => setTimeout(() => resolve(this.organizations), 4000));
    }

    public loadOrganization(organizationId: string): Promise<Organization>
    {
        let organization: Organization = null;

        for (let current of this.organizations)
            if (organizationId === current.id)
                organization = current;

        return new Promise(resolve => setTimeout(() => resolve(organization), 4000));
    }
}
