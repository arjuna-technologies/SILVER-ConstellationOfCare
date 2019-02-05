import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from "@angular/material";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

import {MIGUnifiedEvent} from '../../mig/mig-unified-event';

export class AppDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else {
      return date.toLocaleDateString("en-GB");
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS =
{
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
    //dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
}


@Component({
  selector: 'cnstll-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class FilterControlsComponent implements OnInit {

  constructor() {
  }

  // by default, we filter on the last two years

  @ViewChild('startDate', {read: ElementRef}) startDate: ElementRef;
  @ViewChild('endDate', {read: ElementRef}) endDate: ElementRef;

  @Input()
  public unified_events: MIGUnifiedEvent[];

  public filtered_events: MIGUnifiedEvent[];

  @Output()
  public filtered: EventEmitter<MIGUnifiedEvent[]> = new EventEmitter();

  @Input()
  public currentEndDate: Date = new Date();

  @Input()
  public currentStartDate: Date = new Date(this.currentEndDate.getFullYear() - 2, this.currentEndDate.getMonth(), this.currentEndDate.getDate());

  public filter() {
    this.filtered_events = this.unified_events.filter((unified_event) => {
      return unified_event.startTime >= this.currentStartDate && unified_event.endTime <= this.currentEndDate;
    });
    this.filtered.emit(this.filtered_events);
  }

  public showAllData() {
    // find earliest date
    let today = new Date();
    let earliestDate = today;
    for (let event of this.unified_events ) {
      if (event.startTime < earliestDate) {
        earliestDate = event.startTime;
      }
    }
    this.currentStartDate = earliestDate;
    this.currentEndDate = today;
    this.filter();
  }

  public showLastTwoYears() {
    // find earliest date
    let today = new Date();
    let twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
    this.currentStartDate = twoYearsAgo;
    this.currentEndDate = today;
    this.filter();
  }

  dateChanged(type:string, event:MatDatepickerInputEvent<Date>){
    if (type=='startDate') {
      this.currentStartDate = event.value;
    } else if (type=='endDate') {
      this.currentEndDate = event.value;
    } else {
      console.error(`invalid type ${type}`);
      return null;
    }
    this.filter();
  }

  ngOnInit() {
    this.filter(); // since we set a default 2 year span, we do a filter right from the start
  }
}
