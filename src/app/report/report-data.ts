export class ReportData {
  public id: string;
  public personName: string;
  public roleName: string;
  public orgName: string;

  public constructor(id:string,personName: string, roleName: string, orgName: string) {
    this.id = id;
    this.personName = personName;
    this.roleName = roleName;
    this.orgName = orgName;
  }
}
