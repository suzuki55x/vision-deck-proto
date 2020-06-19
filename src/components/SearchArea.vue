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
              <v-select :items="kind" label="種類" chips multiple outlined dense clearable hide-details></v-select>
            </v-card>
            <v-card class="subheading mx-3">
              ノード：<input type="number" min="0" v-model="Node"><br>
              コスト：<input type="number" min="0" v-model="Cost"><br>
              攻撃：<input type="number" min="0" v-model="Attack"><br>
              耐久：<input type="number" min="0" v-model="Defence"><br>
            </v-card>
            <v-card class="subheading mx-3">
              <v-select :items="nodeOption" v-model="chosenNodeOption"></v-select>
              <v-select :items="costOption" ></v-select>
              <v-select :items="attackOption"></v-select>
              <v-select :items="defenceOption"></v-select>
            </v-card>
            <v-card class="subheading mx-3">
              <v-select label="特殊効果" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="戦術" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="種族" chips multiple outlined dense clearable hide-details></v-select>
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
    cardTxt:'',
    Node:0,
    Cost:0,
    Attack:0,
    Defence:0,
    kind : ['キャラクター', 'スペル', 'コマンド'],
    nodeOption : ['', '以上', '以下', 'に等しい'],
    costOption : ['', '以上', '以下', 'に等しい'],
    attackOption : ['', '以上', '以下', 'に等しい'],
    defenceOption : ['', '以上', '以下', 'に等しい'],
    chosenNodeOption:''
  }),
  methods: {
    getSearchCondition() {
      let condition = new SearchCondition();
      condition.cardTxt = this.cardTxt;
      condition.node = this.Node;
      condition.cost = this.Cost;
      condition.attack = this.Attack;
      condition.defence = this.Defence;
      condition.nodeOption = this.chosenNodeOption;
      condition.costOption = this.costOption;
      condition.attackOption = this.attackOption;
      condition.defenceOption = this.defenceOption;
      return condition;
    }
  }
};
</script>
