Vue.component('open-orders', {
    data: function() {
        return {
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            orderStatusDropdownOpen: false,
            checkedRestaurantTypes: [],
            orders: null,
            order: null
        }
    },
    template: 
        `
        <div>
            <!-- Modal popup -->
            <!--<div class="modal fade" id="requestOrderPopup">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="orderID">Komentar na restoran</span>
                            <button class="btn float-end" v-on:click="closeRequestOrderDialog"><img src="../images/x.png"></button>
                        </div>
                        <div class="modal-body rounded px-4" style="background-color: #f2f2f2;">
                            
                        </div>
                    </div>
                </div>
            </div>-->

            <div class="container py-4 px-5">
                <div class="row">
                    <div class="col-md-3 justify-content-center">
                        
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <input type="text" id="restaurantName" placeholder="Naziv restorana" class="form-control flex" style="height: 37px; padding-left: 10px;">
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
                                        <input class="form-check-input me-1" type="checkbox" value="">U transportu
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">Dostavljena
                                    </label>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-2 padding-0">
                                <input type="text" id="priceFrom" placeholder="Cena od" class="form-control flex" style="height: 37px; padding-left: 10px;">
                            </div>
                            <div class="col-md-2 padding-0">
                                <input type="text" id="priceTo" placeholder="Cena do" class="form-control flex" style="height: 37px; padding-left: 10px;">
                            </div>
                            <div class="col-md-3 padding-0">
                                <input type="text" id="dateFrom" placeholder="Datum od" class="form-control flex" style="height: 37px; padding-left: 10px;">
                            </div>
                            <div class="col-md-3 padding-0">
                                <input type="text" id="dateTo" placeholder="Datum do" class="form-control flex" style="height: 37px; padding-left: 10px;">
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
                                            <div class="card shadow my-2" style="cursor: default">
                                                <div class="row p-4 ">
                                                <div class="col-md-6">
                                                    <h1 class="orderID">PORUDŽBINA {{o.id}}</h1>
                                                    <p style="margin-top: 15px;">{{o.time}}</p>
                                                    <p style="margin-top: -13px;">Kupac: {{o.buyerName}}</p>
                                                    <p style="margin-top: -13px;">Restoran: {{o.restaurantName}}</p>
                                                </div>
                                                <div class="col-md-6">
                                                    <p class="text-end">
                                                        <span style="color: #80B0CF;"><img src="../images/waitingForDeliverer.png"> Čeka dostavljača</span>
                                                    </p>
                                                    <p class="text-end" style="margin-top: -3px;">{{o.price}}</p>
                                                    <button class="btn btn-request float-end" v-on:click="requestOrder(o)">Zatraži dostavu</button>
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
        </div></div>`,
    mounted() {
        this.orders = [
            {id: '1234567897', restaurantName: 'KFC', buyerName: 'Ana Gavrilović', time: '12.3.2012. 15:00', status: 3, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', buyerName: 'Ana Gavrilović', time: '12.3.2012. 15:00', status: 3, price: '500.00 RSD'},
            {id: '1234567897', restaurantName: 'KFC', buyerName: 'Ana Gavrilović', time: '12.3.2012. 15:00', status: 4, price: '500.00 RSD'}
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

        requestOrder: function(order) {
            this.order = order;
            //$('#requestOrderPopup').modal('show');
            let index = this.orders.indexOf(order);
            this.orders.splice(index, 1);
            this.order.status = 3;
        },

        closeRequestOrderDialog: function() {
            //$('#requestdeliverOrderPopup').modal('hide');
        },
    }
});