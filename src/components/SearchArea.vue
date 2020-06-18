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
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-form>
          <v-layout justify-center>
            <v-card class="subheading mx-3">
              <v-text-field label="No" name="cardNo" outlined dense clearable hide-details></v-text-field>
              <v-text-field label="文字列" v-model="cardTxt" outlined dense clearable hide-details></v-text-field>
              <v-select label="キャラクター" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="カードセット" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="種類" chips multiple outlined dense clearable hide-details></v-select>
            </v-card>
            <v-card class="subheading mx-3">
              <v-select label="ノード" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="コスト" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="攻撃" chips multiple outlined dense clearable hide-details></v-select>
              <v-select label="耐久" chips multiple outlined dense clearable hide-details></v-select>
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
export default {
  data: () => ({
    cardTxt:''
  }),
  methods: {
    getSearchCondition() {
      return this.cardTxt;
    }
  }
};
</script>
