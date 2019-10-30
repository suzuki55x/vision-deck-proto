<template>
  <v-app>
    <v-content>
      {{cardlist}}
      {{deck}}
      <SearchArea/>
    </v-content>
  </v-app>
</template>

<script>
import SearchArea from './components/SearchArea';
import Store from 'electron-store';
import path from 'path';

export default {
  name: 'App',
  components: {
    SearchArea,
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
    this.cardlist = this.configstore.get("Card", {"mu":"ri"})
    this.deck = this.configstore.get("Card.Deck", {"mu":"ri"})
  },
  data: () => ({
    deck: null,
    cardlist: {},
    cardstore: null,
    configstore: null,
  }),
};
</script>
