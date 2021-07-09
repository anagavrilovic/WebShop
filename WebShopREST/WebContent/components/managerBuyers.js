Vue.component("manager-buyers", {
    data: function() {
        return {
            allUsers: null,
            users: null,
            searchParam: '' 
        }
    },
    template:         
        `<div class="container table-container" style="padding-left: 100px; padding-right: 100px;">
            <div class="card shadow py-5 px-5">
                <div class="input-group rounded">
                    <input type="search" class="form-control rounded search-bar" placeholder="Search" aria-label="Search"
                        v-model="searchParam"  @keydown="search"/>
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fa fa-search"></i>
                    </span>
                </div>

                <table class="table table-striped table-bordered table-hover buyers-table">
                    <thead style="background-color: #3B535F; color: white;">
                    <tr>
                        <th scope="col">Ime</th>
                        <th scope="col">Prezime</th>
                        <th scope="col">Korisničko ime</th>
                        <th scope="col">Sakupljeni poeni</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="u in users">
                        <td scope="row" class="col-md-3">{{u.firstName}}</td>
                        <td class="col-md-3">{{u.lastName}}</td>
                        <td class="col-md-3">{{u.username}}</td>
                        <td class="col-md-3">{{u.collectedPoints}}</td>
                    </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>`,
    mounted() {
        axios.get('../rest/managersOrders/buyers')
        .then(response => {
            this.allUsers = response.data;
            this.users = this.allUsers.slice();
        });
    },
    methods: {
        search: function() {
            while(this.users.length)
                this.users.pop();

            let searchParams = this.searchParam.split(' ');
            for(let user of this.allUsers) {
                let result = true;

                for(let s of searchParams) {
                    if(!user.firstName.toLowerCase().includes(s.toLowerCase()) &&
                        !user.lastName.toLowerCase().includes(s.toLowerCase()) &&
                        !user.username.toLowerCase().includes(s.toLowerCase())) {
                            result = false;
                            break;
                        }
                }

                if(result)
                    this.users.push(user);
                
            }
        }
    }
});