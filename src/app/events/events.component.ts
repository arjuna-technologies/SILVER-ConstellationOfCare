import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

import { GoogleChartsLoaderService } from '../googlecharts-loader.service';

declare var google: any;

@Component
({
    selector:    'cnstll-events',
    templateUrl: './events.component.html',
    styleUrls:   ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit
{
    @ViewChild('events')
    private calendar;

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
            .then(() => { this.setupEvents(); this.drawMap() });
    }

    private selectHandler()
    {
        const selections = this.chart.getSelection();
        for (const selection of selections)
            console.log('-' + JSON.stringify(selection));
    }

    private setupEvents()
    {
        this.dataTable = new google.visualization.DataTable();

        this.dataTable.addColumn({ type: 'date', id: 'Date' });
        this.dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
        this.dataTable.addRows(
            [
                [ new Date(2012, 3, 13), 37032 ],
                [ new Date(2012, 3, 14), 38024 ],
                [ new Date(2012, 3, 15), 38024 ],
                [ new Date(2012, 3, 16), 38108 ],
                [ new Date(2012, 3, 17), 38229 ],
                // Many rows omitted for brevity.
                [ new Date(2013, 9, 4), 38177 ],
                [ new Date(2013, 9, 5), 38705 ],
                [ new Date(2013, 9, 12), 38210 ],
                [ new Date(2013, 9, 13), 38029 ],
                [ new Date(2013, 9, 19), 38823 ],
                [ new Date(2013, 9, 23), 38345 ],
                [ new Date(2013, 9, 24), 38436 ],
                [ new Date(2013, 9, 30), 38447 ]
            ]
        );

        this.options =
        {
        };

        this.chart = new google.visualization.Calendar(this.calendar.nativeElement);

        google.visualization.events.addListener(this.chart, 'select', () => this.selectHandler());
    }

    private drawMap()
    {
        this.chart.draw(this.dataTable, this.options);
    }
}
