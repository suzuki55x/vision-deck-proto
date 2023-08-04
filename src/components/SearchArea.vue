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
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="Node" v-model="Node" clearable
                        dense /> </v-col>
                    <v-col> <v-select :items="nodeOption" v-model="chosenNodeOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetNodeForm" dense>reset</v-btn> </v-col>
                  </v-row>
                </v-form>

                <v-form ref="costForm">
                  <v-row>
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="Cost" v-model="Cost" clearable
                        dense /> </v-col>
                    <v-col> <v-select :items="costOption" v-model="chosenCostOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetCostForm" dense>reset</v-btn> </v-col>
                  </v-row>
                </v-form>

                <v-form ref="attackForm">
                  <v-row>
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="攻撃" v-model="Attack" clearable
                        dense /> </v-col>
                    <v-col> <v-select :items="attackOption" v-model="chosenAttackOption" dense></v-select> </v-col>
                    <v-col> <v-btn color="" @click="resetAttackForm" dense>reset</v-btn> </v-col>

                  </v-row>
                </v-form>

                <v-form ref="toughnessForm">
                  <v-row>
                    <v-col> <v-text-field type="number" class="right-input" min="0" label="耐久" v-model="Toughness"
                        clearable dense /> </v-col>
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
import SearchCondition from '../searchCondition';

export default {
  data: () => ({
    condition: null,
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
    this.condition = new SearchCondition();
  },
  computed: {
    specialEffect: function () { return this.condition.DEF_SPECIAL_EFFECT; },
    tactics: function () { return this.condition.DEF_TACTICS; },
    type: function () { return this.condition.DEF_TYPE; },
    attribute: function () { return this.condition.DEF_ATTRIBUTE },
    nodeOption: function () { return this.condition.DEF_NODE_OPTION; },
    costOption: function () { return this.condition.DEF_COST_OPTION; },
    attackOption: function () { return this.condition.DEF_ATTACK_OPTION; },
    toughnessOption: function () { return this.condition.DEF_TOUGHNESS_OPTION; },
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
      this.condition.selectedSpecialEffect = this.selectedSpecialEffect;
      this.condition.selectedTactics = this.selectedTactics;
      this.condition.selectedAttribute = this.selectedAttribute;
      return this.condition;
    }
  }
};
</script>
