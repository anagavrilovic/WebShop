Vue.component("restaurant-products", {
    data: function() {
        return {
            products: null,
            product: null,
            quantity: 1
        }
    },
    template:
        `
        <div>
            <!-- Modal popup -->
            <div v-if="product !== null" class="modal fade" id="orderProduct">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header justify-content-center">
                            <img :src="product.image" style="height: 200px; width: auto;">
                        </div>
                        <div class="modal-body text-center">
                            <h2 class="product-name">{{product.name}}</h2>
                            <h5 class="product-price-dialog">{{product.price}}</h5>
                            <div class="itemQuantity">
                                <span>
                                    <button class="btn btn-secondary rounded-circle addRemoveItem" v-on:click="decreaseQuantity">
                                        <img src="../images/minus.png" style="margin-top: -10px;">
                                    </button>
                                </span>
                                <span class="product-quantity">&emsp;{{quantity}}&emsp;</span>
                                <span>
                                    <button class="btn btn-secondary rounded-circle addRemoveItem" v-on:click="increaseQuantity">
                                        <img src="../images/plus.png" style="margin-top: -10px;">
                                    </button>
                                </span>
                            </div>
                            <button type="button" class="btn btn-primary">Dodaj u korpu</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container py-5 d-grid gap-5">
                <div class="row">
                    <div v-for="p in products" class="col-md-6 py-2" v-on:click="openModalForOrderingProduct(p)">
                        <div class="card shadow" v-on:mouseenter="addHoverClass" v-on:mouseleave="removeHoverClass">
                            <div class="row">
                                <div class="col-md-5">
                                    <img :src="p.image" class="card-img-top h-100 food-images" :alt="p.name">
                                </div>
                                <div class="col-md-7">
                                    <div class="card-body">
                                        <div class="card-title">
                                            <h2 class="product-name">{{p.name}}</h2>
                                        </div>
                                        <div class="card-text">
                                            <p class="product-description">{{p.description}}</p>
                                            <p class="product-price">{{p.price}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    mounted() {
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
        addHoverClass: function (e) {
            e.target.classList.add("hovered");
            e.target.classList.add("shadow-lg");
          },
        removeHoverClass: function (e) {
            e.target.classList.remove("hovered");
            e.target.classList.remove("shadow-lg");
        },
        openModalForOrderingProduct: function(product) {
            this.product = product;
            console.log(this.product);
            $('#orderProduct').modal('show');
        },
        decreaseQuantity: function() {
            this.quantity = this.quantity - 1;
        },
        increaseQuantity: function() {
            this.quantity = this.quantity + 1;
        }
    }
})