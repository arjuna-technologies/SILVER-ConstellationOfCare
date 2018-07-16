import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGPerson } from '../mig-person';

@Component
({
    selector:    'cnstll-mig-admindomain-persons',
    templateUrl: './mig-admindomain-persons.component.html',
    styleUrls:   ['./mig-admindomain-persons.component.scss']
})
export class MIGAdminDomainPersonsComponent implements OnChanges, DoCheck
{
    public personDisplayedColumns: string[];
    public personDataSource: MatTableDataSource<MIGPerson>;

    @Input()
    public persons: MIGPerson[];
    @Input()
    public format: string;

    @ViewChild('personPaginator')
    public personPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.personDisplayedColumns = ['id', 'sex', 'forenames', 'surname', 'title'];
        this.personDataSource       = new MatTableDataSource();
        this.personDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.personDisplayedColumns = ['id', 'sex', 'forenames', 'surname', 'title'];
        else
            this.personDisplayedColumns = ['title', 'forenames', 'surname', 'sex'];

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
