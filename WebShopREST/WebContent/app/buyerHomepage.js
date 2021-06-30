const Restaurants = { template: '<restaurants></restaurants>' }
const MyOrders = { template: '<my-orders></my-orders>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Restaurants },
        { path: '/myOrders', component: MyOrders }
    ]
});

var app = new Vue({
    router,
    el: '#page',
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
        openMyCart : function() {
            window.location.href = '../html/buyerMyCart.html';
        }
    }
});