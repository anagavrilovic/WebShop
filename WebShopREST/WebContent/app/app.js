var app = new Vue({
	el: '#restaurants',
	data: {
		restaurants: null,
		sortDropdownOpen: false,
		restaurantTypeDropdownOpen: false,
		restaurantMarkDropdownOpen: false,
		checkedRestaurantTypes: [],
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

		sortNameAZ: function () {
			axios.get('../rest/restaurants/nameAtoZ')
			.then(response => (this.restaurants = response.data))
		},

		typeFilter: function () {
			axios.post('../rest/restaurants/typeFilter', this.checkedRestaurantTypes)
			.then(response => (this.restaurants = response.data))
		}
	}
});
