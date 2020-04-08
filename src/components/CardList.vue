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
        <v-data-table :headers="headers" :items="cardlist" :items-per-page="50" dense @click="select_row"></v-data-table>
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
    this.cardlist = Object.values(this.cardstore.get("Cards"))
  },
  data: () => ({
    cardlist: [],
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
    select_row : function() {

    },
    this.cardlist = Object.values(this.cardstore.get("Cards"))
  },
};
</script>
