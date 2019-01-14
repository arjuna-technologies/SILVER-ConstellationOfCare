import {Family} from './family';
import {FamilyMember} from './family-member';

/**
 * This class is used to bundle together variables which store the current screen state.
 * This is how we keep track of switching focus to a different family, family member, mode etc.
 */
export class Focus {
  public family: Family;
  public familyMember: FamilyMember;
  public familyIndex: number = null;
  public familyMemberIndex: number = null;
  public mode: string = 'view';

  /**
   * All parameters are compulsory
   *
   * @param families the current list of families loaded (stored elsewhere)
   * @param family the currently selected family (object) if any
   * @param familyMember the currently selected family member (object) if any
   * @param mode the mode such as 'view' or 'edit'
   */
  public constructor(families: Family[], family: Family, familyMember: FamilyMember, mode:string = 'view') {
    this.family = family;
    this.familyMember = familyMember;
    this.familyIndex = this.findFamilyInFamilies(families, family);
    this.familyMemberIndex = this.findFamilyMemberInFamily(family, familyMember);
    this.mode = mode;
  }

  private findFamilyInFamilies(families, family) {
    let index = null;
    if (families && families.length > 0) {
      for (let idx in families) {
        let thisFam = families[idx];
        if (thisFam.id == family.id) {
          index = idx;
          break;
        }
      }
    }
    return index;
  }

  private findFamilyMemberInFamily(family, familyMember) {
    let index = null;
    if (family && family.familyMembers && family.familyMembers.length > 0) {
      for (let idx in family.familyMembers) {
        let thisFamMem = family.familyMembers[idx];
        if (thisFamMem.id == familyMember.id) {
          index = idx;
          break;
        }
      }
    }
    return index;
  }

}
