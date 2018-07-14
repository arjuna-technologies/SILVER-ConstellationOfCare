import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGProblem } from '../mig-problem';

@Component
({
    selector:    'cnstll-mig-healthdomain-problems',
    templateUrl: './mig-healthdomain-problems.component.html',
    styleUrls:   ['./mig-healthdomain-problems.component.scss']
})
export class MIGHealthDomainProblemsComponent implements OnChanges, DoCheck
{
    public problemDisplayedColumns = ['id', 'status', 'significance', 'expectedDuration', 'endTime'];
    public problemDataSource: MatTableDataSource<MIGProblem>;

    @Input()
    public problems: MIGProblem[];
    @Input()
    public format: string;

    @ViewChild('problemPaginator')
    public problemPaginator: MatPaginator;

    public constructor(private migInformationIndexService: MIGInformationIndexService)
    {
        this.problemDisplayedColumns = ['id', 'status', 'significance', 'expectedDuration', 'endTime'];
        this.problemDataSource       = new MatTableDataSource();
        this.problemDataSource.data  = null;
    }

    public ngOnChanges(): void
    {
        if (this.format === 'raw')
            this.problemDisplayedColumns = ['id', 'status', 'significance', 'expectedDuration', 'endTime'];
        else
            this.problemDisplayedColumns = ['mappedId', 'status', 'significance', 'expectedDuration', 'endTime'];

        if (this.problems)
            this.problemDataSource.data = this.problems;
        else
            this.problemDataSource.data = null;

        if (this.problemDataSource.paginator)
            this.problemDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.problemDataSource.paginator != this.problemPaginator)
        {
            this.problemDataSource.paginator = this.problemPaginator;
            this.problemDataSource.paginator.firstPage();
        }
    }

    public idMapping(id: string): string
    {
        return this.migInformationIndexService.basicEventMapping(id);
    }
}
