import { GoogleChartsLoaderService } from '../../googlecharts-loader.service';

import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';

import { MIGEvent } from '../../mig/mig-event';

declare var google: any;

@Component
({
    selector:    'cnstll-patient-events',
    templateUrl: './patient-events.component.html',
    styleUrls:   ['./patient-events.component.scss']
})
export class PatientEventsComponent implements AfterViewInit, OnChanges
{
    @ViewChild('eventsTimeline')
    private timeline;

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
          let id = event.id;
          let name = event.displayTerm;
          let startDate = new Date(event.effectiveTime);
          let endDate = new Date(event.effectiveTime);
          this.dataTable.addRow([id,name, startDate, endDate]);
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
      this.chart = new google.visualization.Timeline(this.timeline.nativeElement);
      this.options = {
        timeline: {showRowLabels: false},
        width: 900
      };
      this.dataTable = new google.visualization.DataTable();
      this.dataTable.addColumn({ type: 'string', id: 'id' });
      this.dataTable.addColumn({ type: 'string', id: 'Event Name' });
      this.dataTable.addColumn({ type: 'date', id: 'Start' });
      this.dataTable.addColumn({ type: 'date', id: 'End' });
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
