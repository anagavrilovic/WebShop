Vue.component("restaurant-products", {
    data: function() {
        return {
            restaurant: null,
            products: null,
            product: null,
            quantity: 1
        }
    },
    template:
        `
        <div>
            <div class="container py-5 d-grid gap-5 px-5">
                <div class="row">
                    <div v-for="p in products" class="col-md-6 py-2" v-if="!p.isDeleted">
                        <div class="card shadow" style="cursor: default;" v-on:mouseenter="addHoverClass" v-on:mouseleave="removeHoverClass">
                            <div class="row">
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
        }
    }
})