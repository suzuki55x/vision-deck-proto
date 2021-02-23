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
              <v-dialog v-model="detail_dialog" max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">No.{{selectedCard.No||"0"}} {{ selectedCard.Name || ""}}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <span>{{ selectedCard.Type }}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <span v-if="selectedCard.Type==='Character'">Glaze: {{selectedCard.Glaze||"0"}}</span>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <span v-if="selectedCard.Type==='Character'">種族: {{selectedCard.Class||"なし"}}</span>
                          <span v-else-if="selectedCard.Type==='Spell'">術者: {{selectedCard.User}}</span>
                        </v-col>
                      </v-row>
                      <v-row v-if="selectedCard.Skill">
                        <v-col cols="12">
                          <span v-for="skill in selectedCard.Skill.split(' ')" :key="skill">
                            <v-chip class="mr-2" color="primary" pill outlined small>{{skill}}</v-chip>
                          </span>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <span>{{selectedCard.Ability}}</span>
                        </v-col>
                      </v-row>
                      <v-row v-if="selectedCard.Type==='Character'">
                        <v-col offset="6" cols="6" class="text-right">
                          <span >{{selectedCard.Attack}} / {{selectedCard.Toughness}}</span>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeCardDetail">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:item="{ item }">
              <tr :class="selectedRows.indexOf(item.No)>-1?'cyan':''" @click="rowClicked(item)">
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
export default {
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
