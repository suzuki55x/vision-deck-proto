<template>
    <input type="file" v-on:change="readDeck" accept="text/*,.json,.md">
</template>

<script>
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
    },
}
</script>
