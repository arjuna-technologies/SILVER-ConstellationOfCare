import { Injectable } from '@angular/core';

import { Person }        from './person';
import { Family }        from './family';
import { Organization }  from './organization';
import { DataSource }    from './data-source';
import { AccessProcess } from './access-process';
import { Data }          from './data';

@Injectable()
export class DataService
{
    private persons:         Person[];
    private families:        Family[];
    private organizations:   Organization[];
    private dataSources:     DataSource[];
    private accessProcesses: AccessProcess[];

    constructor()
    {
        this.persons  = [];

        const person00: Person = new Person('p00', 'Amy', 'Smith', '20/12/70', 'female');
        const person01: Person = new Person('p01', 'Bill', 'Jones', '12/01/71', 'male');
        const person02: Person = new Person('p02', 'Clare', 'Smith', '13/03/95', 'female');
        const person03: Person = new Person('p03', 'David', 'Jones', '07/07/97', 'male');

        const family0: Family = new Family('f00', [ person00, person01, person02, person03 ]);

        const person10: Person = new Person('p04', 'Amy', 'Brown', '20/12/70', 'female');
        const person11: Person = new Person('p05', 'Bill', 'Lee', '12/01/71', 'male');
        const person12: Person = new Person('p06', 'Clare', 'Brown', '13/03/95', 'female');
        const person13: Person = new Person('p07', 'David', 'Brown', '07/07/97', 'male');

        const family1: Family = new Family('f01', [ person10, person11, person12, person13 ]);

        const person20: Person = new Person('p08', 'Amy', 'James', '20/12/70', 'female');
        const person21: Person = new Person('p09', 'Bill', 'James', '12/01/71', 'male');
        const person22: Person = new Person('p10', 'Clare', 'James', '13/03/95', 'female');

        const family2: Family = new Family('f02', [ person20, person21, person22 ]);

        this.families = [ family0, family1, family2 ];

        const accessProcess00: AccessProcess = new AccessProcess('ds00', 'Phone access', '019 123 1234');
        const accessProcess01: AccessProcess = new AccessProcess('ds01', 'Online access', 'http://user@example.com');

        this.accessProcesses = [ accessProcess00, accessProcess01 ];

        const dataSource00: DataSource = new DataSource('ds00', "Physical Health System", [accessProcess00, accessProcess01]);
        const dataSource01: DataSource = new DataSource('ds01', "Mental Health System", []);

        this.dataSources = [ dataSource00, dataSource00 ];

        const organization0: Organization = new Organization('o00', 'Northumberland Tyne and Wear NHS Trust', [dataSource00, dataSource01]);
        const organization1: Organization = new Organization('o01', 'ChildView Unit', []);
        const organization2: Organization = new Organization('o02', 'Newcastle Hospital Trust NHS Trust', []);

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
        return new Promise(resolve => setTimeout(() => resolve(this.organizations), 1000));
    }

    public loadOrganization(organizationId: string): Promise<Organization>
    {
        let organization: Organization = null;

        for (let current of this.organizations)
            if (organizationId === current.id)
                organization = current;

        return new Promise(resolve => setTimeout(() => resolve(organization), 1000));
    }

    public loadDataSource(dataSourceId: string): Promise<DataSource>
    {
        let dataSource: DataSource = null;

        for (let current of this.dataSources)
            if (dataSourceId === current.id)
                dataSource = current;

        return new Promise(resolve => setTimeout(() => resolve(dataSource), 1000));
    }

    public loadAccessProcess(accessProcessId: string): Promise<AccessProcess>
    {
        let accessProcess: AccessProcess = null;

        for (let current of this.accessProcesses)
            if (accessProcessId === current.id)
                accessProcess = current;

        return new Promise(resolve => setTimeout(() => resolve(accessProcess), 1000));
    }
}
