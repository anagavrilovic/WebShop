var app = new Vue({
	el: '#restaurants',
	data: {
		restaurants: null,
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
		seeRestaurantDetails: function(restaurant) {

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
		sortNameAZ: function () {
			axios.get('../rest/restaurants/nameAtoZ')
			.then(response => (this.restaurants = response.data))
		},
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
