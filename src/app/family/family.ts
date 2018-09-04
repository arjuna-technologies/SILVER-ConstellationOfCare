import {FamilyMember} from './family-member';

export class Family {
  public id: string;
  public familyMembers: FamilyMember[];

  public constructor(id: string, familyMembers: FamilyMember[]) {
    this.id = id;
    this.familyMembers = familyMembers;
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
      return '';
  }


}
