<template>
  <v-virtual-scroll bench="1" :items="cardlist" height="240" item-height="40">
    <template v-slot:default="{ item }">
      <v-list-item dense>
        <v-list-item-avatar size="24" v-if="'SheetNum' in item">
          <v-avatar color="#2196F3" class="white--text">{{item.SheetNum}}</v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> No.{{item.No}}, {{item.Name}}</v-list-item-title>
        </v-list-item-content>

        <slot name="action" :card="item" />

      </v-list-item>
      <v-divider inset></v-divider>
    </template>
  </v-virtual-scroll>
</template>

<script>
export default {
  props: [
    'cardlist'
  ],
}
</script>