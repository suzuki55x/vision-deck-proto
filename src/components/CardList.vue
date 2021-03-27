<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <card-detail-dialog @closeDialog="closeCardDetail" :is_showable="detail_dialog" :card="selectedCard"/>
    <card-list-virtual-scroll :cardlist="cardlist">
      <template v-slot:action="{ card }">
        <v-icon small @click="showCardDetail(card)" >mdi-information</v-icon>
        <v-icon small @click="addDeck(card)" >mdi-plus</v-icon>
        <v-icon small @click="addSideDeck(card)" >mdi-plus-box</v-icon>
      </template>
    </card-list-virtual-scroll>
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
    this.cardlist = Object.values(this.cardstore.Cards)
    /* eslint-disable no-console */
    console.dir(this.cardlist)
  },
  data: () => ({
    detail_dialog: false,
    cardlist: [],
    selectedCard: {},
    selectedRows: [],
  }),
  methods: {
    rowClicked(row) {
      this.swapSelectionStatus(row.No);
    },
    addDeck(card) {
      this.$emit("addDeckList", card)
    },
    addSideDeck(card) {
      this.$emit("addSideDeckList", card)
    },
    showCardDetail(card) {
      this.selectedCard = card;
      this.detail_dialog = true;
    },
    closeCardDetail() {
      this.detail_dialog = false;
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
    log(logItem) {
      /* eslint-disable no-console */
      console.log(logItem);
    },
    search(condition) {
        this.cardlist = condition.getSearchResult(Object.values(this.cardstore.Cards));
        return;
    }
  },
};
</script>
