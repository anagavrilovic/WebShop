var app = new Vue({
    el: '#page',
    data: {

    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        $("#editForm input").prop('disabled', true);
        $("#editForm select").prop('disabled', true);
        $("#editForm button").prop('disabled', true);
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
        editMyProfile: function() {
            $("#editForm input").prop('disabled', false);
            $("#editForm select").prop('disabled', false);
            $("#editForm button").prop('disabled', false);
        },
        acceptEditing: function() {
            $("#editForm input").prop('disabled', true);
            $("#editForm select").prop('disabled', true);
            $("#editForm button").prop('disabled', true);
        },
        cancelEditing: function() {
            $("#editForm input").prop('disabled', true);
            $("#editForm select").prop('disabled', true);
            $("#editForm button").prop('disabled', true);
        }
    }
});