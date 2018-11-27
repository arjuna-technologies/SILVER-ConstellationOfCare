import { MIGInformationIndexService } from './mig-information-index.service';

export class MIGPatientMatch {
  public nhsNumber: string;
  public name: string;
  public names: string[];
  public gender: string;
  public birthDate: string;
  public deceasedDate: string;
  public address: string;
  public addresses: string[];
  public telecoms: string[];
  public careProfessional: string;
  public organisationId: string;
  public organisation: string; // will not be set until setOrganisation is called

  public migInformationIndexService: MIGInformationIndexService; // will set from components

  public constructor(patient: any) {
    let address = null;
    let nhsNumber = patient.primaryIdentifier;
    let birthDate = patient.birthDate; // TODO format
    let deceasedDate = patient.deceasedDate; // TODO format
    let gender = `${patient.person.gender.charAt(0).toUpperCase()}${patient.person.gender.slice(1).toLowerCase()}`;
    let names = [];
    for (let i in patient.person.names) {
      let name = patient.person.names[i];
      let str = "";
      if (name.title) {
        str += name.title + " ";
      }
      str += name.givenNames.join(' ')+ ' ';
      if (name.familyName) {
        str += name.familyName + ' ';
      }
      if (name.suffix) {
        str += name.suffix + ' ';
      }
      if (name.preferredName && name.preferredName != name.givenNames[0]) {
        str += '(' + name.preferredName + ') ';
      }
      names.push(str.trim());
    }
    let telecoms = [];
    if (patient.telecom && patient.telecom.length>0) {
      for (let i in patient.telecom) {
        let telecom = patient.telecom[i];
        telecoms.push(telecom);
      }
    }
    let addresses = [];
    if (patient.address) {
      let str = [patient.address.line1,patient.address.line2,patient.address.line3,patient.address.line4,patient.address.line5, patient.address.postcode].join(', ');
      addresses.push(str);
    }
    if (patient.addresses && patient.addresses.length>0) {
      for (let i in patient.addresses) {
        let address = patient.addresses[i];
        let addressLines = [address.line1, address.line2, address.line3, address.line4, address.line5, address.postcode];
        let nonEmptyAddressLines = [];
        for (let n in addressLines) {
          if (addressLines[n]!="") {
            nonEmptyAddressLines.push(addressLines[n]);
          }
        }
        let str = nonEmptyAddressLines.join(', ');
        addresses.push(str);
      }
    }
    // ignore careProfessional for now, as we don't know the data format.
    let organisationId = null;
    if (patient.organisation) {
      organisationId = patient.organisation.organisationId;
    }
    this.nhsNumber = nhsNumber;
    this.names = names;
    if (names.length>0) {
      this.name = names[0];
    }
    this.addresses = addresses;
    if (addresses.length>0) {
      this.address = addresses[0];
    }
    this.birthDate = birthDate;
    this.deceasedDate = deceasedDate;
    this.telecoms = telecoms;
    this.gender = gender;
    this.careProfessional = null;
    this.organisationId = organisationId;
  }

  public setOrganisation(migInformationIndexService:MIGInformationIndexService) {
    this.migInformationIndexService = migInformationIndexService;
    let lookupOrgName = this.migInformationIndexService.basicOrganisationMapping(this.organisationId);
    if (lookupOrgName) {
      this.organisation = lookupOrgName;
    }
  }
}
