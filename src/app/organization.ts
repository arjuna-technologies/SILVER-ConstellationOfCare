import { DataSource } from './data-source';

export class Organization
{
    public name:        string;
    public dataSources: DataSource[];

    public constructor(name: string, dataSources: DataSource[])
    {
        this.name        = name;
        this.dataSources = dataSources;
    }
}
