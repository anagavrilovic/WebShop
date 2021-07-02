Vue.component("manager-buyers", {
    data: function() {
        return {
            users: [
                {name: 'Slavko',  surname: 'Slavković', points: 180, username: 'slavko_car'},
                {name: 'Branko',  surname: 'Branković', points: 370, username: 'branko_brat'},
                {name: 'Smiljka',  surname: 'Smiljković', points: 1000, username: 'smiljka_hraniteljka'},
                {name: 'Gavrilo',  surname: 'Gavrić', points: 950, username: 'gavrilo_princip'}
            ],
            showNewProduct: false
        }
    },
    template:         
        `<div class="container table-container">
            <div class="card shadow py-5 px-5">
                <div class="input-group rounded">
                    <input type="search" class="form-control rounded search-bar" placeholder="Search" aria-label="Search"/>
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
                        <td scope="row">{{u.name}}</td>
                        <td>{{u.surname}}</td>
                        <td>{{u.username}}</td>
                        <td>{{u.points}}</td>
                    </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>`,
    mounted() {

    },
    methods: {
        
    }
});