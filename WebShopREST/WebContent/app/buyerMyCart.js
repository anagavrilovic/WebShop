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
        }
    }
});