const Restaurants = { template: '<manager-restaurants></manager-restaurants>' }
const Products = { template: '<manager-products></manager-products>' }
const Orders = { template: '<manager-orders></manager-orders>' }
const Buyers = { template: '<manager-buyers></manager-buyers>' }
const Information = { template: '<manager-restaurant-information></manager-restaurant-information>' }
const Comments = { template: '<manager-comments></manager-comments>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Restaurants },
        { path: '/products', component: Products },
        { path: '/orders', component: Orders },
        { path: '/buyers', component: Buyers },
        { path: '/info', component: Information },
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
        axios.get('../rest/login/loginCheck')
        .then(response => {
            let roleStr = response.data.role;
            console.log(roleStr);
            switch(roleStr){
                case 'ADMINISTRATOR':
                    window.location.href = "../html/adminHomepage.html";
                    break;
                case 'MANAGER':
                   
                    break;
                case 'BUYER':
                    window.location.href = "../html/buyerHomepage.html";
                    break;
                case 'DELIVERER':
                    window.location.href = "../html/delivererHomepage.html";
                    break;
                default:
                    window.location.href = "../html/homepage.html";
                    break;
            }
          
        });
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

        logOut: function() {
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        }
    }
});