import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from "@angular/material";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormControl} from '@angular/forms';

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

  constructor(){
    this.bind_data();
  }

  bind_data() {
    this.data_type_filter.setValue(this.data_type_list.slice()); // set all types enabled
    /*
    const default_data_type_list: any[] = [
      this.data_type_list[0], // Active Problems
      this.data_type_list[1], // Inactive Problems
      this.data_type_list[2], // Encounters
      this.data_type_list[3]  // Other
    ];
    this.data_type_filter.setValue(default_data_type_list);
    */

  }

  // by default, we filter on the last two years

  @ViewChild('startDate', {read: ElementRef}) startDate: ElementRef;
  @ViewChild('endDate', {read: ElementRef}) endDate: ElementRef;

  @Input()
  public unified_events: MIGUnifiedEvent[];

  public filtered_events: MIGUnifiedEvent[];

  public data_type_filter: FormControl = new FormControl();

  public data_type_list: string[] = ['Active Problem', 'Inactive Problem', 'Encounter', 'Other'];
  // TODO this should move up to mig information, and be passed in here, and to health timeline

  @Output()
  public filtered: EventEmitter<MIGUnifiedEvent[]> = new EventEmitter();

  @Input()
  public current_end_date: Date = new Date();

  @Input()
  public current_start_date: Date = new Date(this.current_end_date.getFullYear() - 2, this.current_end_date.getMonth(), this.current_end_date.getDate());

  public filter(start_date:Date,end_date:Date, selected_data_types:string[] ) {
    this.filtered_events = this.unified_events.filter((unified_event) => {
      let includeThisEvent = false;
      if (unified_event.startTime >= start_date && unified_event.endTime <= end_date) {
        if (selected_data_types.indexOf(unified_event.dataType)>-1) {
          includeThisEvent = true;
        }
      }
      return includeThisEvent;
    });
    this.filtered.emit(this.filtered_events);
  }

  public check_if_all_data_types_selected() {
    return this.data_type_filter.value.length == this.data_type_list.length;
  }

  public data_types_changed(event) {
    // assumption: this.data_type_filter.value list will eventually be correct, but may not be yet, which is why we don't use it.
    this.filter(this.current_start_date,this.current_end_date,event.value);
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
    this.current_start_date = earliestDate;
    this.current_end_date = today;
    this.filter(this.current_start_date,this.current_end_date,this.data_type_filter.value);
  }

  public showLastTwoYears() {
    // find earliest date
    let today = new Date();
    let twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
    this.current_start_date = twoYearsAgo;
    this.current_end_date = today;
    this.filter(this.current_start_date,this.current_end_date,this.data_type_filter.value);
  }

  dateChanged(type:string, event:MatDatepickerInputEvent<Date>){
    if (type=='startDate') {
      this.current_start_date = event.value;
    } else if (type=='endDate') {
      this.current_end_date = event.value;
    } else {
      console.error(`invalid type ${type}`);
      return null;
    }
    this.filter(this.current_start_date,this.current_end_date,this.data_type_list);
  }

  ngOnInit() {
    // since we set a default 2 year span, we do a filter right from the start
    this.filter(this.current_start_date,this.current_end_date,this.data_type_list);
  }
}
