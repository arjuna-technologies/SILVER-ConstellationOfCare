export class ReportData {
  public id:                          string;
  public user:                        string;
  public role:                        string;

  public constructor(id: string, user: string, role: string)
  {
    this.id                          = id;
    this.user                        = user;
    this.role                        = role;
  }
}

}
