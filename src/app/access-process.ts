export class AccessProcess
{
    public id:          string;
    public name:        string;
    public description: string;

    public constructor(id: string, name: string, description: string)
    {
        this.id          = id;
        this.name        = name;
        this.description = description;
    }
}
