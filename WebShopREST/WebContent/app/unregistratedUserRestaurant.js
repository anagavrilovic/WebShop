const Products = { template: '<restaurant-products></restaurant-products>' }
const Information = { template: '<restaurant-information></restaurant-information>' }
const Comments = { template: '<restaurant-comments></restaurant-comments>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Products },
        { path: '/info', component: Information },
        { path: '/comments', component: Comments }
    ]
});

var app = new Vue({
    router,
    el: '#page',
    data: {
        tab: 1,
        showLoginModal: false,
        showRegistrationModal: false,
        restaurant: null
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        if(window.location.href.includes('info')){
            this.tab = 2;
        } else if(window.location.href.includes('comments')) {
            this.tab = 3;
        } else {
            this.tab = 1;
        }

        this.getRestaurant();
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

        getRestaurant: function() {
            let id = window.location.href.split('?')[1].split('=')[1].split('#/')[0];
            axios.get('../rest/restaurants/' + id)
            .then(response => {
                this.restaurant = response.data;
            });
        },
    }

});