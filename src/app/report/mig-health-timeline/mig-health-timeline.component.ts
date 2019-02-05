import {Component, Input, OnChanges, OnInit} from '@angular/core';
/*import * as d3timelines from 'd3-timelines';
import * as d3 from 'd3';*/
import TimelinesChart from 'timelines-chart';

import {MIGUnifiedEvent} from '../../mig/mig-unified-event';
import {MIGInformationIndexService} from '../../mig/mig-information-index.service';
//import {MatCheckbox} from "@angular/material";

//let width = 250;

@Component({
  selector: 'cnstll-mig-health-timeline',
  templateUrl: 'mig-health-timeline.component.html',
  styleUrls: ['mig-health-timeline.component.scss']
})
export class MIGHealthTimelineComponent implements OnInit, OnChanges {
  private chart: any;
  private safeToDraw = false;
  private stillNeedToDraw = false;

  // define the valid data types. The last one will be used as a catchall for any unexpected types.
  private valid_data_type_list: string[] = ['Active Problem', 'Inactive Problem', 'Encounter', 'Other'];

  public markSafeToDraw(): void {
    this.safeToDraw = true;
    if (this.stillNeedToDraw && this.active) {
      this.drawChart();
    }
  }

  public doChange(): void {
    if (this.safeToDraw) {
      this.drawChart();
    }
    else {
      this.stillNeedToDraw = true;
    }
  }

  @Input('unified_events')
  private unified_events: MIGUnifiedEvent[];

  @Input('active')
  private active: boolean;

  public includeInactive: boolean;

  private processedData: any = [];

  public constructor(private migInformationIndexService: MIGInformationIndexService) {
    this.includeInactive = true;
  }

  public ngOnInit(): void {
    if (this.safeToDraw && this.active) {
      this.drawChart();
    }
    else {
      this.stillNeedToDraw = true;
    }
  }

  public ngOnChanges(): void {
    if (this.safeToDraw && this.active) {
      this.drawChart();
    }
    else {
      this.stillNeedToDraw = true;
    }
  }

  private drawChart(): void {
    this.processEventDataForChart();
    let timelineEl = document.querySelector("#timeline");
    if (timelineEl) {
      timelineEl.innerHTML="";
      var today = new Date();
      var y = today.getFullYear();
      var m = today.getMonth();
      var d = today.getDate();
      var twoYearsAgo = new Date(y-2,m,d);

      this.chart = TimelinesChart()(timelineEl)
        .data(this.processedData)
        .leftMargin(200)
        .rightMargin(300)
        .width(1200)
        .enableOverview(true)
        .maxLineHeight(60)
        .zScaleLabel('Read Code')
        .zQualitative(true)
        .timeFormat('%d/%m/%Y')
      this.stillNeedToDraw = false;
    }
  }

  private processEventDataForChart(): void {
    var main = this;
    let dataByGroup = {};
    this.unified_events.forEach(function (event, index) {
      let name = event.code;
      let label = event.dataType;
      if (event.description) {
        label = `${event.description}<br/>[${event.code}]`;
      }
      let user = event.authorisingUserInRole;
      let endTimeToShow = event.endTime;
      if (+endTimeToShow - +event.startTime < 7) {
        // if less than two weeks long, make it two weeks long (so it shows up)
        endTimeToShow = new Date(endTimeToShow.getFullYear(), endTimeToShow.getMonth(), +event.startTime.getDate() + 14);
      }
      let group;
      if (main.valid_data_type_list.indexOf(event.dataType)>-1) {
        group = event.dataType;
      } else {
        // use the last category, assumed to be a catchall.
        group = main.valid_data_type_list[main.valid_data_type_list.length];
      }
      let dataToAddToGroup = {
        label: event.description,
        data: [{
          timeRange: [new Date(+event.startTime),new Date(+endTimeToShow)],
          val: event.eventType,
          labelVal: label + '<br/>' + event.authorisingUserInRole.split(" - ").join("<br/>") + '<br/>' + event.organisation
        }]
      };
      if (!dataByGroup.hasOwnProperty(group)) {
        dataByGroup[group] = [];
      }
      dataByGroup[group].push(dataToAddToGroup);
    });
    main.processedData = [];
    for (let group in dataByGroup) {
      let groupObj = {
        group: group,
        data: dataByGroup[group]
      }
      main.processedData.push(groupObj);
    }
  }

}
