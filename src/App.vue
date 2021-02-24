<template>
  <v-app>
    <v-content>
      <v-flex mb-5 xs12>
        <v-layout justify-center>
          <v-btn large color="primary" @click="search()">
            検索
          </v-btn>
          <v-btn large color="primary">
            クリア
          </v-btn>
          <Deckio ref="deckio" @load-deck="loadDeck" @write-deck="writeDeck"/>
        </v-layout>
      </v-flex>
      <v-row>
        <v-col cols="6">
          <DeckList title='デッキ' :cardstore="deckstore" ref="decklist"/>
        </v-col>
        <v-col cols="6">
          <DeckList title='サイドデッキ' :cardstore="sidedeckstore" ref="sidedecklist"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <CardList title='カードリスト' :cardstore="cardstore" ref="cardlist" @addDeckList="addDeckList" @addSideDeckList="addSideDeckList" />
        </v-col>
        <!--
        <v-col cols="1">
          <v-row>
           <v-btn icon color="black" @click="addDeckList()">
             <v-icon>mdi-arrow-right</v-icon>
           </v-btn>
          </v-row>
          <v-row>
            <v-btn icon color="black">
             <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        -->
      </v-row>
      <v-row>
        <v-col cols="12">
          <SearchArea ref="searcharea"/>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import SearchArea from './components/SearchArea';
import CardList from './components/CardList';
import DeckList from './components/DeckList';
//import SidedeckList from './components/DeckList';
import Deckio from './components/Deckio';
//import Store from 'electron-store';
import SearchCondition from './searchCondition.js'; // eslint-disable-line no-unused-vars
import JsonMixin from '@/mixins/JsonMixin';

export default {
  name: 'App',
  mixins: [
    JsonMixin
  ],
  components: {
    SearchArea,
    CardList,
    DeckList,
    //SidedeckList,
    Deckio
  },
  created: function() {
    this.cardstore = this.cardlist
    this.deckstore = this.cardlist
    this.sidedeckstore = this.cardlist
    this.configstore = this.configlist
  },
  mounted: function() {
    this.deck = this.configstore.Card.Deck
  },
  data: () => ({
    deck: null,
    cardstore: null,
    deckstore: [],
    sidedeckstore: [],
    configstore: null,
    writeDeckArray : [],
    writeSideDeckArray : []
  }),
  methods : {
    addDeckList(card) {
      this.$refs.decklist.putCard(card);
    },
    addSideDeckList(card) {
      this.$refs.sidedecklist.putCard(card);
    },
    search() {
      this.$refs.cardlist.search(this.$refs.searcharea.getSearchCondition());
    },
    loadDeck(deckArray) {
      let sepalate = deckArray.indexOf('--');
      this.$refs.decklist.loadDeck(deckArray.slice(0,sepalate));
      if(sepalate+2 < deckArray.length) {
        this.$refs.sidedecklist.loadDeck(deckArray.slice(sepalate+1, deckArray.length));
      }
    },
    writeDeck() {
      const deck = this.$refs.decklist.decklist
      const side = this.$refs.sidedecklist.decklist
      this.$refs.deckio.saveDeckFile(deck, side)
    }
  },
};
</script>

<style>
.center-input input {
  text-align: center
}
.right-input input {
  text-align: right
}
.left-input input {
  text-align: left
}
</style>
