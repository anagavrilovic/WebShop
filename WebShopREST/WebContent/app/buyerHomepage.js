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
        if(window.location.href.includes('myOrders')){
            this.tab = 2;
        } else {
            this.tab = 1;
        }

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

        openMyCart : function() {
            window.location.href = '../html/buyerMyCart.html';
        },

        myProfile: function() {
            window.location.href = "../html/myProfile.html";
        },

        logOut: function() {
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        }
    }
});