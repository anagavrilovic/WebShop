var app = new Vue({
    el: '#page',
    data: {
        cart: [{product: null, quantity: null}],
        totalPrice: 0
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
        axios.get('../rest/shopping/getCartItems')
            .then(response => {
                console.log(response.data)
                this.cart = response.data;
                this.calculateTotalPrice();
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

        decreaseQuantity: function(item) {
            item.quantity = item.quantity - 1;
            this.calculateTotalPrice();
            axios.post('../rest/shopping/updateCart', item)
                .then(response => {
                    console.log(response.data);
                });
        },

        increaseQuantity: function(item) {
            item.quantity = item.quantity + 1;
            this.calculateTotalPrice();
            axios.post('../rest/shopping/updateCart', item)
                .then(response => {
                    console.log(response.data);
                });
        },

        removeItem: function(item) {
            let index = this.cart.indexOf(item);
            this.cart.splice(index, 1);
            this.calculateTotalPrice();
            axios.post('../rest/shopping/removeFromCart', item)
                .then(response => {
                    console.log(response.data);
                });
        },

        logOut: function() {
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        },
        calculateTotalPrice: function(){
            this.totalPrice = 0;
            for(const item of this.cart){
                this.totalPrice += item.product.price * item.quantity;
            }
        }
    }
});