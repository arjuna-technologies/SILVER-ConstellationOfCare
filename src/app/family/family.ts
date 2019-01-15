import {FamilyMember} from './family-member';

function isTypedArray(obj) {
  return !!obj && obj.byteLength !== undefined;
}

export class Family {
  public id: string;
  public familyMembers: FamilyMember[];

  public constructor(dataObject) {
    this.id = dataObject.id;
    let typedFamilyMembers: FamilyMember[] = [];
    for (let familyMemberData of dataObject.familyMembers) {
      let familyMember: FamilyMember = new FamilyMember(familyMemberData);
      typedFamilyMembers.push(familyMember);
    }
    this.familyMembers = typedFamilyMembers;
  }

  public getFamilyName(): string {
    if (this.familyMembers.length > 0) {
      let surnames: string[] = [];

      for (let familyMember of this.familyMembers)
        surnames.push(familyMember.surname);

      surnames.sort();

      let surnameIndex = 0;
      while (surnameIndex < surnames.length - 1)
        if (surnames[surnameIndex] === surnames[surnameIndex + 1])
          surnames.splice(surnameIndex, 1);
        else
          surnameIndex++;

      let concatSurnames = '';
      for (let surnameIndex = 0; surnameIndex < surnames.length; surnameIndex++)
        if (surnameIndex === 0)
          concatSurnames = surnames[surnameIndex];
        else
          concatSurnames = concatSurnames.concat('/', surnames[surnameIndex]);

      return concatSurnames;
    }
    else
      return null;
  }

  public getFamilyNameLongForm(): string {
    let familyName = this.getFamilyName();
    if (familyName) {
      return `the ${familyName} family`;
    }
    else {
      return `<Empty Family>`;
    }
  }


}
