var app = new Vue({
	el: '#restaurants',
	data: {
		allRestaurants: null,
		restaurants: null,
		searchParams: { name: '', location: ''},
		sortDropdownOpen: false,
		restaurantTypeDropdownOpen: false,
		restaurantMarkDropdownOpen: false,
		checkedRestaurantTypes: [],
		checkedRestaurantMarks: [],
		onlyOpenRestaurants: false,
		error: ''
	},
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
			window.location.href = "../html/unregistratedUserRestaurant.html?id=" + restaurant.id;
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
        }
	}
});
