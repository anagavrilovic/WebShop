Vue.component("admin-users", {
    data: function() {
        return {
            allUsers: [],
            users: [],
            searchParams: { firstName: '', lastName: '', username: ''},
            sortDropdownOpen: false,
            userRoleDropdownOpen: false,
            buyerTypeDropdownOpen: false,
            checkedUserRoles: [],
            checkedBuyerTypes: [],
            onlySuspiciousUsers: false,
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
                <div class="row justify-content-end" style="margin-bottom: 10px;">
                    <div class="col-md-2 padding-0">
                        <button class="btn btn-primary flex" type="button" id="newManagerButton" v-on:click="onShowNewEmployee('Novi menadžer')"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Novi menadžer </button>	
                    </div>
                    <div class="col-md-2 padding-0">
                        <button class="btn btn-primary flex" type="button" id="newDelivererButton" v-on:click="onShowNewEmployee('Novi dostavljač')"
                            style="background-color: #3b535f; border-color: #3b535f; color: white;"> Novi dostavljač </button>	
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
                                        <input class="form-check-input me-1" type="checkbox" value="ADMINISTRATOR" v-model="checkedUserRoles">
                                        Administrator
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="MANAGER" v-model="checkedUserRoles">
                                        Menadžer
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="DELIVERER" v-model="checkedUserRoles">
                                        Dostavljač
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="BUYER" v-model="checkedUserRoles">
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
                                        <input class="form-check-input me-1" type="checkbox" value="GOLD" v-model="checkedBuyerTypes">
                                        Zlatni
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="SILVER" v-model="checkedBuyerTypes">
                                        Srebrni
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="BRONZE" v-model="checkedBuyerTypes">
                                        Bronzani
                                    </label>
                                    <label class="list-group-item">
                                        <input class="form-check-input me-1" type="checkbox" value="REGULAR" v-model="checkedBuyerTypes">
                                        Regularni
                                    </label>
                                </ul>
                            </div>
                        </div>
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <div class="form-check checkbox-style rounded" style="padding-left: 35px">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="onlySuspiciousUsers">
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
                                            <div class="card shadow my-2" v-if="filterSatisfied(u) && !u.isDeleted" v-bind:class="{red : u.isSuspicious}">
                                                <div class="row p-4 ">
                                                    <div class="col-md-2" style="padding-left: 10px; padding-right: 10px;">
                                                        <img src="../images/users.png" alt="User" class="mx-2 restaurant-images" style="height: 70px; width: 70px;">
                                                    </div>
                                                    <div class="commentContent col-md-10">
                                                        <div class="row">
                                                            <div class="col-md-9">
                                                                <p class="user-name">{{u.firstName}} {{u.lastName}} &ensp;|&ensp; {{u.username}}</p>
                                                                <p class="users-text">Datum rođenja: {{u.dateOfBirth | dateFormat('DD.MM.YYYY.')}}</p>
                                                                <p class="users-text" v-if="u.role == 'BUYER'">Broj sakupljenih bodova: {{Number(u.collectedPoints).toFixed(2)}}</p>
                                                                <p class="users-text" v-if="u.role == 'BUYER'">Tip kupca: {{u.buyerType.buyerTypeName}}</p>
                                                                <p class="users-text" v-if="u.role == 'MANAGER'">Restoran: {{u.restaurantName}} </p>
                                                            </div>
                                                            <div class="col-md-3 " style="padding-right: 30px;">
                                                                <p class="text-end users-text" v-if="u.role == 'MANAGER'"> Menadžer </p>
                                                                <p class="text-end users-text" v-if="u.role == 'DELIVERER'"> Dostavljač </p>
                                                                <p class="text-end users-text" v-if="u.role == 'ADMINISTRATOR'"> Administrator </p>
                                                                <p class="text-end users-text" v-if="u.role == 'BUYER'"> Kupac </p>
                                                                <div class="float-end" style="margin-top: 10px;" v-if="u.role != 'ADMINISTRATOR'">
                                                                    <a v-on:click="blockUser(u)" style="cursor: pointer;"><img src="../images/unblocked.png" v-if="!u.isBlocked"></a>
                                                                    <a v-on:click="unblockUser(u)" style="cursor: pointer;"><img src="../images/blocked.png" v-if="u.isBlocked"></a>
                                                                    <img src="../images/delete.png" style="margin-left: 10px;" @click="deleteUser(u)">
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
    
            <new-employee-modal v-if="showNewEmployee" @close="showNewEmployee = false" @newManager="showNewEmployee = true" :title="newEmployeeTitle">	</new-employee-modal>
        </div>
        `,
    mounted() {
        this.$root.$on('newUserAdded', (user) => {
            //this.fixData(user);
            this.allUsers.push(user);
            this.users.push(user);
        });

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

                        /*for(let u of this.allUsers){
                            this.fixData(u);
                        }*/

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

        blockUser: function(user){
            let newUser = {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, gender: user.gender, dateOfBirth: user.dateOfBirth, role: user.role};
            axios.post('../rest/users/blockUser/', newUser)
            .then(response => {
                user.isBlocked = true;
            });
        },
        unblockUser: function(user){
            let newUser = {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, gender: user.gender, dateOfBirth: user.dateOfBirth, role: user.role};
            axios.post('../rest/users/unblockUser/', newUser)
            .then(response => {
                user.isBlocked = false;
            });
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


        // FILTERS
        filterSatisfied: function(user){
			return this.userRoleFilterSatisfied(user) && this.buyerTypeFilterSatisfied(user) && this.suspiciousUsersFilterSatisfied(user);	
		},
        userRoleFilterSatisfied: function(user) {
            if(this.checkedUserRoles.length == 0) {
                return true;
            }
            return this.checkedUserRoles.indexOf(user.role) > -1;
        },
        buyerTypeFilterSatisfied: function(user) {
            if(this.checkedBuyerTypes.length == 0) {
                return true;
            }
            return user.role == "BUYER" && this.checkedBuyerTypes.indexOf(user.buyerType.buyerTypeName) > -1;
        },
        suspiciousUsersFilterSatisfied: function(user) {
            if(!this.onlySuspiciousUsers)
                return true;

            if(user.isSuspicious)
                return true;
            else    
                return false;
        },

        deleteUser: function(user) {
            console.log(user);
            if(confirm('Da li želite da izbrišete korisnika?')){
                let newUser = {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, gender: user.gender, dateOfBirth: user.dateOfBirth, role: user.role};
                console.log(newUser)
                axios.post('../rest/users/deleteUser/', newUser)
                .then(response => {
                    user.isDeleted = true;
                });
            }
        }


    },

    filters: {
        dateFormat: function(value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});