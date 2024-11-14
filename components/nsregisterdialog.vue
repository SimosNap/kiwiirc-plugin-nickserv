<template>
    <div class="nsform-container">
        <div class="menu-nsform-container">
            <div class="u-button menu-nsform menu-nsform-left" @click="goLogin()">Login</div>
            <div class="u-button menu-active-nsform menu-nsform-right">Registra Account</div>
        </div>
        <div :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" style="text-align:center;">
            <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-register']" id="validate"> {{RegisterText}} </p>
            <p style="margin: -1em 0 0.5em 0;">Il tuo nome account sarà: <span class="current-nickname">{{currentNick}}</span> <span class="current-nickname-change" @click="goNickChange()"><i title="Cambia Nickname" class="fa fa-exchange" aria-hidden="true"></i></span></p>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input class="u-input" placeholder="Inserisci un indirizzo email valido" type="text" v-model="accountInput">
                </div>
            </div>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input class="u-input" placeholder="Inserisci la password" type="password" v-model="pwdInput">
                </div>
            </div>
            <div class="u-input-text-underline">
                <div class="u-input-text-underline-active"></div>
            </div>
            <button :class="['u-button', 'u-button-primary', 'u-submit', 'kiwi-welcome-simple-start', 'kiwi-ns-button']" v-on:click="onRegister" > {{RegButton}} </button>
        </div>
    </div>
</template>
<script>
    import * as Utils from '../libs/Utils.js';
    import nslogindialog from './nslogindialog.vue';
    export default {

        data: function data() {
            return {
            accountInput:'',
            pwdInput: '',
            currentNick: ''

            }
        },
        computed: {
            themeName: function() {
                return kiwi.themes.currentTheme().name.toLowerCase();
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
				if (!this.pwdInput) { alert("Tutti i campi sono obbligatori"); return; }
				if (!this.accountInput) { alert("Tutti i campi sono obbligatori"); return;}
                kiwi.state.$emit('input.raw', '/NS register '+ this.pwdInput + ' ' + this.accountInput )
            },
            goLogin: function () {
                kiwi.state.$emit('mediaviewer.show', {component: nslogindialog })
            },
            goNickChange: function() {
                if (document.querySelector('.kiwi-controlinput-user > i.fa-caret-up')) {
                    document.querySelector('.kiwi-controlinput-user > i.fa-caret-up').click(); kiwi.Vue.nextTick(() => document.querySelector('.kiwi-selfuser-nick > i.fa-pencil').click());
                }
            }
        },
        mounted: function mounted() {
	        this.currentNick = kiwi.state.getActiveNetwork().currentUser().nick;
	        const self = this;
	        kiwi.on('irc.nick', function(event, network) {
	            this.currentNick = network.ircClient.user.nick;
	            if (event.nick == this.currentNick) {
	                self.currentNick = event.new_nick;
	            }
	        });
        },
    };
</script>
