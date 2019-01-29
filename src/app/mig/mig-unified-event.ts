import {MIGEncounter} from "./mig-encounter";
import {MIGProblem} from "./mig-problem";
import {MIGInformationIndexService} from './mig-information-index.service';

export class MIGUnifiedEvent {
  public id: string;
  public patient: string;
  public dataType: string;
  public eventType: string;
  public startTime: Date;
  public endTime: Date;
  public hideEndTime: boolean;
  public availabilityTime: Date;
  public authorisingUserInRole: string;
  public enteredByUserInRole: string;
  public code: string;
  public description: string;
  public organisation: string;
  public significance: string;

  public constructor(id: string, patient: string, dataType: string, eventType: string, startTime: Date, endTime: Date, hideEndTime: boolean, availabilityTime: Date, authorisingUserInRole: string, enteredByUserInRole: string, code: string, description: string, organisation: string, significance: string) {
    this.id = id;
    this.patient = patient;
    this.dataType = dataType;
    this.eventType = eventType;
    this.startTime = startTime;
    this.endTime = endTime;
    this.hideEndTime = hideEndTime;
    this.availabilityTime = availabilityTime;
    this.authorisingUserInRole = authorisingUserInRole;
    this.enteredByUserInRole = enteredByUserInRole;
    this.code = code;
    this.description = description;
    this.organisation = organisation;
    this.significance = significance;
  }

  public static createFromEncounter(migInformationIndexService: MIGInformationIndexService,encounter: MIGEncounter): MIGUnifiedEvent[] {
    let unified_events: MIGUnifiedEvent[] = [];
    let done_event_ids : string[] = [];
    for (let component of encounter.components) {
      let encounter_event_id = component.event;
      // only add events we've not already added for this encounter
      if (done_event_ids.indexOf(encounter_event_id)==-1) {
        done_event_ids.push(encounter_event_id);
        let event = migInformationIndexService.eventMap.get(encounter_event_id);
        let id = encounter.id + "_" + encounter_event_id;
        let patient = MIGUnifiedEvent.patientMapping(migInformationIndexService, encounter.patient);
        let dataType = "Encounter";
        let eventType = event.eventType;
        let startTime = new Date(event.effectiveTime);
        let hideEndTime = true;
        // fallback will be that event has no length.
        let endTime = startTime;
        // if problem has duration set but no end time, use that to calculate end time - if we can.
        // assumed format = "nn D" e.g. "28 D".
        // if can't interpret, rely on the fallback above
        let time = MIGUnifiedEvent.getDateFromDuration(startTime, encounter.duration);
        if (time) {
          endTime = time;
          hideEndTime = false;
        }
        let availabilityTime = new Date(event.availabilityTimeStamp);
        let authorisingUserInRole = MIGUnifiedEvent.userInRoleMapping(migInformationIndexService,event.authorisingUserInRole);
        let enteredByUserInRole = MIGUnifiedEvent.userInRoleMapping(migInformationIndexService,event.enteredByUserInRole);
        let code = event.code ? event.code["code"] : null;
        let description = event.code ? event.code["displayName"] : null;
        let organisation = MIGUnifiedEvent.organisationMapping(migInformationIndexService, event.organisation); // use event org instead of set from encounter
        let significance = null;
        let unified_event = new MIGUnifiedEvent(id, patient, dataType, eventType, startTime, endTime, hideEndTime, availabilityTime, authorisingUserInRole, enteredByUserInRole, code, description, organisation, significance);
        unified_events.push(unified_event);
      }
    }
    return unified_events;
  }

  public static patientMapping(migInformationIndexService: MIGInformationIndexService,patientId: string): string {
    return migInformationIndexService.basicPatientMapping(patientId);
  }

  public static organisationMapping(migInformationIndexService: MIGInformationIndexService,organisationId: string): string {
    let org = migInformationIndexService.basicOrganisationMapping(organisationId);
    if (org == "EMISWebCR1 50005") {
      org = "EMIS Test Org";
    }
    return org;
  }

  public static userInRoleMapping(migInformationIndexService: MIGInformationIndexService, userInRoleId: string): string {
    return migInformationIndexService.basicUserInRoleMapping(userInRoleId);
  }

  public static significanceMapping(significance: string): string
  {
    if (significance == 'S')
      return 'Significant';
    else if (significance == 'M')
      return 'Minor';
    else
      return 'Unknown';
  }

  /**
   *
   * @param startTime the start date time to add onto
   * @param durationString the string - expects a string such as "28 D"
   */
  private static getDateFromDuration(startTime:Date,durationString:string) {
    let endTime = null;
    if (durationString) {
      let parts = durationString.split(" ");
      if (parts.length == 2 && parts[1].toUpperCase() == "D") {
        if (parseInt(parts[0]) > 0) {
          endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate() + parseInt(parts[0]));
        }
      }
    }
    return endTime;
  }

  public static createFromProblem(migInformationIndexService: MIGInformationIndexService,problem: MIGProblem): MIGUnifiedEvent {
    let id = problem.id;
    let event = migInformationIndexService.eventMap.get(id);
    let patient = MIGUnifiedEvent.patientMapping(migInformationIndexService,event.patient);
    let dataType = problem.status == 'A' ? "Active Problem" : (problem.status == 'I' ? "Inactive Problem" : `Problem (${problem.status})`);
    let eventType = event.eventType;
    let startTime = new Date(event.effectiveTime);
    let endTime;
    let hideEndTime = true;
    if (problem.status == 'A') {
      // for active problems, fallback will be to end today.
      endTime = new Date();
    } else {
      // otherwise fallback will be that event has no length.
      endTime = startTime;
    }
    // if problem has duration set but no end time, use that to calculate end time - if we can.
    // assumed format = "nn D" e.g. "28 D".
    // if can't interpret, rely on the fallbacks above
    let time = MIGUnifiedEvent.getDateFromDuration(startTime,problem.expectedDuration)
    if (time) {
      endTime = time;
      hideEndTime = false;
    }
    if (problem.endTime) {
      // if end time is set on problem, use that (in preference to anything else)
      endTime = new Date(problem.endTime);
      hideEndTime = false;
    }

    let availabilityTime = new Date(event.availabilityTimeStamp);
    let authorisingUserInRole = MIGUnifiedEvent.userInRoleMapping(migInformationIndexService,event.authorisingUserInRole);
    let enteredByUserInRole = MIGUnifiedEvent.userInRoleMapping(migInformationIndexService,event.enteredByUserInRole);
    let code = event.code["code"];
    let description = event.code["displayName"];
    let organisation = MIGUnifiedEvent.organisationMapping(migInformationIndexService,event.organisation);
    let significance = MIGUnifiedEvent.significanceMapping(problem.significance);
    let unifiedEvent = new MIGUnifiedEvent(id, patient, dataType, eventType, startTime, endTime, hideEndTime, availabilityTime, authorisingUserInRole, enteredByUserInRole, code, description, organisation, significance);
    return unifiedEvent;
  }
}
