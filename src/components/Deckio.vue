<template>
  <div>
    <v-btn icon color="primary" @click="readDeck"
      ><v-icon>mdi-file-import</v-icon></v-btn
    >
    <v-btn icon color="primary" @click="writeDeck"
      ><v-icon>mdi-file-export</v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    readDeck: async function () {
      const { canceled, data } = await window.electron.open();
      if (canceled) return;

      const deckArray = data[0].split(/\r\n|\r|\n/);

      this.$emit("load-deck", deckArray);
    },
    writeDeck: function () {
      this.$emit("write-deck");
    },
    createSaveData: function (arr) {
      if (!Array.isArray(arr)) {
        // ここには来ないはず。
        alert("デッキ保存エラー");
        return false;
      }
      if (arr.length < 0) {
        // デッキにカードが空
        return false;
      } else {
        return arr
          .map((card) => `${card.SheetNum},${card.No},${card.Name}`)
          .join("\r\n");
      }
    },
    saveDeckFile: async function (deck, side) {
      deck = this.createSaveData(deck);
      if (!deck) deck = "";

      side = this.createSaveData(side);
      if (!side) side = "";

      const data = deck + "\r\n--\r\n" + side;
      await window.electron.save(data);
    },
  },
};
</script>
