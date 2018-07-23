import { GoogleChartsLoaderService } from '../../googlecharts-loader.service';

import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';

import { MIGEvent } from '../../mig/mig-event';

declare var google: any;

@Component
({
    selector:    'cnstll-health-diary',
    templateUrl: './health-diary.component.html',
    styleUrls:   ['./health-diary.component.scss']
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
    private googleChartsSetup: boolean;

    public constructor(private googleChartsLoaderService: GoogleChartsLoaderService)
    {
        this.googleChartsSetup = false;
    }

    public ngAfterViewInit(): void
    {
        this.googleChartsLoaderService.load()
            .then(() => { this.setupEvents(); this.populateDataTable(); this.drawChart() });
    }

    public ngOnChanges(): void
    {
        if (this.googleChartsSetup)
        {
            this.populateDataTable();
            this.drawChart();
        }
    }

    private populateDataTable(): void
    {
        if (this.googleChartsSetup)
        {
            this.dataTable = new google.visualization.DataTable();
            this.dataTable.addColumn({ type: 'date', id: 'Date' });
            this.dataTable.addColumn({ type: 'number', id: 'Event' });

            for (let event of this.events)
            {
                let eventDate = new Date(event.effectiveTime);

                console.log('Date:      ', eventDate);

                if (eventDate > new Date(2000,0,1))
                    this.dataTable.addRow([eventDate, 1]);
            }
        }
    }

    private setupEvents(): void
    {
        this.googleChartsSetup = true;

        this.chart = new google.visualization.Calendar(this.calendar.nativeElement);
        this.options =
        {
        };
        google.visualization.events.addListener(this.chart, 'select', () => this.selectHandler());        
    }

    private drawChart(): void
    {
        console.log('Data Table ', this.dataTable);
        this.chart.draw(this.dataTable, this.options);
    }

    private selectHandler(): void
    {
    }
}
