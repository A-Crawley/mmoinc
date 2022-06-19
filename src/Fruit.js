export default class Fruit{
    constructor(name,amount) {
        this.Name = name;
        this.Amount = amount;
        this.CanPick = true;
        this.PickSpeed = 500;
    }

    SetCanPick = (value) => {
        this.CanPick = value;
        return this;
    }

    Pick = () => {
        if (!this.CanPick) return this;
        this.Amount += 1;
        return this;
    }
}