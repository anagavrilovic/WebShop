Vue.component("login-modal", {
  data: function() {
    return {
        username: '',
        password: '',
        message: ''
    }
  },
  template: `
	<transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container modal-login">

              <div class="modal-header">
                <h4 class="modal-title">Prijavite se</h4>
                <button type="button" class="btn-close" aria-hidden="true" @click="$emit('close')"></button>
              </div>

              <div class="modal-body">
                <form>
                  <div class="form-group input-field">
                    <i class="fa fa-user"></i>
                    <input type="text" class="form-control input-field" placeholder="Korisničko ime" required="required" v-model="username">
                  </div>
                  <div class="form-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" class="form-control input-field" placeholder="Lozinka" required="required" v-model="password">					
                  </div>

                  <p id="errorMessage" class="text-center"> {{message}} </p>

                  <br/>
                  <div class="form-group submitButton">
                    <input type="submit" class="btn btn-secondary btn-block" value="Potvrdi" id="submitButton" @click="handleLogin"
                      >
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </transition>
`,
  mounted() {
    
  },
  methods: {
    handleLogin: function(event){
      axios.post('../rest/login/handleLogin', {username: this.username, password: this.password})
			.then(response => {
        let roleStr = response.data.role;
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
            this.message = 'Neispravno korisničko ime i/ili lozinka!';
            break;
          
        }
      });
      event.preventDefault();
    }
  }

});