<template>
  <v-virtual-scroll bench="1" :items="cardlist" height="520" item-height="42">
    <template v-slot:default="{ item }">
      <v-list-item dense :class="getBgColor(item)">
        <v-row>
          <v-col cols="1" class="text-caption" v-if="is_decklist && 'SheetNum' in item">
            <v-avatar size="20" color="#2196F3" class="white--text">
              {{ item.SheetNum }}
            </v-avatar>
          </v-col>

          <v-col cols="2" class="text-caption">
            No.{{ item.No }}
          </v-col>

          <v-col cols="6" class="pl-0">
            <div class="text-truncate">
              {{ item.Name }}
            </div>
          </v-col>

          <v-col :cols="is_decklist ? 1 : 2" class="text-caption px-0">
            <v-layout>
              <v-flex class="">N{{ item.Node || '' }}/C{{ item.Cost || '' }}</v-flex>
            </v-layout>
          </v-col>

          <v-col cols="2" class="text-caption">
            <slot name="action" :card="item" />
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
    </template>
  </v-virtual-scroll>
</template>

<script>
export default {
  methods: {
    getBgColor(item) {
      if (item.Type == 'Character') {
        return 'yellow lighten-5';
      } else if (item.Type == 'Spell') {
        if (item.Skill && item.Skill.includes('ラストスペル')) {
          return 'grey lighten-1';
        } else if (item.Skill && item.Skill.includes('ラストワード')) {
          return 'red lighten-3';
        } else if (item.Skill && item.Skill.includes('オーバードライブ')) {
          return 'purple lighten-5';
        } else {
          return 'pink lighten-5';
        }
      } else if (item.Type == 'Command') {
        return 'blue-grey lighten-5';
      } else {
        return '';
      }
    },
  },
  props: {
    cardlist: Array,
    is_decklist: Boolean,
  },
};
</script>