<template>
    <div title="NickServ" style="text-align:center;height:100%;width:100%;">
        <div class="kiwi-appsettings-title">
            <span>chiudi</span> <i @click="close" style="buttonStyle" class="fa fa-times" aria-hidden="true"></i>
        </div>
        <iframe src="https://webcpanel.simosnap.com/nickserv/info" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>
    </div>
</template>

<script>
    export default {
    
        computed: {
            themeName: function() {
                return data.themeName;
            },
            hasr: function() {
                return data.nsNotify;
            }
        },
    
        methods: {
            close: function close() {
                kiwi.state.$emit('active.component', null);
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
