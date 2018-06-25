import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGEncounter } from '../mig-encounter';

@Component
({
    selector:    'cnstll-mig-healthdomain-encounters',
    templateUrl: './mig-healthdomain-encounters.component.html',
    styleUrls:   ['./mig-healthdomain-encounters.component.scss']
})
export class MIGHealthDomainEncountersComponent implements OnChanges, DoCheck
{
    public encounterDisplayedColumns = ['id'];
    public encounterDataSource: MatTableDataSource<MIGEncounter>;

    @Input()
    public encounters: MIGEncounter[];

    @ViewChild('encounterPaginator')
    public encounterPaginator: MatPaginator;

    public constructor()
    {
        this.encounterDataSource      = new MatTableDataSource();
        this.encounterDataSource.data = null;
    }

    public ngOnChanges(): void
    {
        if (this.encounters)
            this.encounterDataSource.data = this.encounters;
        else
            this.encounterDataSource.data = null;

        if (this.encounterDataSource.paginator)
            this.encounterDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.encounterDataSource.paginator != this.encounterPaginator)
        {
            this.encounterDataSource.paginator = this.encounterPaginator;
            this.encounterDataSource.paginator.firstPage();
        }
    }
}
