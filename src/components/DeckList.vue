<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex
        mb-5
        xs12
      >
        <v-card>
          <v-card-title>{{title}}</v-card-title>
          <v-data-table :headers="headers" :items="decklist" :items-per-page="50" item-key="No" dense v-model="selectedRows" multi-sort>
            <template v-slot:top>
              <card-detail-dialog @closeDialog="closeCardDetail" :is_showable="detail_dialog" :card="selectedCard" />
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  <v-icon small @click="showCardDetail(item)" >mdi-information</v-icon>
                  <v-icon small @click="putCard(item)" >mdi-plus</v-icon>
                  <v-icon small @click="removeCard(item)" >mdi-minus</v-icon>
                </td>
                <td>{{item.SheetNum}}</td>
                <td>{{item.No}}</td>
                <td>{{item.Name}}</td>
                <td>{{item.Node}}</td>
                <td>{{item.Cost}}</td>
                <td>
                  <template v-if="item.Skill">
                    <span v-for="skill in item.Skill.split(' ')" :key="skill">
                      <v-chip class="mr-2" color="primary" pill outlined x-small>{{skill}}</v-chip>
                    </span>
                  </template>
                </td>
              </tr>
              </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CardDetailDialog from '@/components/CardDetailDialog';

export default {
  components: {
    CardDetailDialog
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
    headers: [
      {
        text: 'Actions',
        align: 'center',
        sortable: false,
        width: 80,
        value: 'Actions'
      },
      {
        text: '枚',
        align: 'left',
        sortable: true,
        value: 'sheetnum'
      },
      {
        text: 'No',
        align: 'left',
        sortable: true,
        value: 'No'
      },
      {
        text: 'カード名',
        align: 'left',
        sortable: true,
        value: 'Name'
      },
      {
        text: 'Node',
        align: 'left',
        sortable: true,
        value: 'Node'
      },
      {
        text: 'Cost',
        align: 'left',
        sortable: true,
        value: 'Cost'
      },
      {
        text: 'Skill',
        align: 'left',
        sortable: true,
        value: 'Skill'
      },
    ]
  }),
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
