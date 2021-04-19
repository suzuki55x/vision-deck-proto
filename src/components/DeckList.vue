<template>
  <v-card min-height="700px" max-height="700px">
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>枚数: {{cards_count}} (Ch: {{character_count}}, Sp: {{spell_count}}, Co: {{command_count}})</v-card-subtitle>
    <card-detail-dialog @closeDialog="closeCardDetail" :is_showable="detail_dialog" :card="selectedCard" />
    <card-list-virtual-scroll :cardlist="decklist" is_decklist>
      <template v-slot:action="{ card }">
        <v-icon small @click="showCardDetail(card)" >mdi-information</v-icon>
        <v-icon small @click="putCard(card)" >mdi-plus</v-icon>
        <v-icon small @click="removeCard(card)" >mdi-minus</v-icon>
      </template>
    </card-list-virtual-scroll>
    <v-sparkline height="30" smooth=3 :gradient="['#f72047', '#ffd200']" fill :labels="mana_curve_labels" :value="mana_curve_value"></v-sparkline>
  </v-card>
</template>

<script>
import CardDetailDialog from '@/components/CardDetailDialog';
import CardListVirtualScroll from '@/components/CardListVirtualScroll';

export default {
  components: {
    CardDetailDialog,
    CardListVirtualScroll
  },
  props: [
    'title',
    'cardstore'
  ],
  created: function() {
    // this.cardlist = Object.values(this.cardstore.get("Cards"))
  },
  data: () => ({
    detail_dialog: false,
    decklist: [],
    selectedCard: {},
    selectedRows: [],
  }),
  computed:{
    cards_count() {
      return this.decklist.reduce((cnt, card)=>cnt+card.SheetNum, 0)
    },
    character_count() {
      return this.decklist.reduce((cnt, card)=>cnt+(card.Type==='Character'?card.SheetNum:0), 0)
    },
    spell_count() {
      return this.decklist.reduce((cnt, card)=>cnt+(card.Type==='Spell'?card.SheetNum:0), 0)
    },
    command_count() {
      return this.decklist.reduce((cnt, card)=>cnt+(card.Type==='Command'?card.SheetNum:0), 0)
    },
    mana_curve_array() {
      //const mana_curve_orig = {}
      const mana_curve_orig = [
        '0','1','2','3','4','5','6','7','8','9','10','11',
        '12','13','14','15','16','17','18','19','20','-'
      ].reduce((obj, node)=>{
        obj[node]=0
        return obj
      }, {})
      return this.decklist.reduce((mana_curve, card)=>{
        if(card.Node in mana_curve) {
          mana_curve[card.Node]+=card.SheetNum
        }else{
          mana_curve[card.Node] = card.SheetNum
        }
        return mana_curve
      }, mana_curve_orig)
    },
    mana_curve_labels() {
      return Object.keys(this.mana_curve_array)
    },
    mana_curve_value() {
      return Object.values(this.mana_curve_array)
    }
  },
  methods: {
    rowClicked(row) {
      this.swapSelectionStatus(row.No);
    },
    swapSelectionStatus(keyID) {
      if (this.selectedRows.includes(keyID)) {
        this.selectedRows = this.selectedRows.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
        this.selectedRows.push(keyID);
      }
    },
    getSelectedRaws() {
      return this.selectedRows;
    },
    showCardDetail(card) {
      this.selectedCard = card;
      this.detail_dialog = true;
    },
    closeCardDetail() {
      this.detail_dialog = false;
    },
    putCard(card) {
      if(this.decklist.some(element => element.No === card.No)) {
        let card_index = this.decklist.findIndex(element => element.No === card.No);
        let card_in_deck = this.decklist[card_index];

        if(card_in_deck.SheetNum < 3) {
          card_in_deck.SheetNum++;
          this.$set(this.decklist, card_index, card_in_deck);
        }
      } else {
        // 渡されたのはcardへの参照なので、Object自体をディープコピー
        let card_in_deck = Object.assign({}, card);
        card_in_deck["SheetNum"] = 1;
        this.decklist.push(card_in_deck);
      }
    },
    removeCard(card) {
      if(this.decklist.some(element => element.No === card.No)) {
        let card_index = this.decklist.findIndex(element => element.No === card.No);
        let card_in_deck = this.decklist[card_index];
        if(card_in_deck.SheetNum > 0) {
          card_in_deck.SheetNum--;
          if(card_in_deck.SheetNum <= 0) {
            // 枚数が0以下になったらリストから削除
            this.decklist = this.decklist.filter(c => c != card);
          } else {
            this.$set(this.decklist, card_index, card_in_deck);
          }
        }
      } else {
        // カードがリストにないのに削除されようとしても0枚のまま
        card["SheetNum"] = 0;
      }
    },
    loadDeck(deckArray) {
      this.decklist = [];
      /* eslint-disable no-console */
      console.log(this.decklist);
      let me = this;
      deckArray.forEach(function(value) {
        let line = value.split(',');
        if(line.length != 3) {
          /* eslint-disable no-console */
          console.log("illegal card data" + line);
          return;
        }
        let card = me.cardstore.Cards[line[1]];
        for(let num=0; num < line[0]; num++) {
          me.putCard(card);
        }
      })
    },
    log(logItem) {
      /* eslint-disable no-console */
      console.log(logItem);
    },
  },
};
</script>
