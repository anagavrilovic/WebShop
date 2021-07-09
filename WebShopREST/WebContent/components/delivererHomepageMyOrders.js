Vue.component('my-orders', {
    data: function() {
        return {
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            orderStatusDropdownOpen: false,
            checkedRestaurantTypes: [],
            checkedOrderStatuses: [],
            onlyNonDeliveredOrders: false,
            orders: null,
            order: null
        }
    },
    template: 
        `
        <div>
            <!-- Modal popup -->
            <!--<div class="modal fade" id="deliverOrderPopup">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="orderID">Komentar na restoran</span>
                            <button class="btn float-end" v-on:click="closeDeliverOrderDialog"><img src="../images/x.png"></button>
                        </div>
                        <div class="modal-body rounded px-4" style="background-color: #f2f2f2;">
                            
                        </div>
                    </div>
                </div>
            </div>-->

            <div class="container py-4" style="padding-left: 150px; padding-right: 150px;">
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
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="onlyNonDeliveredOrders">
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
                                    <button class="list-group-item list-group-item-action" v-on:click="sortRestaurantNameAZ">Naziv restorana A - Z </button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortRestaurantNameZA">Naziv restorana Z - A</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortOrderPriceAscending">Cena rastuće</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortOrderPriceDescending">Cena opadajuće</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortOrderTimeDescending">Datum najnovije</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortOrderTimeAscending">Datum najstarije</button>
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
                                        <input class="form-check-input me-1" type="checkbox" value="Brza hrana" v-model="checkedRestaurantTypes" v-on:change="">Brza hrana
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Italijanski" v-model="checkedRestaurantTypes" v-on:change="">Italijanski
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Roštilj" v-model="checkedRestaurantTypes" v-on:change="">Roštilj
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Kineski" v-model="checkedRestaurantTypes" v-on:change="">Kineski
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
                                        <input class="form-check-input me-1" type="checkbox" value="IN_TRANSPORT" v-model="checkedOrderStatuses">U transportu
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="DELIVERED" v-model="checkedOrderStatuses">Dostavljena
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
                                            <div class="card shadow my-2" style="cursor: default" v-if="filterSatisfied(o)">
                                                <div class="row p-4 ">
                                                    <div class="col-md-6">
                                                        <h1 class="orderID">PORUDŽBINA {{o.id}}</h1>
                                                        <p style="margin-top: 15px;">{{o.time | dateFormat('DD.MM.YYYY. HH:mm')}}</p>
                                                        <p style="margin-top: -13px;">Kupac: {{o.buyerName}}</p>
                                                        <p style="margin-top: -13px;">Restoran: {{o.restaurantName}}</p>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p v-if="o.status === 'IN_TRANSPORT'" class="text-end">
                                                            <span style="color: #ffb854;"><img src="../images/inTransport.png"> U transportu</span>
                                                        </p>
                                                        <p v-if="o.status === 'DELIVERED'" class="text-end">
                                                            <span style="color: #27c250;"><img src="../images/delivered.png"> Dostavljena</span>
                                                        </p>
                                                        <p class="text-end" style="margin-top: -3px;">{{o.price}} RSD</p>
                                                        <button class="btn btn-deliver float-end" v-if="o.status === 'IN_TRANSPORT'" v-on:click="deliverOrder(o)"> Dostavi porudžbinu </button>
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
        axios.get('../rest/delivererOrders/getDeliverersOrders/')
            .then(response => {
                console.log(response.data);
                this.orders = response.data;
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

        deliverOrder: function(order) {
            this.order = order;
            //$('#deliverOrderPopup').modal('show');
            this.order.status = 'DELIVERED';
            axios.get('../rest/delivererOrders/deliverOrder/' + this.order.id)
            .then(response => {
                console.log(response.data);
            });
        },

        closeDeliverOrderDialog: function() {
            $('#deliverOrderPopup').modal('hide');
        },

         //SORT
        sortRestaurantNameAZ : function(){
            this.orders.sort(compareRestaurantNameAscending);
        },
        sortRestaurantNameZA : function(){
            this.orders.sort(compareRestaurantNameDescending);
        },
        sortOrderPriceAscending: function(){
            this.orders.sort(compareOrderPriceAscending);
        },
        sortOrderPriceDescending: function(){
            this.orders.sort(compareOrderPriceDescending);
        },
        sortOrderTimeAscending: function(){
            this.orders.sort(compareOrderTimeAscending);
        },
        sortOrderTimeDescending: function(){
            this.orders.sort(compareOrderTimeDescending);
        },
        //FILTERS
		filterSatisfied: function(o){
			return this.restaurantTypeFilterSatisfied(o.restaurantType) && this.orderStatusFilterSatisfied(o.status)
                && this.nonDeliveredFilterSatisfied(o.status);
            	
		},

        restaurantTypeFilterSatisfied: function(type){
			if(this.checkedRestaurantTypes.length == 0){
				return true;
			}
			return this.checkedRestaurantTypes.indexOf(type) > -1;
		},
        orderStatusFilterSatisfied: function(status){
			if(this.checkedOrderStatuses.length == 0){
				return true;
			}
			return this.checkedOrderStatuses.indexOf(status) > -1;
		},
        nonDeliveredFilterSatisfied: function(status){
            if(this.onlyNonDeliveredOrders == false){
                return true;
            }
            if(status != 'DELIVERED' && status != 'CANCELED'){
                return true;
            }
            else{
                return false;
            }

        },
    },
    filters: {
        dateFormat: function(value, format){
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});