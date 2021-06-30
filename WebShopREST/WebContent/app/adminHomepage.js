const Restaurants = { template: '<admin-restaurants></admin-restaurants>' }
const Users = { template: '<admin-users></admin-users>' }
const Comments = { template: '<admin-comments></admin-comments>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Restaurants },
        { path: '/users', component: Users },
        { path: '/comments', component: Comments }
    ]
});

var app = new Vue({
    router,
    el: '#tabs',
    data: {
        tab: 1
    },

    mounted() {
	
    },
    methods: {
        
    }

});