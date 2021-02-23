const cardlist = require("@/json/cardlist")
const configlist = require("@/json/config")

export default {
  data() {
    return {
      cardlist: cardlist,
      configlist: configlist,
    }
  }
}