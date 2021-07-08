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

function compareFirstNameAscending(a, b) {
	if (a.firstName < b.firstName){
		return -1;
	}
	if (a.firstName > b.firstName){
		return 1;
	}
	return 0;
}

function compareFirstNameDescending(a, b) {
	if (a.firstName < b.firstName){
		return 1;
	}
	if (a.firstName > b.firstName){
		return -1;
	}
	return 0;
}

function compareLastNameAscending(a, b) {
	if (a.lastName < b.lastName){
		return -1;
	}
	if (a.lastName > b.lastName){
		return 1;
	}
	return 0;
}

function compareLastNameDescending(a, b) {
	if (a.lastName < b.lastName){
		return 1;
	}
	if (a.lastName > b.lastName){
		return -1;
	}
	return 0;
}

function compareUsernameAscending(a, b) {
	if (a.username < b.username){
		return -1;
	}
	if (a.username > b.username){
		return 1;
	}
	return 0;
}

function compareUsernameDescending(a, b) {
	if (a.username < b.username){
		return 1;
	}
	if (a.username > b.username){
		return -1;
	}
	return 0;
}

function comparePointsAscending(a, b) {
	if(a.collectedPoints == undefined && b.collectedPoints != undefined){
		return 1;
	}
	if(a.collectedPoints != undefined && b.collectedPoints == undefined) {
		return -1;
	}
	if (a.collectedPoints < b.collectedPoints){
		return -1;
	}
	if (a.collectedPoints > b.collectedPoints){
		return 1;
	}
	return 0;
}

function comparePointsDescending(a, b) {
	if(a.collectedPoints == undefined && b.collectedPoints != undefined){
		return 1;
	}
	if(a.collectedPoints != undefined && b.collectedPoints == undefined) {
		return -1;
	}
	if (a.collectedPoints < b.collectedPoints){
		return 1;
	}
	if (a.collectedPoints > b.collectedPoints){
		return -1;
	}
	return 0;
}