export class MIGLocation
{
    public id:      string;
    public name:    string;
    public address: any;

    public constructor(id: string, name: string, address: any)
    {
        this.id      = id;
        this.name    = name;
        this.address = address;
    }
}
