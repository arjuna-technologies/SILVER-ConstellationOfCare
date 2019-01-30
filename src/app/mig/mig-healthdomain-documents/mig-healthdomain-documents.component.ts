import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }                from '@angular/material';

import { MIGDocument } from '../mig-document';

@Component
({
    selector:    'cnstll-mig-healthdomain-documents',
    templateUrl: './mig-healthdomain-documents.component.html',
    styleUrls:   ['./mig-healthdomain-documents.component.scss']
})
export class MIGHealthDomainDocumentsComponent implements OnChanges, DoCheck
{
    public documentDisplayedColumns = [ 'id', 'name', 'description', 'observations', 'code' ];
    public documentDataSource: MatTableDataSource<MIGDocument>;

    @Input()
    public documents: MIGDocument[];
    @Input()
    public format: string;

    @ViewChild('documentPaginator')
    public documentPaginator: MatPaginator;

    public constructor()
    {
        this.documentDataSource      = new MatTableDataSource();
        this.documentDataSource.data = null;
    }

    public ngOnChanges(): void
    {
        if (this.documents) {
            this.documentDataSource.data = this.documents;
          if (this.format === 'raw')
              this.documentDisplayedColumns = [ 'id', 'name', 'description', 'observations', 'code'];
            else
              this.documentDisplayedColumns = [ 'description', 'name' ];
          }
        else
            this.documentDataSource.data = null;

        if (this.documentDataSource.paginator)
            this.documentDataSource.paginator.firstPage();
    }

    public ngDoCheck(): void
    {
        if (this.documentDataSource.paginator != this.documentPaginator)
        {
            this.documentDataSource.paginator = this.documentPaginator;
            this.documentDataSource.paginator.firstPage();
        }
    }
}
