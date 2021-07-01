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
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll(event){
            var nav = document.querySelector('nav');
            if (window.pageYOffset > 100) {
                nav.classList.add('navbar-custom', 'shadow');
            } else {
                nav.classList.remove('navbar-custom', 'shadow');
            }
        }
    }

});