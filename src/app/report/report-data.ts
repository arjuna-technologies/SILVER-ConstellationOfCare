export class ReportData {
  public personName: string;
  public roleName: string;
  public orgName: string;

  public constructor(personName: string, roleName: string, orgName: string) {
    this.personName = personName;
    this.roleName = roleName;
    this.orgName = orgName;
  }
}
