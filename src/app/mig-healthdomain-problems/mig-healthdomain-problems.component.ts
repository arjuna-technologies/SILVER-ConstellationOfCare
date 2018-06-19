import { Component, DoCheck, ViewChild }    from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MIGProblem } from '../mig-problem';

@Component
({
    selector:    'cnstll-mig-healthdomain-problems',
    templateUrl: './mig-healthdomain-problems.component.html',
    styleUrls:   ['./mig-healthdomain-problems.component.scss']
})
export class MIGHealthDomainProblemsComponent implements DoCheck
{
    public problemDisplayedColumns = ['id', 'status', 'significance', 'expectedDuration', 'endTime'];
    public problemDataSource: MatTableDataSource<MIGProblem>;

    @ViewChild('problemPaginator')
    public problemPaginator: MatPaginator;

    public constructor()
    {
        this.problemDataSource = new MatTableDataSource();
    }

    public ngDoCheck(): void
    {
        if (this.problemDataSource.paginator != this.problemPaginator)
           this.problemDataSource.paginator = this.problemPaginator;
    }
}
