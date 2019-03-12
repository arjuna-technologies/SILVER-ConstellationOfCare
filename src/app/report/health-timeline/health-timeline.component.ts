import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as d3timelines from 'd3-timelines';
import * as d3 from 'd3';

import {MIGUnifiedEvent} from '../../mig/mig-unified-event';
import {MIGInformationIndexService} from '../../mig/mig-information-index.service';
import {MatCheckbox} from "@angular/material";

let width = 250;

const minimum_event_length_in_days = 1;

@Component({
  selector: 'cnstll-health-timeline',
  templateUrl: './health-timeline.component.html',
  styleUrls: ['./health-timeline.component.scss']
})
export class HealthTimelineComponent implements OnInit, OnChanges {
  private chart: any;
  private svg: any;
  private width: any = 1200;
  private height: any = 700;
  private safeToDraw = false;
  private stillNeedToDraw = false;

  public markSafeToDraw(): void {
    this.safeToDraw = true;
    if (this.stillNeedToDraw) {
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

  public includeInactive: boolean;

  @Input('active')
  private active: boolean;

  private processedData: any = [];

  public constructor(private migInformationIndexService: MIGInformationIndexService) {
    this.includeInactive = true;
  }

  private clearAllBarSelections(): void {
    var bars = document.querySelectorAll(`#timeline rect`);
    if (bars && bars.length > 0) {
      bars.forEach(function (bar, index, a) {
        let label = bar["__data__"].name;
        bar.setAttribute('stroke', "#333333");
        bar.setAttribute('stroke-width', "0.5");
        document.getElementsByClassName('timeline-label')[index].setAttribute('font-weight', 'normal');
      });
    }
    var people = document.querySelectorAll("mat-cell.selected");
    if (people && people.length > 0) {
      people.forEach(function (person, index) {
        person.classList.remove("selected");
      });
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

  private lockOnto: any = function (clearBarSelectionsFunction, d, i, datum) {
    clearBarSelectionsFunction();
    document.querySelector(`rect.timelineSeries_${i}`).setAttribute('stroke', "#CC0000");
    document.querySelector(`rect.timelineSeries_${i}`).setAttribute('stroke-width', "2");
    document.getElementsByClassName('timeline-label')[i].setAttribute('font-weight', 'bold');
    let color = (<HTMLElement>document.querySelector(`rect.timelineSeries_${i}`)).style["fill"];
    document.getElementById('coloredDiv').style.backgroundColor = color;
    let userId = datum.user;
    let match = document.querySelector(`mat-cell[data-id="${userId}"`);
    let name = match.getElementsByClassName('name')[0].textContent;
    (<HTMLElement>match).classList.add("selected");
    document.getElementById('name').innerHTML = `${datum.label} [acc. ${name}]`;
  }

  private calculateChartHeight(bars) {
    return (bars.length * 25) + 50;
  }

  private drawChart(): void {
    let timeline = document.querySelector("#timeline");
    if (timeline) {
      this.processEventDataForChart();
      timeline.innerHTML = "";
      this.chart = d3timelines.timelines();
      let clearBarSelectionsFunction = this.clearAllBarSelections;
      let lockOntoFn = this.lockOnto;
      let ch = this.chart;
      //let colFn = stringToColor;
      let svg = this.svg;
      //this.chart.relativeTime();
      this.chart.rowSeparators("#CCCCCC");
      this.chart.tickFormat({
        format: function (d) {
          return d3.timeFormat("'%y")(d)
        },
        tickTime: d3.timeYears,
        tickInterval: d3.timeYear.every(1),
        tickSize: 1
      });
      this.chart.stack();
      this.chart.showTodayFormat({marginTop: 10, marginBottom: 10, width: 2, color: "#CCCCCC"}).showToday();
      this.chart.ending((new Date().setFullYear(new Date().getFullYear() + 1)));
      this.chart.showTimeAxisTick();
      this.chart.margin({left: width + 30, right: 30, top: 0, bottom: 0});
      this.chart.hover(function (d, i, datum) {
        (<HTMLElement>document.querySelector(`rect.timelineSeries_${i}`)).style.cursor = "pointer";
        lockOntoFn(clearBarSelectionsFunction, d, i, datum);
      });
      this.chart.click(function (d, i, datum) {
        (<HTMLElement>document.querySelector(`rect.timelineSeries_${i}`)).style.cursor = "pointer";
        lockOntoFn(clearBarSelectionsFunction, d, i, datum);
      });
      this.chart.colorProperty("name");
      let height = this.calculateChartHeight(this.processedData);
      this.chart.height = height;
      this.chart.width = this.width;
      this.svg = d3.select("#timeline").append("svg").attr("width", this.width).attr("height", height)
        .datum(this.processedData).call(this.chart);
      this.modifyLabels();
      this.stillNeedToDraw = false;
    }
  }

  private processEventDataForChart(): void {
    var main = this;
    main.processedData = [];
    this.unified_events.forEach(function (event, index) {
      let name = event.code;
      let label = event.dataType;
      if (event.description) {
        label = `[${event.code}] ${event.description}`;
      }
      let user = event.authorisingUserInRole;
      let endTimeToShow = event.endTime;
      if (+endTimeToShow - +event.startTime < minimum_event_length_in_days) {
        // if less than two weeks long, make it two weeks long (so it shows up)
        endTimeToShow = new Date(endTimeToShow.getFullYear(), endTimeToShow.getMonth(), +event.startTime.getDate() + minimum_event_length_in_days);
      }
      let times = [{"starting_time": event.startTime, "ending_time": endTimeToShow}];
      main.processedData.push({user: user, name: name, label: label, times: times});
    });
  }

  private modifyLabels(): void {
    let labels = document.querySelectorAll("text.timeline-label");
    labels.forEach(function (label, i) {
      var thisOne = d3.select(label),
        textWidth = thisOne.node().getComputedTextLength(),    // Width of text in pixel.
        initialText = thisOne.text(),                          // Initial text.
        textLength = initialText.length,                    // Length of text in characters.
        text = initialText,
        precision = 10, //textWidth / width,                // Adjustable precision.
        maxIterations = 100; // width;                      // Set iterations limit.
      if (textWidth > width - 50) {
        while (maxIterations > 0 && text.length > 0 && Math.abs(width - textWidth) > precision) {
          text = (textWidth >= width) ? text.slice(0, -textLength * 0.15) : initialText.slice(0, textLength * 1.15);
          thisOne.text(text + '...');
          textWidth = thisOne.node().getComputedTextLength();
          textLength = text.length;
          maxIterations--;
        }
      }
    });
  }

  public ngOnInit(): void {
    if (this.safeToDraw && this.active) {
      this.drawChart();
    }
    else {
      this.stillNeedToDraw = true;
    }
  }
}
