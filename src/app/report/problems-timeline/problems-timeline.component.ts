import { GoogleChartsLoaderService } from '../../googlecharts-loader.service';

import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';

import { MIGEvent } from '../../mig/mig-event';
import {MIGInformationIndexService} from '../../mig/mig-information-index.service';
import {MatCheckbox} from "@angular/material";

declare var google: any;

@Component
({
    selector:    'cnstll-problems-timeline',
    templateUrl: 'problems-timeline.component.html',
    styleUrls:   ['problems-timeline.component.scss']
})
export class ProblemsTimelineComponent implements AfterViewInit, OnChanges
{
    @ViewChild('eventsTimeline')
    private timeline;

    @Input('events')
    private events: MIGEvent[];

    public event: MIGEvent;

    public includeInactive: boolean;

    private chart;
    private dataTable;
    private options;
    private safeToDraw = false;

    public constructor(private googleChartsLoaderService: GoogleChartsLoaderService,private migInformationIndexService: MIGInformationIndexService)
    {
      this.event           = null;
      this.includeInactive = true;
    }

    public ngAfterViewInit(): void
    {
        this.googleChartsLoaderService.load()
            .then(() => { this.setupEvents(); this.safeToDraw=true; this.populateDataTable(); this.drawChart() });
    }

    public doChange(): void
    {
      this.populateDataTable();
      if (this.safeToDraw) {
        this.drawChart();
      }
    }

    private populateDataTable(): void {
      if (this.dataTable) {
        let colors = [];
        if (this.safeToDraw) {
          this.dataTable = new google.visualization.DataTable();
          this.dataTable.addColumn({ type: 'string', id: 'id' });
          this.dataTable.addColumn({ type: 'string', id: 'Event Name' });
          this.dataTable.addColumn({ type: 'date', id: 'Start' });
          this.dataTable.addColumn({ type: 'date', id: 'End' });
          for (let event of this.events) {
            let problem = this.migInformationIndexService.problemMap.get(event.id);
            if (problem) {
              if (problem.status == 'A' || (this.includeInactive && problem.status == 'I')) {
                let id = event.id;
                let name = event.displayTerm;
                let startDate = new Date(event.effectiveTime);
                let endDate = new Date();
                if (problem.endTime) {
                  endDate = new Date(problem.endTime);
                }
                let color = '#AAAAAA';
                if (problem.significance == 'S') {
                  color = '#990000';
                }
                colors.push(color);
                this.dataTable.addRow([id, name, startDate, endDate]);
              }
            }
          }
        }

        // Reenable this to use colours for significance (red = severe, grey = minor)
        // this.options.colors = colors;
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
        title: "Timeline of Recent Health Problems",
        width: 1200,
        height: 400,
        hAxis: {
          title: 'Year',
          minValue: new Date(1988,0,1),
          maxValue: new Date(2022,0,1)
        }
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
        const selections: any[] = this.chart.getSelection();

        this.event = null;
        for (let selection of selections)
        {
            if ((selection.row !== undefined) && (selection.row !== null))
            {
                const eventId = this.dataTable.getValue(selection.row, 0);

                this.event = this.migInformationIndexService.eventMap.get(eventId);
            }
        }
    }
}
