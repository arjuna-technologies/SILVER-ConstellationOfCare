import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as d3timelines from 'd3-timelines';
import * as d3 from 'd3';

import {MIGEvent} from '../../mig/mig-event';
import {MIGInformationIndexService} from '../../mig/mig-information-index.service';
import {MatCheckbox} from "@angular/material";

let width = 250;

@Component({
  selector: 'cnstll-health-timeline',
  templateUrl: './health-timeline.component.html',
  styleUrls: ['./health-timeline.component.scss']
})
export class HealthTimelineComponent implements OnInit, OnChanges {
  /*private labelTestData: any = [
    {name:'one', label: "step1", times: [{"starting_time": 0, "ending_time": 135}]},
    {name:'two', label: "step2", times: [{"starting_time": 120, "ending_time": 160}, ]},
    {name:'three', label: "step3", times: [{"starting_time": 160, "ending_time": 175}]}
  ];*/

  private chart: any;
  private svg: any;
  private width: any = 1000;
  private height: any = 700;


  public doChange(): void
  {
    this.processEventDataForChart();
    this.drawChart();
  }

  @Input('events')
  private events: MIGEvent[];

  public includeInactive: boolean;

  private processedData: any = [];

  public constructor(private migInformationIndexService: MIGInformationIndexService) {
    this.includeInactive = true;
  }

  private clearAllBarSelections: any = function() {
    var bars = document.querySelectorAll(`#timeline rect`);
    if (bars && bars.length>0) {
      bars.forEach(function(bar,index,a) {
        let label = bar["__data__"].name;
        bar.setAttribute('stroke',"#333333");
        bar.setAttribute('stroke-width',"0.5");
        document.getElementsByClassName('timeline-label')[index].setAttribute('font-weight','normal');
      });
    }
  }

  public ngOnChanges(): void {
    this.drawChart();
  }

  private lockOnto: any = function(clearBarSelectionsFunction,d,i,datum) {
    clearBarSelectionsFunction();
    document.querySelector(`rect.timelineSeries_${i}`).setAttribute('stroke',"#CC0000");
    document.querySelector(`rect.timelineSeries_${i}`).setAttribute('stroke-width',"2");
    document.getElementsByClassName('timeline-label')[i].setAttribute('font-weight','bold');
    let color = (<HTMLElement>document.querySelector(`rect.timelineSeries_${i}`)).style["fill"];
    document.getElementById('coloredDiv').style.backgroundColor=color;
    document.getElementById('name').innerText=datum.label;
  }


  private drawChart(): void
  {
    this.processEventDataForChart();
    document.querySelector("#timeline").innerHTML="";
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
        return d3.timeFormat("%Y")(d)
      },
      tickTime: d3.timeYears,
      tickInterval:d3.timeYear.every(1),
      tickSize: 1
    });
    this.chart.stack();
    this.chart.showTodayFormat({marginTop:10, marginBottom: 10, width: 2, color: "#CCCCCC"}).showToday();
    this.chart.ending((new Date().setFullYear(new Date().getFullYear() + 1)));
    this.chart.showTimeAxisTick();
    this.chart.margin({left: width+30, right: 30, top: 0, bottom: 0});
    this.chart.hover(function (d, i, datum) {
      lockOntoFn(clearBarSelectionsFunction,d,i,datum);
    });
    this.chart.click(function (d, i, datum) {
      lockOntoFn(clearBarSelectionsFunction,d,i,datum);
    });
    this.chart.colorProperty("name");
    this.svg = d3.select("#timeline").append("svg").attr("width", this.width).attr("height", this.height)
      .datum(this.processedData).call(this.chart);
    this.modifyLabels();
  }

  private processEventDataForChart() {
    var main = this;
    main.processedData=[];
    this.events.forEach(function(event,index) {
      let problem = main.migInformationIndexService.problemMap.get(event.id);
      if (problem) {
        if (problem.status == 'A' || (main.includeInactive && problem.status == 'I')) {
          let name = event.displayTerm;
          let label = event.displayTerm;
          let startTime = new Date(event.effectiveTime);
          let endTime = new Date();
          if (problem.endTime) {
            endTime = new Date(problem.endTime);
          }
          let times = [{"starting_time": startTime, "ending_time": endTime}];
          main.processedData.push({name: name, label: label, times: times});
        }
      }
    });
  }

  private modifyLabels: any = function() {
    let labels = document.querySelectorAll("text.timeline-label");
    labels.forEach(function(label,i) {
      var thisOne = d3.select(label),
        textWidth = thisOne.node().getComputedTextLength(),    // Width of text in pixel.
        initialText = thisOne.text(),                          // Initial text.
        textLength = initialText.length,                    // Length of text in characters.
        text = initialText,
        precision = 10, //textWidth / width,                // Adjustable precision.
        maxIterations = 100; // width;                      // Set iterations limit.
      if (textWidth>width-50) {
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

  public ngOnInit() {
    this.drawChart();
  }
}
