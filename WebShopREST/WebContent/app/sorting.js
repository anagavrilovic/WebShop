function compareNameAscending(a, b) {
	if (a.name < b.name){
		return -1;
	}
	if (a.name > b.name){
		return 1;
	}
	return 0;
}

function compareNameDescending(a, b) {
	if (a.name < b.name){
		return 1;
	}
	if (a.name > b.name){
		return -1;
	}
	return 0;
}

function compareLocationAscending(a, b) {
	if (a.location.address.streetName < b.location.address.streetName){
		return -1;
	}
	if (a.location.address.streetName > b.location.address.streetName){
		return 1;
	}
	return 0;
}

function compareLocationDescending(a, b) {
	if (a.location.address.streetName < b.location.address.streetName){
		return 1;
	}
	if (a.location.address.streetName > b.location.address.streetName){
		return -1;
	}
	return 0;
}

function compareMarkAscending(a, b) {
	if (a.mark < b.mark){
		return -1;
	}
	if (a.mark > b.mark){
		return 1;
	}
	return 0;
}

function compareMarkDescending(a, b) {
	if (a.mark < b.mark){
		return 1;
	}
	if (a.mark > b.mark){
		return -1;
	}
	return 0;
}