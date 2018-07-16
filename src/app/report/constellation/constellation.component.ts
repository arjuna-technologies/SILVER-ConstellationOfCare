import {Component, OnChanges, DoCheck, Input, ViewChild} from '@angular/core';
import {MIGInformation} from '../../mig/mig-information';
import {MatPaginator, MatTableDataSource}     from '@angular/material';
import {ReportData} from '../report-data';
import {MIGInformationIndexService} from '../../mig/mig-information-index.service';

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

    //for each value in user column, call this.migInformationIndexService.basicUserInRoleMapping(userInRoleId);
    this.constellationDisplayedColumns = ['id', 'user', 'role'];
    this.constellationDataSource = new MatTableDataSource();
    this.constellationDataSource.data = null;
  }

  public ngOnChanges(): void {
    let data = [];
    if (this.information) {
      for (let userInRole of this.information.userInRoles) {
        let dataRow = new ReportData(userInRole.id, userInRole.user, userInRole.role);
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

}
