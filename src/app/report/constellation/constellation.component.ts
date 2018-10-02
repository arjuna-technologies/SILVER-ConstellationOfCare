import {Component, OnChanges, DoCheck, Input, ViewChild} from '@angular/core';
import {MIGInformation} from '../../mig/mig-information';
import {MatPaginator, MatTableDataSource}     from '@angular/material';
import {ReportData} from '../report-data';
import {MIGInformationIndexService} from '../../mig/mig-information-index.service';
import {MIGRole} from '../../mig/mig-role';
import {MIGOrganisation} from '../../mig/mig-organisation';

@Component({
  selector: 'cnstll-constellation',
  templateUrl: './constellation.component.html',
  styleUrls: ['./constellation.component.scss']
})
export class ConstellationComponent implements OnChanges, DoCheck {

  @Input()
  public information: MIGInformation;

  @ViewChild('constellationPaginator')
  public constellationPaginator: MatPaginator;

  public constellationDataSource: MatTableDataSource<ReportData>;

  public constellationDisplayedColumns: string[];

  constructor(private migInformationIndexService: MIGInformationIndexService) {
    this.constellationDisplayedColumns = ['data'];
    this.constellationDataSource = new MatTableDataSource();
    this.constellationDataSource.data = null;
  }

  public ngOnChanges(): void {
    let data = [];
    if (this.information) {
      for (let userInRole of this.information.userInRoles) {
        let id = userInRole.id;
        let professionalName = this.userMapping(userInRole.id);
        let roleName = this.roleMapping(userInRole.role);
        let organisationName = this.roleOrgMapping(userInRole.role);
          let dataRow = new ReportData(id,professionalName,roleName,organisationName);
        data.push(dataRow);
      }
      this.constellationDataSource.data = data;
    }
    else {
      this.constellationDataSource.data = null;
    }
    if (this.constellationDataSource.paginator)
      this.constellationDataSource.paginator.firstPage();
  }

  public ngDoCheck(): void
  {
    if (this.constellationDataSource.paginator != this.constellationPaginator)
    {
      this.constellationDataSource.paginator = this.constellationPaginator;
      this.constellationDataSource.paginator.firstPage();
    }
  }

  public userMapping(userId: string): string
  {
    return this.migInformationIndexService.basicUserMapping(userId);
  }

  public roleMapping(roleId: string): string
  {
    return this.migInformationIndexService.basicRoleMapping(roleId);
  }

  public roleOrgMapping(roleId: string): string
  {
    if (roleId)
    {
      const role: MIGRole = this.migInformationIndexService.roleMap.get(roleId);

      if (role && role.organisation) {
        let org = this.migInformationIndexService.basicOrganisationMapping(role.organisation);
        if (org == "EMISWebCR1 50005") {
          org = "EMIS Test Org";
        }
        return org;
      }
      else {
        return '';
      }
    }
    else
      return '';
  }
}
