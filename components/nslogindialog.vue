<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
        <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-login']" id="validate">{{LoginText}}</p>
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
                LoginText: function () { 
                return Utils.getString('LoginText');
            },
            IDButton: function () { 
                return Utils.getString('IDButton');
            }
        },

        methods: {
          onIdentify: function () {
            kiwi.state.$emit('input.raw', '/NS identify '+ this.accountInput + ' ' + this.pwdInput )
            kiwi.state.$emit('input.raw', '/NICK '+ this.accountInput )
            var loginNick = this.accountInput;
            var http = new XMLHttpRequest();
            var url = 'https://webcpanel.simosnap.com/';
            var params = 'username='+this.accountInput+'&password='+this.pwdInput;
            http.open('POST', url, true);

            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.withCredentials = true;
            http.send(params);


            }
        },
    };
</script>