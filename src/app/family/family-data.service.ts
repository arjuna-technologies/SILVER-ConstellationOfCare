import {Injectable}               from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Family}        from './family';
import {FamilyMember}  from './family-member';

@Injectable()
export class FamilyDataService {
  private families: Family[] = [];
  private familyMembers: FamilyMember[] = [];

  constructor(private httpClient: HttpClient) { }

  public loadFamilies(username: string): Promise<Family[]> {
    return this.httpClient.get(`http://dataservice-mig.silver.arjuna.com/storage/ws/storage/${username}`)
      .toPromise()
      .then((response) => {

        let familiesData = [];
        if (response['outcome'] == "Success" && response['content'] && response['content']['families']) {
          familiesData = response['content']['families'];
        } else {
          console.error(response);
        }

        let families = [];
        for (let i in familiesData) {
          let familyData = familiesData[i];
          let family = new Family(familyData);
          families.push(family);
        }

        return families as Family[];
      });
  }

  public loadFamily(familyId: string): Promise<Family> {
    let family: Family = null;

    for (let current of this.families)
      if (familyId === current.id)
        family = current;

    return new Promise(resolve => setTimeout(() => resolve(family), 100));
  }

  public saveFamilies(username: string, families: Family[]) {
    this.families = families;

    return this.httpClient.put(`http://dataservice-mig.silver.arjuna.com/storage/ws/storage/${username}`, {'families': this.families})
      .toPromise()
  }
}

