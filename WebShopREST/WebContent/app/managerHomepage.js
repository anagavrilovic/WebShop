const Restaurants = { template: '<manager-restaurants></manager-restaurants>' }
const Products = { template: '<manager-products></manager-products>' }
const Orders = { template: '<manager-orders></manager-orders>' }
const Buyers = { template: '<manager-buyers></manager-buyers>' }
const Information = { template: '<manager-information></manager-information>' }
const Comments = { template: '<manager-comments></manager-comments>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Restaurants },
        { path: '/products', component: Products },
        { path: '/orders', component: Orders },
        { path: '/buyers', component: Buyers },
        { path: '/information', component: Information },
        { path: '/comments', component: Comments }
    ]
});


var app = new Vue({
    el: '#tabs',
    router,
    data: {
        tab: 1,
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        
    },
    methods: {
        handleScroll(event){
            var nav = document.querySelector('nav');
            if (window.pageYOffset > 100) {
                nav.classList.add('navbar-custom', 'shadow');
            } else {
                nav.classList.remove('navbar-custom', 'shadow');
            }
        },
    }
});