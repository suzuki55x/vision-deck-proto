<template>
  <v-app>
    <div>
      <v-app-bar app dense>
        <v-spacer></v-spacer>
        <Deckio
          ref="deckio"
          @load-deck="loadDeck"
          @write-deck="writeDeck"
        />
        <v-btn icon color="primary" @click="is_side = !is_side"><v-icon>mdi-rotate-3d-variant</v-icon></v-btn>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primary" v-bind="attrs" v-on="on" ><v-icon>mdi-magnify</v-icon></v-btn>
          </template>
          <v-card>
            <v-toolbar dark>
              <v-btn icon dark @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
              <v-toolbar-title>カード検索</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="search(); dialog = false">検索</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <SearchArea ref="searcharea" />
          </v-card>
        </v-dialog>
      </v-app-bar>
    </div>
    <v-content id="main-content">
      <v-row>
        <v-col cols="6" >
          <v-fab-transition hide-on-leave>
            <DeckList v-show="!is_side" title="デッキ" :cardstore="cardlist" ref="decklist" />
          </v-fab-transition>
          <v-fab-transition hide-on-leave>
            <DeckList v-show="is_side" title="サイドデッキ" :cardstore="cardlist" ref="sidedecklist" />
          </v-fab-transition>
        </v-col>
        <v-col cols="6">
          <CardList title="カードリスト" :cardstore="cardlist" ref="cardlist" @addDeckList="addDeckList" @addSideDeckList="addSideDeckList" />
          <v-card class="mt-2" min-height="92px" max-height="92px">空きスペース(何か考える)</v-card>
        </v-col>
      </v-row>
      <v-row>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import SearchArea from "./components/SearchArea";
import CardList from "./components/CardList";
import DeckList from "./components/DeckList";
//import SidedeckList from './components/DeckList';
import Deckio from "./components/Deckio";
//import Store from 'electron-store';
import SearchCondition from "./searchCondition.js"; // eslint-disable-line no-unused-vars
import JsonMixin from "@/mixins/JsonMixin";

export default {
  name: "App",
  mixins: [JsonMixin],
  components: {
    SearchArea,
    CardList,
    DeckList,
    //SidedeckList,
    Deckio,
  },
  created: function () {
  },
  mounted: function () {
    this.deck = this.configlist.Card.Deck;
  },
  data: () => ({
    dialog: false,
    deck: null,
    writeDeckArray: [],
    writeSideDeckArray: [],
    is_side: false,
  }),
  methods: {
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
      let sepalate = deckArray.indexOf("--");
      this.$refs.decklist.loadDeck(deckArray.slice(0, sepalate));
      if (sepalate + 2 < deckArray.length) {
        this.$refs.sidedecklist.loadDeck(
          deckArray.slice(sepalate + 1, deckArray.length)
        );
      }
    },
    writeDeck() {
      const deck = this.$refs.decklist.decklist;
      const side = this.$refs.sidedecklist.decklist;
      this.$refs.deckio.saveDeckFile(deck, side);
    },
  },
};
</script>

<style>
.center-input input {
  text-align: center;
}
.right-input input {
  text-align: right;
}
.left-input input {
  text-align: left;
}
</style>
