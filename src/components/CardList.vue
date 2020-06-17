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
        <v-data-table :headers="headers" :items="cardlist" :items-per-page="50" item-key="No" dense v-model="selectedRows">
          <template v-slot:item="{ item }">
            <tr :class="selectedRows.indexOf(item.No)>-1?'cyan':''" @click="rowClicked(item)">
              <td>{{item.No}}</td>
              <td>{{item.Name}}</td>
              <td>{{item.Node}}</td>
              <td>{{item.Cost}}</td>
              <td>{{item.Skill}}</td>
            </tr>
            </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [
    'cardstore'
  ],
  created: function() {
    /* eslint-disable no-console */
    //console.dir(this.cardstore.get("Cards"))
    this.cardlist = Object.values(this.cardstore.get("Cards"))
  },
  data: () => ({
    cardlist: [],
    selected: [],
    selectedRows: [],
    headers: [
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
      this.log(row);
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
  },
};
</script>
