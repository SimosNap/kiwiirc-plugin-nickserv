<template id="error-message">
    <div>
        <div>
            <div>{{message}} <a @click="register()">Registrati</a> per partecipare alla chat, oppure <a @click="login()">Accedi</a> ad un account esistente.</div>
        </div>
    </div>
</template>

<script>

import nsregisterdialog from './nsregisterdialog.vue';
import nslogindialog from './nslogindialog.vue';

    export default {
        template: '#error-message',
        props: ['message'],
        methods: {
            register: function register() {
                kiwi.state.$emit('mediaviewer.show', {component: nsregisterdialog });
            },
            login: function register() {
                kiwi.state.$emit('mediaviewer.show', {component: nslogindialog });
            },
        },
    };
</script>