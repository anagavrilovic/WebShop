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
        restaurant: null
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        this.restaurant = {image: '../images/girosMasterCover.jpg', logo: '../images/girosMasterLogo.png', name: 'GYROS MASTER'};
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