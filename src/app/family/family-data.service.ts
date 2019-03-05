import {Injectable}               from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Family}        from './family';
import {FamilyMember}  from './family-member';

@Injectable()
export class FamilyDataService {
  private families: Family[] = [];
  private familyMembers: FamilyMember[] = [];

  constructor(private httpClient: HttpClient) {
  }

  private processFamiliesResponse(response): any {
    let familiesData = [];
    if (response['outcome'] == "Success" && response['content'] && response['content']['families']) {
      familiesData = response['content']['families'];
    } else {
      console.log('Error parsing loadFamilies response:'),
        console.error(response['content']);
    }

    let families = [];
    for (let i in familiesData) {
      let familyData = familiesData[i];
      let family = new Family(familyData);
      families.push(family);
    }

    return families;
  }

  public loadFamilies(username: string): Promise<Family[]> {
    return this.httpClient.get(`https://chc-silver.ncl.ac.uk/storage/ws/storage/${username}`)
      .toPromise()
      .then((response) => {
        return this.processFamiliesResponse(response) as Family[];
      });
  }

  public loadFamily(familyId: string): Promise<Family> {
    let family: Family = null;
    console.log(this.families);
    for (let current of this.families)
      if (familyId === current.id)
        family = current;

    console.log('in the FDS, id ', familyId, ' was loaded, family is', family);

    return new Promise(resolve => resolve(family));
  }

  public saveFamilies(username: string, families: Family[]) {
    this.families = families;

    return this.httpClient.put(`https://chc-silver.ncl.ac.uk/storage/ws/storage/${username}`, {'families': this.families})
      .toPromise()
  }
}

