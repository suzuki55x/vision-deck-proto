<template>
    <div>
        <input type="file" v-on:change="readDeck" accept="text/*,.json,.md">
        <v-btn large color="primary" @click="writeDeck">デッキ出力</v-btn>
    </div>
</template>

<script>
const fs = require('fs');
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

export default {
    data() {
        return {
            deckArray:[]
        };
    },
    methods: {
        readDeck: function(event) {
            let file = event.target.files[0];
            let me = this;

            function read(callback) {
                let reader = new FileReader();
                reader.onload = function() {
                    this.deckArray = callback(reader.result);
                    me.$emit('load-deck', this.deckArray);
                }
                reader.readAsText(file, 'shift-jis');
            }

            read(function(text) {
                return text.split(/\r\n|\r|\n/);
            });
        },
        writeDeck: function() {
            this.$emit('write-deck')
        },
        createSaveData: function(arr) {
            if(!Array.isArray(arr)) {
                // ここには来ないはず。
                alert('デッキ保存エラー')
                return false;
            }
            if(arr.length < 0) {
                // デッキにカードが空
                return false;
            }else{
                return arr.map(card => `${card.SheetNum},${card.No},${card.Name}`).join("\r\n")
            }
        },
        saveDeckFile: function(deck, side) {
            deck = this.createSaveData(deck)
            if (!deck) deck = "";

            side = this.createSaveData(side)
            if (!side) side = "";

            const win = BrowserWindow.getFocusedWindow();
            dialog.showSaveDialog(
                win,
                {
                    properties: ['openFile'],
                    filters: [
                        {
                            name: 'Documents',
                            extensions: ['txt']
                        }
                    ]
                },
                (fileName) => {
                    if (fileName) {
                        const data = deck + "\r\n--\r\n" + side
                        fs.writeFile(fileName, data, error=>{
                            if (error != null) {
                                alert("save error.");
                                return;
                            }
                        });
                    }
                }
            )
        }
    },
}
</script>
