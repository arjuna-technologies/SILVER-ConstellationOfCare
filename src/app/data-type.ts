import { Data } from './data';

export class DataType
{
    public id:    string;
    public name:  string;
    public datas: Data[];

    public constructor(id: string, name: string, datas: Data[])
    {
        this.id    = id;
        this.name  = name;
        this.datas = datas;
    }
}
