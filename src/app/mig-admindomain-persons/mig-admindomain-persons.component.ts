import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGPerson } from '../mig-person';

@Component
({
    selector:    'cnstll-mig-admindomain-persons',
    templateUrl: './mig-admindomain-persons.component.html',
    styleUrls:   ['./mig-admindomain-persons.component.scss']
})
export class MIGAdminDomainPersonsComponent implements OnChanges, DoCheck
{
    public personDisplayedColumns = ['id', 'sex', 'forenames', 'surname', 'title'];
    public personDataSource: MatTableDataSource<MIGPerson>;

    @Input()
    public persons: MIGPerson[];

    @ViewChild('personPaginator')
    public personPaginator: MatPaginator;

    public constructor()
    {
        this.personDataSource      = new MatTableDataSource();
        this.personDataSource.data = null;
    }

    public ngOnChanges(): void
    {
        if (this.persons)
            this.personDataSource.data = this.persons;
        else
            this.personDataSource.data = null;

        if (this.personDataSource.paginator)
            this.personDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.personDataSource.paginator != this.personPaginator)
        {
            this.personDataSource.paginator = this.personPaginator;
            this.personDataSource.paginator.firstPage();
        }
    }
}
