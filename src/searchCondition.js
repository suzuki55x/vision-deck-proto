export default class SearchCondition { // eslint-disable-line no-unused-vars
    DEF_SPECIAL_EFFECT = ['装備', '呪符', '装備／場', '幻想生物', '世界呪符', '一符', '二符', 'Union', '神器',
    'ターン1枚制限', '自分ターン制限', '相手ターン制限', 'デッキ1枚制限', '抵抗'];
    DEF_TACTICS = ['速攻', '奇襲', '先制', '貫通', '隠密', '耐性', '人形', '伝説', 'マナチャージ', '警戒', 
    '即死', '変身', '加護'];
    DEF_TYPE = ['', 'キャラクター', 'スペル', 'コマンド'];
    DEF_ATTRIBUTE = ['人間', '妖怪', '妖精', '魔法使い', '河童', '吸血鬼', '魔界人', '幽霊', '天狗', '死神', '閻魔', '神', '獣',
    '鬼', '天人', '龍', '仙人'];
    DEF_NODE_OPTION = ['', '以上', '以下', 'に等しい'];
    DEF_COST_OPTION = ['', '以上', '以下', 'に等しい'];
    DEF_ATTACK_OPTION = ['', '以上', '以下', 'に等しい'];
    DEF_TOUGHNESS_OPTION = ['', '以上', '以下', 'に等しい'];


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
        return cardlist;
    }
}