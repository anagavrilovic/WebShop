Vue.component('open-orders', {
    data: function() {
        return {
            searchParams: { restaurantName: '', priceFrom: undefined, priceTo: undefined, dateFrom: undefined, dateTo: undefined},
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            orderStatusDropdownOpen: false,
            checkedRestaurantTypes: [],
            allOrders: null,
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

            <div class="container py-4" style="padding-left: 150px; padding-right: 150px;">
                <div class="row">
                    <div class="col-md-3 justify-content-center">
                        
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <input type="text" id="restaurantName" placeholder="Naziv restorana" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                    v-model="searchParams.restaurantName">
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



                    </div>

                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-2 padding-0">
                                <input type="text" id="priceFrom" placeholder="Cena od" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                    v-model="searchParams.priceFrom">
                            </div>
                            <div class="col-md-2 padding-0">
                                <input type="text" id="priceTo" placeholder="Cena do" class="form-control flex" style="height: 37px; padding-left: 10px;"
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
                                            <div class="card shadow my-2" style="cursor: default" v-if="filterSatisfied(o)">
                                                <div class="row p-4 ">
                                                <div class="col-md-6">
                                                    <h1 class="orderID">PORUDŽBINA {{o.id}}</h1>
                                                    <p style="margin-top: 15px;">{{o.time | dateFormat('DD.MM.YYYY. HH:mm')}}</p>
                                                    <p style="margin-top: -13px;">Kupac: {{o.buyerName}}</p>
                                                    <p style="margin-top: -13px;">Restoran: {{o.restaurantName}}</p>
                                                </div>
                                                <div class="col-md-6">
                                                    <p class="text-end">
                                                        <span style="color: #80B0CF;"><img src="../images/waitingForDeliverer.png"> Čeka dostavljača</span>
                                                    </p>
                                                    <p class="text-end" style="margin-top: -3px;">{{Number(o.price).toFixed(2)}} RSD</p>
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
        axios.get('../rest/delivererOrders/getOpenOrders/')
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

        requestOrder: function(order) {
            this.order = order;
            //$('#requestOrderPopup').modal('show');
            let index = this.orders.indexOf(order);
            this.orders.splice(index, 1);
            axios.get('../rest/delivererOrders/requestDelivery/' + this.order.id)
            .then(response => {
                console.log(response.data);
            });
        },

        closeRequestOrderDialog: function() {
            //$('#requestdeliverOrderPopup').modal('hide');
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

        // SEARCH
        search: function() {
            while(this.orders.length)
                this.orders.pop();

            if(this.searchParams.priceFrom == undefined)
                this.searchParams.priceFrom = Number.NEGATIVE_INFINITY;
            if(this.searchParams.priceTo == undefined)
                this.searchParams.priceTo = Number.POSITIVE_INFINITY;

            if(this.searchParams.dateFrom == undefined) {
                this.searchParams.dateFrom = new Date(-8640000000000000);
            }
            else {
                this.searchParams.dateFrom = new Date(this.searchParams.dateFrom);
                this.searchParams.dateFrom.setHours(0,0,0,0);
            }
                

            if(this.searchParams.dateTo == undefined){
                this.searchParams.dateTo = new Date(8640000000000000);
                this.searchParams.dateTo.setHours(0,0,0,0);
            } 
            else{
                this.searchParams.dateTo = new Date(this.searchParams.dateTo);
                this.searchParams.dateTo.setHours(0,0,0,0);
            }
                

            for(let order of this.allOrders){
                let orderDate = new Date(order.time).setHours(0,0,0,0);

                if(orderDate >= this.searchParams.dateFrom && orderDate <= this.searchParams.dateTo){
                    if(order.price >= this.searchParams.priceFrom && order.price <= this.searchParams.priceTo){
                        if(order.restaurantName.toLowerCase().includes(this.searchParams.restaurantName.toLowerCase())){
                            this.orders.push(order);
                        }
                    }
                }  
            }

            this.searchParams = { restaurantName: '', priceFrom: undefined, priceTo: undefined, dateFrom: undefined, dateTo: undefined};
        },

        //FILTERS
        filterSatisfied: function(o){
			return this.restaurantTypeFilterSatisfied(o.restaurantType);
            	
		},

        restaurantTypeFilterSatisfied: function(type){
			if(this.checkedRestaurantTypes.length == 0){
				return true;
			}
			return this.checkedRestaurantTypes.indexOf(type) > -1;
		},
    },
    filters: {
        dateFormat: function(value, format){
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});