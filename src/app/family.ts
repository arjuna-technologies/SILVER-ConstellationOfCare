import { FamilyMember } from './family-member';

export class Family
{
    public id:            string;
    public familyMembers: FamilyMember[];

    public constructor(id: string, familyMembers: FamilyMember[])
    {
        this.id            = id;
        this.familyMembers = familyMembers;
    }
}
