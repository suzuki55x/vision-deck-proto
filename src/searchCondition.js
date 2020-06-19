export default class SearchCondition { // eslint-disable-line no-unused-vars

    cardTxt = '';

    node;
    cost;
    attack;
    defence;

    nodeOption = '';
    costOption = '';
    attackOption = '';
    defenceOption = '';

    getSearchResult(cardlist) {
        if(this.cardTxt) {
            cardlist = cardlist.filter(card => card.Name !== undefined && card.Name.indexOf(this.cardTxt) > -1);
        }

        if(this.nodeOption) {
            if(this.nodeOption == '以上') {
                cardlist = cardlist.filter(card => card.Node >= this.node);
            } else if(this.nodeOption == '以下') {
                cardlist = cardlist.filter(card => card.Node <= this.node);
            } else if(this.nodeOption == '等しい') {
                cardlist = cardlist.filter(card => card.Node = this.node);
            }
        }
        return cardlist;
    }
}