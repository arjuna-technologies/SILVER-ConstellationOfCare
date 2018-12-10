export class FamilyMember {
  public id: string;
  public firstName: string;
  public surname: string;
  public dateOfBirth: string;
  public gender: string;
  public nhsNumber: string;
  public role: string;

  public constructor(familyMemberDataObject) {
    this.id = familyMemberDataObject.id;
    this.firstName = familyMemberDataObject.firstName;
    this.surname = familyMemberDataObject.surname;
    this.dateOfBirth = familyMemberDataObject.dateOfBirth;
    this.gender = familyMemberDataObject.gender;
    this.nhsNumber = familyMemberDataObject.nhsNumber;
    this.role = familyMemberDataObject.role;
  }

  public getFullName() {
    return this.firstName + ' ' + this.surname;
  }
}
