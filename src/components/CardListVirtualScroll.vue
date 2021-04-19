<template>
  <v-virtual-scroll bench="1" :items="cardlist" height="520" item-height="42">
    <template v-slot:default="{ item }">
      <v-list-item dense>
        <v-row>
          <v-col cols="2" class="text-caption" v-if="is_decklist && 'SheetNum' in item">
            <v-avatar size="20" color="#2196F3" class="white--text">
              {{ item.SheetNum }}
            </v-avatar>
          </v-col>

          <v-col cols="2" class="text-caption">
            No.{{ item.No }}
          </v-col>
          <v-col cols="6">
            {{ item.Name }}
          </v-col>

          <v-col cols="2" class="text-caption">
            <slot name="action" :card="item" />
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider inset></v-divider>
    </template>
  </v-virtual-scroll>
</template>

<script>
export default {
  props: {
    cardlist: Array,
    is_decklist: Boolean,
  },
};
</script>