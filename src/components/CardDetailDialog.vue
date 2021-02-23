<template>
  <v-dialog v-model="is_showable" max-width="600px" @click:outside="closeCardDetail">
    <v-card>
      <v-card-title>
        <span class="headline">No.{{card.No||"0"}} {{ card.Name || ""}}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <span>{{ card.Type }}</span>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <span v-if="card.Type==='Character'">Glaze: {{card.Glaze||"0"}}</span>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <span v-if="card.Type==='Character'">種族: {{card.Class||"なし"}}</span>
              <span v-else-if="card.Type==='Spell'">術者: {{card.User}}</span>
            </v-col>
          </v-row>
          <v-row v-if="card.Skill">
            <v-col cols="12">
              <span v-for="skill in card.Skill.split(' ')" :key="skill">
                <v-chip class="mr-2" color="primary" pill outlined small>{{skill}}</v-chip>
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span>{{card.Ability}}</span>
            </v-col>
          </v-row>
          <v-row v-if="card.Type==='Character'">
            <v-col offset="6" cols="6" class="text-right">
              <span >{{card.Attack}} / {{card.Toughness}}</span>
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

<script>
export default {
  props: [
    'is_showable',
    'card'
  ],
  methods: {
    closeCardDetail: function() {
      this.$emit("closeDialog")
    }
  }
}
</script>