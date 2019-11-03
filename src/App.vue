<template>
  <v-app>
    <v-content>
      {{deck}}
      <SearchArea/>
      <CardList :cardstore="cardstore"/>

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
    configstore: null,
  }),
};
</script>
