import { GoogleChartsLoaderService } from '../../googlecharts-loader.service';

import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';

import { MIGProblem } from '../../mig/mig-problem';

declare var google: any;

@Component
({
  selector:    'cnstll-patient-problems',
  templateUrl: './patient-problems.component.html',
  styleUrls:   ['./patient-problems.component.scss']
})
export class PatientProblemsComponent implements AfterViewInit, OnChanges
{
  @ViewChild('problemsTimeline')
  private timeline;

  @Input('problems')
  private problems: MIGProblem[];

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
      .then(() => { this.setupProblems(); this.safeToDraw = true; this.drawChart() });
  }

  private populateDataTable(): void {
    if (this.dataTable) {
      //this.dataTable.clear();
      for (let problem of this.problems) {
        let id = problem.id;
        let name = problem.id;
        let startDate = new Date(problem.endTime);
        let endDate = new Date(problem.endTime);
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

  private setupProblems(): void
  {
    this.chart = new google.visualization.Timeline(this.timeline.nativeElement);
    this.options = {
      timeline: {showRowLabels: false},
      width: 900
    };
    this.dataTable = new google.visualization.DataTable();
    this.dataTable.addColumn({ type: 'string', id: 'id' });
    this.dataTable.addColumn({ type: 'string', id: 'Problem Name' });
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
