var app = new Vue({
    el: '#page',
    data: {
        user: null,
        userBackup: null,
        errrorMessage: '',
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        axios.get('../rest/login/loginCheck')
        .then(response => {
            if(response.data == null){
                window.location.href = "../html/homepage.html";
            } else {
                this.user = response.data;

                if(this.user.gender === 'MALE')
                    this.user.gender = 0;
                else
                    this.user.gender = 1;

                this.user.dateOfBirth = moment(this.user.dateOfBirth).format('YYYY-MM-DD');

                this.userBackup = JSON.parse(JSON.stringify(this.user));
            }
        });
    },
    methods: {
        handleScroll(event){
            var nav = document.querySelector('nav');
            if (window.pageYOffset > 100) {
                nav.classList.add('navbar-custom', 'shadow');
            } else {
                nav.classList.remove('navbar-custom', 'shadow');
            }
        },

        goToHomepage: function() {
            switch(this.user.role){
                case 'ADMINISTRATOR':
                    window.location.href = "../html/adminHomepage.html";
                    break;
                case 'MANAGER': 
                    window.location.href = "../html/managerHomepage.html";
                    break;
                case 'BUYER': 
                    window.location.href = "../html/buyerHomepage.html";
                    break;
                case 'DELIVERER': 
                    window.location.href = "../html/delivererHomepage.html";
                    break;
            }
        },

        goToMyProfile: function() {
            window.location.href = "../html/myProfile.html";
        },

        openMyCart: function() {
            if(this.user.role == 'BUYER') {
                window.location.href = "../html/buyerMyCart.html";
            }
        },

        logOut: function() {
            axios.post('../rest/login/logout')
                .then(response => {
                    window.location.href = "../html/homepage.html";
                });
        },

        editMyProfile: function() {
            $("#editForm input").prop('disabled', false);
            $("#editForm #usernameInput").prop('disabled', true);
            $("#editForm select").prop('disabled', false);
            $("#editForm button").prop('disabled', false);
        },
        acceptEditing: function(event) {
            event.preventDefault();

            if(this.user.firstName.match(/^[a-zA-ZžŽđĐšŠčČćĆ ]+$/) == null) {
                this.errrorMessage = 'Ime treba da se sastoji samo od slova!';
                return;
            }
        
            if(this.user.lastName.match(/^[a-zA-ZžŽđĐšŠčČćĆ ]+$/) == null) {
                this.errrorMessage = 'Prezime treba da se sastoji samo od slova!';
                return;
            }

            this.errrorMessage = '';

            switch(this.user.role){
                case 'ADMINISTRATOR':
                    axios.post('../rest/users/updateAdministrator', this.user)
                    .then(response => {
                        this.userBackup = JSON.parse(JSON.stringify(this.user));

                        $("#editForm input").prop('disabled', true);
                        $("#editForm select").prop('disabled', true);
                        $("#editForm button").prop('disabled', true);
                    }); 
                    break;
                case 'MANAGER':
                    axios.post('../rest/users/updateManager', this.user)
                    .then(response => {
                        this.userBackup = JSON.parse(JSON.stringify(this.user));

                        $("#editForm input").prop('disabled', true);
                        $("#editForm select").prop('disabled', true);
                        $("#editForm button").prop('disabled', true);
                    }); 
                    break;
                case 'BUYER':
                    axios.post('../rest/users/updateBuyer', this.user)
                    .then(response => {
                        this.userBackup = JSON.parse(JSON.stringify(this.user));

                        $("#editForm input").prop('disabled', true);
                        $("#editForm select").prop('disabled', true);
                        $("#editForm button").prop('disabled', true);
                    }); 
                    break;
                case 'DELIVERER':
                    axios.post('../rest/users/updateDeliverer', this.user)
                    .then(response => {
                        this.userBackup = JSON.parse(JSON.stringify(this.user));

                        $("#editForm input").prop('disabled', true);
                        $("#editForm select").prop('disabled', true);
                        $("#editForm button").prop('disabled', true);
                    }); 
                    break;
            }  
        },
        cancelEditing: function() {
            this.user.firstName = this.userBackup.firstName;
            this.user.lastName = this.userBackup.lastName;
            this.user.gender = this.userBackup.gender;
            this.user.dateOfBirth = this.userBackup.dateOfBirth;
            this.user.username = this.userBackup.username;
            this.user.password = this.userBackup.password;

            $("#editForm input").prop('disabled', true);
            $("#editForm select").prop('disabled', true);
            $("#editForm button").prop('disabled', true);
        }
    }
});