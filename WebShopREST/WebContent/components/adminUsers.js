Vue.component("admin-users", {
    data: function() {
        return {
            users: null,
            sortDropdownOpen: false,
            userRoleDropdownOpen: false,
            buyerTypeDropdownOpen: false,
            checkedRestaurantTypes: [],
            showNewEmployee: false,
            newEmployeeTitle: ''
        }
    },
    template:         
        `
        <!-- Main body -->
        <div class="main_body" id="restaurants">
            <div class="container">
    
                <!-- New restaurant button -->
                <div class="row justify-content-end">
                    <div class="col-md-2">
                        <button class="btn btn-primary flex" type="button" id="newManagerButton" v-on:click="onShowNewEmployee('Novi menadžer')"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Novi menadžer </button>	
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary flex" type="button" id="newDelivererButton" v-on:click="onShowNewEmployee('Novi dostavljač')"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Novi dostavljač </button>	
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary flex" type="button" id="newRestaurantButton"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Izbriši </button>	
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-md-3">
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-filter flex" type="button" v-on:click="toggleSortDropdownVisibility" id="sortButton"
                                    style="background-color: #3b535f; border-color: #3b535f; color: white;">
                                    Sortiraj po <span style="float: right;"><img src="../images/arrow.png" style="margin-top: 5px"></span>
                                </button>
                                <div class="list-group flex" v-if="sortDropdownOpen">
                                    <button class="list-group-item list-group-item-action" v-on:click="sortNameAZ">Ime A - Z </button>
                                    <button class="list-group-item list-group-item-action">Ime Z - A</button>
                                    <button class="list-group-item list-group-item-action">Prezime A - Z</button>
                                    <button class="list-group-item list-group-item-action">Prezime Z - A</button>
                                    <button class="list-group-item list-group-item-action">Korisničko ime A - Z</button>
                                    <button class="list-group-item list-group-item-action">Korisničko ime Z - A</button>
                                    <button class="list-group-item list-group-item-action">Broj bodova rastuće</button>
                                    <button class="list-group-item list-group-item-action">Broj bodova opadajuće</button>
                                </div>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-filter flex" type="button" v-on:click="toggleUserRoleDropdownVisibility"
                                    style="background-color: #3b535f; border-color: #3b535f; color: white;">
                                    Uloga korisnika <span style="float: right;"><img src="../images/arrow.png" style="margin-top: 5px"></span>
                                </button>
                                <ul class="list-group flex" v-if="userRoleDropdownOpen">
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Administrator" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                        Administrator
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Manager" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                        Menadžer
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Deliverer" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                        Dostavljač
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="Buyer" v-model="checkedRestaurantTypes" v-on:change="typeFilter">
                                        Kupac
                                    </label>
                                    
                                </ul>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <button class="btn btn-filter flex" type="button" v-on:click="toggleBuyerTypeDropdownVisibility"
                                    style="background-color: #3b535f; border-color: #3b535f; color: white;">
                                    Tip kupca <span style="float: right;"><img src="../images/arrow.png" style="margin-top: 5px"></span>
                                </button>
                                <ul class="list-group flex" v-if="buyerTypeDropdownOpen">
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Zlatni
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Srebrni
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Bronzani
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="">
                                        Regularni
                                    </label>
                                </ul>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <div class="form-check checkbox-style rounded" style="padding-left: 35px">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                    Sumnjivi korisnici
                                    </label>
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                    <div class="col-md-9">
                        <div class="row search_bar">
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <input type="text" id="restaurantName" placeholder="Ime" class="form-control flex">
                            </div>
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <input type="text" id="location" placeholder="Prezime" class="form-control flex">
                            </div>
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <input type="text" id="location" placeholder="Korisničko ime" class="form-control flex">
                            </div>
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <button type="button" id="searchButton" class="btn btn-search flex" 
                                    style="background-color: #3b535f; border-color: #3b535f; color: white;">
                                <span><img src="../images/search.png"></span>&ensp;&nbsp;Pretraži
                                </button>
                            </div>
                        </div>
    
                        <div class="row main_content">
                            <div class="col-md-12">
    
                                <div class="view_wrap list-view" style="display: block;" v-for="u in users">
    
                                    <div class="view_item">
                                        <div class="vi_left">
                                            <img src="../images/onion.png">
                                        </div>
                                        <div class="vi_right">
                                            <p class="title">{{u.firstName}} {{u.lastName}}</p>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                </div>
            </div>
    
            <new-employee-modal v-if="showNewEmployee" @close="showNewEmployee = false" :title="newEmployeeTitle">	</new-employee-modal>
        </div>
        `,
    mounted() {
        axios.get('../rest/users')
        .then(response => (this.users = response.data))
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

		toggleUserRoleDropdownVisibility: function () {
			if(this.userRoleDropdownOpen){
				this.userRoleDropdownOpen = false;
			}
			else{
				this.userRoleDropdownOpen = true;
			}
		},

		toggleBuyerTypeDropdownVisibility: function () {
			if(this.buyerTypeDropdownOpen){
				this.buyerTypeDropdownOpen = false;
			}
			else{
				this.buyerTypeDropdownOpen = true;
			}
		},

        onShowNewEmployee: function(newTitle){
            this.showNewEmployee = true;
            this.newEmployeeTitle = newTitle;
        }
    }
});