export default class Item{
    constructor(name,amount) {
        this.Name = name;
        this.Amount = amount;
        this.CanCollect = true;
        this.CollectSpeed = 500;
    }

    SetCanCollect = (value) => {
        this.CanCollect = value;
        return this;
    }

    Collect = () => {
        if (!this.CanCollect) return this;
        this.Amount += 1;
        return this;
    }
}