<template>
  <v-app>
    <v-content>
      {{deck}}
      あああ
      <SearchArea/>
      <v-row>
        <v-col cols="5">
          カードリスト
          <CardList :cardstore="cardstore" ref="cardlist"/>
        </v-col>
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
        <v-col cols="5">
          デッキ
          <CardList :cardstore="deckstore" ref="decklist"/>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import SearchArea from './components/SearchArea';
import CardList from './components/CardList';
import Store from 'electron-store';
import path from 'path';

export default {
  name: 'App',
  components: {
    SearchArea,
    CardList
  },
  created: function() {
    this.cardstore = new Store({
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
    configstore: null,
  }),
  methods : {
    addDeckList() {
      this.$refs.cardlist.getSelectedRaws().forEach(element => {
        this.$refs.decklist.putData(element);
      });
    },
  },
};
</script>
