import {Family} from './family';
import {FamilyMember} from './family-member';

/**
 * This class is used to bundle together variables which store the current screen state.
 * This is how we keep track of switching focus to a different family, family member, mode etc.
 */
export class Focus {
  public family: Family;
  public familyMember: FamilyMember;
  public mode: string = 'view';

  public constructor(family, familyMember, mode) {
    this.family = family;
    this.familyMember = familyMember;
    this.mode = mode;
  }
}
