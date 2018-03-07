import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

import { GoogleChartsLoaderService } from '../googlecharts-loader.service';

declare var google: any;

@Component
({
    selector:    'cnstll-timeline',
    templateUrl: './timeline.component.html',
    styleUrls:   ['./timeline.component.scss']
})
export class TimelineComponent implements AfterViewInit
{
    @ViewChild('timeline')
    private timeline;

    @Input()
    private data;

    private chart;
    private dataTable;
    private options;

    public constructor(private googleChartsLoaderService: GoogleChartsLoaderService)
    {
    }

    public ngAfterViewInit()
    {
      this.googleChartsLoaderService.load()
          .then(() => { this.setupTimeline(); this.drawMap() });
    }

    private selectHandler()
    {
        const selections = this.chart.getSelection();
        for (const selection of selections)
            console.log('-' + JSON.stringify(selection));
    }

    private setupTimeline()
    {
        this.dataTable = new google.visualization.DataTable();

        this.dataTable.addColumn({ type: 'string', id: 'Organization' });
        this.dataTable.addColumn({ type: 'string', id: 'Reason' });
        this.dataTable.addColumn({ type: 'string', role: 'tooltip' });
        this.dataTable.addColumn({ type: 'date', id: 'Start' });
        this.dataTable.addColumn({ type: 'date', id: 'End' });
        this.dataTable.addRows(
            [
                [ 'NUT NHS HT', 'Low Mood', 'Low Mood', new Date(2017, 9, 29), new Date(2017, 11, 3) ],
                [ 'NTW NHS HT', 'Low Mood', 'Low Mood', new Date(2017, 10, 3),  new Date(2018, 1, 1) ],
                [ 'ChildView', 'School Attendance', 'School Attendance', new Date(2017, 11, 3),  new Date(2018, 1, 3) ]
            ]
        );

        this.options =
        {
        };

        this.chart = new google.visualization.Timeline(this.timeline.nativeElement);

        google.visualization.events.addListener(this.chart, 'select', () => this.selectHandler());
    }

    private drawMap()
    {
        this.chart.draw(this.dataTable, this.options);
    }
}
