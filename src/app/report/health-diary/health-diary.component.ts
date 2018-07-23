import { GoogleChartsLoaderService } from '../../googlecharts-loader.service';

import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';

import { MIGEvent } from '../../mig/mig-event';

declare var google: any;

@Component({
  selector: 'cnstll-health-diary',
  templateUrl: './health-diary.component.html',
  styleUrls: ['./health-diary.component.scss']
})
export class HealthDiaryComponent implements AfterViewInit, OnChanges
{
  @ViewChild('eventsCalendar')
  private calendar;

  @Input('events')
  private events: MIGEvent[];

  private chart;
  private dataTable;
  private options;
  private safeToDraw = false;

  public constructor(private googleChartsLoaderService: GoogleChartsLoaderService)
  {
  }

  public ngAfterViewInit(): void
  {
    this.googleChartsLoaderService.load()
      .then(() => { this.setupEvents(); this.safeToDraw=true; this.drawChart() });
  }

  private populateDataTable(): void {
    if (this.dataTable) {
      //this.dataTable.clear();
      for (let event of this.events) {
        let eventDate = new Date(event.effectiveTime);
        if (eventDate > new Date(1970,0,1)) {
          this.dataTable.addRow([eventDate, 1]);
        }
      }
    }
  }

  public ngOnChanges(): void {
    this.populateDataTable();
    if (this.safeToDraw) {
      this.drawChart();
    }
  }

  private setupEvents(): void
  {
    this.chart = new google.visualization.Calendar(this.calendar.nativeElement);
    this.options = {
      title: "Health Diary",
      width: 1200,
      height: 800,
    };
    this.dataTable = new google.visualization.DataTable();
    this.dataTable.addColumn({ type: 'date', id: 'Date' });
    this.dataTable.addColumn({ type: 'number', id: 'Event' });
    this.populateDataTable();
    google.visualization.events.addListener(this.chart, 'select', () => this.selectHandler());
  }

  private drawChart(): void
  {
    this.chart.draw(this.dataTable, this.options);
  }

  private selectHandler(): void
  {
  }
}
