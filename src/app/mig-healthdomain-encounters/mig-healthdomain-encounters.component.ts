import { Component, DoCheck, ViewChild }    from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MIGEncounter } from '../mig-encounter';

@Component
({
    selector:    'cnstll-mig-healthdomain-encounters',
    templateUrl: './mig-healthdomain-encounters.component.html',
    styleUrls:   ['./mig-healthdomain-encounters.component.scss']
})
export class MIGHealthDomainEncountersComponent implements DoCheck
{
    public encounterDisplayedColumns = ['id'];
    public encounterDataSource: MatTableDataSource<MIGEncounter>;

    @ViewChild('encounterPaginator')
    public encounterPaginator: MatPaginator;

    public constructor()
    {
        this.encounterDataSource = new MatTableDataSource();
    }

    public ngDoCheck(): void
    {
        if (this.encounterDataSource.paginator != this.encounterPaginator)
            this.encounterDataSource.paginator = this.encounterPaginator;
    }
}
