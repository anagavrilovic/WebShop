Vue.component("new-employee-modal", {
    data: function() {
        return {
          errrorMessage: '',
          newEmployee: {
            firstName: undefined, 
            lastName: undefined, 
            gender: '', 
            dateOfBirth: undefined, 
            username: undefined, 
            password: undefined
          }
        }
    },
    props: ['title'],
    template: `
      <transition name="modal" id="newEmployeeModal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container modal-container1 modal-login" id="formId">
  
                <div class="modal-header">
                  <h4 class="modal-title">{{title}}</h4>
                  <button type="button" class="btn-close" aria-hidden="true" @click="$emit('close')"></button>
                </div>
  
                <div class="modal-body modal-body1">
                  <form v-on:submit="registerNewEmployee">
                    <div class="form-group input-field">
                      <input type="text" class="form-control input-field" placeholder="Ime" required="required" v-model="newEmployee.firstName">
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Prezime" required="required" v-model="newEmployee.lastName">					
                    </div>

                    <div class="form-group">
                        <select class="form-select input-field" area-label="Pol" required="required" v-model="newEmployee.gender">
                            <option selected disabled value=''>Pol</option>
                            <option value="0">Muški</option>
                            <option value="1">Ženski</option>
                        </select>					
                    </div>

                    <div class="form-group">
                      <input type="date" class="form-control input-field" placeholder="Datum rođenja" required="required" v-model="newEmployee.dateOfBirth">					
                    </div>

                    <div class="form-group">
                      <input type="text" class="form-control input-field" placeholder="Korisničko ime" required="required" v-model="newEmployee.username">					
                    </div>

                    <div class="form-group">
                      <input type="password" class="form-control input-field" placeholder="Lozinka" required="required" v-model="newEmployee.password">					
                    </div>

                    <p style="color: red; font-size: smaller;" class="text-center">{{errrorMessage}}</p>

                    <br/>
                    <div class="form-group submitButton">
                      <input type="submit" class="btn btn-primary btn-block" value="Potvrdi" id="submitButton">
                    </div>
                  </form>
                </div>
  
              </div>
            </div>
          </div>
        </transition>
  `,
  methods: {
    registerNewEmployee: function(event) {
      event.preventDefault();

      if(this.newEmployee.firstName.match(/^[a-zA-ZžŽđĐšŠčČćĆ ]+$/) == null) {
        this.errrorMessage = 'Ime treba da se sastoji samo od slova!'
        return;
      }

      if(this.newEmployee.lastName.match(/^[a-zA-ZžŽđĐšŠčČćĆ ]+$/) == null) {
        this.errrorMessage = 'Prezime treba da se sastoji samo od slova!'
        return;
      }

        axios.get('../rest/login/validateUsername/' + this.newEmployee.username)
          .then(response => {
            if(response.data){
              this.errrorMessage = 'Korisničko ime je zauzeto!'
              return;
            } else {
              if(this.title.includes("menadžer")){
                axios.post('../rest/users/addManager', this.newEmployee)
                  .then(response => {
                    alert("Novi menadžer uspešno dodat!");
                    this.$root.$emit('newUserAdded', response.data);
                  });
              } else {
                axios.post('../rest/users/addDeliverer', this.newEmployee)
                  .then(response => {
                    alert("Novi dostavljač uspešno dodat!");
                    this.$root.$emit('newUserAdded', response.data);
                  });
              }
            }
          });

      
    },
  }
});