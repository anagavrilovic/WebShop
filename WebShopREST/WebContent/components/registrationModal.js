Vue.component("registration-modal", {
    data: function() {
        return {
          errrorMessage: '',
          newBuyer: {
            firstName: undefined, 
            lastName: undefined, 
            gender: '', 
            dateOfBirth: undefined, 
            username: undefined, 
            password: undefined
          }
        }
    },
    template: `
      <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container modal-registration">
  
                <div class="modal-header">
                  <h4 class="modal-title">Registracija</h4>
                  <button type="button" class="btn-close" aria-hidden="true" @click="$emit('close')"></button>
                </div>
  
                <div class="modal-body">
                  <form v-on:submit="registerNewBuyer">
                    <div class="form-group input-field">
                      <input type="text" class="form-control input-field" placeholder="Ime" required="required" v-model="newBuyer.firstName">
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Prezime" required="required" v-model="newBuyer.lastName">					
                    </div>

                    <div class="form-group">
                        <select class="form-select input-field" area-label="Pol" v-model="newBuyer.gender" required="required">
                          <option selected disabled value=''>Pol</option>
                          <option value="0">Muški</option>
                          <option value="1">Ženski</option>
                        </select>					
                    </div>

                    <div class="form-group">
                      <input type="date" class="form-control input-field" placeholder="Datum rođenja" required="required" v-model="newBuyer.dateOfBirth">					
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Korisničko ime" required="required" v-model="newBuyer.username">					
                    </div>

                    <div class="form-group">
                      <input type="password" class="form-control input-field" placeholder="Lozinka" required="required" v-model="newBuyer.password">					
                    </div>

                    <p style="color: red; font-size: smaller;" class="text-center">{{errrorMessage}}</p>

                    <br/>
                    <div class="form-group submitButton">
                      <input type="submit" class="btn btn-secondary btn-block" value="Potvrdi" id="submitButton">
                    </div>
                    <div class="loginFromRegistrationLink">   
                      <a href="#"> Vec imate nalog? Prijavite se</a>
                    </div>
                    </form>
                </div>
  
              </div>
            </div>
          </div>
        </transition>
  `,
  methods: {
    registerNewBuyer: function(event) {
      event.preventDefault();

      if(this.newBuyer.firstName.match(/^[a-zA-ZžŽđĐšŠčČćĆ ]+$/) == null) {
        this.errrorMessage = 'Ime treba da se sastoji samo od slova!'
        return;
      }

      if(this.newBuyer.lastName.match(/^[a-zA-ZžŽđĐšŠčČćĆ ]+$/) == null) {
        this.errrorMessage = 'Prezime treba da se sastoji samo od slova!'
        return;
      }

      axios.get('../rest/login/validateUsername/' + this.newBuyer.username)
        .then(response => {
              if(response.data){
                this.errrorMessage = 'Korisničko ime je zauzeto!'
                return;
              } else {
                axios.post('../rest/login/register', this.newBuyer)
                  .then(response => {
                    window.location.href = "../html/buyerHomepage.html";
                  });
              }
        });
    },

  }
  });