Vue.component('restaurants', {
    data: function() {
        return {
            restaurants: null,
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            restaurantMarkDropdownOpen: false,
            checkedRestaurantTypes: []
        }
    },
    template: 
        `<div class="container py-4 px-5">
            <div class="row">
                <div class="col-md-3 justify-content-center">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <button class="btn btn-filter flex" type="button" v-on:click="toggleSortDropdownVisibility" id="sortButton">
                                Sortiraj po <span style="float: right;"><img src="../images/arrow.png"></span>
                            </button>
                            <div class="list-group flex" v-if="sortDropdownOpen">
                                <button class="list-group-item list-group-item-action">Naziv restorana A - Z </button>
                                <button class="list-group-item list-group-item-action">Naziv restorana Z - A</button>
                                <button class="list-group-item list-group-item-action">Lokacija rastuće</button>
                                <button class="list-group-item list-group-item-action">Lokacija opadajuće</button>
                                <button class="list-group-item list-group-item-action">Ocena rastuće</button>
                                <button class="list-group-item list-group-item-action">Ocena opadajuće</button>
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
                            <button class="btn btn-filter flex" type="button" v-on:click="toggleRestaurantMarkDropdownVisibility">
                                Ocena restorana <span style="float: right;"><img src="../images/arrow.png"></span>
                            </button>
                            <ul class="list-group flex" v-if="restaurantMarkDropdownOpen">
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">4 - 5
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">3 - 4
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">2 - 3
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">1 - 2
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">0 - 1
                                </label>
                            </ul>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-check checkbox-style rounded">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                Samo otvoreni restorani
                                </label>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-5 padding-0">
                            <input type="text" id="restaurantName" placeholder="Naziv restorana" class="form-control flex" style="height: 37px; padding-left: 10px;">
                        </div>
                        <div class="col-md-5 padding-0">
                            <input type="text" id="location" placeholder="Lokacija" class=" form-control flex" style="height: 37px; padding-left: 10px;">
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

                                    <div v-for="r in restaurants" v-if="restaurants !== null">
                                        <div class="card shadow my-2" v-on:click="seeRestaurantDetails(r)">
                                            <div class="row p-4 ">
                                                <div class="col-md-2" style="padding-left: 10px; padding-right: 10px;">
                                                    <img :src="r.logoPath" alt="r.name" class="mx-2 restaurant-images">
                                                </div>
                                                <div class="commentContent col-md-10" style="padding-left: 50px; padding-right: 0px;">
                                                    <div class="row">
                                                        <div class="col-md-10">
                                                            <span class="restaurant-name-card">{{r.name}}</span>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <span><img src="../images/star.png"></span>
                                                            <span class="markComment">{{r.mark}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <p style="margin-top: 10px;">{{r.type}}</p>
                                                        <p v-if="r.isWorking" style="margin-top: -15px;">Otvoreno</p>
                                                        <p v-else style="margin-top: -15px;">Zatvoreno</p>
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
        axios.get('../rest/restaurants')
			.then(response => (this.restaurants = response.data));
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

		toggleRestaurantMarkDropdownVisibility: function () {
			if(this.restaurantMarkDropdownOpen){
				this.restaurantMarkDropdownOpen = false;
			}
			else{
				this.restaurantMarkDropdownOpen = true;
			}
		},

        seeRestaurantDetails: function(restaurant) {
            window.location.href = '../html/buyerRestaurant.html';
        }
    }
});