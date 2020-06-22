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

        <v-form>
          <v-layout justify-center>
            <v-card class="subheading mx-3">
              <v-text-field label="No" name="cardNo" outlined dense clearable hide-details></v-text-field>
              <v-text-field label="文字列" v-model="cardTxt" outlined dense clearable hide-details></v-text-field>
              <v-select label="キャラクター" chips multiple outlined dense clearable hide-details></v-select>
              <v-select :items="type" label="種類" v-model="chosenType"></v-select>
            </v-card>
            <v-card class="subheading mx-3">
              ノード：<input type="number" min="0" v-model="Node"><br>
              コスト：<input type="number" min="0" v-model="Cost"><br>
              攻撃：<input type="number" min="0" v-model="Attack"><br>
              耐久：<input type="number" min="0" v-model="Toughness"><br>
            </v-card>
            <v-card class="subheading mx-3">
              <v-select :items="nodeOption" v-model="chosenNodeOption"></v-select>
              <v-select :items="costOption" v-model="chosenCostOption" ></v-select>
              <v-select :items="attackOption" v-model="chosenAttackOption"></v-select>
              <v-select :items="toughnessOption" v-model="chosenToughnessOption"></v-select>
            </v-card>
            <v-card class="subheading mx-3">
              <v-select :items="specialEffect" label="特殊効果" chips multiple outlined dense clearable hide-details></v-select>
              <v-select :items="tactics" label="戦術" chips multiple outlined dense clearable hide-details></v-select>
              <v-select :items="attribute" label="種族" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="範囲" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="期間" chips multiple outlined dense clearable hide-details></v-select>
            </v-card>
          </v-layout>
        </v-form>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import SearchCondition from '../searchCondition';

export default {
  data: () => ({
    condition: null,
    cardTxt:'',
    Node:0,
    Cost:0,
    Attack:0,
    Toughness:0,
    chosenType:'',
    chosenNodeOption:'',
    chosenCostOption:'',
    chosenAttackOption:'',
    chosenToughnessOption:'',
  }),
  created: function() {
    this.condition = new SearchCondition();
  },
  computed: {
    specialEffect:function(){return this.condition.DEF_SPECIAL_EFFECT;},
    tactics:function(){return this.condition.DEF_TACTICS;},
    type:function(){return this.condition.DEF_TYPE;},
    attribute:function(){return this.condition.DEF_ATTRIBUTE},
    nodeOption:function(){return this.condition.DEF_NODE_OPTION;},
    costOption:function(){return this.condition.DEF_COST_OPTION;},
    attackOption:function(){return this.condition.DEF_ATTACK_OPTION;},
    toughnessOption:function(){return this.condition.DEF_TOUGHNESS_OPTION;},
  },
  methods: {
    getSearchCondition() {
      this.condition.cardTxt = this.cardTxt;
      this.condition.type = this.chosenType;
      this.condition.node = this.Node;
      this.condition.cost = this.Cost;
      this.condition.attack = this.Attack;
      this.condition.toughness = this.Toughness;
      this.condition.nodeOption = this.chosenNodeOption;
      this.condition.costOption = this.chosenCostOption;
      this.condition.attackOption = this.chosenAttackOption;
      this.condition.toughnessOption = this.chosenToughnessOption;
      return this.condition;
    }
  }
};
</script>
