Vue.component("admin-restaurants", {
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
        `
        <!-- Main body -->
        <div class="main_body" id="restaurants">
            <div class="container">
    
                <!-- New restaurant button -->
                <div class="row">
                    <div class="col-md-3 newRestaurant">
                        <button class="btn btn-primary flex" type="button" id="newRestaurantButton"> Novi restoran </button>	
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-md-3">
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-primary flex" type="button" v-on:click="toggleSortDropdownVisibility" id="sortButton">Sortiraj po: </button>
    
                                    <div class="list-group flex" v-if="sortDropdownOpen">
                                        <button class="list-group-item list-group-item-action" v-on:click="sortNameAZ">Naziv restorana A - Z </button>
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
                                <button class="btn btn-primary flex" type="button" v-on:click="toggleRestaurantTypeDropdownVisibility">Tip restorana </button>
                                    <ul class="list-group flex" v-if="restaurantTypeDropdownOpen">
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Chineese" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                            Kineski
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Italian" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                            Italijanski
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Barbeque" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                            Roštilj
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Romanian" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                            Rumunski
                                        </label>
                                        
                                    </ul>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-primary flex" type="button" v-on:click="toggleRestaurantMarkDropdownVisibility">Ocena restorana </button>
                                    <ul class="list-group flex" v-if="restaurantMarkDropdownOpen">
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="">
                                            4 - 5
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="">
                                            3 - 4
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="">
                                            2 - 3
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="">
                                            1 - 2
                                        </label>
                                        <label class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value="">
                                            0 - 1
                                        </label>
                                        
                                    </ul>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                    Samo otvoreni restorani
                                    </label>
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                    <div class="col-md-9">
                        <div class="row search_bar">
                            <div class="col-md-5">
                                <input type="text" id="restaurantName" placeholder="Naziv restorana" class="form-control flex">
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="location" placeholder="Lokacija" class="form-control flex">
                            </div>
    
                            <div class="col-md-2">
                                <input type="submit" id="searchButton" value="Pretrazi" class="btn btn-primary flex">
                            </div>
                        </div>
    
                        <div class="row main_content">
                            <div class="col-md-12">
    
                                <div class="view_wrap list-view" style="display: block;" v-for="r in restaurants">
    
                                    <div class="view_item">
                                        <div class="vi_left">
                                            <img :src=r.logoPath>
                                        </div>
                                        <div class="vi_right">
                                            <p class="title">{{r.name}}</p>
                                            <p class="content"> {{r.type}}</p>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                </div>
            </div>
    
    
        </div>
		`,
    mounted() {
        axios.get('../rest/restaurants')
			.then(response => (this.restaurants = response.data))
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

		sortNameAZ: function () {
			axios.get('../rest/restaurants/nameAtoZ')
			.then(response => (this.restaurants = response.data))
		},

		typeFilter: function () {
			axios.post('../rest/restaurants/typeFilter', this.checkedRestaurantTypes)
			.then(response => (this.restaurants = response.data))
		}
    }
})