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
        this.getRestaurant();

        axios.get('../rest/login/loginCheck')
        .then(response => {
            let roleStr = response.data.role;
            console.log(roleStr);
            switch(roleStr){
                case 'ADMINISTRATOR':
                    window.location.href = "../html/adminHomepage.html";
                    break;
                case 'MANAGER':
                    window.location.href = "../html/managerHomepage.html";
                    break;
                case 'BUYER':
                    
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

        getRestaurant: function() {
            let id = window.location.href.split('?')[1].split('=')[1].split('#/')[0];
            axios.get('../rest/restaurants/' + id)
            .then(response => {
                this.restaurant = response.data;
            });
        },

        openMyCart : function() {
            window.location.href = '../html/buyerMyCart.html';
        },

        logOut: function() {
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        }
    }

});