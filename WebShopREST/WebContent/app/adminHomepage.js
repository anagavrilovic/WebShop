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