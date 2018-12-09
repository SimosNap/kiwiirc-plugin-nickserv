<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
        <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-error']" id="validate">{{IDText}}</p>
        <input class="kiwi-ns-input" placeholder="Inserisci la password" type="password" v-model="pwdInput">
        <div class="u-input-text-underline">
            <div class="u-input-text-underline-active"></div>
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit', 'kiwi-' + themeName + '-simple-start', 'kiwi-ns-button']" v-on:click="onIdentify" >{{IDButton}}</button>
    </div>
</template>
<script>
    import * as Utils from '../libs/Utils.js';
    
    export default {
    
        data: function data() {
            return {
            pwdInput: ''
            }
        },

        computed: {
            themeName: function() {
                return kiwi.themes.currentTheme().name.toLowerCase();
            },
            IDText: function () { 
                return Utils.getString('IDText');
            },
            IDButton: function () { 
                return Utils.getString('IDButton');
            }
        },

        methods: {
          onIdentify: function () {
            kiwi.state.$emit('input.raw', '/NS identify '+ this.pwdInput )
            var loginNick = kiwi.state.getNetwork(1).nick;
            var http = new XMLHttpRequest();
            var url = 'https://webcpanel.simosnap.com/';
            var params = 'username='+loginNick+'&password='+this.pwdInput;
            http.open('POST', url, true);

            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.withCredentials = true;
            http.send(params);


            }
        },
    };
</script>