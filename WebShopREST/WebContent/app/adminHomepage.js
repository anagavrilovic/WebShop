const Restaurants = { template: '<restaurants></restaurants>' }
const Users = { template: '<users></users>' }
const Comments = { template: '<comments></comments>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Restaurants },
        { path: '/users', component: Users },
        { path: '/comments', component: Comments }
    ]
});

var nav = new Vue({
    router,
    el: '#page',
    data: {
        tab: 1
    },

    mounted() {
	
    },
    methods: {
        
    }

});