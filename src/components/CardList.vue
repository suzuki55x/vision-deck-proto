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
          <v-data-table :headers="headers" :items="cardlist" :items-per-page="50" item-key="No" v-model="selectedRows" multi-sort sort-by="No">
            <template v-slot:top>
              <card-detail-dialog @closeDialog="closeCardDetail" :is_showable="detail_dialog" :card="selectedCard" />
            </template>

            <template v-slot:item="{ item }">
              <tr>
                <td>
                  <v-icon small @click.stop="showCardDetail(item)" >mdi-information</v-icon>
                  <v-icon small @click="addDeck(item)" >mdi-plus</v-icon>
                  <v-icon small @click="addSideDeck(item)" >mdi-plus-box</v-icon>
                </td>
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
    /* eslint-disable no-console */
    //console.dir(this.cardstore.get("Cards"))
    this.cardlist = Object.values(this.cardstore.get("Cards"))
  },
  data: () => ({
    detail_dialog: false,
    cardlist: [],
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
        this.cardlist = condition.getSearchResult(Object.values(this.cardstore.get("Cards")));
        return;
    }
  },
};
</script>
