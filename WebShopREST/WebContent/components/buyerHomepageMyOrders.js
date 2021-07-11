Vue.component('my-orders', {
    data: function() {
        return {
            searchParams: { restaurantName: '', priceFrom: undefined, priceTo: undefined, dateFrom: undefined, dateTo: undefined},
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            orderStatusDropdownOpen: false,
            checkedRestaurantTypes: [],
            checkedOrderStatuses: [],
            onlyNonDeliveredOrders: false,
            allOrders: null,
            orders: null,
            order: null,
            items: null,
            comment: { 
                content: '', 
                mark: 0, 
                buyerUsername: '', 
                restaurantID: '', 
                isDeleted: false, 
                status: 'PENDING'
            }
        }
    },
    template: 
        `
        <div>
            <!-- Modal popup leave comment-->
            <div class="modal fade" id="leaveCommentPopup" v-if="order !== null">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="orderID">Komentar na restoran</span>
                            <button class="btn float-end" v-on:click="closeCommentDialog"><img src="../images/x.png"></button>
                        </div>
                        <div class="modal-body rounded px-4" style="background-color: #f2f2f2;">
                        <p class="restaurant-name-card" style="margin-bottom: 30px;">Restoran: {{order.restaurantName}}</p>
                        
                        <span class="product-description">Ocena: &emsp;
                            <star-rating text-class="text-transparent" v-model="comment.mark" :star-size="30" :animate="true" :inline="true"/>
                        </span>
                        
                        <p class="product-description" style="margin-top: 20px;">Komentar (opciono): </p>
                        <textarea style="height: 200px; width: 450px;" class="form-control " v-model="comment.content">

                        </textarea>
                        <br/><br/>
                        <div class="text-center">
                            <button class="btn btn-primary" style="width: 150px;" @click="sendComment">Pošalji</button>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal popup order details-->
            <div v-if="order !== null" class="modal fade" id="orderDetails">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="orderID">PORUDŽBINA {{order.id}}</span>
                            <button class="btn float-end" v-on:click="closeOrderDetails"><img src="../images/x.png"></button>
                        </div>
                        <div class="modal-body rounded"  style="background-color: #f2f2f2;">
                            <span v-if="order.status == 'PROCESSING'" class="product-description">
                                Status: Obrada
                                <button class="btn btn-primary float-end" v-on:click="cancelOrder">Otkaži porudžbinu</button>
                                <hr style="margin-top: 40px; margin-bottom: 20px;"/>
                            </span>
                            <span v-if="order.status == 'PREPARING'" class="product-description">Status: U pripremi</span>
                            <span v-if="order.status == 'WAITING_FOR_DELIVERER'" class="product-description">Status: Čeka dostavljača</span>
                            <span v-if="order.status == 'IN_TRANSPORT'" class="product-description">Status: U transportu</span>
                            <span v-if="order.status == 'DELIVERED'" class="product-description">Status: Dostavljena</span>
                            <span v-if="order.status == 'CANCELED'" class="product-description">Status: Otkazana</span>

                            <hr v-if="order.status != 'PROCESSING'" style="margin-top: 20px; margin-bottom: 20px;"/>
                            <div class="my-2">
                                <h1 class="orderID">Poručeni proizvodi</h1>
                            </div>

                            <div class="container py-2">
                                <div class="row">
                                    <div v-for="i in items" class="col-md-12 py-2 padding-0">
                                        <div class="card" style="cursor: default">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <img :src="i.product.imagePath" class="card-img-top h-100 food-images" :alt="i.product.name">
                                                </div>
                                                <div class="col-md-7">
                                                    <div class="card-body">
                                                        <div class="card-title">
                                                            <h2 class="product-name" style="font-size: larger">{{i.product.name}}</h2>
                                                        </div>
                                                        <div class="card-text">
                                                            <p class="product-description">{{i.quantity}}x</p>
                                                            <p class="product-price" style="font-size: larger">{{Number(i.product.price * i.quantity).toFixed(2)}} RSD</p>
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
                                <input type="text" id="restaurantName" placeholder="Naziv restorana" class="form-control flex" style="height: 37px; padding-left: 10px;"
                                    v-model="searchParams.restaurantName">
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
                                        <input class="form-check-input me-1" type="checkbox" value="PROCESSING" v-model="checkedOrderStatuses">Obrada
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="PREPARING" v-model="checkedOrderStatuses">U pripremi
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="WAITING_FOR_DELIVERER" v-model="checkedOrderStatuses">Čeka dostavljača
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="IN_TRANSPORT" v-model="checkedOrderStatuses">U transportu
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="DELIVERED" v-model="checkedOrderStatuses">Dostavljena
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="CANCELED" v-model="checkedOrderStatuses">Otkazana
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
                                            <div class="card shadow my-2" v-on:click="seeOrderDetails(o)" v-if="filterSatisfied(o)">
                                                <div class="row p-4 ">
                                                <div class="col-md-6">
                                                        <h1 class="orderID">PORUDŽBINA {{o.id}}</h1>
                                                        <p style="margin-top: 15px;">{{o.time | dateFormat('DD.MM.YYYY.')}}</p>
                                                        <p style="margin-top: -13px;">Restoran: {{o.restaurantName}}</p>
                                                </div>
                                                <div class="col-md-6">
                                                    <p v-if="o.status == 'PROCESSING'" class="text-end">
                                                        <span style="color: #c29de0;"><img src="../images/processing.png"> Obrada</span>
                                                    </p>
                                                    <p v-if="o.status == 'PREPARING'" class="text-end">
                                                            <span style="color: #5493ff;"><img src="../images/preparing.png"> U pripremi</span>
                                                        </p>
                                                        <p v-if="o.status == 'WAITING_FOR_DELIVERER'" class="text-end">
                                                            <span style="color: #80B0CF;"><img src="../images/waitingForDeliverer.png"> Čeka dostavljača</span>
                                                        </p>
                                                        <p v-if="o.status == 'IN_TRANSPORT'" class="text-end">
                                                            <span style="color: #ffb854;"><img src="../images/inTransport.png"> U transportu</span>
                                                        </p>
                                                        <p v-if="o.status == 'DELIVERED'" class="text-end">
                                                            <span style="color: #27c250;"><img src="../images/delivered.png"> Dostavljena</span>
                                                        </p>
                                                        <p v-if="o.status == 'CANCELED'" class="text-end">
                                                            <span style="color: #ff0000;"><img src="../images/canceled.png"> Otkazana</span>
                                                        </p>
                                                        <p class="text-end" style="margin-top: -3px;">{{Number(o.price).toFixed(2)}} RSD</p>
                                                        <button class="btn btn-success float-end" v-if="o.status === 'DELIVERED'" v-on:click="leaveComment(o)">Ostavi komentar</button>
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
        axios.get('../rest/buyerOrders/getBuyerOrders/')
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
            if(!$('body').hasClass('modal-open'))
                $('#orderDetails').modal('show');
            
            axios.get('../rest/buyerOrders/getItems/' + order.id)
            .then(response => {
                this.items = response.data;
            });

            
        },

        closeOrderDetails: function() {
            $('#orderDetails').modal('hide');
        },

        leaveComment: function(order) {
            this.order = order;
            this.comment.buyerUsername = this.order.buyersUsername;
            this.comment.restaurantID = this.order.restaurantID;
            $('#leaveCommentPopup').modal('show');
        },

        closeCommentDialog: function() {
            this.comment = { content: '', mark: 0, buyerUsername: '', restaurantID: '', isDeleted: false, status: 'PENDING' }
            $('#leaveCommentPopup').modal('hide');
        },

        sendComment: function() {
            if(this.comment.mark == 0){
                alert('Ocenite restoran ili odustanite od ocenjivanja!');
                return;
            }

            axios.post('../rest/comments/add', this.comment)
            .then(response => {
                alert('Komentar uspešno poslat!');
                this.comment = { content: '', mark: 0, buyerUsername: '', restaurantID: '', isDeleted: false, status: 'PENDING' }
                $('#leaveCommentPopup').modal('hide');
            })
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

        
        cancelOrder: function(){
            this.order.status = 'CANCELED';
            axios.get('../rest/buyerOrders/cancelOrder/' + this.order.id)
            .then(response => {
                console.log(response.data);
            });
        }
    },
    filters: {
        dateFormat: function(value, format){
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});