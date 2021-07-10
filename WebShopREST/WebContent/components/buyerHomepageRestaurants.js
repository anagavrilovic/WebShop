Vue.component('restaurants', {
    data: function() {
        return {
            allRestaurants: null,
            restaurants: null,
            searchParams: { name: '', location: ''},
            sortDropdownOpen: false,
            restaurantTypeDropdownOpen: false,
            restaurantMarkDropdownOpen: false,
            checkedRestaurantTypes: [],
		    checkedRestaurantMarks: [],
		    onlyOpenRestaurants: false
        }
    },
    template: 
        `<div class="container py-4" style="padding-left: 150px; padding-right: 150px;">
            <div class="row">
                <div class="col-md-3 justify-content-center">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <button class="btn btn-filter flex" type="button" v-on:click="toggleSortDropdownVisibility" id="sortButton">
                                Sortiraj po <span style="float: right;"><img src="../images/arrow.png"></span>
                            </button>
                            <div class="list-group flex" v-if="sortDropdownOpen">
                                <button class="list-group-item list-group-item-action" v-on:click="sortNameAZ">Naziv restorana A - Z </button>
                                <button class="list-group-item list-group-item-action" v-on:click="sortNameZA">Naziv restorana Z - A</button>
                                <button class="list-group-item list-group-item-action" v-on:click="sortLocationAscending">Lokacija rastuće</button>
                                <button class="list-group-item list-group-item-action" v-on:click="sortLocationDescending">Lokacija opadajuće</button>
                                <button class="list-group-item list-group-item-action" v-on:click="sortMarkAscending">Ocena rastuće</button>
                                <button class="list-group-item list-group-item-action" v-on:click="sortMarkDescending">Ocena opadajuće</button>
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
                            <button class="btn btn-filter flex" type="button" v-on:click="toggleRestaurantMarkDropdownVisibility">
                                Ocena restorana <span style="float: right;"><img src="../images/arrow.png"></span>
                            </button>
                            <ul class="list-group flex" v-if="restaurantMarkDropdownOpen">
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="4-5" v-model="checkedRestaurantMarks">4 - 5
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="3-4" v-model="checkedRestaurantMarks">3 - 4
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="2-3" v-model="checkedRestaurantMarks">2 - 3
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="1-2" v-model="checkedRestaurantMarks">1 - 2
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="0-1" v-model="checkedRestaurantMarks">0 - 1
                                </label>
                            </ul>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-check checkbox-style rounded">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="onlyOpenRestaurants">
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
                            <input type="text" id="restaurantName" placeholder="Naziv restorana" class="form-control flex" style="height: 40px; padding-left: 10px;"
                                v-model="searchParams.name">
                        </div>
                        <div class="col-md-5 padding-0">
                            <input type="text" id="location" placeholder="Lokacija" class=" form-control flex" style="height: 40px; padding-left: 10px;"
                                v-model="searchParams.location">
                        </div>
                        <div class="col-md-2 padding-0">
                            <button type="button" id="searchButton" class="btn btn-search flex" v-on:click="search">
                            <span><img src="../images/search.png"></span>&ensp;&nbsp;Pretraži
                            </button>
                        </div>
                    </div>

                    <div class="row main_content">
                        <div class="col-md-12 padding1-0">
                            
                            <div class="container padding-0">
                                <div class="row">

                                    <div v-for="r in restaurants" v-if="restaurants !== null">
                                        <div class="card shadow my-2" v-on:click="seeRestaurantDetails(r)" v-if="filterSatisfied(r)">
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
                                                            <span class="markComment">{{Number(r.mark).toFixed(1)}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <p style="margin-top: 10px;">{{r.type}}</p>
                                                        <p style="margin-top: -15px;">
                                                            {{r.location.address.streetName}} {{r.location.address.streetNumber}}, {{r.location.address.city}} {{r.location.address.postalCode}}
                                                        </p>
                                                        <p v-if="isWorking(r)" style="margin-top: -15px;">Otvoreno</p>
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
			.then(response => {
                this.allRestaurants = response.data;
                this.allRestaurants.sort((a, b) => Number(this.isWorking(b)) - Number(this.isWorking(a)));
                this.restaurants = this.allRestaurants.slice();
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

		toggleRestaurantMarkDropdownVisibility: function () {
			if(this.restaurantMarkDropdownOpen){
				this.restaurantMarkDropdownOpen = false;
			}
			else{
				this.restaurantMarkDropdownOpen = true;
			}
		},

        seeRestaurantDetails: function(restaurant) {
            window.location.href = '../html/buyerRestaurant.html?id=' + restaurant.id;
        },


        // SORT
        sortNameAZ: function () {
			this.restaurants.sort(compareNameAscending);
		},
		sortNameZA: function() {
			this.restaurants.sort(compareNameDescending);
		},
		sortLocationAscending: function() {
			this.restaurants.sort(compareLocationAscending);
		},
		sortLocationDescending: function() {
			this.restaurants.sort(compareLocationDescending);
		},
		sortMarkAscending: function() {
			this.restaurants.sort(compareMarkAscending);
		},
		sortMarkDescending: function() {
			this.restaurants.sort(compareMarkDescending);
		},


        // SEARCH
        search: function() {
            while(this.restaurants.length)
                this.restaurants.pop()

            let searchLocation = this.searchParams.location.split(' ');
            for(let r of this.allRestaurants) {

                let found = true;
                for(let s of searchLocation){
                    if(!(r.location.address.streetName.toLowerCase().includes(s.toLowerCase()) || 
                        r.location.address.streetNumber.toLowerCase().includes(s.toLowerCase()) ||
                        r.location.address.city.toLowerCase().includes(s.toLowerCase()) ||
                        r.location.address.postalCode.includes(s))){
                            found = false;
                    }
                }

                if(r.name.toLowerCase().includes(this.searchParams.name.toLowerCase()) && found && !this.restaurants.includes(r))
                    this.restaurants.push(r);
            }
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


        // FILTERS
		filterSatisfied: function(restaurant){
			return this.restaurantMarkFilterSatisfied(restaurant.mark) && this.restaurantTypeFilterSatisfied(restaurant.type) && this.openRestaurantsFilterSatisfied(restaurant);	
		},

		openRestaurantsFilterSatisfied: function(restaurant){
			if(!this.onlyOpenRestaurants)
				return true;
			if(this.isWorking(restaurant)){
				return true;
			}
			else{
				return false;
			}
		},

		restaurantTypeFilterSatisfied: function(type){
			if(this.checkedRestaurantTypes.length == 0){
				return true;
			}
			return this.checkedRestaurantTypes.indexOf(type) > -1;
		},

		restaurantMarkFilterSatisfied: function(mark){
			if(this.checkedRestaurantMarks.length == 0){
				return true;
			}
			let markBottoms = [];
			let markTops = [];
			for(let j=0; j < this.checkedRestaurantMarks.length; j++){
				markBottoms.push(parseInt(this.checkedRestaurantMarks[j].split("-")[0]));
				markTops.push(parseInt(this.checkedRestaurantMarks[j].split("-")[1]));
			}

			for(let i=0; i < markTops.length; i++){
				if(parseFloat(mark) >= markBottoms[i] && parseFloat(mark) <= markTops[i]){
					return true;
				}
					
			}
			return false;
		}
    }
});