<template>
  <v-virtual-scroll bench="1" :items="cardlist" height="520" item-height="42">
    <template v-slot:default="{ item }">

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-list-item dense :class="getBgColor(item)" v-bind="attrs" v-on="on">
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
        </template>
        <div>
          <v-layout>
            <v-flex>{{ item.Name }}</v-flex>
            <v-flex v-if="item.Node && item.Cost" class="text-right">{{ item.Node }} / {{ item.Cost }}</v-flex>
          </v-layout>
          <v-layout>
            <v-flex v-if="item.Skill">{{ item.Skill }}</v-flex>
            <v-flex v-if="item.Upkeep">維持コスト:{{ item.Upkeep }}</v-flex>
          </v-layout>
          <div v-if="item.Ability">{{ item.Ability }}</div>
          <div v-if="item.Attack && item.Toughness" class="text-right">{{ item.Attack }} / {{ item.Toughness }}</div>
        </div>
      </v-tooltip>
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