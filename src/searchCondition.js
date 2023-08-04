export default class SearchCondition { // eslint-disable-line no-unused-vars
    cardTxt = '';
    node;
    cost;
    attack;
    toughness;

    getSearchResult(cardlist) {
        if(this.cardTxt) {
            cardlist = cardlist.filter(card =>
                 (card.Name !== undefined && card.Name.indexOf(this.cardTxt) > -1) || 
                 (card.Ability !== undefined && card.Ability.indexOf(this.cardTxt) > -1) ||
                 (card.User !== undefined && card.User.indexOf(this.cardTxt) > -1) 
            );
        }

        if(this.type) {
            let typeEnglish;
            switch(this.type) {
                case 'キャラクター':
                    typeEnglish = 'Character';
                    break;
                case 'スペル':
                    typeEnglish = 'Spell';
                    break;
                case 'コマンド':
                    typeEnglish = 'Command';
                    break;
            }
            cardlist = cardlist.filter(card =>
                (card.Type !== undefined && card.Type.indexOf(typeEnglish) > -1) 
           );
        }

        if(this.nodeOption) {
            if(this.nodeOption == '以上') {
                cardlist = cardlist.filter(card => card.Node >= this.node);
            } else if(this.nodeOption == '以下') {
                cardlist = cardlist.filter(card => card.Node <= this.node);
            } else if(this.nodeOption == 'に等しい') {
                cardlist = cardlist.filter(card => card.Node == this.node);
            }
        }

        if(this.costOption) {
            if(this.costOption == '以上') {
                cardlist = cardlist.filter(card => card.Cost >= this.cost);
            } else if(this.costOption == '以下') {
                cardlist = cardlist.filter(card => card.Cost <= this.cost);
            } else if(this.costOption == 'に等しい') {
                cardlist = cardlist.filter(card => card.Cost == this.cost);
            }
        }

        if(this.attackOption) {
            if(this.attackOption == '以上') {
                cardlist = cardlist.filter(card => card.Attack != '-' && card.Attack >= this.attack);
            } else if(this.attackOption == '以下') {
                cardlist = cardlist.filter(card => card.Attack != '-' && card.Attack <= this.attack);
            } else if(this.attackOption == 'に等しい') {
                cardlist = cardlist.filter(card => card.Attack != '-' && card.Attack == this.attack);
            }
        }

        if(this.toughnessOption) {
            if(this.toughnessOption == '以上') {
                cardlist = cardlist.filter(card => card.Toughness != '-' && card.Toughness >= this.toughness);
            } else if(this.toughnessOption == '以下') {
                cardlist = cardlist.filter(card => card.Toughness != '-' && card.Toughness <= this.toughness);
            } else if(this.toughnessOption == 'に等しい') {
                cardlist = cardlist.filter(card => card.Toughness != '-' && card.Toughness == this.toughness);
            }
        }

        //特殊効果の検索
        if(this.selectedSpecialEffect && this.selectedSpecialEffect.length > 0) {
            cardlist = cardlist.filter(card =>
                card.Skill !== undefined && 
                this.selectedSpecialEffect.some(special =>
                    card.Skill.indexOf(special) > -1
                    )
                )
        }

        //戦術の検索
        if(this.selectedTactics && this.selectedTactics.length > 0) {
            cardlist = cardlist.filter(card =>
                card.Skill !== undefined && 
                this.selectedTactics.some(special =>
                    card.Skill.indexOf(special) > -1
                    )
                )
        }

        //種族の検索
        //ToDo: 種族なしの検索
        if(this.selectedAttribute && this.selectedAttribute.length > 0) {
            cardlist = cardlist.filter(card =>
                card.Class !== undefined && 
                this.selectedAttribute.some(special =>
                    card.Class.indexOf(special) > -1
                    )
                )
        }

        // ID順にソート
        cardlist = cardlist.sort((a, b)=>a.No-b.No)

        return cardlist;
    }
}