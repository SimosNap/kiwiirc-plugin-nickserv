<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
        <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-register']" id="validate"> {{RegisterText}} {{currentNick}}</p>
        <input class="kiwi-ns-input" placeholder="Inserisci un indirizzo email valido" type="text" v-model="accountInput">
        <input class="kiwi-ns-input" placeholder="Inserisci la password" type="password" v-model="pwdInput">
        <div class="u-input-text-underline">
            <div class="u-input-text-underline-active"></div>
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit', 'kiwi-' + themeName + '-simple-start', 'kiwi-ns-button']" v-on:click="onRegister" > {{RegButton}} </button>
    </div>
</template>
<script>
    import * as Utils from '../libs/Utils.js';
    export default {
    
        data: function data() {
            return {
            accountInput:'',
            pwdInput: ''
            }
        },
        computed: {
            themeName: function() {
                return kiwi.themes.currentTheme().name.toLowerCase();
            },
            currentNick: function() {
                var net = kiwi.state.getActiveNetwork();
                return net.ircClient.user.nick;
            },
            RegisterText: function () { 
                return Utils.getString('RegisterText');
            },
            RegButton: function () { 
                return Utils.getString('RegButton');
            }
        },
        methods: {
          onRegister: function () {
            kiwi.state.$emit('input.raw', '/NS register '+ this.pwdInput + ' ' + this.accountInput )

            }
        },
    };
</script>