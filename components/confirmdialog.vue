<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input', 'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']" id="nickserv-form" title="NickServ" style="text-align:center;">
        <p :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-error']" id="validate">{{ConfirmReqText}}</p>
        <div class="u-input-text kiwi-ns-input">
		<div class="u-input-text-inputs">
			<input class="u-input" placeholder="Inserisci il codice di conferma" type="text" v-model="codeInput">
		</div>
	</div>
	<div class="u-input-text-underline">
            <div class="u-input-text-underline-active"></div>
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit', 'kiwi-welcome-simple-start', 'kiwi-ns-button']" v-on:click="onIdentify" >{{ConfirmButton}}</button>
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
                return kiwi.themes.currentTheme().name.toLowerCase();
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
</script>