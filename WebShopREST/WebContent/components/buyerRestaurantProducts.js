Vue.component("restaurant-products", {
    data: function() {
        return {
            restaurant: null,
            products: null,
            cartItem : {product: null, quantity: 1},
            uniqueMessage: ''
        }
    },
    template:
        `
        <div>
            <!-- Modal popup -->
            <div v-if="cartItem.product !== null" class="modal fade" id="orderProduct">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header justify-content-center">
                            <img :src="cartItem.product.imagePath" style="height: 200px; width: auto;">
                        </div>
                        <div class="modal-body text-center rounded" style="background-color: #f2f2f2;">
                            <h2 class="product-name">{{cartItem.product.name}}</h2>
                            <h5 class="product-price-dialog">{{Number(cartItem.product.price).toFixed(2)}} RSD</h5>
                            <div class="itemQuantity">
                                <span>
                                    <button class="btn btn-secondary rounded-circle addRemoveItem" v-on:click="decreaseQuantity"
                                        v-bind:class="{disabled : cartItem.quantity === 1}">
                                        <img src="../images/minus.png" style="margin-top: -10px;">
                                    </button>
                                </span>
                                <span class="product-quantity">&emsp;{{cartItem.quantity}}&emsp;</span>
                                <span>
                                    <button class="btn btn-secondary rounded-circle addRemoveItem" v-on:click="increaseQuantity">
                                        <img src="../images/plus.png" style="margin-top: -10px;">
                                    </button>
                                </span>
                            </div>
                            <p style="color: red; font-size: smaller;" class="text-center">{{uniqueMessage}}</p>
                            <button type="button" class="btn btn-primary" v-on:click="addToCart">Dodaj u korpu</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container py-5 d-grid gap-5 px-5">
                <div class="row">
                    <div v-for="p in products" v-on:click="openModalForOrderingProduct(p)" class="col-md-6 py-2"  v-if="!p.isDeleted">

                        <div class="card shadow" v-on:mouseenter="addHoverClass" v-on:mouseleave="removeHoverClass" >
                            <div class="row" >
                                <div class="col-md-5">
                                    <img :src="p.imagePath" class="card-img-top food-images" style="height: 220px;" :alt="p.name">
                                </div>
                                <div class="col-md-7">
                                    <div class="card-body">
                                        <div class="card-title">
                                            <h2 class="product-name">{{p.name}}</h2>
                                        </div>
                                        <div class="card-text">
                                            <p class="product-description">{{p.description}}</p>
                                            <p class="product-price">{{Number(p.price).toFixed(2)}} RSD</p>
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
        let id = window.location.href.split('?')[1].split('=')[1].split('#/')[0];
        axios.get('../rest/restaurants/' + id)
        .then(response => {
            this.restaurant = response.data;

            axios.get('../rest/restaurants/getProducts/' + this.restaurant.id)
            .then(response => {
                this.products = response.data;
            });
        });
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
            if(!this.isWorking(this.restaurant)){
                alert('Restoran trenutno ne radi. Ne možete poručiti proizvode.');
                return;
            }

            this.cartItem.product = product;
            this.cartItem.quantity = 1;
            $('#orderProduct').modal('show');
        },
        decreaseQuantity: function(e) {
            this.cartItem.quantity = this.cartItem.quantity - 1;
        },
        increaseQuantity: function(e) {
            this.cartItem.quantity = this.cartItem.quantity + 1;
        },
        addToCart: function(e){
            e.preventDefault();
            axios.post('../rest/shopping/isCartUnique', this.cartItem)
                .then(response => {
                    if(response.data){
                        axios.post('../rest/shopping/addToCart', this.cartItem)
                        .then(response => {
                            console.log(response.data);
                        });
                        $('#orderProduct').modal('hide');
                    }
                    else{
                        this.uniqueMessage = 'Završite započetu kupovinu iz drugog restorana.';
                        return;
                    }
                })

        },

        isWorking: function(restaurant){
			let workTimeStart = restaurant.workTime.workTimeStart;
			let workTimeEnd = restaurant.workTime.workTimeEnd;
			let workTimeStartHours = workTimeStart.split(':')[0];
			let workTimeEndHours = workTimeEnd.split(':')[0];
				
			var today = new Date();
			var currentTimeHours = today.getHours();

			if(currentTimeHours >= workTimeStartHours && currentTimeHours < workTimeEndHours){
				return true;
			}
			else{
				return false;
			}
		},
    }
})