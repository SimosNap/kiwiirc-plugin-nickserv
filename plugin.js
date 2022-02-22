import confirmdialog from './components/confirmdialog.vue';
import nsdialog from './components/nsdialog.vue';
import nslogindialog from './components/nslogindialog.vue';
import nsregisterdialog from './components/nsregisterdialog.vue';

import './style.css'

kiwi.plugin('nickserv', function(kiwi) {

    // Plugin Config #########################################################################

    // Wrong password text
    var WPText = "Password errata!";
    // Bad password text on register
    var BPText = "Attenzione, prova di nuovo con una password più sicura.<br> Le password devono essere lunghe almeno 5 caratteri, non devono essere facilmente intuibili (ad es. il proprio nome o nick)<br> e non possono contenere i caratteri di spazio e di tabulazione.";

    // ANOPE NICKSERV
    // NickServ Identify Regex   include/language.h:92
    var IDString = "^Questo nick è registrato e protetto. Se questo è il tuo";
    // Wrong password Regex include/language.h:71
    var WPString = "^Password errata";
    // Services enforce nick Regex  modules/pseudoclients/nickserv.cpp:254
    var ENString = "^Il tuo nick sarà cambiato in";
    // Account confirmation request Regex  modules/commands/ns_register.cpp:260 modules/commands/ns_register.cpp:391
    var ConfirmReqString = "^Il tuo indirizzo email non è stato confermato. Per confermarlo, segui le istruzioni contenute nella email che hai ricevuto quando ti sei registrato";
    // Invalid Confirmation code Regex modules/commands/ns_register.cpp:83 modules/commands/ns_register.cpp:86
    var InvalidConfirmString = "^Codice di attivazione non valido";
    // Invalid Confirmation code text include/language.h:99
    var InvalidConfirmText = "Codice di attivazione non valido. Inserisci il codice di conferma ricevuto per email per completare la registrazione dell\' account.";
    // A valid confirmation code has been entered modules/commands/ns_register.cpp:67
    var ValidConfirmString = "^Il tuo indirizzo email per (.*) è stato confermato.";
    // Bad Password Notify include/language.h:73
    var BadPwdString = "^Attenzione, prova di nuovo con una password più sicura.";
    // Bad Email Notify include/language.h:86
    var BadEmailString = "non è un indirizzo e-mail valido.";
    // Register delay modules/commands/ns_register.cpp:153
    var RegDelayString = "^E' necessario aver usato questo nick per almeno 30 secondi prima di poterlo registrare.";
    // Login success Valid Password Regex modules/commands/ns_identify.cpp:38
    var ValidPwdString = "^Password accettata - adesso sei riconosciuto.";
    // Already identified modules/commands/ns_identify.cpp:87 modules/commands/os_login.cpp:34
    var AlreadyIdString ="^Sei già identificato.";
    // End Plugin Config  ####################################################################

    var IDRe = new RegExp(IDString ,"");
    var WPRe = new RegExp(WPString ,"");
    var ENRe = new RegExp(ENString ,"");
    var ConfirmReqRe = new RegExp(ConfirmReqString ,"");
    var InvalidConfirmRe = new RegExp(InvalidConfirmString ,"");
    var ValidConfirmRe = new RegExp(ValidConfirmString ,"");
    var BadPwdRe = new RegExp(BadPwdString ,"");
    var BadEmailRe = new RegExp(BadEmailString ,"");
    var RegDelayRe = new RegExp(RegDelayString ,"");
    var ValidPwdRe = new RegExp(ValidPwdString ,"");
    var AlreadyIdRe = new RegExp(AlreadyIdString ,"");

    var data = new kiwi.Vue({data: {themeName: ''}});
    data.themeName = kiwi.themes.currentTheme().name.toLowerCase();

    kiwi.on('theme.change', function(event) {
        data.themeName = kiwi.themes.currentTheme().name.toLowerCase();
    });

    function registerFn() {
         kiwi.state.$emit('mediaviewer.show', {component: nsregisterdialog });
    }

    function logoutFn() {
         kiwi.state.$emit('input.raw', '/NS Logout' );
    }

    function loginFn() {
         kiwi.state.$emit('mediaviewer.show', {component: nslogindialog });
    }

    var loginBtn = document.createElement('a');
    loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-sign-in"></i><span>Login</span>';
    loginBtn.addEventListener("click", loginFn);
    kiwi.addUi('header_channel', loginBtn);

    kiwi.on('irc.raw.900', function(command, event, network){
                loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-sign-out"></i><span>Logout</span>';
                loginBtn.removeEventListener("click", loginFn);
                loginBtn.addEventListener("click", logoutFn);
    });

    kiwi.on('irc.account', function(event, network) {
        if (event.nick == network.nick) {
            if (event.account == false ) {
                loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-sign-in"></i><span>Login</span>';
                loginBtn.removeEventListener("click", logoutFn);
                loginBtn.addEventListener("click", loginFn);
            } else {
                loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-sign-out"></i><span>Logout</span>';
                loginBtn.removeEventListener("click", loginFn);
                loginBtn.addEventListener("click", logoutFn);
            }
        }
    });

    kiwi.on('irc.raw.477', function(command, event, network){
        let preMessage = 'L\' accesso al canale ';
        let postMessage = 'è riservato agli utenti registrati';
        let action = 'per accedere';
        kiwi.state.$emit('mediaviewer.show', {component: nslogindialog, componentProps: { preMessage: preMessage, channel : event.params[1], join : event.params[1], postMessage : postMessage, action: action }});
        event.handled = true;
        return;

    });

    kiwi.on('irc.raw.474', function(command, event, network){
        let preMessage = 'Solamente gli utenti registrati possono creare dei canali';
        let postMessage = '';
        let action = 'per creare ';
        let channel = '';
        kiwi.state.$emit('mediaviewer.show', {component: nslogindialog, componentProps: { preMessage: preMessage, channel : channel, join : event.params[1], postMessage : postMessage, action: action }});
        event.handled = true;
        return;

    });

    kiwi.on('irc.notice', function(event) {

        if (event.nick.toLowerCase() !== 'nickserv') { return; }

        if (event.message.match(IDRe)) {
                kiwi.state.$emit('mediaviewer.show', {component: nsdialog })
                return;
            }
        if (event.message.match(WPRe)) {
                var el = document.getElementById("validate")
                el.innerHTML = WPText ;
                return;
            }
        if (event.message.match(ConfirmReqRe)) {
                kiwi.state.$emit('mediaviewer.show', {component: confirmdialog })
                return;
            }

        if (event.message.match(InvalidConfirmRe)) {
                var el = document.getElementById("validate")
                el.innerHTML = InvalidConfirmText ;
                return;
            }

        if (event.message.match(ENRe)) {
                kiwi.state.$emit('mediaviewer.hide')
                return;
            }

        if (event.message.match(ValidConfirmRe)) {
                kiwi.state.$emit('mediaviewer.hide')
                return;
            }

        if (event.message.match(BadPwdRe)) {
                var el = document.getElementById("validate")
                el.innerHTML = BPText ;
                return;
            }

        if (event.message.match(BadEmailRe)) {
                var el = document.getElementById("validate")
                el.innerHTML = event.message ;
                return;
            }

        if (event.message.match(RegDelayRe)) {
                var el = document.getElementById("validate");
                el.innerHTML = event.message ;
                setTimeout(function() {
                    kiwi.state.$emit('mediaviewer.hide');
                }, 2000);
                return;
            }
        if (event.message.match(ValidPwdRe)) {
                var el = document.getElementById("validate");
                el.innerHTML = event.message ;
                setTimeout(function() {
                    kiwi.state.$emit('mediaviewer.hide');
                }, 2000);
                return;
            }

        if (event.message.match(AlreadyIdRe)) {
                var el = document.getElementById("validate");
                el.innerHTML = event.message ;
                setTimeout(function() {
                    kiwi.state.$emit('mediaviewer.hide');
                }, 2000);
                return;
            }
         });

    kiwi.on('input.command.nick', function(event) {
        kiwi.state.$emit('mediaviewer.hide')
    });

});
