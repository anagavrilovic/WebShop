function compareOrderPriceAscending(a, b) {
	if (a.order.price < b.order.price){
		return -1;
	}
	if (a.order.price > b.order.price){
		return 1;
	}
	return 0;
}

function compareOrderPriceDescending(a, b) {
	if (a.order.price < b.order.price){
		return 1;
	}
	if (a.order.price > b.order.price){
		return -1;
	}
	return 0;
}

function compareOrderTimeAscending(a, b) {
	if (a.order.time < b.order.time){
		return -1;
	}
	if (a.order.time > b.order.time){
		return 1;
	}
	return 0;
}

function compareOrderTimeDescending(a, b) {
	if (a.order.time < b.order.time){
		return 1;
	}
	if (a.order.time > b.order.time){
		return -1;
	}
	return 0;
}
