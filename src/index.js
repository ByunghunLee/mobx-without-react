import { observable, reaction, computed, autorun, action, transaction } from 'mobx';

class GS25{
    @observable basket = [];

    @computed
    get total(){
        console.log("Calculating");
        return this.basket.reduce((prev, curr) => prev + curr.price, 0);
    }

    @action
    select(name, price){
        this.basket.push({name, price});
    }
}
/*
decorate(GS25,{
    basket: observable,
    total: computed,
    select: action
});
*/
const gs25 = new GS25();
autorun(() => gs25.total);
autorun(() => {
    if(gs25.basket.length > 0){
        console.log(gs25.basket[gs25.basket.length - 1]);
    }
});

transaction(() => {
    gs25.select('물', 800);
    gs25.select('라면', 1200);
    gs25.select('루나', 1800);
    gs25.select('삼다수', 300);
});

console.log(gs25.total);

