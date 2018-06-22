export class MIGUser
{
    public id:         string;
    public userPerson: string;
    public mnemonic:   string;

    public constructor(id: string, userPerson: string, mnemonic: string)
    {
        this.id         = id;
        this.userPerson = userPerson;
        this.mnemonic   = mnemonic;
    }
}
