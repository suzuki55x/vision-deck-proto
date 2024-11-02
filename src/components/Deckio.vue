<template>
  <div class="d-flex align-center">
    <v-switch label="VOF形式で出力" v-model="supportVisionOnlineFormat" hide-details></v-switch>

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
    return {
      supportVisionOnlineFormat: false,
    };
  },
  methods: {
    readDeck: async function () {
      const { canceled, data } = await window.electron.open();
      if (canceled) return;

      let deckArray = data[0].split(/\r\n|\r|\n/);

      // 先頭に「メインデッキ」の文字がある場合はVOF形式(Vision Onlineのフォーマット)として扱う
      if (deckArray[0].startsWith("メインデッキ")) {
        //this.supportVisionOnlineFormat = true;
        // VOF形式を通常フォーマットに変換する。
        deckArray = this.convertDeckArrayToNormalFormat(deckArray);
      }

      this.$emit("load-deck", deckArray);
    },
    convertDeckArrayToNormalFormat: function (deckArray) {
      // 先頭の”メインデッキ”を削除する
      deckArray.shift();
      deckArray = deckArray.map((line) => {
        // "サイドボード"の行を"--"に変換する。
        if (line.startsWith("サイドボード")) {
          return "--";
        }

        // カンマ区切りの1番目(No)と2番目(枚数)の要素を入れ替える
        const [num, count, name] = line.split(",");
        return `${count},${num},${name}`;
      });
      return deckArray;
    },
    convertDeckArrayToVOFFormat: function (deckArray) {
      // 先頭に”メインデッキ”を追加する
      deckArray.unshift("メインデッキ");
      deckArray = deckArray.map((line) => {
        // "--"の行を"サイドボード"に変換する。
        if (line === "--") {
          return "サイドボード";
        }

        // カンマ区切りの1番目(枚数)と2番目(No)の要素を入れ替える
        const [count, num, name] = line.split(",");
        if (name === undefined) {
          // 3要素に分割できない場合はそのまま返す
          return line;
        }
        return `${num},${count},${name}`;
      });
      return deckArray;
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

      let data = deck + "\r\n--\r\n" + side;

      // VOF形式の場合は変換する
      if (this.supportVisionOnlineFormat) {
        data = this.convertDeckArrayToVOFFormat(data.split(/\r\n|\r|\n/)).join("\r\n");
      }

      await window.electron.save(data);
    },
  },
};
</script>
