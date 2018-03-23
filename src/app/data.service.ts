import { Injectable }           from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Person }        from './person';
import { Family }        from './family';

import { Organization }  from './organization';
import { DataSource }    from './data-source';
import { AccessProcess } from './access-process';

import { DataType }      from './data-type';
import { Data }          from './data';

import { MIGInformation } from './mig-information';
import { MIGEvent }       from './mig-event';

@Injectable()
export class DataService
{
    private persons:         Person[];
    private families:        Family[];

    private organizations:   Organization[];
    private dataSources:     DataSource[];
    private accessProcesses: AccessProcess[];

    private dataTypes: DataType[];
    private datas:     Data[];

    constructor(private httpClient: HttpClient)
    {
        this.persons  = [];

        const person00: Person = new Person('p00', 'Amy', 'Smith', '20/12/70', 'female', '4853379371');
        const person01: Person = new Person('p01', 'Bill', 'Jones', '12/01/71', 'male', '6424561811');
        const person02: Person = new Person('p02', 'Clare', 'Smith', '13/03/95', 'female', '9051292074');
        const person03: Person = new Person('p03', 'David', 'Jones', '07/07/97', 'male', '5700200716');

        const family0: Family = new Family('f00', [ person00, person01, person02, person03 ]);

        const person10: Person = new Person('p04', 'Amy', 'Brown', '20/12/70', 'female', '8225676149');
        const person11: Person = new Person('p05', 'Bill', 'Lee', '12/01/71', 'male', '9620344472');
        const person12: Person = new Person('p06', 'Clare', 'Brown', '13/03/95', 'female', '4160066348');
        const person13: Person = new Person('p07', 'David', 'Brown', '07/07/97', 'male', '5894678846');

        const family1: Family = new Family('f01', [ person10, person11, person12, person13 ]);

        const person20: Person = new Person('p08', 'Amy', 'James', '20/12/70', 'female', '8880028669');
        const person21: Person = new Person('p09', 'Bill', 'James', '12/01/71', 'male', '6068998983');
        const person22: Person = new Person('p10', 'Clare', 'James', '13/03/95', 'female', '4198838577');

        const family2: Family = new Family('f02', [ person20, person21, person22 ]);

        this.families = [ family0, family1, family2 ];

        const accessProcess00: AccessProcess = new AccessProcess('ds00', 'Phone access', '019 123 1234');
        const accessProcess01: AccessProcess = new AccessProcess('ds01', 'Online access', 'http://user@example.com');

        this.accessProcesses = [ accessProcess00, accessProcess01 ];

        const dataSource00: DataSource = new DataSource('ds00', 'Physical Health System', 'Data Source Test 1', [accessProcess00, accessProcess01]);
        const dataSource01: DataSource = new DataSource('ds01', 'Mental Health System', 'Data Source Test 2', []);

        this.dataSources = [ dataSource00, dataSource00 ];

        const organization0: Organization = new Organization('o00', 'Medical Information Gateway', 'Healthcare Gateway provided service', [dataSource00, dataSource01]);
        const organization1: Organization = new Organization('o01', 'Northumberland Tyne and Wear NHS Trust', 'Test Text 1', []);
        const organization2: Organization = new Organization('o02', 'ChildView Unit', 'Test Text 2', []);
        const organization3: Organization = new Organization('o03', 'Newcastle Hospital Trust NHS Trust', 'Test Text 3', []);

        this.organizations = [ organization0, organization1, organization2, organization3 ];

        const data0: Data = new Data('d0', 'NHS', '123 The Street, The Town, SW1 1AA');
        const data1: Data = new Data('d1', 'Local Authority', '132 The Street, The Town, SW1 1BB');
        const data2: Data = new Data('d2', 'NHS', 'Dr Jones');
        const data3: Data = new Data('d3', 'Local Authority', 'Mr Smith');

        this.datas = [ data0, data1, data2, data3 ];

        const dataType0: DataType = new DataType('da00', 'Address', [ data0, data1 ]);
        const dataType1: DataType = new DataType('da01', 'Contect', [ data2, data3 ]);

        this.dataTypes = [ dataType0, dataType1 ];
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

        return new Promise(resolve => setTimeout(() => resolve(family), 1000));
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

    public loadFamilyInformation(): Promise<DataType[]>
    {
        return new Promise(resolve => setTimeout(() => resolve(this.dataTypes), 1000));
    }

    public loadMIGInformation(nhsNumber: string): Promise<MIGInformation>
    {
        return this.httpClient.get("http://dataservice-mig.silver.arjuna.com/data/ws/mig?nhs_number=" + nhsNumber)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.loadMIGInformationSuccessHandler(response)))
                   .catch((error) => Promise.resolve(this.loadMIGInformationErrorHandler(error)));
    }

    private loadMIGInformationSuccessHandler(body: any): MIGInformation
    {
        let migEvents: MIGEvent[] = [];
        for (let event of body.events)
            migEvents.push(new MIGEvent(event.id, event.displayTerm, event.eventType, event.effectiveTime));

        return new MIGInformation(migEvents);
    }

    private loadMIGInformationErrorHandler(error: any): MIGInformation
    {
        console.log('MIG-Information Error Handler: ' + JSON.stringify(error));

        return null;
    }
}
