<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
        <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-error']" id="validate">{{ConfirmReqText}}</p>
        <input class="kiwi-ns-input" placeholder="Inserisci il codice di conferma" type="text" v-model="codeInput">
        <div class="u-input-text-underline">
            <div class="u-input-text-underline-active"></div>
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit', 'kiwi-' + themeName + '-simple-start', 'kiwi-ns-button']" v-on:click="onIdentify" >{{ConfirmButton}}</button>
    </div>
</template>
<script>
    import * as Utils from '../libs/Utils.js';
    
    export default {
        
        data: function data() {
            return {
            codeInput: ''
           }
        },
    
        computed: {
            themeName: function() {
                return data.themeName;
            },
            ConfirmReqText: function () { 
                return Utils.getString('ConfirmReqText');
            },
            ConfirmButton: function () { 
                return Utils.getString('ConfirmButton');
            }
        },
    
        methods: {
          onIdentify: function () {
            kiwi.state.$emit('input.raw', '/NS confirm '+ this.codeInput )
    
            }
        },
    };
    var data = new kiwi.Vue({data: {themeName: ''}});
    data.themeName = kiwi.themes.currentTheme().name.toLowerCase();

    kiwi.on('theme.change', function(event) {
        data.themeName = kiwi.themes.currentTheme().name.toLowerCase();
        console.log(data.themeName);

    });
</script>