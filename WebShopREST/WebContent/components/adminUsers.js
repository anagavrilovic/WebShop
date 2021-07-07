Vue.component("admin-users", {
    data: function() {
        return {
            allUsers: [],
            users: [],
            searchParams: { firstName: '', lastName: '', username: ''},
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
                    <div class="col-md-2 padding-0">
                        <button class="btn btn-primary flex" type="button" id="newManagerButton" v-on:click="onShowNewEmployee('Novi menadžer')"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Novi menadžer </button>	
                    </div>
                    <div class="col-md-2 padding-0">
                        <button class="btn btn-primary flex" type="button" id="newDelivererButton" v-on:click="onShowNewEmployee('Novi dostavljač')"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Novi dostavljač </button>	
                    </div>
                    <div class="col-md-2 padding-0">
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
                                    <button class="list-group-item list-group-item-action" v-on:click="sortFirstNameAZ">Ime A - Z </button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortFirstNameZA">Ime Z - A</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortLastNameAZ">Prezime A - Z</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortLastNameZA">Prezime Z - A</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortUsernameAZ">Korisničko ime A - Z</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortUsernameZA">Korisničko ime Z - A</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortCollectedPointsAscending">Broj bodova rastuće</button>
                                    <button class="list-group-item list-group-item-action" v-on:click="sortCollectedPointsDescending">Broj bodova opadajuće</button>
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
                                <input type="text" id="restaurantName" placeholder="Ime" class="form-control flex" v-model="searchParams.firstName">
                            </div>
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <input type="text" id="location" placeholder="Prezime" class="form-control flex" v-model="searchParams.lastName">
                            </div>
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <input type="text" id="location" placeholder="Korisničko ime" class="form-control flex" v-model="searchParams.username">
                            </div>
                            <div class="col-md-3" style="padding-right: 3px; padding-left: 3px; ">
                                <button type="button" id="searchButton" class="btn btn-search flex"  v-on:click="search"
                                    style="background-color: #3b535f; border-color: #3b535f; color: white;">
                                <span><img src="../images/search.png"></span>&ensp;&nbsp;Pretraži
                                </button>
                            </div>
                        </div>
    
                        <div class="row main_content" style="margin-bottom: 50px;">
                            <div class="col-md-12 padding1-0" >
    
                                <div class="container padding-0">
                                    <div class="row">

                                        <div v-for="u in users" v-if="users !== null">
                                            <div class="card shadow my-2">
                                                <div class="row p-4 ">
                                                    <div class="col-md-2" style="padding-left: 10px; padding-right: 10px;">
                                                        <img src="../images/users.png" alt="User" class="mx-2 restaurant-images" style="height: 70px; width: 70px;">
                                                    </div>
                                                    <div class="commentContent col-md-10">
                                                        <div class="row">
                                                            <div class="col-md-9">
                                                                <p class="user-name">{{u.firstName}} {{u.lastName}} &ensp;|&ensp; {{u.username}}</p>
                                                                <p class="users-text">Datum rođenja: {{u.dateOfBirth | dateFormat('DD.MM.YYYY.')}}</p>
                                                                <p class="users-text" v-if="u.role == 'Kupac'">Broj sakupljenih bodova: {{u.collectedPoints}}</p>
                                                                <p class="users-text" v-if="u.role == 'Kupac'">Tip kupca: {{u.buyerType.buyerTypeName}}</p>
                                                                <p class="users-text" v-if="u.role == 'Menadžer'">Restoran: {{u.restaurantName}}</p>
                                                            </div>
                                                            <div class="col-md-3 " style="padding-right: 30px;">
                                                                <p class="text-end users-text">{{u.role}}</p>
                                                                <div class="float-end" style="margin-top: 20px;">
                                                                    <img src="../images/unblocked.png" v-if="!u.isBlocked && u.role !== 'ADMINISTRATOR'">
                                                                    <img src="../images/blocked.png" v-if="u.isBlocked && u.role !== 'ADMINISTRATOR'">
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
    
                    </div>
    
                </div>
            </div>
    
            <new-employee-modal v-if="showNewEmployee" @close="showNewEmployee = false" :title="newEmployeeTitle">	</new-employee-modal>
        </div>
        `,
    mounted() {
        axios.get('../rest/users/getAdministrators')
        .then(response => {
            this.allUsers.push.apply(this.allUsers, response.data);

            axios.get('../rest/users/getManagers')
            .then(response => {
                this.allUsers.push.apply(this.allUsers, response.data);

                axios.get('../rest/users/getBuyers')
                .then(response => {
                    this.allUsers.push.apply(this.allUsers, response.data);

                    axios.get('../rest/users/getDeliverers')
                    .then(response => {
                        this.allUsers.push.apply(this.allUsers, response.data);

                        for(let u of this.allUsers){
                            u.dateOfBirth = new Date(parseInt(u.dateOfBirth));

                            if(u.role == 'ADMINISTRATOR')
                                u.role = 'Administrator';
                            else if(u.role == 'MANAGER')
                                u.role = 'Menadžer';
                            else if(u.role == 'BUYER')
                                u.role = 'Kupac';
                            else if(u.role == 'DELIVERER')
                                u.role = 'Dostavljač';
                        }

                        this.users = this.allUsers.slice();
                    });
                });
            });
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
        },


        // SEARCH
		search: function() {
            while(this.users.length)
                this.users.pop()

            let searchFirstName = this.searchParams.firstName.split(' ');
            let searchLastName = this.searchParams.lastName.split(' ');

            for(let u of this.allUsers) {

                let foundFirstName = true;
                for(let sfn of searchFirstName){
                    if(!(u.firstName.toLowerCase().includes(sfn.toLowerCase()))){
                        foundFirstName = false;
                    }
                }

                let foundLastName = true;
                for(let sln of searchLastName){
                    if(!(u.lastName.toLowerCase().includes(sln.toLowerCase()))){
                        foundLastName = false;
                    }
                }

                if(u.username.toLowerCase().includes(this.searchParams.username.toLowerCase()) 
                    && foundFirstName && foundLastName && !this.users.includes(u)) {
                        this.users.push(u);
                }        
            }
        },
         

        // SORT
        sortFirstNameAZ: function() {
            this.users.sort(compareFirstNameAscending);
        },
        sortFirstNameZA: function() {
            this.users.sort(compareFirstNameDescending);
        },
        sortLastNameAZ: function() {
            this.users.sort(compareLastNameAscending);
        },
        sortLastNameZA: function() {
            this.users.sort(compareLastNameDescending);
        },
        sortUsernameAZ: function() {
            this.users.sort(compareUsernameAscending);
        },
        sortUsernameZA: function() {
            this.users.sort(compareUsernameDescending);
        },
        sortCollectedPointsAscending: function() {
            this.users.sort(comparePointsAscending);
        },
        sortCollectedPointsDescending: function() {
            this.users.sort(comparePointsDescending);
        },  


    },

    filters: {
        dateFormat: function(value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});