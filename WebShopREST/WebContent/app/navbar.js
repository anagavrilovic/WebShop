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
        logOut: function() {
			console.log('hejj');
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        }
    }

});