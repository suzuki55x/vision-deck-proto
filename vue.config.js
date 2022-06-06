module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      builderOptions: {
        productName: "vision-deck-proto",
        appId: "com.vision.deck",
        preload: "preload.js",
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
