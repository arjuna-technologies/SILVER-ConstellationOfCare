import { Component, OnChanges, DoCheck, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource }     from '@angular/material';

import { MIGInformationIndexService } from '../mig-information-index.service';

import { MIGUnifiedEvent } from '../mig-unified-event';

@Component
({
  selector:    'cnstll-mig-healthdomain-unified-events',
  templateUrl: './mig-healthdomain-unified-events.component.html',
  styleUrls:   ['./mig-healthdomain-unified-events.component.scss']
})
export class MIGHealthDomainUnifiedEventsComponent implements OnChanges, DoCheck
{
  public eventDisplayedColumns: string[];
  public eventDataSource: MatTableDataSource<MIGUnifiedEvent>;

  @Input()
  public unified_events: MIGUnifiedEvent[];
  @Input()
  public format: string;

  @ViewChild('eventPaginator')
  public eventPaginator: MatPaginator;

  public constructor(private migInformationIndexService: MIGInformationIndexService)
  {
    this.eventDisplayedColumns = [/*'id', 'patient',*/ 'dataType', 'eventType', 'description', 'code', 'significance', 'startTime', 'endTime', 'availabilityTime', 'authorisingUserInRole', 'enteredByUserInRole', 'organisation'];
    this.eventDataSource       = new MatTableDataSource();
    this.eventDataSource.data  = null;
  }

  public ngOnChanges(): void
  {
    this.eventDisplayedColumns = [/*'id', 'patient',*/ 'dataType', 'eventType', 'description', 'code', 'significance', 'startTime', 'endTime', 'availabilityTime', 'authorisingUserInRole', 'enteredByUserInRole', 'organisation'];

    if (this.unified_events)
      this.eventDataSource.data = this.unified_events;
    else
      this.eventDataSource.data = null;

    if (this.eventDataSource.paginator)
      this.eventDataSource.paginator.firstPage();
  }

  public ngDoCheck(): void
  {
    if (this.eventDataSource.paginator != this.eventPaginator)
    {
      this.eventDataSource.paginator = this.eventPaginator;
      this.eventDataSource.paginator.firstPage();
    }
  }
}
