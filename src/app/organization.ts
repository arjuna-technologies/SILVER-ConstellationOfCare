import { DataSource } from './data-source';

export class Organization
{
    public id:          string;
    public name:        string;
    public dataSources: DataSource[];

    public constructor(id: string, name: string, dataSources: DataSource[])
    {
        this.id          = id;
        this.name        = name;
        this.dataSources = dataSources;
    }
}
