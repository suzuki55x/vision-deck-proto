<template>
  <v-app>
    <v-content>
      <SearchArea ref="searcharea"/>
      <v-flex
        mb-5
        xs12>
        <v-layout justify-center>
          <v-btn large color="primary" @click="search()">
            検索
          </v-btn>
          <v-btn large color="primary">
            クリア
          </v-btn>
          <Deckio ref="deckio" @load-deck="loadDeck"/>
        </v-layout>
      </v-flex>
      <v-row>
        <v-col cols="6">
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
        <v-col cols="6">
          <DeckList title='デッキ' :cardstore="deckstore" ref="decklist"/>
          <DeckList title='サイドデッキ' :cardstore="sidedeckstore" ref="sidedecklist"/>
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
import Store from 'electron-store';
import SearchCondition from './searchCondition.js'; // eslint-disable-line no-unused-vars

import path from 'path';

export default {
  name: 'App',
  components: {
    SearchArea,
    CardList,
    DeckList,
    //SidedeckList,
    Deckio
  },
  created: function() {
    this.cardstore = new Store({
      cwd:  path.resolve(), 
      name: "cardlist"
    })
    this.deckstore = new Store({
      cwd:  path.resolve(), 
      name: "cardlist"
    })
    this.sidedeckstore = new Store({
      cwd:  path.resolve(), 
      name: "cardlist"
    })
    this.configstore = new Store({
      cwd:  path.resolve(), 
      name: "config"
    })
  },
  mounted: function() {
    this.deck = this.configstore.get("Card.Deck", {"mu":"ri"})
  },
  data: () => ({
    deck: null,
    cardstore: null,
    deckstore: [],
    sidedeckstore: [],
    configstore: null,
    deckArray : []
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
