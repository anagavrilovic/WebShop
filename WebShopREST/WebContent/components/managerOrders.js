Vue.component('manager-orders', {
    data: function() {
        return {
            searchParams: { priceFrom: undefined, priceTo: undefined, dateFrom: undefined, dateTo: undefined},
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            orderStatusDropdownOpen: false,
            checkedRestaurantTypes: [],
            allOrders: null,
            orders: null,
            order: null,
        }
    },
    template: 
        `
        <div>
            <!-- Modal popup order details-->
            <div v-if="order !== null" class="modal fade" id="orderDetails">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="orderID">PORUDŽBINA {{order.order.id}}</span>
                            <button class="btn float-end" v-on:click="closeOrderDetails"><img src="../images/x.png"></button>
                        </div>
                        <div class="modal-body rounded"  style="background-color: #f2f2f2;">
                            <span v-if="order.order.status === 'PROCESSING'" class="product-description"> Status: Obrada</span>
                            <span v-if="order.order.status === 'PREPARING'" class="product-description">
                                Status: U pripremi
                                <button class="btn btn-primary float-end">Čekaj dostavljača</button>
                            </span>
                            <span v-if="order.order.status === 'WAITING_FOR_DELIVERER'" class="product-description">Status: Čeka dostavljača</span>
                            <span v-if="order.order.status === 'IN_TRANSPORT'" class="product-description">Status: U transportu</span>
                            <span v-if="order.order.status === 'DELIVERED'" class="product-description">Status: Dostavljena</span>
                            <span v-if="order.order.status === 'CANCELED'" class="product-description">Status: Otkazana</span>

                            <!-- Ponude dostavljaca - prvi div u for petlju -->
                            <div v-if="order.order.status === 'WAITING_FOR_DELIVERER'" style="margin-bottom: 10px; margin-top: 10px">
                                <span class="product-description">Zahtev za dostavu: imeee
                                    <span class="float-end">
                                        <span><img src="../images/approve.png" style="cursor: pointer;"></span>
                                        <span><img src="../images/disapprove.png" style="cursor: pointer;"></span>
                                    </span>
                                </span>
                            </div>

                            <hr style="margin-top: 30px; margin-bottom: 20px;"/>
                            <div class="my-2">
                                <h1 class="orderID">Poručeni proizvodi</h1>
                            </div>
 
                            <div class="container py-2">
                                <div class="row ">
                                    <div v-for="i in order.items" class="col-md-12 py-2 padding-0 ">
                                        <div class="card ">
                                            <div class="row ">
                                                <div class="col-md-5">
                                                    <img :src="i.item.imagePath" class="card-img-top food-images" :alt="i.name">
                                                </div>
                                                <div class="col-md-7">
                                                    <div class="card-body">
                                                        <div class="card-title">
                                                            <h2 class="product-name" style="font-size: larger">{{i.item.name}}</h2>
                                                        </div>
                                                        <div class="card-text">
                                                            <p class="product-description">{{i.quantity}}x</p>
                                                            <p class="product-price" style="font-size: larger">{{Number(i.item.price * i.quantity).toFixed(2)}} RSD</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container py-4" style="padding-left: 150px; padding-right: 150px;">
                <div class="row">
                    <div class="col-md-3 justify-content-center">

                        <div class="row mb-3">
                            <div class="col-md-12">
                                <div class="form-check checkbox-style rounded ">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" >
                                    <label class="form-check-label" for="flexCheckDefault">
                                    Nedostavljene
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-filter flex" type="button" v-on:click="toggleSortDropdownVisibility" id="sortButton">
                                    Sortiraj po <span style="float: right;"><img src="../images/arrow.png" style="margin-top: 5px"></span>
                                </button>
                                <div class="list-group flex" v-if="sortDropdownOpen">
                                    <button class="list-group-item list-group-item-action">Naziv restorana A - Z </button>
                                    <button class="list-group-item list-group-item-action">Naziv restorana Z - A</button>
                                    <button class="list-group-item list-group-item-action">Cena rastuće</button>
                                    <button class="list-group-item list-group-item-action">Cena opadajuće</button>
                                    <button class="list-group-item list-group-item-action">Datum najnovije</button>
                                    <button class="list-group-item list-group-item-action">Datum najstarije</button>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-filter flex" type="button" v-on:click="toggleRestaurantTypeDropdownVisibility">
                                    Tip restorana <span style="float: right;"><img src="../images/arrow.png" style="margin-top: 5px"></span>
                                </button>
                                <ul class="list-group flex" v-if="restaurantTypeDropdownOpen">
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Chineese" v-model="checkedRestaurantTypes" v-on:change="">Kineski
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Italian" v-model="checkedRestaurantTypes" v-on:change="">Italijanski
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Barbeque" v-model="checkedRestaurantTypes" v-on:change="">Roštilj
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Romanian" v-model="checkedRestaurantTypes" v-on:change="">Rumunski
                                    </label>
                                </ul>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-filter flex" type="button" v-on:click="toggleOrderStatusDropdownVisibility">
                                    Status porudžbine <span style="float: right;"><img src="../images/arrow.png" style="margin-top: 5px"></span>
                                </button>
                                <ul class="list-group flex" v-if="orderStatusDropdownOpen">
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">Obrada
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">U pripremi
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">Čeka dostavljača
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">U transportu
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">Dostavljena
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">Otkazana
                                    </label>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-2 padding-0">
                                <input type="number" id="priceFrom" placeholder="Cena od" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                 v-model="searchParams.priceFrom">
                            </div>
                            <div class="col-md-2 padding-0">
                                <input type="number" id="priceTo" placeholder="Cena do" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                v-model="searchParams.priceTo">
                            </div>
                            <div class="col-md-3 padding-0">
                                <input type="text" id="dateFrom" placeholder="Datum od" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                    onfocus="(this.type='date')" onblur="(this.type='text')" v-model="searchParams.dateFrom">
                            </div>
                            <div class="col-md-3 padding-0">
                                <input type="text" id="dateTo" placeholder="Datum do" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                    onfocus="(this.type='date')" onblur="(this.type='text')" v-model="searchParams.dateTo">
                            </div>
                            <div class="col-md-2 padding-0">
                                <button type="button" id="searchButton" class="btn btn-search flex" @click="search">
                                    <span><img src="../images/search.png"></span>&ensp;&nbsp;Pretraži
                                </button>
                            </div>
                        </div>

                        <div class="row main_content">
                            <div class="col-md-12 padding1-0">
                                
                                <div class="container padding-0">
                                    <div class="row">

                                        <div v-for="o in orders" v-if="orders !== null">
                                            <div class="card shadow my-2" v-on:click="seeOrderDetails(o)">
                                                <div class="row p-4 ">
                                                <div class="col-md-6">
                                                    <h1 class="orderID">PORUDŽBINA {{o.order.id}}</h1>
                                                    <p style="margin-top: 15px;">{{o.order.time | dateFormat('DD.MM.YYYY. HH:mm')}}</p>
                                                    <p style="margin-top: -13px;">Kupac: {{o.buyerFirstName}} {{o.buyerLastName}}</p>
                                                    <p v-if="o.status === 3 || o.status === 4" style="margin-top: -13px;">
                                                        Dostavljač: {{o.delivererFirstName}} {{o.delivererLastName}}
                                                    </p>
                                                </div>
                                                <div class="col-md-6">
                                                    <p v-if="o.order.status === 'PROCESSING'" class="text-end">
                                                        <span style="color: #c29de0;"><img src="../images/processing.png"> Obrada</span>
                                                    </p>
                                                    <p v-if="o.order.status == 'PREPARING'" class="text-end">
                                                            <span style="color: #5493ff;"><img src="../images/preparing.png"> U pripremi</span>
                                                        </p>
                                                        <p v-if="o.order.status == 'WAITING_FOR_DELIVERER'" class="text-end">
                                                            <span style="color: #80B0CF;"><img src="../images/waitingForDeliverer.png"> Čeka dostavljača</span>
                                                        </p>
                                                        <p v-if="o.order.status == 'IN_TRANSPORT'" class="text-end">
                                                            <span style="color: #ffb854;"><img src="../images/inTransport.png"> U transportu</span>
                                                        </p>
                                                        <p v-if="o.order.status == 'DELIVERED'" class="text-end">
                                                            <span style="color: #27c250;"><img src="../images/delivered.png"> Dostavljena</span>
                                                        </p>
                                                        <p v-if="o.order.status == 'CANCELED'" class="text-end">
                                                            <span style="color: #ff0000;"><img src="../images/canceled.png"> Otkazana</span>
                                                        </p>
                                                        <p class="text-end" style="margin-top: -3px;">{{Number(o.order.price).toFixed(2)}} RSD</p>

                                                        <!-- Ovo se prikaze samo ako ima ponuda od dostavljaca!!!! -->
                                                        <span v-if="o.hasOffer" class="float-end"><img src="../images/deliveryOffer.png"></span>
                                                    </div>
                                                </div>
                                            </div>
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
        axios.get('../rest/managersOrders/')
        .then(response => {
            this.allOrders = response.data;
            this.orders = this.allOrders.slice();
        });
    },
    methods: {
        
        toggleSortDropdownVisibility: function () {
			if(this.sortDropdownOpen){
				this.sortDropdownOpen = false;
			}
			else{
				this.sortDropdownOpen = true;
			}
		},

        toggleRestaurantTypeDropdownVisibility: function () {
			if(this.restaurantTypeDropdownOpen){
				this.restaurantTypeDropdownOpen = false;
			}
			else{
				this.restaurantTypeDropdownOpen = true;
			}
		},

		toggleOrderStatusDropdownVisibility: function () {
			if(this.orderStatusDropdownOpen){
				this.orderStatusDropdownOpen = false;
			}
			else{
				this.orderStatusDropdownOpen = true;
			}
		},

        seeOrderDetails: function(order) {
            this.order = order;
            $('#orderDetails').modal('show');
        },

        closeOrderDetails: function() {
            $('#orderDetails').modal('hide');
        },


        // SEARCH
        search: function() {
            while(this.orders.length)
                this.orders.pop();

            if(this.searchParams.priceFrom == undefined)
                this.searchParams.priceFrom = Number.NEGATIVE_INFINITY;
            if(this.searchParams.priceTo == undefined)
                this.searchParams.priceTo = Number.POSITIVE_INFINITY;

            if(this.searchParams.dateFrom == undefined)
                this.searchParams.dateFrom = new Date(-8640000000000000);
            else 
                this.searchParams.dateFrom = Date.parse(this.searchParams.dateFrom);

            if(this.searchParams.dateTo == undefined)
                this.searchParams.dateTo = new Date(8640000000000000);
            else{
                this.searchParams.dateTo = Date.parse(this.searchParams.dateTo);
                this.searchParams.dateTo = this.searchParams.dateTo + 86400000;
            }
                

            for(let order of this.allOrders){
                if(order.order.time >= this.searchParams.dateFrom && order.order.time <= this.searchParams.dateTo){
                    if(order.order.price >= this.searchParams.priceFrom && order.order.price <= this.searchParams.priceTo){
                        this.orders.push(order);
                    }
                }  
            }

            this.searchParams = { priceFrom: undefined, priceTo: undefined, dateFrom: undefined, dateTo: undefined};
        },
    },

    filters: {
        dateFormat: function(value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});