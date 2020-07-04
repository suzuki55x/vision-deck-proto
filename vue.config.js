module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "vision-deck-proto",
        appId: "com.vision.deck",
        nodeIntegration: true,
        win: {
          icon: 'src/assets/app.ico',
          target: [
            {
              target: 'zip', // 'zip', 'nsis', 'portable'
              arch: ['x64'] // 'x64', 'ia32'
            }
          ]
        }
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
}