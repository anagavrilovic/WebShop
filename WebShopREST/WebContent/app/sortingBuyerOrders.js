function compareRestaurantNameAscending(a, b) {
	if (a.restaurantName < b.restaurantName){
		return -1;
	}
	if (a.restaurantName > b.restaurantName){
		return 1;
	}
	return 0;
}

function compareRestaurantNameDescending(a, b) {
	if (a.restaurantName < b.restaurantName){
		return 1;
	}
	if (a.restaurantName > b.restaurantName){
		return -1;
	}
	return 0;
}

function compareOrderPriceAscending(a, b) {
	if (a.price < b.price){
		return -1;
	}
	if (a.price > b.price){
		return 1;
	}
	return 0;
}

function compareOrderPriceDescending(a, b) {
	if (a.price < b.price){
		return 1;
	}
	if (a.price > b.price){
		return -1;
	}
	return 0;
}

function compareOrderTimeAscending(a, b) {
	if (a.time < b.time){
		return -1;
	}
	if (a.time > b.time){
		return 1;
	}
	return 0;
}

function compareOrderTimeDescending(a, b) {
	if (a.time < b.time){
		return 1;
	}
	if (a.time > b.time){
		return -1;
	}
	return 0;
}

