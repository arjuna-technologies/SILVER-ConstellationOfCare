import { GoogleChartsLoaderService } from '../../googlecharts-loader.service';

import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

import { MIGEvent } from '../../mig/mig-event';

declare var google: any;

@Component
({
    selector:    'cnstll-patient-events',
    templateUrl: './patient-events.component.html',
    styleUrls:   ['./patient-events.component.scss']
})
export class PatientEventsComponent implements AfterViewInit
{
    @ViewChild('timeline')
    private timeline;

    @Input('events')
    private events: MIGEvent[];

    private chart;
    private dataTable;
    private options;

    public constructor(private googleChartsLoaderService: GoogleChartsLoaderService)
    {
    }

    public ngAfterViewInit(): void
    {
        this.googleChartsLoaderService.load()
            .then(() => { this.setupEvents(); this.drawChart() });
    }

    private setupEvents(): void
    {
        this.dataTable = new google.visualization.DataTable();

        this.dataTable.addColumn({ type: 'string', id: 'Event Name' });
        this.dataTable.addColumn({ type: 'date', id: 'Start' });
        this.dataTable.addColumn({ type: 'date', id: 'End' });
        this.dataTable.addRows(
            [
                [ 'Illness 1', new Date(2012, 3, 13), new Date(2014, 3, 14) ],
                [ 'Illness 2', new Date(2012, 4, 13), new Date(2014, 3, 14) ],
                [ 'Illness 3', new Date(2012, 3, 1), new Date(2014, 3, 14) ],
                [ 'Illness 4', new Date(2012, 4, 16), new Date(2014, 3, 14) ],
                [ 'Illness 5', new Date(2012, 5, 13), new Date(2014, 3, 14) ],
                [ 'Illness 6', new Date(2012, 2, 1), new Date(2014, 3, 14) ]
            ]
        );

        this.options =
        {
        };

        this.chart = new google.visualization.Timeline(this.timeline.nativeElement);

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
