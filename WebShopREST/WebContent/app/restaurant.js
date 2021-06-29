var app = new Vue({
    el: '#page',
    data: {
        tab: 1,
        restaurant: null,
        products: null
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        this.restaurant = {image: '../images/girosMasterCover.jpg', logo: '../images/girosMasterLogo.png', name: 'GYROS MASTER'};
        this.products = [
            {name: 'Mali giros', description: 'Neki opis malog girosa', price: '230.00 RSD', image: '../images/girosMasterGiros.png'},
            {name: 'Veliki giros', description: 'Neki opis velikog girosa', price: '330.00 RSD', image: '../images/girosMasterGiros.png'},
            {name: 'Giros box', description: 'Neki opis giros boxa', price: '450.00 RSD', image: '../images/girosMasterGirosbox.png'},
            {name: 'Giros box + Pepsi', description: 'Neki opis giros boxa i pepsija', price: '500.00 RSD', image: '../images/girosMasterGirosboxpepsi.png'},
            {name: 'Pomfrit', description: 'Neki opis pomfrita', price: '120.00 RSD', image: '../images/girosMasterPomfrit.png'},
            {name: 'Pepsi', description: 'Neki opis pepsija', price: '100.00 RSD', image: '../images/girosMasterPepsi.jpeg'}
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
        addHoverClass: function (e) {
            e.target.classList.add("hovered");
            e.target.classList.add("shadow-lg");
          },
        removeHoverClass: function (e) {
            e.target.classList.remove("hovered");
            e.target.classList.remove("shadow-lg");
        }
    },

});