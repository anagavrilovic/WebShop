var app = new Vue({
    router,
    el: '#navbar',
    data: {
        tab: 1
    },

    mounted() {
        
    },
    created() {
      
    },
    destroyed() {
        
    },
    methods: {
        myProfile: function() {
            window.location.href = "../html/myProfile.html";
        },

        logOut: function() {
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        }
    }

});