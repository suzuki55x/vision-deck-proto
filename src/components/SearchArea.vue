<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-5 xs12>

        <v-form>
          <v-layout justify-center>
            <v-card class="subheading mx-3">
              <v-text-field label="No" name="cardNo" outlined dense clearable hide-details></v-text-field>
              <v-text-field label="文字列" v-model="cardTxt" outlined dense clearable hide-details></v-text-field>
              <v-select label="キャラクター" chips multiple outlined dense clearable hide-details></v-select>
              <v-select :items="type" label="種類" v-model="chosenType"></v-select>
            </v-card>
            <v-card class="subheading mx-3">
              <v-container>
                <v-form ref="nodeForm">
                  <v-row>
                    <v-col>
                      <v-text-field type="number" class="right-input" min="0" label="Node" v-model="Node"
                        @focus="$event.target.select()" clearable dense />
                    </v-col>
                    <v-col> <v-select :items="nodeOption" v-model="chosenNodeOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetNodeForm" dense>reset</v-btn> </v-col>
                  </v-row>
                </v-form>

                <v-form ref="costForm">
                  <v-row>
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="Cost" v-model="Cost"
                        @focus="$event.target.select()" clearable dense /> </v-col>
                    <v-col> <v-select :items="costOption" v-model="chosenCostOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetCostForm" dense>reset</v-btn> </v-col>
                  </v-row>
                </v-form>

                <v-form ref="attackForm">
                  <v-row>
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="攻撃" v-model="Attack"
                        @focus="$event.target.select()" clearable dense /> </v-col>
                    <v-col> <v-select :items="attackOption" v-model="chosenAttackOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetAttackForm" dense>reset</v-btn> </v-col>

                  </v-row>
                </v-form>

                <v-form ref="toughnessForm">
                  <v-row>
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="耐久" v-model="Toughness"
                        @focus="$event.target.select()" clearable dense /> </v-col>
                    <v-col> <v-select :items="toughnessOption" v-model="chosenToughnessOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetToughnessForm" dense>reset</v-btn> </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card>
            <v-card class="subheading mx-3">
              <v-select :items="specialEffect" v-model="selectedSpecialEffect" label="特殊効果" chips multiple outlined dense
                clearable hide-details></v-select>
              <v-select :items="tactics" v-model="selectedTactics" label="戦術" chips multiple outlined dense clearable
                hide-details></v-select>
              <v-select :items="attribute" v-model="selectedAttribute" label="種族" chips multiple outlined dense clearable
                hide-details></v-select>
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
//import SearchCondition from '../searchCondition';
import Const from '../const';

export default {
  data: () => ({
    //condition: null,
    cardTxt: '',
    Node: 0,
    Cost: 0,
    Attack: 0,
    Toughness: 0,
    chosenType: '',
    chosenNodeOption: '',
    chosenCostOption: '',
    chosenAttackOption: '',
    chosenToughnessOption: '',
    selectedSpecialEffect: [],
    selectedTactics: [],
    selectedAttribute: [],
  }),
  created: function () {
    //this.condition = new SearchCondition();
  },
  computed: {
    specialEffect: function () { return Const.DEF_SPECIAL_EFFECT; },
    tactics: function () { return Const.DEF_TACTICS; },
    type: function () { return Const.DEF_TYPE; },
    attribute: function () { return Const.DEF_ATTRIBUTE },
    nodeOption: function () { return Const.DEF_NODE_OPTION; },
    costOption: function () { return Const.DEF_COST_OPTION; },
    attackOption: function () { return Const.DEF_ATTACK_OPTION; },
    toughnessOption: function () { return Const.DEF_TOUGHNESS_OPTION; },
  },
  methods: {
    resetNodeForm: function () {
      this.$refs.nodeForm.reset();
    },
    resetCostForm: function () {
      this.$refs.costForm.reset();
    },
    resetAttackForm: function () {
      this.$refs.attackForm.reset();
    },
    resetToughnessForm: function () {
      this.$refs.toughnessForm.reset();
    },
    updateSearchCondition(condition) {

      // すでにインスタント検索のテキストが入っているが、詳細検索画面に入力があれば、上書き
      if (this.cardTxt) {
        condition.cardTxt = this.cardTxt;
      }
      condition.type = this.chosenType;
      condition.node = this.Node;
      condition.cost = this.Cost;
      condition.attack = this.Attack;
      condition.toughness = this.Toughness;
      condition.nodeOption = this.chosenNodeOption;
      condition.costOption = this.chosenCostOption;
      condition.attackOption = this.chosenAttackOption;
      condition.toughnessOption = this.chosenToughnessOption;
      condition.selectedSpecialEffect = this.selectedSpecialEffect;
      condition.selectedTactics = this.selectedTactics;
      condition.selectedAttribute = this.selectedAttribute;
      return condition;
    }
  }
};
</script>
