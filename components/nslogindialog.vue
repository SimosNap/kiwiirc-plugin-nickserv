<template>
    <div class="nsform-container">
        <div class="menu-nsform-container">
            <div class="u-button menu-active-nsform menu-nsform-left">Login</div>
            <div class="u-button menu-nsform  menu-nsform-right" @click="goRegister()">Registra Account</div>
        </div>
        <div :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
            <p v-if="componentProps != null" style="margin-bottom:-0.5em">{{ componentProps.preMessage }} <span class="current-nickname">{{ componentProps.channel }}</span> {{ componentProps.postMessage }}</p>
            <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-login']" id="validate">{{LoginText}} <span v-if="componentProps != null">{{ componentProps.action }}</span><span v-if="componentProps != null && componentProps.channel == ''" class="current-nickname">{{ componentProps.join }}</span></p>
             <p v-if="!componentProps" style="margin: -1em 0 0.5em 0;">Usa Il tuo nickname oppure un alias del tuo gruppo. <a class="u-link" href="https://www.simosnap.org/account" target="_blank">Pannello Account</a></p>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input class="u-input" placeholder="Inserisci account NickServ" type="text" v-model="accountInput">
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
            <button :class="['u-button', 'u-button-primary', 'u-submit', 'kiwi-welcome-simple-start', 'kiwi-ns-button']" v-on:click="onIdentify" >{{IDButton}}</button>
        </div>
    </div>
</template>
<script>
    import * as Utils from '../libs/Utils.js';
    import nsregisterdialog from './nsregisterdialog.vue';

    export default {
        props:['componentProps'],
        data: function data() {
            return {
            accountInput:'',
            pwdInput: '',
            executed: false
            }
        },
        computed: {
            themeName: function() {
                return kiwi.themes.currentTheme().name.toLowerCase();
            },
                LoginText: function () {
                return Utils.getString('LoginText');
            },
            IDButton: function () {
                return Utils.getString('IDButton');
            }
        },

        methods: {
            onIdentify: function () {
			
				if (!this.pwdInput) { alert("Tutti i campi sono obbligatori"); return; }
				if (!this.accountInput) { alert("Tutti i campi sono obbligatori"); return;}
				
                kiwi.state.$emit('input.raw', '/NS identify '+ this.accountInput + ' ' + this.pwdInput )
                kiwi.state.$emit('input.raw', '/NS recover '+ this.accountInput + ' ' + this.pwdInput )
                kiwi.state.$emit('input.raw', '/NICK '+ this.accountInput )
                if (this.componentProps && this.componentProps.channel) {
                    kiwi.state.$emit('input.raw', '/JOIN '+ this.componentProps.join );
                    this.executed = true;
                }
            },
            goRegister: function () {
                kiwi.state.$emit('mediaviewer.show', {component: nsregisterdialog })
            }
        },
        beforeDestroy: function beforeDestroy() {
            if ((this.executed == false) && (this.componentProps != null)) {
                let network = kiwi.state.getActiveNetwork();
                let buffer = kiwi.state.getBufferByName(network.id, this.componentProps.join);
                if (this.componentProps.closeBuffer) {
                    kiwi.state.removeBuffer(buffer);
                }
            }
        },
    };
</script>
