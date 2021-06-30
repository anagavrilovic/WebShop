Vue.component('my-orders', {
    data: function() {
        return {
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            orderStatusDropdownOpen: false,
            checkedRestaurantTypes: [],
            orders: null
        }
    },
    template: 
        `<div class="container py-4">
            <div class="row">
                <div class="col-md-3 justify-content-center">
                    
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <input type="text" id="restaurantName" placeholder="Naziv restorana" class="flex" style="height: 37px; padding-left: 10px;">
                        </div>
                    </div>

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
                                Sortiraj po <span style="float: right;"><img src="../images/arrow.png"></span>
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
                                Tip restorana <span style="float: right;"><img src="../images/arrow.png"></span>
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
                                Status porudžbine <span style="float: right;"><img src="../images/arrow.png"></span>
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
                            <input type="text" id="priceFrom" placeholder="Cena od" class="flex" style="height: 37px; padding-left: 10px;">
                        </div>
                        <div class="col-md-2 padding-0">
                            <input type="text" id="priceTo" placeholder="Cena do" class="flex" style="height: 37px; padding-left: 10px;">
                        </div>
                        <div class="col-md-3 padding-0">
                            <input type="text" id="dateFrom" placeholder="Datum od" class="flex" style="height: 37px; padding-left: 10px;">
                        </div>
                        <div class="col-md-3 padding-0">
                            <input type="text" id="dateTo" placeholder="Datum do" class="flex" style="height: 37px; padding-left: 10px;">
                        </div>
                        <div class="col-md-2 padding-0">
                            <button type="button" id="searchButton" class="btn btn-search flex">
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
                                                    <h1 class="orderID">PORUDŽBINA {{o.id}}</h1>
                                                    <p style="margin-top: 15px;">{{o.time}}</p>
                                                    <p style="margin-top: -13px;">Restoran: {{o.restaurantName}}</p>
                                            </div>
                                            <div class="col-md-6">
                                                <p v-if="o.status === 0" class="text-end">
                                                    <span style="color: #c29de0;"><img src="../images/processing.png"> Obrada</span>
                                                </p>
                                                <p v-if="o.status === 1" class="text-end">
                                                        <span style="color: #5493ff;"><img src="../images/preparing.png"> U pripremi</span>
                                                    </p>
                                                    <p v-if="o.status === 2" class="text-end">
                                                        <span style="color: #80B0CF;"><img src="../images/waitingForDeliverer.png"> Čeka dostavljača</span>
                                                    </p>
                                                    <p v-if="o.status === 3" class="text-end">
                                                        <span style="color: #ffb854;"><img src="../images/inTransport.png"> U transportu</span>
                                                    </p>
                                                    <p v-if="o.status === 4" class="text-end">
                                                        <span style="color: #27c250;"><img src="../images/delivered.png"> Dostavljena</span>
                                                    </p>
                                                    <p v-if="o.status === 5" class="text-end">
                                                        <span style="color: #ff0000;"><img src="../images/canceled.png"> Otkazana</span>
                                                    </p>
                                                    <p class="text-end" style="margin-top: -3px;">{{o.price}}</p>
                                                    <button class="btn btn-success float-end" v-if="o.status === 4">Ostavi komentar</button>
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
        this.orders = [
            {id: '1234567897', restaurantName: 'KFC', time: '12.3.2012. 15:00', status: 0, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', time: '12.3.2012. 15:00', status: 1, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', time: '12.3.2012. 15:00', status: 2, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', time: '12.3.2012. 15:00', status: 3, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', time: '12.3.2012. 15:00', status: 4, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', time: '12.3.2012. 15:00', status: 5, price: '500.00 RSD'}
        ]
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
            
        }
    }
});