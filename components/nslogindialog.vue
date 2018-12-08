<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
        <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-login']" id="validate">{{LoginText}}</p>
        <input class="kiwi-ns-input" placeholder="Inserisci account NickServ" type="text" v-model="accountInput">
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
                accountInput:'',
                pwdInput: ''
                }
            },
    
            computed: {
                themeName: function() {
                    return data.themeName;
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
    var data = new kiwi.Vue({data: {themeName: ''}});
    data.themeName = kiwi.themes.currentTheme().name.toLowerCase();

    kiwi.on('theme.change', function(event) {
        data.themeName = kiwi.themes.currentTheme().name.toLowerCase();
        console.log(data.themeName);

    });
</script>