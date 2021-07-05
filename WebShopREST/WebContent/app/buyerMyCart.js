var app = new Vue({
    el: '#page',
    data: {
        cart: null,
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        this.cart = [
            {name: 'Mali giros', price: 230.00, imagePath: '../images/girosMasterGiros.png', quantity: 1},
            {name: 'Veliki giros', price: 330.00, imagePath: '../images/girosMasterGiros.png', quantity: 1},
            {name: 'Pomfrit', price: 120.00, imagePath: '../images/girosMasterPomfrit.png', quantity: 1}
        ]
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
        decreaseQuantity: function(item) {
            item.quantity = item.quantity - 1;
        },
        increaseQuantity: function(item) {
            item.quantity = item.quantity + 1;
        },
        removeItem: function(item) {
            let index = this.cart.indexOf(item);
            this.cart.splice(index, 1);
        }
    }
});