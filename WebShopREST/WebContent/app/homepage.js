var app = new Vue({
    el: '#cover',
    data: {
        showLoginModal: false,
        showRegistrationModal: false
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        alert('U mountedu sam.');
        axios.get('../rest/login/loginCheck')
        .then(response => {
            let roleStr = response.data.role;
            console.log(roleStr);
            switch(roleStr){
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
            default:
                break;
          
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
    }
});