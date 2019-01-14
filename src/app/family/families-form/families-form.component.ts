import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Family} from '../family';
import {FamilyMember} from '../family-member';

import {FamilyDataService} from '../family-data.service';
import {MatGridList, MatGridTile} from '@angular/material';

@Component({
  selector: 'cnstll-families-form',
  templateUrl: './families-form.component.html',
  styleUrls: ['./families-form.component.scss']
})
export class FamiliesFormComponent implements OnInit, OnChanges {

  @Input()
  public families: Family[] = [];

  @Input()
  public username: string;

  private expanded: any[] = [];

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public mode: string = 'view';

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public selectFamilyOnly: EventEmitter<Family> = new EventEmitter<Family>();

  @Output()
  public updateFamilies: EventEmitter<Family[]> = new EventEmitter<Family[]>();

  @Output()
  public selectViewMode: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public selectEditMode: EventEmitter<any> = new EventEmitter<any>();

  public getGridRowHeight() {
    let maxFamilyHeight = this.getLargestFamilySize();
    let familyListHeight = 40 * maxFamilyHeight;
    let retHeight = 100 + familyListHeight;
    return retHeight < 400 ? 400 : retHeight;
  }

  public getGridCardHeight() {
    let familiesCount = 3;
    if (this.families.length > familiesCount) {
      familiesCount = this.families.length;
    }
    let rows = Math.floor(familiesCount / 3);
    return 80 * rows; // for every 3 rows, another 100% of screen estate that we can scroll into
  }

  public getLargestFamilySize() {
    let maxFamilySize = 4;
    for (let family of this.families) {
      if (family.familyMembers.length > maxFamilySize) {
        maxFamilySize = family.familyMembers.length;
      }
    }
    return maxFamilySize;
  }

  public doSelectEditMode(): void {
    this.selectEditMode.emit();
  }

  public doSelectViewMode(): void {
    this.selectViewMode.emit();
  }

  public doUpdateFamilies(families): void {
    this.updateFamilies.emit(families);
  }

  public doSelectFamilyOnly(family): void {
    this.selectFamilyOnly.emit(family);
  }

  public doSelectFamilyAndFamilyMember(familyAndFamilyMember): void {
    this.selectFamilyAndFamilyMember.emit({
      family: familyAndFamilyMember.family,
      familyMember: familyAndFamilyMember.familyMember
    });
  }

  public viewFamily(family) {
    this.selectFamilyOnly.emit(family);
    this.doSelectViewMode();
    this.family = family;
  }

  constructor(private familyDataService: FamilyDataService) {

  }

  private getNewFamilyID() {
    let n = this.families.length;
    n += 1;
    return `C${n}`;
  }

  @Input()
  public family: Family = null;

  private indexOfCurrentlyEditingFamily: number = -1;

  private isCurrentFamilyNew() {
    return (this.indexOfCurrentlyEditingFamily == -1);
  }

  public addFamily() {
    let members: FamilyMember[] = [];
    let newFamily = new Family({
      id: this.getNewFamilyID(),
      familyMembers: members
    });
    this.indexOfCurrentlyEditingFamily = -1;
    this.doSelectFamilyOnly(newFamily);
    this.doSelectEditMode();
  }

  public addTestFamilies() {
    let testFamilyMembers = {};
    let testFamilies = {};

    testFamilyMembers['p00'] = ['Amy', 'Smith', '20/12/1970', 'Female', '4853379371', "Mother of Clare and Wife of David"];
    testFamilyMembers['p01'] = ['Bill', 'Jones', '12/01/1971', 'Male', '6424561811', "David's Son"];
    testFamilyMembers['p02'] = ['Clare', 'Smith', '13/03/1995', 'Female', '9051292074', "Amy's Daughter"];
    testFamilyMembers['p03'] = ['David', 'Jones', '07/07/1997', 'Male', '5700200716', "Amy's Husband"];

    testFamilies['f00']=['p00', 'p01', 'p02', 'p03'];

    testFamilyMembers['p04'] = ['Amy', 'Brown', '20/12/1970', 'Female', '8225676149', "Mother"];
    testFamilyMembers['p05'] = ['Bill', 'Lee', '12/01/1971', 'Male', '9620344472', "New Partner"];
    testFamilyMembers['p06'] = ['Clare', 'Brown', '13/03/1995', 'Female', '4160066348', "Daughter"];
    testFamilyMembers['p07'] = ['David', 'Brown', '07/07/1997', 'Male', '5894678846', "Son"];

    testFamilies['f01']=['p04', 'p05', 'p06', 'p07'];

    testFamilyMembers['p11'] = ['Richard', 'Garner', '21/12/1933', 'Male', '4160066348', "Grandfather"];
    testFamilyMembers['p08'] = ['Amy', 'James', '20/12/1970', 'Female', '8880028669', "Mother"];
    testFamilyMembers['p09'] = ['Bill', 'James', '12/01/1971', 'Male', '6068998983', "Husband"];
    testFamilyMembers['p10'] = ['Clare', 'James', '13/03/1995', 'Female', '4198838577', "Daughter"];

    testFamilies['f02']=['p11', 'p08', 'p09', 'p10'];

    for (let familyId in testFamilies) {
      let familyMemberIds = testFamilies[familyId];
      let familyMembers=[];
      for (let familyMemberId of familyMemberIds) {
        let familyMember = {
          id: familyMemberId,
          firstName: testFamilyMembers[familyMemberId][0],
          surname: testFamilyMembers[familyMemberId][1],
          dateOfBirth: testFamilyMembers[familyMemberId][2],
          gender: testFamilyMembers[familyMemberId][3],
          nhsNumber:testFamilyMembers[familyMemberId][4],
          role:testFamilyMembers[familyMemberId][5]
        };
        familyMembers.push(familyMember);
      }
      let family = new Family({
        id: familyId,
        familyMembers: familyMembers
      });
      this.families.push(family);
    }
  }

  public editFamily(index) {
    this.doSelectFamilyOnly(this.families[index]);
    this.family=this.families[index];
    this.familyMember = null;
    this.indexOfCurrentlyEditingFamily = index;
    this.doSelectEditMode();
  }

  public newFamilySaved(family: Family) {
    this.doSelectFamilyOnly(null);
    this.families = [family].concat(this.families); // for now, add to start
    //this.families.push(family);
    this.familyDataService.saveFamilies(this.username, this.families);
    this.doSelectViewMode();
  }

  public editedFamilySaved(family: Family) {
    this.doSelectFamilyOnly(null);
    this.families[this.indexOfCurrentlyEditingFamily] = family;
    this.indexOfCurrentlyEditingFamily = -1;
    this.familyDataService.saveFamilies(this.username, this.families);
    this.doSelectViewMode();
  }

  ngOnInit() {
    this.loadFamilies();
  }

  ngOnChanges() {
  }

  private loadFamilies(): void {
    this.familyDataService.loadFamilies(this.username)
      .then(families => this.loadFamiliesSuccess(families))
      .catch(error => this.loadFamiliesFailed(error));
  }

  private saveFamilies(): void {
    this.familyDataService.saveFamilies(this.username, this.families);
  }

  private loadFamiliesSuccess(families: Family[]): void {
    this.families = families;
    console.log('loaded families and setting to:');
    console.log(families);
    this.doUpdateFamilies(this.families);
  }

  private loadFamiliesFailed(error: any): void {
    this.families = [];
    this.doUpdateFamilies(this.families);
  }

}
